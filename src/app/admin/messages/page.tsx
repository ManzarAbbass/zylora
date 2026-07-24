import { getAdminChatThreads, getChatMessagesByClientIds } from "@/features/messages/queries";
import { MessagingDeskLive } from "@/features/messages/components/messaging-desk-live";

interface Message {
  id: string;
  clientId: string;
  senderRole: "CLIENT" | "ADMIN";
  messageText: string;
  createdAt: Date;
}

export default async function AdminMessagesPage() {
  const threads = await getAdminChatThreads();

  const clientIds = threads.map((t) => t.id);
  const allMessages = clientIds.length > 0 ? await getChatMessagesByClientIds(clientIds) : {};

  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
  const notificationBadges: Record<string, number> = {};
  for (const [clientId, msgs] of Object.entries(allMessages)) {
    const unreadCount = msgs.filter((m) => m.senderRole === "CLIENT" && new Date(m.createdAt) > sevenDaysAgo).length;
    if (unreadCount > 0) {
      notificationBadges[clientId] = unreadCount;
    }
  }

  return <MessagingDeskLive threads={threads} allMessages={allMessages} notificationBadges={notificationBadges} />;
}
