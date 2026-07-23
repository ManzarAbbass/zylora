import { getAdminChatThreads, getChatMessagesByClient } from "@/features/messages/queries";
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

  const allMessages: Record<string, Message[]> = {};
  const notificationBadges: Record<string, number> = {};

  for (const thread of threads) {
    const msgs = await getChatMessagesByClient(thread.id);
    allMessages[thread.id] = msgs;

    const unreadCount = msgs.filter(
      (m) => m.senderRole === "CLIENT" && new Date(m.createdAt) > new Date(Date.now() - 7 * 86400000),
    ).length;
    if (unreadCount > 0) {
      notificationBadges[thread.id] = unreadCount;
    }
  }

  return <MessagingDeskLive threads={threads} allMessages={allMessages} notificationBadges={notificationBadges} />;
}
