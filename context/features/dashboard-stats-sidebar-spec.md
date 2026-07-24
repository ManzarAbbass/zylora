# Feature Specification: Core Infrastructure Stats Hydration & Sidebar Telemetry (Phase 2 Component Upgrade)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/campaigns/queries.ts` (Extend), `src/features/clients/queries.ts` (Extend), `src/app/admin/layout.tsx`, and `src/app/client/layout.tsx`
> Module Domain: Global Database Aggregations, Shared Sidebars Hydration, Real-time Counters

---

## 🎯 Architectural Intent
This task eliminates the final remaining references to `src/lib/mock-data.ts` across both portals' core navigation frames. It builds type-safe Drizzle SQL aggregation queries to fetch real-time record metrics directly from Neon PostgreSQL, dynamic counter indicators on sidebars, and hydatrates the upper top 4-column statistical grids with live database values.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify structural parameters against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Snapshot Layout Documentation:** `@context/zyloraUi/admin-dashboard-Ui-main.md` and `@context/zyloraUi/client-dashboard-Ui-main.md`
* **Database Table Definitions Schema:** `src/db/schema.ts`
* **Strict Programming Standards:** `@context/coding-standards.md` (Strict Async Server Components layer data fetching)

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Shared UI Tokens:** Pure white layouts (`bg-[#ffffff]`) bounding numerical summaries, paired with fine hairline grid boundaries (`border-slate-100`) and minimal soft drop shadows.
- **Micro Badge Indicators:** Sidebar notification items render dynamic numeric values inside colored badge capsules utilizing the master corporate focus **Zylora Blue (`#3B5FE0`)** or emerald green vectors for positive deltas.

---

## 💻 Technical Code Specifications

### 1. Database Relational Aggregations Layer (`src/features/campaigns/queries.ts` / `src/features/clients/queries.ts`)
Extend your backend queries utility scripts using pure type-safe Drizzle syntax to compile top macro widgets data:
- **Admin Aggregate Metrics (`getAdminGlobalStats`):**
  - Run parallel database selection counts: `sql` sum function over `campaigns.revenueGenerated`, total rows count inside `users` where `role === 'CLIENT'`, total active campaigns rows count, and an average calculation mapping `avg(campaigns.openRate)`.
  - Return a clean structured metrics object wrapper safely.
- **Client Personalized Metrics (`getClientWorkspaceStats`):**
  - Accepts an explicit `clientId` string parameter.
  - Queries rows inside the `campaigns` table matching `eq(campaigns.clientId, clientId)`.
  - Automatically aggregates: total attributed revenue sum to date, aggregate email impressions sum, average client open rate calculation, and total running active tracking tracks.

### ⚙️ 2. Administrative Workspace Hydration Refactor (`src/app/admin/...`)
- **Top 4-Column Stat Card Grid (`src/app/admin/dashboard/page.tsx`):**
  - Convert layout hooks to extract live fields from `getAdminGlobalStats()`. 
  - Dynamic replacement: Map the real database aggregates smoothly onto the cards ($602,170 revenue footprint text, active users count, live tracking systems balance).
- **Sidebar Dynamic Counters Bundle (`src/app/admin/layout.tsx`):**
  - Fetch count variables inside the layout server boundary layer.
  - Query total rows inside `content_approvals` where `status === 'PENDING'` to hydrate the `Asset Approvals` notification badge dynamically (UI snapshot value preset: `4`).
  - Query pending text items inside messages to update the `Communications` sidebar badge natively (UI snapshot value preset: `3`).

### 🏛️ 3. Corporate Brand Portal Hydration Refactor (`src/app/client/...`)
- **Top 4-Column Client Stat Card Grid (`src/app/client/dashboard/page.tsx`):**
  - Convert metrics blocks to extract fields via `getClientWorkspaceStats("31ef43a7-d86f-4455-960d-8dba5d197363")`.
  - Dynamic replacement: Render real numbers out to the executive view framework ($68,420 revenue attributed card text, emails delivered numeric string tracking, actual open rates decimal metrics).
- **Sidebar Telemetry Alignment (`src/app/client/layout.tsx`):**
  - Link live variables cleanly. Sidebar link indicators (Approvals Queue alert badge tracking `4`, Agency Chat communication badge tracking `1`) must match real database state tracking rows directly.

---

## 🔒 Verification & Compliance Criteria
- Strictly demands absolute type-safety with zero usage of fallback generic `any` structures.
- No client-side interactivity bundle hooks (`'use client'`) allowed inside core data layout shell files to keep the main chassis lightweight and fully optimized.
- Guarantees seamless responsive flex rendering behaviors across both desktop layouts and mobile view devices parameters with zero interface width drift.
