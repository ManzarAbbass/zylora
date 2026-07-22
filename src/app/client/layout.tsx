"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminTopbar } from "@/components/admin-topbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar role="CLIENT" onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="hidden lg:block">
        <AdminSidebar role="CLIENT" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar role="CLIENT" onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="scrollbar-none flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
