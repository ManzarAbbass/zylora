# Feature Specification: Administrative Onboarded Clients Ledger (Phase 2 Component Upgrade)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/clients/queries.ts`, `src/features/clients/actions.ts`, and `src/app/admin/dashboard/page.tsx`
> Module Domain: Admin Data Matrix Table, Relational Aggregations, Client Provisioning Operations

---

## 🎯 Architectural Intent
This task connects the Agency Admin dashboard's main landing matrix to the live Neon PostgreSQL infrastructure using Drizzle ORM. It replaces static mock rows with a dynamic corporate data table compiling live user records (`role === 'CLIENT'`), dynamically aggregating their linked active campaigns count and total revenue generated from the database.

---

## 🔗 Architecture & Context References
The developer agent must cross-verify layout structures and business constraints against these tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md` (To ensure precise table paddings, column ordering, and color pill codes)
* **Database Schema Anchors:** `src/db/schema.ts` (Targeting `users` and `campaigns` schemas layout)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Data Table Layout Wrapper:** White flat container surface (`bg-[#ffffff]`) bounded by hairline borders (`border-slate-100`) and soft ambient drop shadows.
- **Visual Pills & Micro Indicators (UI Spec Match):**
  - Package Tiers: Colored badge capsules (`Enterprise` = Light Purple, `Pro` = Light Blue, `Growth` = Light Zinc/Slate).
  - Status Dots: Active rows map a green dot layout, Paused rows map a warning amber dot.

---

## 💻 Technical Code Specifications

### 1. Relational Database Queries Module (`src/features/clients/queries.ts`)
Create a dedicated backend query function layer utilizing typesafe Drizzle syntax:
- **Function Contract (`getOnboardedClientsWithMetrics`)**:
  - Executes a relational database extraction routine or aggregate subquery.
  - Fetches all user rows from the `users` table where `users.role === 'CLIENT'`.
  - For each client, counts total rows inside the `campaigns` table (`eq(campaigns.clientId, users.id)`) and sums up `campaigns.revenueGenerated`.
  - Returns the compiled typesafe dataset array cleanly to the server-side components.

### ⚙️ 2. Server Action for Account Provisioning (`src/features/clients/actions.ts`)
Create a secure mutation action establishing the automated client creation workflow pipeline:
- **Action Contract (`onboardNewClientAction`)**:
  - Accepts typed payload via validation: `Client Name`, `Corporate Email Address`, and `Assigned Package Tier`.
  - Automatically generates a randomized, secure temporary access key string.
  - Hashes the password utilizing **`bcryptjs`** (exactly `12` salting rounds) and inserts the record into the `users` table with `role: 'CLIENT'`.
  - Commands the **Resend API** to instantly deliver the login tokens to the corporate user.
  - Fires Next.js engine `revalidatePath('/admin/dashboard')` to trigger visual framework refreshes.

### 🏛️ 3. Administrative Landing Page Core Hydration (`src/app/admin/dashboard/page.tsx`)
Refactor the admin main page component to convert into an **Async Server Component**:
- **Data Hydration:** Fetch live corporate records directly using `getOnboardedClientsWithMetrics()`.
- **Dynamic Table Matrix Mapping**:
  - Map over the live rows securely inside a clean custom HTML or Shadcn data table layout structure.
  - Render rows dynamically parsing database properties: Client (Avatar initials + Name text stacked above Email address text), Package (Colored pill container), Campaigns Count (Dynamic aggregate integer), Revenue (Formatted total dollar notation), Status, and Joined Date.
- **Form Modal Connection:** Bind the `onboardNewClientAction` mutation safely into the submit handler of the `[+ Onboard Client]` dialog sheet button modal frame.

---

## 🔒 Verification & Compliance Criteria
- Strictly demands absolute type safety with zero usage of fallback generic `any` identifiers objects.
- Handles empty table array scenarios cleanly by displaying an elegant placeholder label stating: `"No onboarded client profiles discovered inside the database."`
- Guarantees multi-device layout safety utilizing horizontal scroll tracking containers (`overflow-x-auto`) to protect thin mobile viewports.
