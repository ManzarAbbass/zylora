"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  CheckCircle2,
  FileText,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Kanban,
  X,
} from "lucide-react";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Operational Overview", href: "/admin/dashboard", badge: null },
  { icon: BarChart3, label: "Client Analytics", href: "/admin/analytics", badge: null },
  { icon: CheckCircle2, label: "Asset Approvals", href: "/admin/approvals", badge: 4 },
  { icon: FileText, label: "Financial Reports", href: "/admin/reports", badge: null },
  { icon: MessageSquare, label: "Communications", href: "/admin/messages", badge: 3 },
  { icon: Settings, label: "Settings", href: "/admin/settings", badge: null },
];

const clientNavItems = [
  { icon: BarChart3, label: "Campaign Analytics", href: "/client/dashboard", badge: null },
  { icon: CheckCircle2, label: "Approvals Queue", href: "/client/approvals", badge: 4 },
  { icon: FileText, label: "Performance Reports", href: "/client/reports", badge: null },
  { icon: MessageSquare, label: "Agency Chat", href: "/client/messages", badge: 1 },
  { icon: Settings, label: "Workspace", href: "/client/workspace", badge: null },
];

interface AdminSidebarProps {
  onClose?: () => void;
  role?: "ADMIN" | "CLIENT";
}

export function AdminSidebar({ onClose, role = "ADMIN" }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isClient = role === "CLIENT";
  const navItems = isClient ? clientNavItems : adminNavItems;
  const dashboardHref = isClient ? "/client/dashboard" : "/admin/dashboard";

  return (
    <aside
      className={`flex h-full flex-col border-r border-white/10 bg-[#124768] transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20">
              <Kanban className="size-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-white">Zylora</p>
              <p className="text-[10px] text-slate-300">B2B Client Portal</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white lg:inline-flex"
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
            {isClient ? "BRAND WORKSPACE" : "AGENCY WORKSPACE"}
          </p>
        )}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === dashboardHref;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`flex size-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                          isActive
                            ? "bg-white text-[#124768]"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xs font-bold text-white">
            {isClient ? "AC" : "ZA"}
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {isClient ? "Ahmed Clothing" : "Zylora Admin"}
                </p>
                <p className="truncate text-xs text-slate-300">
                  {isClient ? "Enterprise plan" : "Agency operator"}
                </p>
              </div>
              <button className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white">
                <Settings className="size-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
