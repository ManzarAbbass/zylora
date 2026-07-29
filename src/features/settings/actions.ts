"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { logAuditEvent } from "@/lib/audit";

const prefsSchema = z.object({
  emailNotifications: z.boolean(),
  campaignUpdates: z.boolean(),
  approvalAlerts: z.boolean(),
});

export async function updateNotificationPrefsAction(
  prefs: z.infer<typeof prefsSchema>,
) {
  const parsed = prefsSchema.safeParse(prefs);
  if (!parsed.success) {
    return { success: false as const, error: "Invalid preferences data." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, error: "Unauthorized." };
  }

  try {
    await db
      .update(users)
      .set({
        emailNotifications: parsed.data.emailNotifications,
        campaignUpdates: parsed.data.campaignUpdates,
        approvalAlerts: parsed.data.approvalAlerts,
      })
      .where(eq(users.id, session.user.id));

    await logAuditEvent(session.user.id, "notification_prefs_update", {
      prefs: parsed.data,
    });

    revalidatePath("/settings");
    return { success: true as const, error: undefined };
  } catch {
    return {
      success: false as const,
      error: "Failed to update notification preferences.",
    };
  }
}