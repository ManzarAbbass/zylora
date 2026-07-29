import { pgTable, pgEnum, uuid, text, integer, numeric, timestamp, primaryKey, boolean } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["ADMIN", "CLIENT"]);

export const approvalStatusEnum = pgEnum("approval_status", ["PENDING", "APPROVED", "REJECTED"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").default("CLIENT").notNull(),
  companyName: text("company_name"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  packageName: text("package_name"),
  resetTokenHash: text("reset_token_hash"),
  resetTokenExpires: timestamp("reset_token_expires", { mode: "date" }),
  failedAttempts: integer("failed_attempts").default(0).notNull(),
  lockedUntil: timestamp("locked_until", { mode: "date" }),
  emailNotifications: boolean("email_notifications").default(true).notNull(),
  campaignUpdates: boolean("campaign_updates").default(true).notNull(),
  approvalAlerts: boolean("approval_alerts").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  status: text("status").default("ACTIVE").notNull(),
  emailsSent: integer("emails_sent").default(0).notNull(),
  openRate: numeric("open_rate", { precision: 5, scale: 2 }).default("0.00").notNull(),
  revenueGenerated: numeric("revenue_generated", { precision: 12, scale: 2 }).default("0.00").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contentApprovals = pgTable("content_approvals", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id, { onDelete: "cascade" })
    .notNull(),
  contentType: text("content_type").notNull(),
  previewUrl: text("preview_url").notNull(),
  captionText: text("caption_text"),
  status: approvalStatusEnum("status").default("PENDING").notNull(),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const monthlyTrends = pgTable("monthly_trends", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  month: text("month").notNull(),
  revenue: numeric("revenue", { precision: 12, scale: 2 }).default("0.00").notNull(),
  spend: numeric("spend", { precision: 12, scale: 2 }).default("0.00").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<string>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  action: text("action").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  senderRole: userRoleEnum("sender_role").notNull(),
  messageText: text("message_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
