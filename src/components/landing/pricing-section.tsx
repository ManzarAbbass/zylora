"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";
import { AccessRequestTrigger } from "@/components/landing/access-request-dialog";

const priceFeatures = [
  "Unlimited campaign channels (Meta · Google · TikTok · Email)",
  "Typesafe unified revenue & spend ledger",
  "Creative asset approval workflow engine",
  "Tenant-scoped multi-client workspaces",
  "Executive reporting with live CSV export",
  "White-label portal & custom brand domains",
  "Priority support & dedicated migration engineer",
  "99.9% uptime SLA with audit trail",
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <Reveal>
        <div className="mb-12 text-center">
          <h2 id="pricing-title" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Enterprise Pricing
          </h2>
          <p className="mx-auto mt-3.5 max-w-xl text-base text-blue-100/70">
            Transparent B2B licensing built for agencies and corporate marketing teams.
          </p>

          <div className="mx-auto mt-7 inline-flex flex-wrap items-center justify-center gap-3.5 rounded-full border border-slate-100 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]">
            <span
              className={cn(
                "text-[13px] font-semibold transition-colors duration-300",
                !annual ? "text-slate-900" : "text-slate-400",
              )}
            >
              Monthly Billing
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
              onClick={() => setAnnual((value) => !value)}
              className={cn(
                "relative h-7 w-[52px] rounded-full border transition-colors duration-300",
                annual ? "border-[#3B5FE0] bg-[#3B5FE0]" : "border-slate-200 bg-slate-200",
              )}
            >
              <span
                className={cn(
                  "absolute left-[3px] top-[3px] size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(15,23,42,0.25)] transition-transform duration-300",
                  annual && "translate-x-6",
                )}
              />
            </button>
            <span
              className={cn(
                "text-[13px] font-semibold transition-colors duration-300",
                annual ? "text-slate-900" : "text-slate-400",
              )}
            >
              Annual Commit <strong className="text-[#3B5FE0]">$720/year</strong>
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mx-auto max-w-[480px] rounded-[20px] border border-slate-100 bg-white p-9 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:p-10">
          <header className="border-b border-slate-100 pb-6 text-center">
            <span className="mb-3.5 inline-block rounded-full bg-[#3B5FE0]/10 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.14em] text-[#3B5FE0]">
              PRO
            </span>
            <h3 className="text-[22px] font-extrabold tracking-tight text-slate-900">
              Zylora Cloud Pro
            </h3>
            <p className="mt-2.5 text-[44px] font-extrabold tracking-tight text-slate-900">
              {annual ? "$60" : "$89"}
              <span className="ml-1 text-[15px] font-medium text-slate-500">
                /month{annual ? " · billed $720/yr" : ""}
              </span>
            </p>
            <p className="mt-2.5 text-sm text-slate-500">
              The full consolidation suite for growth-stage agencies and brands.
            </p>
          </header>

          <ul className="mt-6 flex flex-col gap-3">
            {priceFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#3B5FE0]/10">
                  <Check className="size-3 text-[#3B5FE0]" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <AccessRequestTrigger size="block" className="mt-6" />
        </div>
      </Reveal>
    </section>
  );
}
