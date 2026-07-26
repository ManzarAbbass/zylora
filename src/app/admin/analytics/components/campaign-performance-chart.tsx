"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CampaignRow {
  title: string;
  revenueGenerated: number;
  emailsSent: number;
}

export function CampaignPerformanceChart({ data }: { data: CampaignRow[] }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Campaign Revenue Performance</h2>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Total conversion value by campaign</p>
      </div>
      <div className="h-52 sm:h-72 lg:h-80">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="title"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(v: number) => `$${v / 1000}k`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                  padding: "10px 14px",
                }}
                labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: 4 }}
              />
              <Bar
                dataKey="revenueGenerated"
                fill="#3B5FE0"
                radius={[6, 6, 0, 0]}
                name="Revenue"
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No campaign data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
