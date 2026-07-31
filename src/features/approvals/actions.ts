"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { Session } from "next-auth";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { campaigns, contentApprovals } from "@/db/schema";

async function canMutateAsset(assetId: string, session: Session | null) {
  const user = session?.user;
  if (!user?.id) return false;
  if (user.role === "ADMIN") return true;
  if (user.role !== "CLIENT") return false;

  const [owned] = await db
    .select({ id: contentApprovals.id })
    .from(contentApprovals)
    .innerJoin(campaigns, eq(contentApprovals.campaignId, campaigns.id))
    .where(and(eq(contentApprovals.id, assetId), eq(campaigns.clientId, user.id)))
    .limit(1);

  return !!owned;
}

const approveSchema = z.object({
  assetId: z.string().uuid(),
});

const rejectSchema = z.object({
  assetId: z.string().uuid(),
  feedbackText: z.string().min(1, "Feedback is required").max(500),
});

export async function approveAssetAction(assetId: string) {
  const parsed = approveSchema.safeParse({ assetId });
  if (!parsed.success) {
    return { success: false as const, data: null, error: "Invalid asset ID" };
  }

  const session = await auth();
  if (!(await canMutateAsset(parsed.data.assetId, session))) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  try {
    await db
      .update(contentApprovals)
      .set({ status: "APPROVED" })
      .where(eq(contentApprovals.id, parsed.data.assetId));

    revalidatePath("/client/approvals");
    revalidatePath("/admin/approvals");
    return { success: true as const, data: null, error: undefined };
  } catch {
    return { success: false as const, data: null, error: "Failed to approve asset" };
  }
}

export async function rejectAssetAction(assetId: string, feedbackText: string) {
  const parsed = rejectSchema.safeParse({ assetId, feedbackText });
  if (!parsed.success) {
    return { success: false as const, data: null, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const session = await auth();
  if (!(await canMutateAsset(parsed.data.assetId, session))) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  try {
    await db
      .update(contentApprovals)
      .set({ status: "REJECTED", feedback: parsed.data.feedbackText })
      .where(eq(contentApprovals.id, parsed.data.assetId));

    revalidatePath("/client/approvals");
    revalidatePath("/admin/approvals");
    return { success: true as const, data: null, error: undefined };
  } catch {
    return { success: false as const, data: null, error: "Failed to reject asset" };
  }
}

export async function resubmitRevisedAssetAction(assetId: string) {
  const parsed = approveSchema.safeParse({ assetId });
  if (!parsed.success) {
    return { success: false as const, data: null, error: "Invalid asset ID" };
  }

  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  try {
    await db
      .update(contentApprovals)
      .set({ status: "PENDING", feedback: null })
      .where(eq(contentApprovals.id, parsed.data.assetId));

    revalidatePath("/admin/approvals");
    revalidatePath("/client/approvals");
    return { success: true as const, data: null, error: undefined };
  } catch {
    return { success: false as const, data: null, error: "Failed to resubmit asset" };
  }
}
