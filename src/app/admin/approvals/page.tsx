import { Toaster } from "sonner";
import { getGlobalAdminApprovalsQueue } from "@/features/approvals/queries";
import { AdminApprovalsGrid } from "./approvals-grid";

export default async function AdminApprovalsPage() {
  const approvals = await getGlobalAdminApprovalsQueue();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Global Creative Approvals Queue
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor multi-client content asset validation cycles, review client revision notes, and re-submit corrected campaign deliverables.
        </p>
      </div>

      <AdminApprovalsGrid initialApprovals={approvals} />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
