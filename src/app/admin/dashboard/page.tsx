import { getOnboardedClientsWithMetrics } from "@/features/clients/queries";
import { getAdminGlobalStats } from "@/features/campaigns/queries";
import { ClientsLiveTable } from "@/features/clients/components/clients-live-table";

export default async function AdminDashboardPage() {
  const [clients, stats] = await Promise.all([
    getOnboardedClientsWithMetrics(),
    getAdminGlobalStats(),
  ]);

  return <ClientsLiveTable clients={clients} globalStats={stats} />;
}
