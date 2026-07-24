import { getClientPendingApprovalsCount } from "@/features/approvals/queries";
import { getAgencyMessagesCount } from "@/features/messages/queries";
import { getClientIdByEmail } from "@/features/clients/queries";
import { LayoutClient } from "@/components/layout-client";

export const dynamic = "force-dynamic";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const clientId = await getClientIdByEmail("ahmed@clothing.com");
  if (!clientId) throw new Error("Client not found");

  const [pendingApprovals, unreadMessages] = await Promise.all([
    getClientPendingApprovalsCount(clientId),
    getAgencyMessagesCount(clientId),
  ]);

  return (
    <LayoutClient role="CLIENT" pendingApprovals={pendingApprovals} unreadMessages={unreadMessages}>
      {children}
    </LayoutClient>
  );
}
