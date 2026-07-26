import { getAdminExecutiveReports } from "@/features/clients/queries";
import { DownloadCsvButton } from "@/features/clients/components/download-csv-button";

function formatCurrency(value: string): string {
  const num = parseFloat(value);
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default async function AdminReportsPage() {
  const reports = await getAdminExecutiveReports();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Executive Intelligence Ledger
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Analyze agency-wide corporate client spending allocations, campaign conversion performance, and cumulative ROI footprints.
        </p>
      </div>

      <div className="flex justify-end">
        <DownloadCsvButton />
      </div>

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
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
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
    </div>
  );
}
