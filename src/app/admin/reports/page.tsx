import { getAdminExecutiveReports, getClientExecutiveReportsData } from "@/features/clients/queries";
import { resolveAdminClientSelection } from "@/features/clients/client-selection";
import { DownloadCsvButton } from "@/features/clients/components/download-csv-button";

function formatCurrency(value: string): string {
  const num = parseFloat(value);
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatCtr(value: string): string {
  const num = parseFloat(value);
  return num.toFixed(2) + "%";
}

const CHANNEL_LABELS: Record<string, string> = {
  EMAIL: "Email",
  META: "Meta Ads",
  GOOGLE: "Google Ads",
  TIKTOK: "TikTok",
};

function ChannelCount({ channels }: { channels: string[] }) {
  if (channels.length === 0) {
    return <span className="text-sm text-slate-400">—</span>;
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700"
      title={channels.map((c) => CHANNEL_LABELS[c] ?? c).join(", ")}
    >
      <span className="inline-block size-2 rounded-full bg-[#2563eb]" />
      {channels.length}
    </span>
  );
}

export default async function AdminReportsPage() {
  const { clients, selectedClientId } = await resolveAdminClientSelection();
  const selectedClient = selectedClientId ? clients.find((c) => c.id === selectedClientId) : undefined;

  const clientReports = selectedClientId ? await getClientExecutiveReportsData(selectedClientId) : null;
  const reports = selectedClient ? [] : await getAdminExecutiveReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {selectedClient ? `${selectedClient.companyName} — Business Performance` : "Executive Intelligence Ledger"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {selectedClient
            ? "Campaign-level financial performance for the selected client, with ROI attribution per deliverable."
            : "Analyze agency-wide corporate client spending allocations, campaign conversion performance, and cumulative ROI footprints."}
        </p>
      </div>

      <div className="flex justify-end">
        <DownloadCsvButton />
      </div>

      {selectedClient && clientReports ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-[#ffffff] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Investment</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(clientReports.summary.totalSpend)}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-[#ffffff] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Attributed Revenue</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(clientReports.summary.totalRevenue)}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-[#ffffff] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Net Profit Margin</p>
              <p className={`mt-2 text-2xl font-bold ${parseFloat(clientReports.summary.netRoi) < 0 ? "text-amber-600" : "text-[#2563eb]"}`}>
                {formatCurrency(clientReports.summary.netRoi)}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100 bg-[#ffffff] shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Campaign Title</th>
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Source</th>
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Emails Sent</th>
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">CTR</th>
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientReports.campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
                      No campaigns found for this client yet.
                    </td>
                  </tr>
                ) : (
                  clientReports.campaigns.map((c) => (
                    <tr key={c.id} className="transition hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{c.title}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                          {c.channel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{c.emailsSent.toLocaleString("en-US")}</td>
                      <td className="px-6 py-4 text-slate-600">{formatCtr(c.openRate)}</td>
                      <td className="px-6 py-4 text-slate-900">{formatCurrency(c.revenueGenerated)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100 bg-[#ffffff] shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Client Name
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Campaigns
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Channels
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Ad Spend
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Revenue
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Net ROI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">
                    No client reports available yet.
                  </td>
                </tr>
              ) : (
                reports.map((r) => {
                  const roi = parseFloat(r.netRoi);
                  return (
                    <tr key={r.id} className="transition hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {r.companyName ?? "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{r.totalCampaigns}</td>
                      <td className="px-6 py-4">
                        <ChannelCount channels={r.channels} />
                      </td>
                      <td className="px-6 py-4 text-slate-900">{formatCurrency(r.totalSpend)}</td>
                      <td className="px-6 py-4 text-slate-900">{formatCurrency(r.totalRevenue)}</td>
                      <td
                        className={`px-6 py-4 font-semibold ${
                          roi < 0 ? "text-amber-600" : "text-[#2563eb]"
                        }`}
                      >
                        {formatCurrency(r.netRoi)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
