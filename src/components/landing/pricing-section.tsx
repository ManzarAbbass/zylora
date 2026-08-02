"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/reveal";
import { AccessRequestTrigger } from "@/components/landing/access-request-dialog";

interface Plan {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  ctaLabel: string;
  featured?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "standard",
    badge: "STANDARD",
    name: "Zylora Standard",
    tagline: "Consolidation essentials for a single channel and small marketing teams.",
    monthly: 49,
    annual: 39,
    ctaLabel: "Request Access Demo",
    features: [
      "1 campaign channel (Meta, Google, TikTok or Email)",
      "Unified revenue & spend ledger",
      "Standard executive reporting",
      "Creative asset approval queue",
      "Email support",
    ],
  },
  {
    id: "pro",
    badge: "MOST POPULAR",
    name: "Zylora Cloud Pro",
    tagline: "The full consolidation suite for growth-stage agencies and brands.",
    monthly: 89,
    annual: 60,
    ctaLabel: "Request Access Demo",
    featured: true,
    features: [
      "Unlimited campaign channels (Meta · Google · TikTok · Email)",
      "Typesafe unified revenue & spend ledger",
      "Creative asset approval workflow engine",
      "Tenant-scoped multi-client workspaces (up to 5)",
      "Executive reporting with live CSV export",
      "White-label portal & custom brand domains",
      "Priority support & dedicated migration engineer",
      "99.9% uptime SLA with audit trail",
    ],
  },
  {
    id: "enterprise",
    badge: "ENTERPRISE",
    name: "Zylora Enterprise",
    tagline: "Unlimited scale, SSO, and a compliance-grade footprint for large corporates.",
    monthly: 149,
    annual: 119,
    ctaLabel: "Talk to Sales",
    features: [
      "Everything in Pro, audit-graded",
      "Unlimited tenant-scoped workspaces & seats",
      "SSO / SAML + role-based access control",
      "Advanced compliance & data residency options",
      "99.9% uptime SLA with full audit trail",
      "Dedicated success manager & 24×7 support",
    ],
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <Reveal>
        <div className="mb-12 text-center">
          <h2 id="pricing-title" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Enterprise Pricing
          </h2>
          <p className="mx-auto mt-3.5 max-w-xl text-base text-slate-500">
            Transparent B2B licensing built for agencies and corporate marketing teams.
          </p>

          <div className="mx-auto mt-7 inline-flex flex-wrap items-center justify-center gap-3.5 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]">
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
                annual ? "border-zylora-blue bg-zylora-blue" : "border-slate-200 bg-slate-200",
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
              Annual Commit <strong className="text-zylora-blue">save up to 20%</strong>
            </span>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 80} className="h-full">
            <div
              className={cn(
                "flex h-full flex-col rounded-[20px] border bg-white p-7 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300",
                plan.featured
                  ? "relative border-zylora-blue/40 shadow-[0_2px_4px_rgba(15,23,42,0.05),0_20px_48px_rgba(18,71,104,0.16)]"
                  : "border-slate-100",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zylora-blue px-3.5 py-1 text-[11px] font-extrabold tracking-[0.08em] text-white shadow">
                  {plan.badge}
                </span>
              )}

              <span
                className={cn(
                  "mb-2.5 inline-block w-fit rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.14em]",
                  plan.featured ? "bg-zylora-blue/10 text-zylora-blue" : "bg-slate-100 text-slate-500",
                )}
              >
                {plan.badge}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{plan.tagline}</p>

              <p className="mt-5 text-[42px] font-extrabold tracking-tight text-slate-900">
                ${annual ? plan.annual : plan.monthly}
                <span className="ml-1 text-[15px] font-medium text-slate-500">/month</span>
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                {annual ? `billed $${(plan.annual * 12).toLocaleString()}/year` : "billed monthly"}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-slate-100 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                        <span
                      className={cn(
                        "mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full",
                        plan.featured ? "bg-zylora-blue/10" : "bg-[#2563eb]/10",
                      )}
                    >
                      <Check
                        className={cn("size-3", plan.featured ? "text-zylora-blue" : "text-[#2563eb]")}
                        strokeWidth={3}
                      />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <AccessRequestTrigger
                size="block"
                variant={plan.featured ? "default" : "outline"}
                className={cn(
                  "mt-6",
                  plan.featured
                    ? "bg-zylora-blue hover:bg-[#0d3a54]"
                    : "hover:bg-zylora-blue",
                )}
              >
                {plan.ctaLabel}
              </AccessRequestTrigger>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}