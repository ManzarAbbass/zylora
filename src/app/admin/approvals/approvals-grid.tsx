"use client";

import { useState, useTransition } from "react";
import { RefreshCw, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";
import { resubmitRevisedAssetAction } from "@/features/approvals/actions";
import type { GlobalAdminApprovalItem } from "@/features/approvals/queries";

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: GlobalAdminApprovalItem["status"] }) {
  switch (status) {
    case "APPROVED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="size-3" />
          Approved
        </span>
      );
    case "REJECTED":
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
          <AlertTriangle className="size-3" />
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          <Clock className="size-3" />
          Pending
        </span>
      );
  }
}

function AdminApprovalCard({
  item,
  onResubmit,
  isPending,
}: {
  item: GlobalAdminApprovalItem;
  onResubmit: (id: string) => void;
  isPending: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white shadow-sm transition ${
        item.status === "REJECTED"
          ? "border-amber-400 bg-amber-50/40"
          : item.status === "APPROVED"
            ? "border-emerald-200"
            : "border-slate-100"
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {item.contentType}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {item.campaignTitle}
            </p>
          </div>
          <StatusBadge status={item.status} />
        </div>

        <div className="mb-3 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
          <img
            src={item.previewUrl}
            alt={item.contentType}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500">
            {(item.clientCompanyName ?? "?").charAt(0).toUpperCase()}
          </span>
          <span className="text-sm font-medium text-slate-700">
            {item.clientCompanyName ?? "Unknown Client"}
          </span>
        </div>

        {item.captionText && (
          <div className="mb-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-400">Ad Copy</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {item.captionText}
            </p>
          </div>
        )}

        {item.status === "REJECTED" && item.feedback && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs font-medium text-amber-600">Client Revision Notes</p>
            <p className="mt-1 text-sm font-medium text-amber-800">{item.feedback}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Created {formatDate(item.createdAt)}
          </p>

          {item.status === "REJECTED" && (
            <button
              onClick={() => onResubmit(item.id)}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw className="size-3.5" />
              Re-Submit Revised Deliverable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminApprovalsGrid({
  initialApprovals,
}: {
  initialApprovals: GlobalAdminApprovalItem[];
}) {
  const [approvals, setApprovals] = useState<GlobalAdminApprovalItem[]>(initialApprovals);
  const [isPending, startTransition] = useTransition();

  async function handleResubmit(id: string) {
    startTransition(async () => {
      const result = await resubmitRevisedAssetAction(id);
      if (!result.success) {
        toast.error(result.error ?? "Failed to resubmit asset");
        return;
      }
      setApprovals((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "PENDING" as const, feedback: null } : a,
        ),
      );
      toast.success("Asset successfully reset and routed back to the client's validation queue.");
    });
  }

  if (approvals.length === 0) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-slate-400">
          No campaigns creative deliverables have been queued for validation loops.
        </p>
      </div>
    );
  }

  const pendingItems = approvals.filter((a) => a.status === "PENDING");
  const rejectedItems = approvals.filter((a) => a.status === "REJECTED");
  const approvedItems = approvals.filter((a) => a.status === "APPROVED");

  function renderSection(items: GlobalAdminApprovalItem[]) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <AdminApprovalCard
            key={item.id}
            item={item}
            onResubmit={handleResubmit}
            isPending={isPending}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {pendingItems.length > 0 && (
        <section>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <span className="inline-block size-2 rounded-full bg-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700">Pending Review</h2>
            <span className="text-xs text-slate-400">({pendingItems.length})</span>
          </div>
          {renderSection(pendingItems)}
        </section>
      )}

      {rejectedItems.length > 0 && (
        <section>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
            <span className="inline-block size-2 rounded-full bg-amber-400" />
            <h2 className="text-sm font-semibold text-amber-700">Changes Requested</h2>
            <span className="text-xs text-amber-500">({rejectedItems.length})</span>
          </div>
          {renderSection(rejectedItems)}
        </section>
      )}

      {approvedItems.length > 0 && (
        <section>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <h2 className="text-sm font-semibold text-emerald-700">Approved</h2>
            <span className="text-xs text-emerald-500">({approvedItems.length})</span>
          </div>
          {renderSection(approvedItems)}
        </section>
      )}
    </div>
  );
}
