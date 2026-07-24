import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { contentApprovals, campaigns } from "@/db/schema";

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

export async function getApprovalsByClient(clientId: string) {
  return db
    .select(approvalFields)
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .where(eq(campaigns.clientId, clientId));
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
