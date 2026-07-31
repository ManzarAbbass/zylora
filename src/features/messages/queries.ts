import { sql, eq, and, asc, desc, inArray, isNull } from "drizzle-orm";
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
  const latestMessageCte = db.$with("latest_message").as(
    db
      .selectDistinctOn([messages.clientId], {
        clientId: messages.clientId,
        messageText: messages.messageText,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .orderBy(messages.clientId, desc(messages.createdAt)),
  );

  const rows = await db
    .with(latestMessageCte)
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      companyName: users.companyName,
      packageName: users.packageName,
      latestMessage: latestMessageCte.messageText,
      latestMessageAt: latestMessageCte.createdAt,
      messageCount: sql<number>`cast(count(${messages.id}) as int)`,
    })
    .from(users)
    .leftJoin(latestMessageCte, eq(latestMessageCte.clientId, users.id))
    .leftJoin(messages, eq(messages.clientId, users.id))
    .where(eq(users.role, "CLIENT"))
    .groupBy(users.id, latestMessageCte.messageText, latestMessageCte.createdAt)
    .orderBy(desc(latestMessageCte.createdAt));

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

export async function getChatMessagesByClientIds(
  clientIds: string[],
  limitPerClient = 100,
) {
  if (clientIds.length === 0) return {};

  const ranked = db.$with("ranked_messages").as(
    db
      .select({
        id: messages.id,
        clientId: messages.clientId,
        senderRole: messages.senderRole,
        messageText: messages.messageText,
        readAt: messages.readAt,
        createdAt: messages.createdAt,
        rn: sql<number>`row_number() over (partition by ${messages.clientId} order by ${messages.createdAt} desc)`.as("rn"),
      })
      .from(messages)
      .where(inArray(messages.clientId, clientIds)),
  );

  const rows = await db
    .with(ranked)
    .select({
      id: ranked.id,
      clientId: ranked.clientId,
      senderRole: ranked.senderRole,
      messageText: ranked.messageText,
      readAt: ranked.readAt,
      createdAt: ranked.createdAt,
    })
    .from(ranked)
    .where(sql`${ranked.rn} <= ${limitPerClient}`)
    .orderBy(asc(ranked.createdAt));

  const grouped: Record<string, Array<typeof rows[number]>> = {};
  for (const row of rows) {
    if (!grouped[row.clientId]) grouped[row.clientId] = [];
    grouped[row.clientId].push(row);
  }
  return grouped;
}

export async function getClientChatHistory(clientId: string, limit = 100) {
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.clientId, clientId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  return rows.reverse();
}

export async function getUnreadClientMessagesCount(): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(messages)
    .where(and(eq(messages.senderRole, "CLIENT"), isNull(messages.readAt)));
  return result?.count ?? 0;
}

export async function getAgencyMessagesCount(clientId: string): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(messages)
    .where(
      and(
        eq(messages.clientId, clientId),
        eq(messages.senderRole, "ADMIN"),
        isNull(messages.readAt),
      ),
    );
  return result?.count ?? 0;
}

export async function markMessagesRead(clientId: string, byRole: "ADMIN" | "CLIENT"): Promise<void> {
  await db
    .update(messages)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(messages.clientId, clientId),
        eq(messages.senderRole, byRole === "ADMIN" ? "CLIENT" : "ADMIN"),
        isNull(messages.readAt),
      ),
    );
}
