"use client";

import { Search, Bell, Menu } from "lucide-react";

interface AdminTopbarProps {
  onMenuToggle?: () => void;
  role?: "ADMIN" | "CLIENT";
}

export function AdminTopbar({ onMenuToggle, role = "ADMIN" }: AdminTopbarProps) {
  return (
    <header className="flex items-center gap-4 border-b border-white/10 bg-zylora-blue px-4 py-3 sm:gap-6 sm:px-6 lg:border-slate-200 lg:bg-zylora-canvas">
      <span className="text-sm font-bold tracking-wide text-white lg:hidden">
        Zylora
      </span>

      <p className="hidden text-sm font-medium text-white/80 sm:block lg:text-slate-500">
        {role === "CLIENT" ? "Welcome back, Ahmed" : "Welcome back, Zylora team"}
      </p>

      <div className="relative hidden max-w-sm md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40 lg:text-slate-400" />
        <input
          type="text"
          placeholder="Search clients, campaigns..."
          className="w-full rounded-lg border border-white/20 bg-white/10 py-2 pl-10 pr-3 text-sm text-white placeholder-white/40 outline-none ring-[#3B5FE0] transition focus:ring-2 focus:border-white/30 lg:border-slate-200 lg:bg-white lg:text-slate-900 lg:placeholder-slate-400"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">

        <button className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white md:hidden lg:text-slate-400 lg:hover:bg-slate-200 lg:hover:text-slate-700">
          <Search className="size-4" />
        </button>
        <button className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white lg:text-slate-400 lg:hover:bg-slate-200 lg:hover:text-slate-700">
          <Bell className="size-4" />
        </button>
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>
    </header>
  );
}
