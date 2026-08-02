import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getAllPendingApprovalsCount, getClientPendingApprovalsCount } from "@/features/approvals/queries";
import { getUnreadClientMessagesCount } from "@/features/messages/queries";
import { resolveAdminClientSelection } from "@/features/clients/client-selection";
import { LayoutClient } from "@/components/layout-client";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") notFound();
  const { selectedClientId } = await resolveAdminClientSelection();
  const [pendingApprovals, unreadMessages] = await Promise.all([
    selectedClientId ? getClientPendingApprovalsCount(selectedClientId) : getAllPendingApprovalsCount(),
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
