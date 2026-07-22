"use client";

import { DollarSign, Mail, Percent, MousePointerClick } from "lucide-react";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "@/components/stat-card";
import { clientDashboardStats, clientRevenueTrend } from "@/lib/mock-data";

const stats = [
  { icon: DollarSign, label: "Revenue attributed", value: clientDashboardStats.revenueAttributed, delta: clientDashboardStats.revenueDelta },
  { icon: Mail, label: "Emails delivered", value: clientDashboardStats.emailsDelivered, delta: clientDashboardStats.emailsDelta },
  { icon: Percent, label: "Open rate", value: clientDashboardStats.openRate, delta: clientDashboardStats.openRateDelta },
  { icon: MousePointerClick, label: "Click-through", value: clientDashboardStats.clickThrough, delta: clientDashboardStats.clickThroughDelta },
];

export default function ClientDashboardPage() {
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

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Revenue trend</h2>
            <p className="text-sm text-slate-500">Attributed revenue vs. ad spend, last 7 months</p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={clientRevenueTrend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
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
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "13px", color: "#475569" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                fill="url(#revenueGradient)"
                stroke="#2563eb"
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
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
