import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getClientChatHistory } from "@/features/messages/queries";
import ChatClient from "./chat-client";

export default async function ClientMessagesPage() {
  const session = await auth();
  const clientId = session?.user?.id;
  if (!clientId) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-slate-400">You must be logged in to view messages.</p>
      </div>
    );
  }

  const [admin] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "ADMIN"))
    .limit(1);

  const messages = await getClientChatHistory(clientId);

  return (
    <ChatClient
      initialMessages={messages}
      clientId={clientId}
      adminId={admin?.id ?? null}
    />
  );
}
