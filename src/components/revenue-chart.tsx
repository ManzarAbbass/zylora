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

export function RevenueChart({ data }: { data: MonthlyTrend[] }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Revenue trend</h2>
          <p className="text-sm text-slate-500">Attributed revenue vs. ad spend, last 7 months</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "#3B5FE0" }} />
            <span className="text-xs text-slate-600">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "#94a3b8" }} />
            <span className="text-xs text-slate-600">Spend</span>
          </div>
        </div>
      </div>
      <div className="h-60 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B5FE0" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#3B5FE0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(v: number) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                fontSize: "13px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              fill="url(#revenueGradient)"
              stroke="#3B5FE0"
              strokeWidth={2}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="spend"
              stroke="#94a3b8"
              strokeWidth={1.5}
              name="Spend"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
