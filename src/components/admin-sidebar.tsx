"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LogOut,
  User,
} from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { signOutAction } from "@/features/auth/actions";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Operational Overview", href: "/admin/dashboard", badge: null },
  { icon: BarChart3, label: "Client Analytics", href: "/admin/analytics", badge: null },
  { icon: CheckCircle2, label: "Asset Approvals", href: "/admin/approvals", badge: 4 },
  { icon: FileText, label: "Financial Reports", href: "/admin/reports", badge: null },
  { icon: MessageSquare, label: "Communications", href: "/admin/messages", badge: null },
];

const clientNavItems = [
  { icon: BarChart3, label: "Campaign Analytics", href: "/client/dashboard", badge: null },
  { icon: CheckCircle2, label: "Approvals Queue", href: "/client/approvals", badge: 4 },
  { icon: FileText, label: "Financial Report", href: "/client/reports", badge: null },
  { icon: MessageSquare, label: "Agency Chat", href: "/client/messages", badge: null },
];

interface AdminSidebarProps {
  onClose?: () => void;
  role?: "ADMIN" | "CLIENT";
  pendingApprovals?: number;
  unreadMessages?: number;
  userName?: string;
  userEmail?: string;
  userImage?: string | null;
}

export function AdminSidebar({ onClose, role = "ADMIN", pendingApprovals, unreadMessages, userName, userEmail, userImage }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [gearOpen, setGearOpen] = useState(false);
  const pathname = usePathname();
  const isClient = role === "CLIENT";

  const resolvedNavItems = (isClient ? clientNavItems : adminNavItems).map((item) => ({
    ...item,
    badge:
      item.label === "Asset Approvals" || item.label === "Approvals Queue"
        ? pendingApprovals ?? item.badge
        : item.badge,
    isMessages:
      item.label === "Communications" || item.label === "Agency Chat",
    hasUnreadMessages: (unreadMessages ?? 0) > 0,
  }));

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

      {!collapsed && (
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2">
          <span className="size-2 rounded-full bg-[#3B5FE0]" />
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70">
            {isClient ? "Client" : "Admin"}
          </span>
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
            {isClient ? "BRAND WORKSPACE" : "AGENCY WORKSPACE"}
          </p>
        )}
        <nav className="space-y-1">
          {resolvedNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
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
                    {item.isMessages ? (
                      item.hasUnreadMessages && (
                        <span className="flex size-2.5 items-center justify-center">
                          <span className={`inline-block size-2.5 rounded-full ${isActive ? "bg-white" : "bg-[#3B5FE0]"}`} />
                        </span>
                      )
                    ) : (
                      item.badge && (
                        <span
                          className={`flex size-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                            isActive
                              ? "bg-white text-[#124768]"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-1 transition hover:bg-white/5">
                <UserAvatar name={userName ?? (isClient ? "Ahmed Clothing" : "Zylora Admin")} image={userImage} />
                {!collapsed && (
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-medium text-white">
                      {userName ?? (isClient ? "Ahmed Clothing" : "Zylora Admin")}
                    </p>
                    <p className="truncate text-xs text-slate-300">
                      {userEmail ?? (isClient ? "ahmed@clothing.com" : "admin@zylora.com")}
                    </p>
                  </div>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" className="w-64 p-0">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="truncate text-sm font-medium text-slate-900">
                  {userName ?? (isClient ? "Ahmed Clothing" : "Zylora Admin")}
                </p>
                <p className="truncate text-xs text-slate-500">{userEmail ?? ""}</p>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-slate-50"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </form>
            </PopoverContent>
          </Popover>
          {!collapsed && (
            <div className="relative">
              <button
                onClick={() => setGearOpen(!gearOpen)}
                className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Settings className="size-4" />
              </button>
              {gearOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setGearOpen(false)} />
                  <div className="absolute bottom-full right-0 z-50 mb-1 w-44 overflow-hidden rounded-lg border border-slate-100 bg-[#ffffff] shadow-md">
                    <Link
                      href="/profile"
                      onClick={() => setGearOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <User className="size-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setGearOpen(false)}
                      className="flex items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
