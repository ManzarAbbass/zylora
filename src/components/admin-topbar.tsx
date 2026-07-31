"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Search, Bell, Menu, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { universalSearchAction } from "@/features/search/actions";
import { SearchResultsList } from "@/components/search-results-list";
import type { UniversalSearchResult } from "@/features/search/queries";

interface AdminTopbarProps {
  onMenuToggle?: () => void;
  role?: "ADMIN" | "CLIENT";
}

export function AdminTopbar({ onMenuToggle, role = "ADMIN" }: AdminTopbarProps) {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UniversalSearchResult>({ clients: [], campaigns: [] });
  const [open, setOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults({ clients: [], campaigns: [] });
      setOpen(false);
      return;
    }

    let cancelled = false;
    setSearching(true);

    universalSearchAction(debouncedQuery).then((result) => {
      if (cancelled) return;
      if (result.success && result.data) {
        setResults(result.data);
        setOpen(true);
      }
      setSearching(false);
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  return (
    <header className="flex items-center gap-4 border-b border-white/10 bg-zylora-blue px-4 py-3 sm:gap-6 sm:px-6 lg:border-slate-200 lg:bg-zylora-canvas">
      <span className="text-sm font-bold tracking-wide text-white lg:hidden">
        Zylora
      </span>

      <div className="min-w-0">
        <p className="hidden text-[10px] font-semibold uppercase tracking-widest text-white/50 lg:block lg:text-slate-400">
          {role === "CLIENT" ? "CLIENT · CAMPAIGN ANALYTICS" : "ADMIN · OPERATIONAL OVERVIEW"}
        </p>
        <p className="hidden text-sm font-medium text-white/80 sm:block lg:text-slate-500">
          {role === "CLIENT" ? "Welcome back, Ahmed" : "Welcome back, Zylora team"}
        </p>
      </div>

      <div ref={containerRef} className="relative mx-auto hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40 lg:text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search clients, campaigns..."
          className="w-full rounded-lg border border-white/20 bg-white/10 py-2 pl-10 pr-8 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-[#3B5FE0] lg:border-slate-200 lg:bg-slate-50 lg:text-slate-900 lg:placeholder-slate-400 lg:focus:border-slate-200 lg:focus:bg-white lg:focus:ring-[#2563eb]"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white/70 lg:text-slate-400 lg:hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        )}

        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-xl rounded-xl border border-slate-100 bg-white shadow-xl">
            <SearchResultsList
              results={results}
              searching={searching}
              role={role}
              onSelect={() => setOpen(false)}
            />
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">

        <button
          onClick={() => setMobileSearchOpen(true)}
          className="rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white md:hidden lg:text-slate-400 lg:hover:bg-slate-200 lg:hover:text-slate-700"
        >
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

      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 md:hidden" onClick={() => { setMobileSearchOpen(false); setQuery(""); setOpen(false); }}>
          <div
            className="mx-4 w-full max-w-md rounded-xl border border-white/10 bg-zylora-blue p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search clients, campaigns..."
                  autoFocus
                  className="w-full rounded-lg border border-white/20 bg-white/10 py-2.5 pl-10 pr-8 text-sm text-white placeholder-white/40 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-[#3B5FE0]"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => { setMobileSearchOpen(false); setQuery(""); setOpen(false); }}
                className="shrink-0 text-sm font-medium text-white/70 hover:text-white"
              >
                Cancel
              </button>
            </div>
            {open && (
              <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-white shadow-xl">
                <SearchResultsList
                  results={results}
                  searching={searching}
                  role={role}
                  onSelect={() => { setMobileSearchOpen(false); setOpen(false); }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
