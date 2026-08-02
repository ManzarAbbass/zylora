import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  BarChart3,
  Clapperboard,
  Mail,
  Megaphone,
  Palette,
  ShieldCheck,
} from "lucide-react";
import { auth } from "@/auth";
import { AccessRequestProvider, AccessRequestTrigger } from "@/components/landing/access-request-dialog";
import { SiteHeader } from "@/components/landing/site-header";
import { ChaosBox } from "@/components/landing/chaos-box";
import { OrderMatrix } from "@/components/landing/order-matrix";
import { PricingSection } from "@/components/landing/pricing-section";
import { Reveal } from "@/components/landing/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zylora — From Chaos to Order",
  description:
    "Zylora pulls Meta, Google, TikTok and email tracks out of scattered sheets and pings into one typesafe dashboard your executives can actually trust.",
};

const features = [
  {
    icon: Megaphone,
    title: "Meta Ads Track",
    copy: "Live spend, creative variants and delivery health streamed straight from the Meta API.",
    chip: "bg-[#1877f2]/10 text-[#1877f2]",
  },
  {
    icon: BarChart3,
    title: "Google Ads Track",
    copy: "Search and PMax campaigns normalized into the same revenue ledger as every other channel.",
    chip: "bg-[#ea4335]/10 text-[#ea4335]",
  },
  {
    icon: Clapperboard,
    title: "TikTok Marketing Track",
    copy: "Creator and paid placements collapsed into one executive-grade performance curve.",
    chip: "bg-slate-900/5 text-slate-900",
  },
  {
    icon: Mail,
    title: "Direct Email / Resend",
    copy: "Delivery logs, open rates and pipeline revenue tied directly to campaign records.",
    chip: "bg-[#3b5fe0]/10 text-[#3b5fe0]",
  },
  {
    icon: Palette,
    title: "Custom Media Assets",
    copy: "Approval queues for every visual deliverable before it ever touches a live channel.",
    chip: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Unified Typesafe Ledger",
    copy: "Strict typed schemas mean every dollar is traceable from chaos to the corporate boardroom.",
    chip: "bg-[#3B5FE0]/10 text-[#3B5FE0]",
  },
];

function TransformVector() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[76px] w-full items-center justify-center self-center lg:h-auto lg:w-[92px] lg:self-stretch"
    >
      <div className="relative flex items-center justify-center">
        <div
          className="absolute size-14 rounded-full border-2 border-blue-500/35 lg:size-16"
          style={{ animation: "ringExpand 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
        />
        <div
          className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-white shadow-[0_10px_28px_rgba(37,99,235,0.42)] lg:size-16"
          style={{ animation: "arrowPulse 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 rotate-90 lg:rotate-0"
          >
            <path
              d="M3 12h16m0 0-6-6m6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (session?.user?.role === "CLIENT") {
    redirect("/client/dashboard");
  }

  return (
    <AccessRequestProvider>
      <div className="min-h-screen bg-zylora-canvas">
        <SiteHeader variant="navy" />

        <main id="top">
        {/* Core Visual Hero Section */}
        <section className="mx-auto max-w-[1200px] px-6 pb-6 pt-16 lg:pt-20" aria-labelledby="hero-title">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[720px] text-center">
              <span className="mb-4 inline-block rounded-full bg-[#3B5FE0]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3B5FE0]">
                B2B Omni-Channel Consolidation
              </span>
              <h1
                id="hero-title"
                className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px]"
              >
                From advertising chaos to a single, unified corporate ledger.
              </h1>
              <p className="mx-auto mt-4 max-w-[620px] text-lg text-slate-500">
                Zylora pulls Meta, Google, TikTok and email tracks out of scattered sheets and
                pings into one typesafe dashboard your executives can actually trust.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
            <Reveal>
              <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]">
                <header className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold tracking-tight text-slate-900">
                    Your Advertising Ecosystem Today...
                  </h2>
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-emerald-500"
                    style={{ animation: "livePulse 2s infinite" }}
                  />
                </header>
                <ChaosBox />
                <p className="mt-3.5 text-center text-xs text-slate-500">
                  8 disconnected channels. No single source of truth.
                </p>
              </article>
            </Reveal>

            <TransformVector />

            <OrderMatrix />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-[1200px] px-6 py-20 lg:py-24" aria-labelledby="features-title">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[680px] text-center">
              <h2 id="features-title" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                One dashboard. Every channel. Zero chaos.
              </h2>
              <p className="mt-3.5 text-base text-slate-500">
                Inbound automation routes every ad network, sheet, and ping into a structured
                approval and reporting flow.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 60}>
                  <article className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_40px_rgba(15,23,42,0.1)]">
                    <span className={`mb-4 inline-flex size-11 items-center justify-center rounded-xl ${feature.chip}`}>
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mb-2 text-[17px] font-bold tracking-tight text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500">{feature.copy}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Enterprise Pricing Section */}
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
          <PricingSection />
        </div>

        {/* API Docs Teaser */}
        <section id="api" className="mx-auto max-w-[1200px] px-6 py-12 lg:py-16" aria-labelledby="api-title">
          <Reveal>
            <div className="rounded-[20px] border border-slate-200 bg-white px-6 py-14 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)] sm:px-10">
              <h2 id="api-title" className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                A typesafe REST + webhook API for your stack.
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] text-base text-slate-500">
                Push and pull campaign events with strict schemas and signed webhooks — no
                spaghetti integrations.
              </p>
              <AccessRequestTrigger className="mt-6" />
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-[1200px] px-6 pb-14 pt-10 text-center">
          <div className="border-t border-slate-200 pt-10">
            <p className="text-xl font-extrabold tracking-tight text-slate-900">Zylora</p>
            <p className="mx-auto mt-1.5 max-w-[560px] text-sm text-slate-500">
              Premium white-label B2B client portal and automated analytics dashboard.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AccessRequestTrigger />
              <a
                href="/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-slate-200 bg-[#f1f5f9] px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-200"
              >
                Sign In
              </a>
            </div>
            <p className="mt-8 text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Zylora. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
      </div>
    </AccessRequestProvider>
  );
}
