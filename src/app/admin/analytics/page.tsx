import { getAdminGlobalAnalytics, getClientGlobalAnalytics } from "@/features/analytics/queries";
import { resolveAdminClientSelection } from "@/features/clients/client-selection";
import { GlobalTrendsChart } from "./components/global-trends-chart";
import { CampaignPerformanceChart } from "./components/campaign-performance-chart";
import { ChannelBreakdownChart } from "./components/channel-breakdown-chart";
import { ConversionDonutChart } from "./components/conversion-donut-chart";

export default async function AdminAnalyticsPage() {
  const { clients, selectedClientId } = await resolveAdminClientSelection();
  const selectedClient = selectedClientId ? clients.find((c) => c.id === selectedClientId) : undefined;

  const analytics = selectedClientId
    ? await getClientGlobalAnalytics(selectedClientId)
    : await getAdminGlobalAnalytics();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Platform Visual Analytics Terminal
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500 sm:text-base">
            {selectedClient
              ? `Client-scoped intelligence for ${selectedClient.companyName}.`
              : "Real-time interactive intelligence modeling tracking multi-client spend performance matrices and macro campaign conversion metrics."}
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-xs sm:flex">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-600">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <GlobalTrendsChart data={analytics.monthlyTrends} />
        </div>
        <CampaignPerformanceChart data={analytics.campaignPerformance} />
        <ChannelBreakdownChart data={analytics.channelBreakdown} />
        <ConversionDonutChart data={analytics.conversionMetrics} />
      </div>
    </div>
  );
}
