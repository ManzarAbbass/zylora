import { auth } from "@/auth";
import { getAllPendingApprovalsCount } from "@/features/approvals/queries";
import { getUnreadClientMessagesCount } from "@/features/messages/queries";
import { LayoutClient } from "@/components/layout-client";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const [pendingApprovals, unreadMessages] = await Promise.all([
    getAllPendingApprovalsCount(),
    getUnreadClientMessagesCount(),
  ]);

  return (
    <LayoutClient
      pendingApprovals={pendingApprovals}
      unreadMessages={unreadMessages}
      userName={session?.user?.name ?? undefined}
      userEmail={session?.user?.email ?? undefined}
      userImage={session?.user?.image ?? undefined}
    >
      {children}
    </LayoutClient>
  );
}
