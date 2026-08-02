"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";

const tenants = ["All Tenants", "Ahmed Clothing", "Northwind Coffee", "Lumen Skincare"];

const logRows = [
  { name: "Holiday Creative — Meta", badge: "APPROVED", tone: "ok" },
  { name: "Spring Email Sequence", badge: "REVISION", tone: "warn" },
  { name: "Search Campaign v2", badge: "PENDING", tone: "pending" },
] as const;

const badgeTone: Record<(typeof logRows)[number]["tone"], string> = {
  ok: "text-emerald-600 bg-emerald-50",
  warn: "text-amber-600 bg-amber-50",
  pending: "text-slate-500 bg-slate-100",
};

export function OrderMatrix() {
  const [activeTenant, setActiveTenant] = useState(tenants[0]);

  return (
    <Reveal>
      <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]">
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold tracking-tight text-slate-900">...With Zylora Cloud</h2>
          <span className="rounded-full bg-[#3B5FE0]/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-[#3B5FE0]">
            LIVE SYNC
          </span>
        </header>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="Tenant filter capsules">
          {tenants.map((tenant) => (
            <button
              key={tenant}
              type="button"
              onClick={() => setActiveTenant(tenant)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-200",
                activeTenant === tenant
                  ? "border border-[#3B5FE0]/35 bg-[#3B5FE0]/10 text-[#3B5FE0]"
                  : "border border-transparent bg-slate-100 text-slate-500 hover:text-[#3B5FE0]",
              )}
            >
              {tenant}
            </button>
          ))}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-100 p-3.5">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-500">
              Attributed Revenue
            </span>
            <span className="inline-block text-xl font-extrabold tracking-tight text-slate-900">
              $602,170
            </span>
            <span className="ml-2 text-[11px] font-bold text-emerald-600">▲ 18.4%</span>
          </div>
          <div className="rounded-xl bg-slate-100 p-3.5">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-500">
              Ad Spend
            </span>
            <span className="inline-block text-xl font-extrabold tracking-tight text-slate-900">
              $214,890
            </span>
            <span className="ml-2 text-[11px] font-bold text-emerald-600">▲ 6.2%</span>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-slate-100 p-4" aria-label="Simulated revenue versus spend trend graph">
          <svg viewBox="0 0 300 96" preserveAspectRatio="none" className="block h-24 w-full">
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B5FE0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#3B5FE0" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path className="fill-none stroke-slate-100" strokeWidth="1" d="M0 24 H300 M0 48 H300 M0 72 H300" />
            <path
              className="fill-none stroke-slate-300"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              d="M0 70 C 40 62, 80 66, 120 58 S 200 48, 240 50 S 280 44, 300 46"
            />
            <path
              className="fill-none stroke-[#3B5FE0]"
              strokeWidth="2.6"
              strokeLinecap="round"
              d="M0 56 C 40 48, 80 52, 120 40 S 200 26, 240 22 S 280 18, 300 12"
            />
            <path
              className="fill-[url(#revFill)]"
              d="M0 56 C 40 48, 80 52, 120 40 S 200 26, 240 22 S 280 18, 300 12 V96 H0 Z"
            />
          </svg>
          <div className="mt-2.5 flex gap-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <i className="inline-block size-2.5 rounded bg-[#3B5FE0]" aria-hidden="true" /> Revenue
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <i className="inline-block size-2.5 rounded bg-slate-300" aria-hidden="true" /> Spend
            </span>
          </div>
        </div>

        <ol className="flex flex-col gap-2" aria-label="Mock approval status log">
          {logRows.map((row) => (
            <li
              key={row.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2 text-xs"
            >
              <span className="truncate font-semibold text-slate-900">{row.name}</span>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.08em]", badgeTone[row.tone])}>
                {row.badge}
              </span>
            </li>
          ))}
        </ol>
      </article>
    </Reveal>
  );
}
