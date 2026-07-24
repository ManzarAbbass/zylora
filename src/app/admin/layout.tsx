import { getAllPendingApprovalsCount } from "@/features/approvals/queries";
import { getUnreadClientMessagesCount } from "@/features/messages/queries";
import { LayoutClient } from "@/components/layout-client";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [pendingApprovals, unreadMessages] = await Promise.all([
    getAllPendingApprovalsCount(),
    getUnreadClientMessagesCount(),
  ]);

  return (
    <LayoutClient pendingApprovals={pendingApprovals} unreadMessages={unreadMessages}>
      {children}
    </LayoutClient>
  );
}
