"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Kanban } from "lucide-react";
import { AccessRequestTrigger } from "@/components/landing/access-request-dialog";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Enterprise Pricing", href: "#pricing" },
  { label: "API docs", href: "#api" },
];

interface SiteHeaderProps {
  variant?: "light" | "navy";
}

export function SiteHeader({ variant = "light" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navy = variant === "navy";

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        navy ? "border-white/10 bg-zylora-blue" : "border-slate-100 bg-white/85 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-6 py-3.5">
        <Link
          className={cn(
            "flex items-center gap-2.5 text-xl font-extrabold tracking-tight",
            navy ? "text-white" : "text-slate-900",
          )}
          href="/"
          aria-label="Zylora home"
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border",
              navy ? "border-white/20 bg-white/10" : "border-slate-200 bg-white",
            )}
          >
            <Kanban className={cn("size-5", navy ? "text-white" : "text-[#2563eb]")} />
          </span>
          <span>Zylora</span>
        </Link>

        <nav className="ml-6 hidden flex-1 items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                navy ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-[#2563eb]",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
              navy
                ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-200 bg-[#f1f5f9] text-slate-900 hover:bg-slate-200",
            )}
          >
            Sign In
          </Link>
          <AccessRequestTrigger
            size="sm"
            className={cn(
              "px-5 py-2.5",
              navy
                ? "border border-white/25 bg-white text-slate-900 shadow-none hover:bg-slate-100"
                : "",
            )}
          />
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            "ml-auto flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border p-2 md:hidden",
            navy ? "border-white/25 bg-white/10" : "border-slate-200 bg-white",
          )}
        >
          <span
            className={cn(
              "h-0.5 w-5 rounded transition-all duration-300",
              navy ? "bg-white" : "bg-slate-900",
              menuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 rounded transition-opacity duration-200",
              navy ? "bg-white" : "bg-slate-900",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 rounded transition-all duration-300",
              navy ? "bg-white" : "bg-slate-900",
              menuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "flex flex-col gap-1 border-t px-4 pb-5 pt-2 md:hidden",
          navy
            ? "border-white/10 bg-zylora-blue shadow-[0_18px_30px_rgba(0,0,0,0.25)]"
            : "border-slate-100 bg-white shadow-[0_18px_30px_rgba(15,23,42,0.06)]",
          !menuOpen && "hidden",
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={cn(
              "rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors",
              navy ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100",
            )}
          >
            {link.label}
          </a>
        ))}
        <div
          className={cn(
            "mt-2 flex flex-col gap-2.5 border-t px-3 pt-4",
            navy ? "border-white/10" : "border-slate-100",
          )}
        >
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
              navy
                ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-200 bg-[#f1f5f9] text-slate-900 hover:bg-slate-200",
            )}
          >
            Sign In
          </Link>
          <AccessRequestTrigger
            size="block"
            onClick={() => setMenuOpen(false)}
            className={cn(
              navy ? "border border-white/25 bg-white text-slate-900 hover:bg-slate-100" : "",
            )}
          />
        </div>
      </div>
    </header>
  );
}
