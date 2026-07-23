import { DollarSign, Mail, Percent, MousePointerClick } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { RevenueChart } from "@/components/revenue-chart";
import { getCampaignsByClientId } from "@/features/campaigns/queries";
import { mockAnalyticsMonthlyTrends, clientDashboardStats } from "@/lib/mock-data";

const stats = [
  { icon: DollarSign, label: "Revenue attributed", value: clientDashboardStats.revenueAttributed, delta: clientDashboardStats.revenueDelta },
  { icon: Mail, label: "Emails delivered", value: clientDashboardStats.emailsDelivered, delta: clientDashboardStats.emailsDelta },
  { icon: Percent, label: "Open rate", value: clientDashboardStats.openRate, delta: clientDashboardStats.openRateDelta },
  { icon: MousePointerClick, label: "Click-through", value: clientDashboardStats.clickThrough, delta: clientDashboardStats.clickThroughDelta },
];

export default async function ClientDashboardPage() {
  const campaigns = await getCampaignsByClientId("31ef43a7-d86f-4455-960d-8dba5d197363");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Good morning, Ahmed</h1>
        <p className="mt-1 text-sm text-slate-500">Here&apos;s how your campaigns are performing today</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      <div className="mb-8">
        <RevenueChart data={mockAnalyticsMonthlyTrends} />
      </div>

      {campaigns.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Active campaigns</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900">{campaign.title}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      campaign.status === "ACTIVE"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {campaign.status === "ACTIVE" ? (
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                    ) : null}
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Emails sent</p>
                    <p className="mt-0.5 text-lg font-bold text-slate-900">
                      {campaign.emailsSent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Open rate</p>
                    <p className="mt-0.5 text-lg font-bold text-slate-900">{campaign.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Revenue</p>
                    <p className="mt-0.5 text-lg font-bold text-slate-900">
                      ${Number(campaign.revenueGenerated).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
