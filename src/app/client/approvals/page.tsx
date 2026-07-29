import { auth } from "@/auth";
import { Toaster } from "sonner";
import { getClientApprovalsQueue } from "@/features/approvals/queries";
import ClientApprovalsGrid from "./approvals-grid";

export default async function ClientApprovalsPage() {
  const session = await auth();
  const clientId = session?.user?.id;
  if (!clientId) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-slate-400">You must be logged in to view approvals.</p>
      </div>
    );
  }

  const approvals = await getClientApprovalsQueue(clientId);

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
