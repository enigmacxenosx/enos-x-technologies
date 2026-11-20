import { z } from "zod";

/**
 * The contact desk is a router, not a form mailbox: each topic maps onto a
 * documented ENOSX account (see client/src/data/site.ts). The mapping lives
 * here so the client can promise it and the server can enforce it.
 */
export const ENQUIRY_TOPICS = [
  "technology",
  "services",
  "partnership",
  "support",
  "press",
  "other",
] as const;

export type EnquiryTopic = (typeof ENQUIRY_TOPICS)[number];

export const TOPIC_COPY: Record<EnquiryTopic, { label: string; routesTo: string; note: string }> = {
  technology: {
    label: "Technology & product",
    routesTo: "enosxtech@gmail.com",
    note: "Engineering, product direction, integrations.",
  },
  services: {
    label: "Services & reports",
    routesTo: "enosxservices@gmail.com",
    note: "Build requests, service engagements, incident reports.",
  },
  partnership: {
    label: "Partnership",
    routesTo: "hello@enosx.tech",
    note: "Companies, platforms, distribution.",
  },
  support: {
    label: "Support",
    routesTo: "enosxservices@gmail.com",
    note: "Something is not behaving. Tell us which product.",
  },
  press: {
    label: "Press & speaking",
    routesTo: "hello@enosx.tech",
    note: "Interviews, writes, event invitations.",
  },
  other: {
    label: "Something else",
    routesTo: "enosxtech@gmail.com",
    note: "We will forward it to the right desk.",
  },
};

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please give us a name to reply to").max(160),
  email: z.string().trim().min(5).max(320).email("That address does not look complete"),
  organisation: z.string().trim().max(200).optional().or(z.literal("")),
  channel: z.string().trim().max(60).optional().or(z.literal("")),
  topic: z.enum(ENQUIRY_TOPICS),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(12, "A little more detail helps us route it properly")
    .max(4000, "Keep it under 4,000 characters — or send it straight to email"),
  /** Hidden from humans. Deliberately unconstrained so a bot that fills it is
   * answered with a polite fake success rather than a validation error. */
  website: z.string().max(400).optional(),
  sourcePath: z.string().trim().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().min(5).max(320).email("That address does not look complete"),
  website: z.string().max(400).optional(),
  sourcePath: z.string().trim().max(200).optional(),
});

export const ACCOUNT_EVENT_KEYS = [
  "email-technology",
  "email-services",
  "email-company",
  "whatsapp",
  "instagram",
  "github-personal",
  "github-org",
  "web-enosxai",
  "web-store",
  "web-site",
  "domain-tech",
  "domain-ai",
] as const;

export type AccountEventKey = (typeof ACCOUNT_EVENT_KEYS)[number];

export const accountEventSchema = z.object({
  accountKey: z.enum(ACCOUNT_EVENT_KEYS),
  action: z.enum(["copy", "open"]),
});
