import { and, asc, count, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  accountEvents,
  enquiries,
  InsertUser,
  newsletterSignups,
  users,
} from "../drizzle/schema";
import type { EnquiryTopic } from "@shared/enquiry";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}


/* ------------------------------------------------------------------ site data */

/** Topic → documented account, decided on the server so the promise in the UI
 *  cannot be tampered with by a hand-edited request. */
export function routeForTopic(topic: EnquiryTopic): string {
  switch (topic) {
    case "services":
    case "support":
      return "enosxservices@gmail.com";
    case "partnership":
    case "press":
      return "hello@enosx.tech";
    case "technology":
    case "other":
    default:
      return "enosxtech@gmail.com";
  }
}

/** mysql2 reports duplicate keys inconsistently across drivers and wrappers. */
function isDuplicate(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const e = error as { code?: string; message?: string; sqlMessage?: string };
  const text = `${e.message ?? ""} ${e.sqlMessage ?? ""}`;
  return e.code === "ER_DUP_ENTRY" || /duplicate entry/i.test(text);
}

function referenceCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `ENX-${pick(4)}-${pick(3)}`;
}

export type NewEnquiryInput = {
  name: string;
  email: string;
  organisation?: string | undefined;
  channel?: string | undefined;
  topic: EnquiryTopic;
  budget?: string | undefined;
  message: string;
  sourcePath?: string | undefined;
};

export async function createEnquiry(input: NewEnquiryInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  // Collide-safe: the alphabet is large, but a unique index is a unique index.
  let reference = referenceCode();
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      await db.insert(enquiries).values({ ...input, reference, routedTo: routeForTopic(input.topic) });
      return { reference, routedTo: routeForTopic(input.topic) };
    } catch (error) {
      if (isDuplicate(error) || isDuplicate((error as { cause?: unknown }).cause)) {
        reference = referenceCode();
        continue;
      }
      throw error;
    }
  }
  throw new Error("Could not allocate an enquiry reference");
}

export async function listEnquiries(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(enquiries).orderBy(sql`${enquiries.createdAt} desc`).limit(limit);
}

export async function setEnquiryStatus(id: number, status: "new" | "read" | "answered" | "archived") {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
  return { ok: true };
}

export async function signupNewsletter(email: string, sourcePath?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const normalized = email.trim().toLowerCase();
  const existing = await db
    .select({ id: newsletterSignups.id })
    .from(newsletterSignups)
    .where(eq(newsletterSignups.email, normalized))
    .limit(1);
  if (existing.length) return { created: false as const };
  const token = Math.random().toString(36).slice(2, 12) + Math.random().toString(36).slice(2, 8);
  try {
    await db.insert(newsletterSignups).values({ email: normalized, token, consent: true, sourcePath });
    return { created: true as const };
  } catch (error) {
    // A racing duplicate on the unique index is a success with a different past.
    if (isDuplicate(error) || isDuplicate((error as { cause?: unknown }).cause)) {
      return { created: false as const };
    }
    throw error;
  }
}

export async function recordAccountEvent(accountKey: string, action: "copy" | "open") {
  const db = await getDb();
  if (!db) return { ok: false };
  await db.insert(accountEvents).values({ accountKey, action });
  return { ok: true };
}

/** Honest counts only. No vanity metrics: if the database is not attached we
 *  report ready=false and the UI says so instead of inventing numbers. */
export async function siteSignals() {
  const db = await getDb();
  if (!db) {
    return {
      enquiries: 0,
      signups: 0,
      accountEvents: 0,
      byAccount: [] as { key: string; n: number }[],
      ready: false,
    };
  }
  const [[enq], [sig], [evt], byAccount] = await Promise.all([
    db.select({ n: count() }).from(enquiries),
    db.select({ n: count() }).from(newsletterSignups),
    db.select({ n: count() }).from(accountEvents),
    db
      .select({ key: accountEvents.accountKey, n: count() })
      .from(accountEvents)
      .groupBy(accountEvents.accountKey),
  ]);
  return {
    enquiries: enq?.n ?? 0,
    signups: sig?.n ?? 0,
    accountEvents: evt?.n ?? 0,
    byAccount: byAccount.map(r => ({ key: r.key, n: r.n })),
    ready: true,
  };
}

export async function recentEvents(limit = 12) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(accountEvents).orderBy(sql`${accountEvents.createdAt} desc`).limit(limit);
}
