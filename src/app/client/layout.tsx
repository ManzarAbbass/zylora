import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getClientPendingApprovalsCount } from "@/features/approvals/queries";
import { getAgencyMessagesCount } from "@/features/messages/queries";
import { getClientIdByEmail } from "@/features/clients/queries";
import { LayoutClient } from "@/components/layout-client";

export const dynamic = "force-dynamic";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "CLIENT") notFound();
  const clientId = await getClientIdByEmail(session.user.email);
  if (!clientId) notFound();

  const [pendingApprovals, unreadMessages] = await Promise.all([
    getClientPendingApprovalsCount(clientId),
    getAgencyMessagesCount(clientId),
  ]);

  return (
    <LayoutClient
      role="CLIENT"
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
