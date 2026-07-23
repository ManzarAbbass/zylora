"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { contentApprovals } from "@/db/schema";

export async function approveAssetAction(assetId: string) {
  try {
    await db
      .update(contentApprovals)
      .set({ status: "APPROVED" })
      .where(eq(contentApprovals.id, assetId));

    revalidatePath("/client/approvals");
    return { success: true as const, data: null, error: undefined };
  } catch {
    return { success: false as const, data: null, error: "Failed to approve asset" };
  }
}

export async function rejectAssetAction(assetId: string, feedbackText: string) {
  try {
    await db
      .update(contentApprovals)
      .set({ status: "REJECTED", feedback: feedbackText })
      .where(eq(contentApprovals.id, assetId));

    revalidatePath("/client/approvals");
    return { success: true as const, data: null, error: undefined };
  } catch {
    return { success: false as const, data: null, error: "Failed to reject asset" };
  }
}
