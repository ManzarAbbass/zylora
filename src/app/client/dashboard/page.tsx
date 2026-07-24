import { notFound } from "next/navigation";
import { DollarSign, Mail, Percent, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { RevenueChart } from "@/components/revenue-chart";
import { getCampaignsByClientId, getClientWorkspaceStats, getClientMonthlyTrends } from "@/features/campaigns/queries";
import { getClientIdByEmail } from "@/features/clients/queries";

export default async function ClientDashboardPage() {
  const clientId = await getClientIdByEmail("ahmed@clothing.com");
  if (!clientId) notFound();

  const [campaigns, stats, monthlyTrends] = await Promise.all([
    getCampaignsByClientId(clientId),
    getClientWorkspaceStats(clientId),
    getClientMonthlyTrends(clientId),
  ]);

  const formattedRevenue = `$${Number(stats.totalRevenue).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedEmails = Number(stats.totalImpressions).toLocaleString("en-US");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Good morning, Ahmed</h1>
        <p className="mt-1 text-sm text-slate-500">Here&apos;s how your campaigns are performing today</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Revenue attributed" value={formattedRevenue} delta="Live" />
        <StatCard icon={Mail} label="Emails delivered" value={formattedEmails} delta="Live" />
        <StatCard icon={Percent} label="Open rate" value={`${Number(stats.avgOpenRate).toFixed(1)}%`} delta="Live" />
        <StatCard icon={BarChart3} label="Active campaigns" value={String(stats.activeCampaigns)} delta="Live" />
      </div>

      <div className="mb-8">
        {monthlyTrends.length > 0 ? (
          <RevenueChart data={monthlyTrends} />
        ) : (
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Revenue trend</h2>
              <p className="text-sm text-slate-500">Attributed revenue vs. ad spend, last 7 months</p>
            </div>
            <div className="flex h-60 items-center justify-center text-sm text-slate-400 sm:h-72 lg:h-80">
              No monthly trend data available yet.
            </div>
          </div>
        )}
      </div>

      {campaigns.length > 0 && (
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Campaigns</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              <span className="text-emerald-600 font-semibold">{campaigns.filter((c) => c.status === "ACTIVE").length}</span>
              <span>Active</span>
              <span className="text-slate-300">·</span>
              <span className="text-amber-600 font-semibold">{campaigns.filter((c) => c.status !== "ACTIVE").length}</span>
              <span>Paused</span>
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="group rounded-xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md hover:border-slate-200"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
                  <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">{campaign.title}</h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      campaign.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span className={`inline-block size-1.5 rounded-full ${campaign.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-400"}`} />
                    {campaign.status === "ACTIVE" ? "Active" : "Paused"}
                  </span>
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate-100">
                  <div className="px-3 py-3 text-center sm:px-5 sm:py-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">Emails</p>
                    <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                      {campaign.emailsSent.toLocaleString()}
                    </p>
                  </div>
                  <div className="px-3 py-3 text-center sm:px-5 sm:py-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">Open rate</p>
                    <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">{campaign.openRate}%</p>
                  </div>
                  <div className="px-3 py-3 text-center sm:px-5 sm:py-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">Revenue</p>
                    <p className="mt-1 text-base font-bold text-[#3B5FE0] sm:text-lg">
                      ${Number(campaign.revenueGenerated).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
