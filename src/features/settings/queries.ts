import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const settingsFields = {
  emailNotifications: users.emailNotifications,
  campaignUpdates: users.campaignUpdates,
  approvalAlerts: users.approvalAlerts,
} as const;

export type UserNotificationPrefs = {
  emailNotifications: boolean;
  campaignUpdates: boolean;
  approvalAlerts: boolean;
};

export async function getUserNotificationPrefs(userId: string) {
  return db
    .select(settingsFields)
    .from(users)
    .where(eq(users.id, userId))
    .then((rows) => rows[0] ?? null);
}