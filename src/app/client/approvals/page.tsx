import { Toaster } from "sonner";
import { getApprovalsByClient } from "@/features/approvals/queries";
import ClientApprovalsGrid from "./approvals-grid";

export default async function ClientApprovalsPage() {
  const approvals = await getApprovalsByClient("31ef43a7-d86f-4455-960d-8dba5d197363");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Creative Assets Approval Queue
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review and verify marketing copies and ad designs sent by Zylora Agency.
        </p>
      </div>

      <ClientApprovalsGrid initialApprovals={approvals} />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
