# Feature Specification: Corporate Client Financial Analytics Ledger Hub (Phase 3 Secure Isolation)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/clients/queries.ts` (Extend), `src/app/client/reports/page.tsx`, and `src/app/client/layout.tsx` (Update Link)
> Module Domain: Sandboxed Business Intelligence, Financial ROI Formats, Tenant Data Isolation

---

## 🎯 Architectural Intent
This task instantiates the dedicated client-facing business intelligence reporting desk at `/client/reports`. It refactors the client left sidebar's "Financial Report" tab into a fully functional data route. By invoking strict NextAuth v5 session constraints on the server layer, it performs single-tenant relational aggregations over the active database tables to visualize budget spending footprints, campaign conversion values, and net ROI calculations securely.

---

## 🔗 Architecture & Context References
The developer agent must cross-verify data structures and typography alignments against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading campaign financial parameters)
* **Administrative Reports Layout Anchor:** `@context/features/admin-reports-spec.md` (Ensuring mathematical consistency for billing formulas)
* **Database Relational Schemas:** `src/db/schema.ts` (Targeting `campaigns` and `users` attributes)
* **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing pure Async Server Components for data hydration)

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Reports Dashboard View Grid:** Modular whitespace metric cards (`bg-[#ffffff]`) layered with sharp tracking slate dividers (`border-slate-100`) fixed over the premium light slate base canvas background layout (`bg-[#f8fafc]`).
- **Data Grid Presentation Weights:** Numbers and integer metrics match heavy bold executive typography styling (`text-slate-900`). Profitable campaign metrics and green financial deltas trigger the standard clean Zylora Blue text highlights.

---

## 💻 Technical Code Specifications

### 1. Sandboxed Financial Extraction Query (`src/features/clients/queries.ts`)
Declare a dedicated typesafe query utility function using pure Drizzle syntax to aggregate row variables cleanly:
- **Function Contract (`getClientExecutiveReportsData`):**
  - Accepts a required, explicit `clientId` string parameter dynamically passed from the validation session.
  - Queries rows inside the `campaigns` table matching: `where(eq(campaigns.clientId, clientId))`.
  - **Relational Mathematical Aggregations:** Calculate three cumulative metrics directly across the retrieved rows:
    1. *Total Ad Spend Allocation:* Sum the values of the `campaigns.spend` column.
    2. *Total Revenue Extraction Footprint:* Sum the values of the `campaigns.revenueGenerated` column.
    3. *Net Investment Margin (ROI):* Programmatically subtract cumulative Spend from cumulative Revenue (`Revenue - Spend`).
  - Returns a structured array of completed campaign ledger rows alongside the macro summary object model safely.

### ⚙️ 2. Core Server Page Implementation (`src/app/client/reports/page.tsx`)
Create a new App Router view directory file to transform into an async **Server Component**:
- **Session Identity Gate:** Intercept processing rows at the top server boundary using `await auth()`. Isolate credentials parameters: `const clientId = session.user.id`.
- **Data Hydration Architecture:** Fetch sandboxed telemetry numbers synchronously using `getClientExecutiveReportsData(clientId)`.
- **Reporting Workspace Core Layout:**
  - Header Section: Displays titles "Business Performance Ledger", subheadings "Monitor your active corporate marketing investments, campaign spending distributions, and cumulative return on investment metrics."
  - **Macro Summary Cards Ribbon:** Renders three white floating data cards tracking *Total Investment*, *Attributed Revenue*, and *Net Profit Margin* cleanly formatted in local currency strings (e.g., `"$42,150.00"`).
  - **Granular Campaign Performance Grid:** Maps over the historical campaigns array safely to render a clean, high-density data-grid table tracking: Campaign Title Name, Distribution Volume (Emails Sent), Click Rates (CTR), Individual Budget Spend, and Resulting Revenue.

### 🏛️ 3. Sidebar Navigation Link Realignment (`src/app/client/layout.tsx`)
Refactor the left sidebar template inside the client master chassis framework file:
- Locate the navigation line item labeled precisely **"Financial Report"** (or associated reporting accounting ledger icon).
- Update its target destination path string property natively to point straight to the universal reports directory: `href="/client/reports"`.

---

## 🔒 Verification & Compliance Criteria
- Strictly demands absolute type safety with zero fallback usage of loose `any` variables definitions.
- **Tenant Data Isolation Enforcement Check:** The query must be strictly hard-locked by the authenticated session identifier. Under no circumstances can a user from Client A intercept or load metrics data logs belonging to Client B.
- Gracefully handles initial zero-state data conditions: if a new client has zero active running campaigns, default summary cards numbers cleanly to `"$0.00"` without throwing server-side compilation warnings or rendering layout breakdown shifts.
