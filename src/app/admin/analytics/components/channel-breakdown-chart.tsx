"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChannelRow {
  channel: string;
  revenueGenerated: number;
  emailsSent: number;
}

const CHANNEL_LABELS: Record<string, string> = {
  EMAIL: "Email",
  META: "Meta Ads",
  GOOGLE: "Google Ads",
  TIKTOK: "TikTok",
};

const CHANNEL_COLORS: Record<string, string> = {
  EMAIL: "#3b5fe0",
  META: "#1877f2",
  GOOGLE: "#ea4335",
  TIKTOK: "#0f172a",
};

export function ChannelBreakdownChart({ data }: { data: ChannelRow[] }) {
  const chartData = data.map((d) => ({
    ...d,
    label: CHANNEL_LABELS[d.channel] ?? d.channel,
  }));

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Revenue by Channel</h2>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Attributed revenue across all sources</p>
      </div>
      <div className="h-52 sm:h-72 lg:h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: -14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                interval={0}
                height={40}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(v: number) => `$${v / 1000}k`}
                width={40}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                  padding: "10px 14px",
                }}
                labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: 4 }}
                formatter={(value: unknown, name: unknown) => [
                  `$${Number(value ?? 0).toLocaleString("en-US")}`,
                  name === "revenueGenerated" ? "Revenue" : "Emails sent",
                ]}
              />
              <Bar
                dataKey="revenueGenerated"
                radius={[6, 6, 0, 0]}
                name="Revenue"
                maxBarSize={56}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.channel} fill={CHANNEL_COLORS[entry.channel] ?? "#3B5FE0"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No channel data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
