import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getClientExecutiveReportsData } from "@/features/clients/queries";

function formatCurrency(value: string): string {
  const num = parseFloat(value);
  return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatCtr(value: string): string {
  const num = parseFloat(value);
  return num.toFixed(2) + "%";
}

export default async function ClientReportsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { campaigns, summary } = await getClientExecutiveReportsData(session.user.id);
  const roi = parseFloat(summary.netRoi);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Business Performance Ledger
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor your active corporate marketing investments, campaign spending
          distributions, and cumulative return on investment metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-[#ffffff] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Investment
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {formatCurrency(summary.totalSpend)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-[#ffffff] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Attributed Revenue
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {formatCurrency(summary.totalRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-[#ffffff] p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Net Profit Margin
          </p>
          <p
            className={`mt-2 text-2xl font-bold ${
              roi < 0 ? "text-amber-600" : "text-[#2563eb]"
            }`}
          >
            {formatCurrency(summary.netRoi)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100 bg-[#ffffff] shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Campaign Title
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Source
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Emails Sent
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                CTR
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Budget Spend
              </th>
              <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">
                  No active campaigns found. Start a campaign to see performance metrics here.
                </td>
              </tr>
            ) : (
              campaigns.map((c) => (
                <tr key={c.id} className="transition hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{c.title}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                      {c.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {c.emailsSent.toLocaleString("en-US")}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{formatCtr(c.openRate)}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {parseFloat(c.spend) > 0 ? formatCurrency(c.spend) : "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-900">
                    {formatCurrency(c.revenueGenerated)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
