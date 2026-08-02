
# Feature Specification: Zylora App Homepage — Public Routing Entryway Transformation

> Status: ACTIVE 🚀
> Target Core Files: `src/app/page.tsx`, `src/components/landing/*`, `src/features/landing/actions.ts`, `src/db/schema.ts` (accessRequests table)
> Module Domain: Next.js 16 App Router, NextAuth v5 Session Gate, Async Server Component Boundary, 60-FPS Canvas Physics
> Source Mockup: `prototypes/zylora-landing/` (index.html + styles.css + script.js)

---

## 🎯 Architectural Intent
Transform the bare `src/app/page.tsx` routing entryway (currently a placeholder `Hello World`) into the fully functional, premium B2B public homepage. The premium light-slate responsive layout mockup previously isolated in `prototypes/zylora-landing/` is ported directly into the live Next.js App Router entry node, wired to NextAuth v5 session inspection, hard-locked navigation directories, and a typesafe cloud-database access-request pipeline.

---

## 🧠 Server & Client Context Separation

### 1. Master File — Async Server Component
`src/app/page.tsx` MUST be an async Server Component. It natively invokes NextAuth v5 `auth()` at the top processing boundary to inspect active session tokens:

```ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin/dashboard");
  if (session?.user?.role === "CLIENT") redirect("/client/dashboard");
  // ... render landing composition for unauthenticated visitors
}
```

### 2. Session Route Redirection
- If an active authenticated session is discovered, inspect `session.user.role`:
  - `role === 'ADMIN'` → `redirect("/admin/dashboard")`
  - `role === 'CLIENT'` → `redirect("/client/dashboard")`
- Logged-in users NEVER see the landing page; they are routed straight into their role-scoped workspaces. Anonymous visitors render the full landing experience.

### 3. Interactive Client Component Isolation
The following interactive constructs MUST live under `src/components/landing/` with the `"use client"` directive:
- **Chaos Box Data Stream** (`chaos-box.tsx`) — the 60-FPS physics + canvas engine.
- **[Request Access Demo] Modal Form Sheet** (`access-request-dialog.tsx`) — shadcn Dialog shell bound to the typesafe server action.
- Supporting interactive chrome: `site-header.tsx` (mobile nav toggle), `order-matrix.tsx` (tenant capsule filtering), `pricing-section.tsx` (monthly/annual billing switch), `reveal.tsx` (IntersectionObserver scroll fade-in wrapper).

All remaining layout chrome (hero copy, feature grid, API teaser, footer chrome) stays in the server component tree.

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Canvas Base:** `#f8fafc` (light slate), **Card surfaces:** `#ffffff` stark white with `border-slate-100` paper-thin boundaries and soft drop shadows.
- **Primary Accent:** Royal Blue `#2563eb` / Indigo `#4f46e5` exclusively for CTAs, chart curves, highlights, and loading states.
- **No Dark Mode default.** Clean semantic Tailwind markup — no generic template classes.
- Fully responsive: single-column stack on `≤768px` mobile matrices; hero 3-column grid collapses to stacked cards with the transformation vector rotated 90° downward.

---

## 🔗 Hard-Locked Navigation & Button Mappings
- **Sign In** (top header link) routes the browser precisely to `/login` (Next.js `<Link>`).
- **Request Access Demo** triggers (header, pricing card, footer) open the shadcn Dialog modal sheet — not anchor jumps.
- Submitting the Access Request form invokes `requestAccessAction` (typesafe server action), logs metadata into the `access_requests` cloud table, closes the viewport modal cleanly, and fires a crisp Sonner success toast.

---

## 💾 Cloud Database Access Request Pipeline
- New Drizzle table `accessRequests` (`access_requests`) in `src/db/schema.ts` capturing:
  - Full name, work email, company name, role, monthly ad spend band, and message.
- Server action `src/features/landing/actions.ts`:
  - Zod-validated input (`z.object`), no `any` types.
  - IP-based Upstash rate limiting (fail-open like the login/recovery shields).
  - Drizzle insert → `{ success, data, error }` contract.
  - No auth required (public inbound lead form) — session-independent.

---

## ⚙️ Shadcn Cohesion & Icons
- Native `lucide-react` icons throughout.
- Radix-based shadcn primitives under `src/components/ui/`: `dialog.tsx`, `select.tsx`, `label.tsx`, `input.tsx`, `textarea.tsx`, `button.tsx` — styled to the Light Slate system.
- `cn()` utility (`clsx` + `tailwind-merge`) shared across all primitives.

---

## 🏛️ Chaos Data Stream Engine (60 FPS)
- `requestAnimationFrame` loop ported from `prototypes/zylora-landing/script.js` into `chaos-box.tsx` React refs.
- 8 floating raw-data metric bubbles (Meta ROAS, Google CPM, TikTok CPA, Email OR, Slack, Sheets, Detached Tabs, Ad Copy Drafts).
- Dynamic breaking mesh links drawn on an offscreen `<canvas>` (DPR-aware).
- Vector mouse repulsion with boundary bounce physics + value jitter.
- Auto-spawning floating loss-alert pills (e.g. `META ROAS 0.4x ⚠️`) with fade-out DOM cleanup and zero memory leaks.
- `prefers-reduced-motion` respected (loop halts).

---

## 🔒 Verification & Compliance Criteria
- 100% type safety — zero `any` overrides anywhere in the landing implementation.
- No active code tracks deleted or commented out; prototype files remain as design reference.
- Compile-clean: `npx tsc --noEmit`, `npm run lint`, and `next build` all pass.
- Clean single-column transition on mobile viewports without text clipping.
- Zero runtime console exceptions inside the infinite animation loop.
