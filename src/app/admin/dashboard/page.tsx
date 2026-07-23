import { getOnboardedClientsWithMetrics } from "@/features/clients/queries";
import { ClientsLiveTable } from "@/features/clients/components/clients-live-table";

export default async function AdminDashboardPage() {
  const clients = await getOnboardedClientsWithMetrics();

  return <ClientsLiveTable clients={clients} />;
}
