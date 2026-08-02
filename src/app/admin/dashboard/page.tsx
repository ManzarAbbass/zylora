import { getOnboardedClientsWithMetrics } from "@/features/clients/queries";
import { getAdminGlobalStats, getClientWorkspaceStats, getCampaignsByClientId } from "@/features/campaigns/queries";
import { resolveAdminClientSelection } from "@/features/clients/client-selection";
import { ClientBadges } from "@/features/clients/components/client-badges";
import { AdminClientOverview } from "@/features/clients/components/admin-client-overview";
import { ClientsLiveTable } from "@/features/clients/components/clients-live-table";

export default async function AdminDashboardPage() {
  const [{ clients, selectedClientId }, onboarded, globalStats] = await Promise.all([
    resolveAdminClientSelection(),
    getOnboardedClientsWithMetrics(),
    getAdminGlobalStats(),
  ]);

  const selectedClient = selectedClientId ? clients.find((c) => c.id === selectedClientId) : undefined;

  const [clientStats, clientCampaigns] = selectedClientId
    ? await Promise.all([
        getClientWorkspaceStats(selectedClientId),
        getCampaignsByClientId(selectedClientId),
      ])
    : [null, []];

  return (
    <div className="space-y-8">
      <ClientBadges clients={clients} selectedClientId={selectedClientId} />

      {selectedClient && clientStats ? (
        <AdminClientOverview
          clientName={selectedClient.companyName}
          stats={clientStats}
          campaigns={clientCampaigns}
        />
      ) : (
        <div className="rounded-xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
          No clients onboarded yet. Use the Onboard button below to provision your first client.
        </div>
      )}

      <ClientsLiveTable clients={onboarded} globalStats={globalStats} />
    </div>
  );
}
