import { COOKIE_NAME } from "@shared/const";
import {
  accountEventSchema,
  enquirySchema,
  newsletterSchema,
  TOPIC_COPY,
} from "@shared/enquiry";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

/**
 * A deliberately coarse in-process rate limiter. This is a promotional site,
 * not a bank: the aim is to stop a script from filling the enquiry table, not
 * to build a WAF. A server restart clears it.
 */
const hits = new Map<string, { count: number; since: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;

function clientKey(req: {
  headers: Record<string, unknown>;
  socket?: { remoteAddress?: string } | null;
}) {
  const fwd = req.headers["x-forwarded-for"];
  const first = typeof fwd === "string" ? fwd.split(",")[0]?.trim() : undefined;
  const ua = req.headers["user-agent"];
  return `${first || req.socket?.remoteAddress || "unknown"}|${
    typeof ua === "string" ? ua.slice(0, 40) : "none"
  }`;
}

function allow(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now - entry.since > WINDOW_MS) {
    hits.set(key, { count: 1, since: now });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now - v.since > WINDOW_MS) hits.delete(k);
    }
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  /** Public services for the site itself. */
  site: router({
    /** Which documented account each topic routes to — the same table the
     * server uses, exposed so the UI can show the destination before sending. */
    topics: publicProcedure.query(() =>
      Object.entries(TOPIC_COPY).map(([value, copy]) => ({ value, ...copy }))
    ),

    enquiry: publicProcedure.input(enquirySchema).mutation(async ({ input, ctx }) => {
      if (input.website) {
        // Honeypot filled: answer as if it worked so a bot learns nothing.
        return {
          ok: true,
          reference: "ENX-0000-000",
          routedTo: TOPIC_COPY[input.topic].routesTo,
        };
      }
      if (!allow(clientKey(ctx.req))) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message:
            "That is more than we can read at once. Try again in a few minutes, or use the WhatsApp line.",
        });
      }
      const result = await db.createEnquiry({
        name: input.name,
        email: input.email,
        organisation: input.organisation || undefined,
        channel: input.channel || undefined,
        topic: input.topic,
        budget: input.budget || undefined,
        message: input.message,
        sourcePath: input.sourcePath,
      });
      return { ok: true, ...result };
    }),

    newsletter: publicProcedure.input(newsletterSchema).mutation(async ({ input }) => {
      if (input.website) return { ok: true, already: false };
      const result = await db.signupNewsletter(input.email, input.sourcePath);
      return { ok: true, already: !result.created };
    }),

    /** Anonymised counter for the account cards. Never throws: losing a signal
     * event must not break the copy button for a human. */
    accountEvent: publicProcedure
      .input(accountEventSchema)
      .mutation(async ({ input }) =>
        db
          .recordAccountEvent(input.accountKey, input.action)
          .catch(() => ({ ok: false }))
      ),

    /** Honest counts only. With no database attached we say so rather than
     * show invented growth figures. */
    signals: publicProcedure.query(() => db.siteSignals()),
  }),

  /** Owner desk. /admin renders this only for a session whose role is "admin"
   * (the workspace owner is promoted on first sign-in). */
  admin: router({
    enquiries: adminProcedure
      .input(z.object({ limit: z.number().int().min(1).max(200).optional() }).optional())
      .query(({ input }) => db.listEnquiries(input?.limit ?? 100)),
    setEnquiryStatus: adminProcedure
      .input(
        z.object({
          id: z.number().int().positive(),
          status: z.enum(["new", "read", "answered", "archived"]),
        })
      )
      .mutation(({ input }) => db.setEnquiryStatus(input.id, input.status)),
    signals: adminProcedure.query(() => db.siteSignals()),
    recentEvents: adminProcedure.query(() => db.recentEvents(20)),
  }),
});

export type AppRouter = typeof appRouter;
