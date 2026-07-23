# Feature Specification: Client Dashboard Live Campaigns Integration (Phase 2 Component Upgrade)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/campaigns/queries.ts` and `/src/app/client/dashboard/page.tsx`
> Module Domain: Data Hydration, Relational DB Queries & Dynamic Grid Rendering

---

## 🎯 Architectural Intent
This task switches the Client Dashboard's main area from reading hardcoded array objects to running actual live, server-side data queries directly from Neon PostgreSQL using Drizzle ORM. It replaces static mock widgets with dynamic cards mapping to the seeded `campaigns` table records under the active authenticated client context.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify structural parameters against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading campaigns column metrics)
* **Design Guidelines Configuration:** `@context/zyloraUi/client-dashboard-Ui-main.md` (To maintain the exact high-fidelity visual slate card system spacing)
* **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing strict Server Components data fetching)

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Grid Layout Rules:** Enforces 100% parity with the existing Phase 1 layout design tokens. Displays an elegant multi-column grid of dashboard campaign modules.
- **Card Containers Styling:** Pure crisp white panels (`bg-[#ffffff]`) isolated by modern, hairline boundaries (`border-slate-100`) and soft ambient drop shadows on the light slate canvas.
- **Visual Status Markers:** Active tracks render status indicators matching brand blue highlights, with numeric properties typed in bold executive graphite text (`text-slate-900`).

---

## 💻 Technical Code Specifications

### 1. Database Queries Architecture Module (`src/features/campaigns/queries.ts`)
Create a dedicated backend queries utility script using pure typesafe Drizzle syntax. It must not contain generic hardcoded helper arrays:
- **Function Contract (`getCampaignsByClientId`)**:
  - Accept an explicit `clientId` string parameter.
  - Query the Neon Postgres `campaigns` table using `db.select().from(campaigns).where(eq(campaigns.clientId, clientId))` to fetch associated operational rows.
  - Return the results cleanly to server orchestration frames.

### ⚙️ 2. Server Component Integration (`src/app/client/dashboard/page.tsx`)
Refactor the landing page component view to shift infrastructure frameworks from mock states into a modern **Async Server Component**:
- **Data Hydration Processing:** Remove hardcoded references like `import { mockCampaigns } from "@/lib/mock-data"`. Instead, invoke the async database helper function `getCampaignsByClientId("31ef43a7-d86f-4455-960d-8dba5d197363")` (passing the actual seeded client UUID from the database).
- **Dynamic Structural Array Loop**:
  - Map over the array results fetched from Neon Postgres securely using JavaScript `.map()` method layers.
  - Bind individual database attributes safely into the dashboard card props layout grid:
    * Card Title String -> Binds to `campaign.title` (e.g. `"Welcome Email Series"` / `"Abandoned Cart Recovery Flow"`).
    * Card Status Token -> Binds to `campaign.status` (Renders localized visual status labels dynamically).
    * Live Numbers Display -> Formats and prints `campaign.emailsSent`, `campaign.openRate`, and currency format metrics tracking `campaign.revenueGenerated`.

---

## 🔒 Verification & Compliance Criteria
- Must compile cleanly under strict TypeScript constraints. Does not instantiate fallback generic `any` objects logic blocks.
- No client-side interactivity bundle hooks (`'use client'`) allowed inside data hydration queries to ensure zero-bundle network execution densities on the layout framework.
- Handled via native loading skeleton templates smoothly to ensure instant user interface feedback loops.
