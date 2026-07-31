"use client";

import { useRouter } from "next/navigation";
import type { UniversalSearchResult } from "@/features/search/queries";

interface SearchResultsListProps {
  results: UniversalSearchResult;
  searching: boolean;
  role: "ADMIN" | "CLIENT";
  onSelect: () => void;
}

export function SearchResultsList({
  results,
  searching,
  role,
  onSelect,
}: SearchResultsListProps) {
  const router = useRouter();
  const hasResults = results.clients.length > 0 || results.campaigns.length > 0;

  if (searching) {
    return <div className="p-4 text-center text-sm text-slate-400">Searching...</div>;
  }

  if (!hasResults) {
    return <div className="p-4 text-center text-sm text-slate-400">No results found</div>;
  }

  return (
    <div className="p-2">
      {results.clients.length > 0 && (
        <div>
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Clients</p>
          {results.clients.map((client) => (
            <button
              key={client.id}
              onClick={() => {
                router.push(`/admin/dashboard?id=${client.id}`);
                onSelect();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-slate-50"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-xs font-semibold text-[#2563eb]">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900">{client.name}</p>
                <p className="truncate text-xs text-slate-400">{client.companyName ?? client.email}</p>
              </div>
            </button>
          ))}
        </div>
      )}
      {results.campaigns.length > 0 && (
        <div className={results.clients.length > 0 ? "mt-1 border-t border-slate-100 pt-1" : ""}>
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Campaigns</p>
          {results.campaigns.map((campaign) => (
            <button
              key={campaign.id}
              onClick={() => {
                router.push(role === "CLIENT" ? "/client/dashboard" : "/admin/dashboard");
                onSelect();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-slate-50"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
                C
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-900">{campaign.title}</p>
                <p className="text-xs text-slate-400">{campaign.status}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
