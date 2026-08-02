"use client";

import { useRouter } from "next/navigation";
import { ADMIN_CLIENT_COOKIE } from "@/features/clients/client-selection-constants";
import type { AdminClientOption } from "@/features/clients/client-selection-constants";

const BADGE_COLORS = [
  "border-blue-200 bg-blue-50/60 text-blue-700",
  "border-indigo-200 bg-indigo-50/60 text-indigo-700",
  "border-emerald-200 bg-emerald-50/60 text-emerald-700",
  "border-amber-200 bg-amber-50/60 text-amber-700",
  "border-rose-200 bg-rose-50/60 text-rose-700",
];

const ACTIVE_COLORS = [
  "border-blue-600 bg-blue-600 text-white shadow-sm",
  "border-indigo-600 bg-indigo-600 text-white shadow-sm",
  "border-emerald-600 bg-emerald-600 text-white shadow-sm",
  "border-amber-600 bg-amber-600 text-white shadow-sm",
  "border-rose-600 bg-rose-600 text-white shadow-sm",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface Props {
  clients: AdminClientOption[];
  selectedClientId: string | null;
}

export function ClientBadges({ clients, selectedClientId }: Props) {
  const router = useRouter();

  function selectClient(id: string) {
    document.cookie = `${ADMIN_CLIENT_COOKIE}=${id}; path=/; max-age=86400; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-1">
        {clients.map((client, idx) => {
          const active = client.id === selectedClientId;
          const colorIndex = idx % BADGE_COLORS.length;
          return (
            <button
              key={client.id}
              type="button"
              onClick={() => selectClient(client.id)}
              title={client.companyName}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                active ? ACTIVE_COLORS[colorIndex] : `${BADGE_COLORS[colorIndex]} hover:brightness-95`
              }`}
            >
              <span className={`inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${active ? "bg-white/25 text-white" : "bg-white text-slate-600"}`}>
                {initials(client.companyName)}
              </span>
              {client.companyName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
