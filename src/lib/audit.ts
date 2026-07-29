import { db } from "@/db";
import { auditLogs } from "@/db/schema";

export async function logAuditEvent(
  userId: string,
  action: string,
  metadata?: Record<string, unknown>,
) {
  try {
    await db.insert(auditLogs).values({
      userId,
      action,
      metadata: metadata ? JSON.stringify(metadata) : null,
    });
  } catch {
    console.warn("[Audit] Failed to write audit log for action:", action);
  }
}
