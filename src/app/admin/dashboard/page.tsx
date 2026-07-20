"use client";

import { DollarSign, Users, Megaphone, Percent } from "lucide-react";
import { Toaster, toast } from "sonner";
import { StatCard } from "@/components/stat-card";

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "$602,170", delta: "+18.4% MoM" },
  { icon: Users, label: "Onboarded Clients", value: "34", delta: "+3 this month" },
  { icon: Megaphone, label: "Active Campaigns", value: "62", delta: "+8 vs last quarter" },
  { icon: Percent, label: "Avg. Open Rate", value: "41.6%", delta: "+2.1% progressive" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Operational Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor your agency's performance across all client accounts.</p>
        </div>
        <button
          onClick={() => toast.success("Client provisioning wizard sheet instantiated.")}
          className="w-fit rounded-lg bg-[#124768] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#124768]/90"
        >
          + Onboard Client
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Onboarded Clients Management Schema Baseline
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Interactive client rows data grid table listing Ahmed Clothing, Northwind Coffee, and
          additional matrix entities embeds inside this viewport layout segment in Phase 2.
        </p>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
