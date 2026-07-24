import { sql, eq, and, asc, desc, inArray } from "drizzle-orm";
import { db } from "@/db";
import { users, messages } from "@/db/schema";

export interface AdminChatThread {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  packageName: string | null;
  latestMessage: string | null;
  latestMessageAt: Date | null;
  messageCount: number;
}

export async function getAdminChatThreads(): Promise<AdminChatThread[]> {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      companyName: users.companyName,
      packageName: users.packageName,
      latestMessage: sql<string | null>`
        (SELECT m.message_text FROM ${messages} m
         WHERE m.client_id = ${users.id}
         ORDER BY m.created_at DESC
         LIMIT 1)
      `,
      latestMessageAt: sql<Date | null>`
        (SELECT m.created_at FROM ${messages} m
         WHERE m.client_id = ${users.id}
         ORDER BY m.created_at DESC
         LIMIT 1)
      `,
      messageCount: sql<number>`
        (SELECT COUNT(*) FROM ${messages} m
         WHERE m.client_id = ${users.id})
      `,
    })
    .from(users)
    .where(eq(users.role, "CLIENT"))
    .orderBy(
      desc(sql`
        (SELECT m.created_at FROM ${messages} m
         WHERE m.client_id = ${users.id}
         ORDER BY m.created_at DESC
         LIMIT 1)
      `),
    );

  return rows.map((r) => ({
    ...r,
    messageCount: Number(r.messageCount),
  }));
}

export async function getChatMessagesByClient(clientId: string) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.clientId, clientId))
    .orderBy(asc(messages.createdAt));
}

export async function getChatMessagesByClientIds(clientIds: string[]) {
  if (clientIds.length === 0) return {};
  const rows = await db
    .select()
    .from(messages)
    .where(inArray(messages.clientId, clientIds))
    .orderBy(asc(messages.createdAt));

  const grouped: Record<string, typeof rows> = {};
  for (const row of rows) {
    if (!grouped[row.clientId]) grouped[row.clientId] = [];
    grouped[row.clientId].push(row);
  }
  return grouped;
}

export async function getClientChatHistory(clientId: string) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.clientId, clientId))
    .orderBy(asc(messages.createdAt));
}

export async function getUnreadClientMessagesCount(): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(messages)
    .where(eq(messages.senderRole, "CLIENT"));
  return result?.count ?? 0;
}

export async function getAgencyMessagesCount(clientId: string): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(messages)
    .where(and(eq(messages.clientId, clientId), eq(messages.senderRole, "ADMIN")));
  return result?.count ?? 0;
}
