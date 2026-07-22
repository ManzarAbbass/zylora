"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { mockClientsList } from "@/lib/mock-data";
import { StatCard } from "@/components/stat-card";
import { DollarSign, Users, Megaphone, Percent } from "lucide-react";
import { Toaster, toast } from "sonner";

const packagePill: Record<string, string> = {
  Enterprise: "bg-purple-100 text-purple-700",
  Pro: "bg-blue-100 text-blue-700",
  Growth: "bg-zinc-100 text-zinc-600",
};

const statusDot: Record<string, string> = {
  Active: "bg-emerald-500",
  Paused: "bg-amber-400",
};

interface ClientRow {
  id: string;
  name: string;
  email: string;
  packageName: string;
  activeCampaignsCount: number;
  totalRevenueTracked: number;
  joinDate: string;
  status: "Active" | "Paused";
}

const clientsWithStatus: ClientRow[] = mockClientsList.map((c, i) => ({
  ...c,
  status: i === 1 ? "Paused" as const : "Active" as const,
}));

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  { border: "border-blue-400", text: "text-blue-600" },
  { border: "border-indigo-400", text: "text-indigo-600" },
  { border: "border-emerald-400", text: "text-emerald-600" },
  { border: "border-rose-400", text: "text-rose-600" },
];

export function ClientsDataTable() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("");

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth * 0.75, behavior: "smooth" });
  }

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -(scrollRef.current.clientWidth * 0.75), behavior: "smooth" });
  }

  const filtered = clientsWithStatus.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.email.toLowerCase().includes(filter.toLowerCase()) ||
      c.status.toLowerCase().includes(filter.toLowerCase()),
  );

  const stats = [
    { icon: DollarSign, label: "Total Revenue", value: "$602,170", delta: "+18.4% MoM" },
    { icon: Users, label: "Onboarded Clients", value: "34", delta: "+3 this month" },
    { icon: Megaphone, label: "Active Campaigns", value: "62", delta: "+8 vs last quarter" },
    { icon: Percent, label: "Avg. Open Rate", value: "41.6%", delta: "+2.1% progressive" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Operational Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor your agency&apos;s performance across all client accounts.</p>
        </div>
        <button
          onClick={() => toast.success("Client provisioning wizard sheet instantiated.")}
          className="w-full rounded-lg bg-[#124768] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#124768]/90 sm:w-fit"
        >
          + Onboard Client
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Onboarded Clients</h2>
            <p className="mt-0.5 text-xs text-slate-500">Manage corporate contract parameters and active campaign allocations.</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter clients by city or status..."
                className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#124768] focus:outline-none sm:w-56"
              />
            </div>
            <button
              onClick={() => toast.success("Client provisioning wizard sheet instantiated.")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#124768] hover:text-white sm:w-auto"
            >
              + Onboard Client
            </button>
          </div>
        </div>

        <div className="relative">
          <div ref={scrollRef} className="scrollbar-none overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3.5">Client</th>
                <th className="px-5 py-3.5">Package</th>
                <th className="px-5 py-3.5">Campaigns</th>
                <th className="px-5 py-3.5">Revenue</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, idx) => (
                <tr key={client.id} className="border-b border-slate-50 transition last:border-b-0 hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold ${avatarColors[idx % avatarColors.length].border} ${avatarColors[idx % avatarColors.length].text}`}
                      >
                        {initials(client.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{client.name}</p>
                        <p className="text-xs text-slate-400">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${packagePill[client.packageName] || "bg-slate-100 text-slate-600"}`}
                    >
                      {client.packageName}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">{client.activeCampaignsCount}</td>
                  <td className="px-5 py-4 font-medium text-slate-700">{formatCurrency(client.totalRevenueTracked)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block size-2 rounded-full ${statusDot[client.status]}`} />
                      <span className="text-sm text-slate-600">{client.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{client.joinDate}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-400">
                    No clients match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer sm:hidden"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white">
              <svg className="size-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer sm:hidden"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white">
              <svg className="size-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
      </div>

      <Toaster position="bottom-right" richColors />
      </div>
    </div>
  );
}
