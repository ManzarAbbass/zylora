# Feature Specification: Administrative Executive Reports Hub & Deep-Linking (Phase 3 Matrix)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/clients/queries.ts` (Extend), `src/app/admin/reports/page.tsx`, and `src/components/admin/sidebar-analytics.tsx`
> Module Domain: Data Intelligence Hub, Financial ROI Ledger, Cross-Route Navigation Link

---

## 🎯 Architectural Intent
This task instantiates the dedicated executive reporting center route at `/admin/reports`. It moves the admin platform from simple tracking tables to a high-utility accounting ledger. It links the Client Analytics Sidebar widget directly onto this new view routing frame via an explicit cross-navigation node link, hydrating the core table frameworks directly from Neon PostgreSQL using Drizzle ORM.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify implementation rules against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading campaign metrics definitions)
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md` (To maintain the exact tables padding, borders spacing, and export grid alignment)
* **Core Sidebar Blueprint:** `@context/features/admin-sidebar-analytics-spec.md` (Updating the analytics rail framework)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Reports Dashboard Workspace Grid:** Flat white sheet grid modules (`bg-[#ffffff]`) layered with subtle tracking slate dividers (`border-slate-100`) fixed over the premium light slate base canvas (`bg-[#f8fafc]`).
- **Data Matrix Layout:** Alignment grids match heavy bold typography colors (`text-slate-900`) for numeric values. Negative or risk values (e.g. low open rates) toggle amber warnings; profitable margins trigger clear corporate blue highlights.

---

## 💻 Technical Code Specifications

### 1. Database Financial Reports Queries Layer (`src/features/clients/queries.ts`)
Extend the backend database queries engine using pure type-safe Drizzle syntax:
- **Function Contract (`getAdminExecutiveReports`):**
  - Performs an inner join query or relational aggregation grouping rows from `users` (where `role === 'CLIENT'`) and the `campaigns` table.
  - Compiles a detailed multi-column reporting dataset array tracking: Client ID, Corporate Company Name, Total Campaigns Discovered, Cumulative Budget Spend Sum, Cumulative Revenue Generated Sum, and Net ROI Calculation (Revenue minus Spend).
  - Returns the typed matrix array safely to the server component.

### ⚙️ 2. Core Server Page Implementation (`src/app/admin/reports/page.tsx`)
Create a new Async Server Component directory router file:
- **Data Hydration Architecture:** Invoke the async query helper `getAdminExecutiveReports()` at the top server processing layer natively.
- **Reporting Workspace Core Layout:**
  - Header Section: Displays titles "Executive Intelligence Ledger", subheadings "Analyze agency-wide corporate client spending allocations, campaign conversion performance, and cumulative ROI footprints."
  - **The Main Financial Accounting Data Grid:** Maps over the database results array securely. Displays an exhaustive data-grid table tracking: Client Name, Connected Campaigns Count, Total Ad Spend, Total Attributed Revenue, and Net ROI margin totals formatted cleanly in local dollar strings (e.g., `"$12,400.00"`).
  - Action Utilities Bar: Includes an elegant, minimalist corporate button module labeled `[Download CSV Snapshot Report]` to act as the export UI placeholder node.

### 🏛️ 3. Sidebar deep-Linking Anchor Redirection (`src/components/admin/sidebar-analytics.tsx`)
Refactor the Client Analytics presentation sidebar widget file:
- Locate the base boundary footprint of the sidebar analytics vertical list card.
- Insert a permanent, minimalist cross-navigation text action anchor link utility styled with hover states transitions:
  ```tsx
  <Link href="/admin/reports" className="text-xs font-medium text-[#3B5FE0] hover:underline mt-4 block">
    View Full Reports Data →
  </Link>
  ```

---

## 🔒 Verification & Compliance Criteria
- Demands absolute type-safety with a strict zero fallback utilization of loose `any` values.
- Ensures zero client-side interactivity bundle weight leaks (`'use client'`) inside the core reports layout layer to keep server-side hydration instant.
- Implements responsive horizontal scrolling container parameters (`overflow-x-auto`) to safely protect data tables from layout clipping on smaller display setups.
