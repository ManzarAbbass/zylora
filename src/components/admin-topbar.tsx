"use client";

import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";

interface AdminTopbarProps {
  onMenuToggle?: () => void;
}

export function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <header className="flex items-center gap-4 border-b border-slate-100 bg-white px-4 py-3 sm:gap-6 sm:px-6">
      <button
        onClick={onMenuToggle}
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          ADMIN · OPERATIONAL OVERVIEW
        </p>
        <p className="text-sm font-medium text-slate-500">Welcome back, Zylora team</p>
      </div>

      <div className="relative mx-auto hidden max-w-md flex-1 sm:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search clients, campaigns..."
          className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] py-2 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none ring-[#124768] transition focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <span
            className={`inline-flex h-4 w-7 items-center rounded-full border transition-colors ${
              isAdmin ? "border-[#124768] bg-[#124768]" : "border-slate-300 bg-slate-100"
            }`}
          >
            <span
              className={`inline-block size-3 rounded-full bg-white transition-transform ${
                isAdmin ? "translate-x-3.5" : "translate-x-0.5"
              }`}
            />
          </span>
          {isAdmin ? "Admin" : "Client"}
        </button>
        <button className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
          <Bell className="size-4" />
        </button>
      </div>
    </header>
  );
}
