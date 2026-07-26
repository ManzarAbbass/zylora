"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyTrend {
  month: string;
  revenue: number;
  spend: number;
}

export function GlobalTrendsChart({ data }: { data: MonthlyTrend[] }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Global Revenue vs. Spend</h2>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Aggregated macro trends across all client campaigns</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full" style={{ backgroundColor: "#3B5FE0" }} />
            <span className="text-xs text-slate-600">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full" style={{ backgroundColor: "#475569" }} />
            <span className="text-xs text-slate-600">Spend</span>
          </div>
        </div>
      </div>
      <div className="h-52 sm:h-72 lg:h-80">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -14 }}>
              <defs>
                <linearGradient id="trendRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B5FE0" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#3B5FE0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                interval="preserveStartEnd"
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
              <Area
                type="monotone"
                dataKey="revenue"
                fill="url(#trendRevenueGradient)"
                stroke="#3B5FE0"
                strokeWidth={2}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="#475569"
                strokeWidth={1.5}
                name="Spend"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No monthly trend data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
