"use client";

import { useRef, useTransition } from "react";
import { DollarSign, Mail, Percent, BarChart3, Pause, Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/stat-card";
import type { ClientWorkspaceStats } from "@/features/campaigns/queries";
import { MetricsInjectModal } from "@/app/admin/dashboard/components/metrics-inject-modal";
import { toggleCampaignStatusAction } from "@/features/clients/actions";

interface ClientCampaign {
  id: string;
  title: string;
  channel: string;
  status: string;
  emailsSent: number;
  openRate: string;
  revenueGenerated: string;
}

const CHANNEL_LABELS: Record<string, string> = {
  EMAIL: "Email",
  META: "Meta Ads",
  GOOGLE: "Google Ads",
  TIKTOK: "TikTok",
};

interface Props {
  clientId: string;
  clientName: string;
  stats: ClientWorkspaceStats;
  campaigns: ClientCampaign[];
}

function CampaignStatusToggle({ campaignId, status }: { campaignId: string; status: string }) {
  const [isPending, startTransition] = useTransition();
  const isActive = status === "ACTIVE";

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleCampaignStatusAction({ campaignId });
      if (result.success) {
        toast.success(isActive ? "Campaign paused." : "Campaign resumed.");
      } else {
        toast.error(result.error || "Failed to update campaign status.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={isActive ? "Pause campaign" : "Resume campaign"}
      aria-label={isActive ? "Pause campaign" : "Resume campaign"}
      className={`inline-flex items-center justify-center rounded-md border p-1.5 transition disabled:opacity-60 ${
        isActive
          ? "border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
      }`}
    >
      {isPending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : isActive ? (
        <Pause className="size-3.5" />
      ) : (
        <Play className="size-3.5" />
      )}
    </button>
  );
}

export function AdminClientOverview({ clientId, clientName, stats, campaigns }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const formattedRevenue = `$${Number(stats.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedEmails = Number(stats.totalImpressions).toLocaleString("en-US");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">{clientName}</h2>
        <p className="mt-0.5 text-sm text-slate-500">Live performance snapshot for the selected client</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Revenue attributed" value={formattedRevenue} delta="Live" />
        <StatCard icon={Mail} label="Emails delivered" value={formattedEmails} delta="Live" />
        <StatCard icon={Percent} label="Avg. open rate" value={`${Number(stats.avgOpenRate).toFixed(1)}%`} delta="Live" />
        <StatCard icon={BarChart3} label="Active campaigns" value={String(stats.activeCampaigns)} delta="Live" />
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Campaigns</h3>
            <p className="mt-0.5 text-xs text-slate-500">All campaign records for this client, grouped by source channel</p>
          </div>
          <MetricsInjectModal clientId={clientId} clientName={clientName} />
        </div>
        {campaigns.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            No campaigns found for this client yet.
          </div>
        ) : (
          <div ref={scrollRef} className="scrollbar-none overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3.5">Campaign</th>
                  <th className="px-5 py-3.5">Source</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Emails</th>
                  <th className="px-5 py-3.5">Open rate</th>
                  <th className="px-5 py-3.5">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 transition last:border-b-0 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-medium text-slate-900">{c.title}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <span className="inline-block size-1.5 rounded-full bg-[#2563eb]" />
                        {CHANNEL_LABELS[c.channel] ?? c.channel}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            c.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {c.status === "ACTIVE" ? "Active" : "Paused"}
                        </span>
                        <CampaignStatusToggle campaignId={c.id} status={c.status} />
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{c.emailsSent.toLocaleString("en-US")}</td>
                    <td className="px-5 py-4 text-slate-600">{c.openRate}%</td>
                    <td className="px-5 py-4 font-medium text-slate-900">
                      ${Number(c.revenueGenerated).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
