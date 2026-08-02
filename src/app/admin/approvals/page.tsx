import { Toaster } from "sonner";
import { getGlobalAdminApprovalsQueue, getClientAdminApprovalsQueue } from "@/features/approvals/queries";
import { resolveAdminClientSelection } from "@/features/clients/client-selection";
import { AdminApprovalsGrid } from "./approvals-grid";

export default async function AdminApprovalsPage() {
  const { clients, selectedClientId } = await resolveAdminClientSelection();
  const selectedClient = selectedClientId ? clients.find((c) => c.id === selectedClientId) : undefined;

  const approvals = selectedClientId
    ? await getClientAdminApprovalsQueue(selectedClientId)
    : await getGlobalAdminApprovalsQueue();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {selectedClient ? `${selectedClient.companyName} — Approvals` : "Global Creative Approvals Queue"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {selectedClient
            ? "Content asset validation cycle for the selected client, including revision notes and re-submission."
            : "Monitor multi-client content asset validation cycles, review client revision notes, and re-submit corrected campaign deliverables."}
        </p>
      </div>

      <AdminApprovalsGrid initialApprovals={approvals} />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
