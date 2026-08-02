import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { contentApprovals, campaigns, users } from "@/db/schema";

const approvalFields = {
  id: contentApprovals.id,
  campaignId: contentApprovals.campaignId,
  contentType: contentApprovals.contentType,
  previewUrl: contentApprovals.previewUrl,
  captionText: contentApprovals.captionText,
  status: contentApprovals.status,
  feedback: contentApprovals.feedback,
  createdAt: contentApprovals.createdAt,
} as const;

export type GlobalAdminApprovalItem = {
  id: string;
  campaignTitle: string;
  clientCompanyName: string | null;
  contentType: string;
  previewUrl: string;
  captionText: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  feedback: string | null;
  createdAt: Date;
};

const globalAdminFields = {
  id: contentApprovals.id,
  campaignTitle: campaigns.title,
  clientCompanyName: users.companyName,
  contentType: contentApprovals.contentType,
  previewUrl: contentApprovals.previewUrl,
  captionText: contentApprovals.captionText,
  status: contentApprovals.status,
  feedback: contentApprovals.feedback,
  createdAt: contentApprovals.createdAt,
} as const;

export async function getClientApprovalsQueue(clientId: string) {
  return db
    .select(approvalFields)
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .where(eq(campaigns.clientId, clientId))
    .orderBy(desc(contentApprovals.createdAt));
}

export async function getGlobalAdminApprovalsQueue(): Promise<GlobalAdminApprovalItem[]> {
  return db
    .select(globalAdminFields)
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .innerJoin(users, eq(campaigns.clientId, users.id))
    .orderBy(desc(contentApprovals.createdAt));
}

export async function getClientAdminApprovalsQueue(clientId: string): Promise<GlobalAdminApprovalItem[]> {
  return db
    .select(globalAdminFields)
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .innerJoin(users, eq(campaigns.clientId, users.id))
    .where(eq(campaigns.clientId, clientId))
    .orderBy(desc(contentApprovals.createdAt));
}

export async function getPendingApprovalsByClient(clientId: string) {
  return db
    .select(approvalFields)
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .where(
      and(
        eq(campaigns.clientId, clientId),
        eq(contentApprovals.status, "PENDING"),
      ),
    );
}

export async function getAllPendingApprovalsCount(): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(contentApprovals)
    .where(eq(contentApprovals.status, "PENDING"));
  return result?.count ?? 0;
}

export async function getClientPendingApprovalsCount(clientId: string): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .where(
      and(
        eq(campaigns.clientId, clientId),
        eq(contentApprovals.status, "PENDING"),
      ),
    );
  return result?.count ?? 0;
}
