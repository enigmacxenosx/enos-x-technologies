import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;


/**
 * Enquiries from the contact desk. `reference` is the code shown to the sender
 * so a person can quote it over WhatsApp or email without us storing anything
 * identifying beyond what they typed.
 */
export const enquiries = mysqlTable("enquiries", {
  id: int("id").autoincrement().primaryKey(),
  reference: varchar("reference", { length: 24 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  organisation: varchar("organisation", { length: 200 }),
  channel: varchar("channel", { length: 60 }),
  topic: mysqlEnum("topic", [
    "technology",
    "services",
    "partnership",
    "support",
    "press",
    "other",
  ]).notNull(),
  budget: varchar("budget", { length: 60 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "answered", "archived"])
    .default("new")
    .notNull(),
  /** Routing decided server-side from the topic, mirroring the public account table. */
  routedTo: varchar("routedTo", { length: 320 }).notNull(),
  sourcePath: varchar("sourcePath", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type InsertEnquiry = typeof enquiries.$inferInsert;

/** Newsletter signups, deduplicated by address. */
export const newsletterSignups = mysqlTable("newsletter_signups", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  /** Random per record: lets the public counter report volume without ever
   * exposing an address in a URL or a client-side payload. */
  token: varchar("token", { length: 32 }).notNull(),
  consent: boolean("consent").notNull().default(false),
  sourcePath: varchar("sourcePath", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterSignup = typeof newsletterSignups.$inferSelect;

/**
 * Anonymised account-card interactions: which documented contact a visitor
 * copied or opened. No IP address, no user agent, no fingerprint is stored.
 */
export const accountEvents = mysqlTable("account_events", {
  id: int("id").autoincrement().primaryKey(),
  accountKey: varchar("accountKey", { length: 80 }).notNull(),
  action: mysqlEnum("action", ["copy", "open"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AccountEvent = typeof accountEvents.$inferSelect;
