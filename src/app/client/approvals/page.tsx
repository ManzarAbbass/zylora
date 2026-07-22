"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, Send, X } from "lucide-react";
import { mockContentApprovals } from "@/lib/mock-data";
import { toast, Toaster } from "sonner";

type ApprovalStatus = "PENDING" | "APPROVED" | "REVISION";

interface ApprovalItem {
  id: string;
  campaignId: string;
  contentType: string;
  previewUrl: string;
  captionText: string;
  status: ApprovalStatus;
  feedback: string | null;
  createdAt: Date;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClientApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(
    mockContentApprovals.map((a) => ({ ...a, status: a.status as ApprovalStatus })),
  );
  const [revisionInputs, setRevisionInputs] = useState<Record<string, string>>({});
  const [expandedRevision, setExpandedRevision] = useState<string | null>(null);

  function handleApprove(id: string) {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "APPROVED" as const, feedback: null } : a)),
    );
    setExpandedRevision(null);
    toast.success("Asset reference successfully updated status context to APPROVED.");
  }

  function handleRequestRevision(id: string) {
    const feedback = revisionInputs[id]?.trim();
    if (!feedback) return;
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "REVISION" as const, feedback } : a,
      ),
    );
    setRevisionInputs((prev) => ({ ...prev, [id]: "" }));
    setExpandedRevision(null);
    toast.success("Revision request has been submitted to the agency team.");
  }

  function cancelRevision(id: string) {
    setExpandedRevision(null);
    setRevisionInputs((prev) => ({ ...prev, [id]: "" }));
  }

  const statusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="size-3" />
            Approved
          </span>
        );
      case "REVISION":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            <AlertTriangle className="size-3" />
            Changes Requested
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            Pending Review
          </span>
        );
    }
  };

  const pendingItems = approvals.filter((a) => a.status === "PENDING");
  const revisionItems = approvals.filter((a) => a.status === "REVISION");
  const approvedItems = approvals.filter((a) => a.status === "APPROVED");

  function renderCard(item: ApprovalItem) {
    return (
      <div
        key={item.id}
        className={`rounded-xl border bg-white shadow-sm transition ${
          item.status === "APPROVED"
            ? "border-emerald-500"
            : item.status === "REVISION"
              ? "border-amber-400"
              : "border-slate-100"
        }`}
      >
        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {item.contentType}
              </p>
              <p className="mt-0.5 text-xs text-slate-300">
                Created {formatDate(item.createdAt)}
              </p>
            </div>
            {statusBadge(item.status)}
          </div>

          <div className="mb-3 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
            <img
              src={item.previewUrl}
              alt={item.contentType}
              className="aspect-video w-full object-cover"
            />
          </div>

          <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-400">Ad Copy</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {item.captionText}
            </p>
          </div>

          {item.status === "REVISION" && item.feedback && (
            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-medium text-amber-600">Your Feedback</p>
              <p className="mt-1 text-sm text-amber-800">{item.feedback}</p>
            </div>
          )}

          {item.status !== "APPROVED" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  Approve Deliverable
                </button>
                <button
                  onClick={() =>
                    setExpandedRevision(
                      expandedRevision === item.id ? null : item.id,
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <AlertTriangle className="size-4 shrink-0" />
                  Request Revision
                </button>
              </div>

              {expandedRevision === item.id && (
                <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <textarea
                    value={revisionInputs[item.id] ?? ""}
                    onChange={(e) =>
                      setRevisionInputs((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    placeholder="Describe the changes needed..."
                    rows={3}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#124768] focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestRevision(item.id)}
                      disabled={!revisionInputs[item.id]?.trim()}
                      className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send className="size-3.5" />
                      Submit Revision
                    </button>
                    <button
                      onClick={() => cancelRevision(item.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      <X className="size-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {item.status === "APPROVED" && (
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-sm font-medium text-emerald-700">
              This deliverable has been approved
            </div>
          )}
        </div>
      </div>
    );
  }

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

      {pendingItems.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <span className="inline-block size-2 rounded-full bg-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700">
              Pending Review
            </h2>
            <span className="text-xs text-slate-400">({pendingItems.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pendingItems.map(renderCard)}
          </div>
        </section>
      )}

      {revisionItems.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
            <span className="inline-block size-2 rounded-full bg-amber-400" />
            <h2 className="text-sm font-semibold text-amber-700">
              Changes Requested
            </h2>
            <span className="text-xs text-amber-500">({revisionItems.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {revisionItems.map(renderCard)}
          </div>
        </section>
      )}

      {approvedItems.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <h2 className="text-sm font-semibold text-emerald-700">
              Approved
            </h2>
            <span className="text-xs text-emerald-500">({approvedItems.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {approvedItems.map(renderCard)}
          </div>
        </section>
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
