# Feature Specification: Creative Asset Approval Operations (Phase 2 Interactivity)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/approvals/actions.ts`, `src/features/approvals/queries.ts`, and `src/app/client/approvals/page.tsx`
> Module Domain: B2B Validation Engine, Drizzle Server Actions, State Mutation

---

## 🎯 Architectural Intent
This task connects the Client Asset Approval interface grid to the real server-side infrastructure. It replaces the mockup button triggers with type-safe Next.js Server Actions that dynamically update the asset status context (`PENDING` -> `APPROVED` / `REJECTED`) inside the Neon PostgreSQL `content_approvals` table using Drizzle ORM, triggering live UI revalidations without page reloads.

---

## 🔗 Architecture & Context References
- **Master System Blueprint:** `@context/project-overview.md`
- **UI Snapshot Document:** `@context/zyloraUi/client-dashboard-Ui-main.md` (Mapping asset queue specifications)
- **Database Schema Anchors:** `src/db/schema.ts` (Targeting `content_approvals` and `approvalStatusEnum`)
- **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing `try/catch` and Sonner toasts notification response pattern)

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Asset Display Cards Layout:** Reuses the exact identical Phase 1 metrics tokens. White responsive container panels (`bg-[#ffffff]`) layered with sharp borders (`border-slate-100`) and minimal soft tracking ambient shadows.
- **Micro-Interactions State Response Canvas:**
  - `APPROVED` State: Card borders flash and transform dynamically using an executive corporate emerald green border tint (`border-emerald-500` / `bg-emerald-50/50`).
  - `REJECTED` State: Card triggers conditional validation elements highlighting boundaries via an warning amber border tint (`border-amber-500` / `bg-amber-50/50`).

---

## 💻 Technical Code Specifications

### 1. Database Extraction Queries (`src/features/approvals/queries.ts`)
Create a dedicated backend query function layer utilizing pure typesafe Drizzle syntax:
- **Function Contract (`getPendingApprovalsByClient`)**:
  - Joins the Neon Postgres `content_approvals` table with the `campaigns` table.
  - Filters results where `campaigns.clientId` matches the active logged-in client ID string AND `content_approvals.status` equals `'PENDING'`.
  - Returns the typed dataset cleanly to the dashboard workspace view layers.

### ⚙️ 2. Drizzle Database Server Actions Mutations (`src/features/approvals/actions.ts`)
Create secure typesafe mutations executing the exact standard return pattern `{ success: boolean, data?: any, error?: string }`:

- **Action 1 (`approveAssetAction`)**:
  - Accepts an explicit `assetId` string parameter.
  - Updates the `content_approvals` table row matching the explicit ID string context, mutation status to `'APPROVED'`.
  - Fires Next.js engine `revalidatePath('/client/approvals')` to instantly sync the data cache matrix.

- **Action 2 (`rejectAssetAction`)**:
  - Accepts explicit parameters: `assetId` string and a custom `feedbackText` string compiled from inputs.
  - Updates the target row matching the ID string context, mutation status to `'REJECTED'` and maps the comments text onto the table `feedback` column.
  - Fires Next.js engine `revalidatePath('/client/approvals')` to execute live frame changes.

### 🏛️ 3. Interactive Client View Layer (`src/app/client/approvals/page.tsx`)
Refactor the file view template layer to cleanly interface with the newly deployed mutations:
- **Data Hydration:** Fetch live rows using `getPendingApprovalsByClient("31ef43a7-d86f-4455-960d-8dba5d197363")`.
- **The Evaluation Layout Blocks Grid:** Loops array elements securely. When a user executes an action:
  - Clicking `[Approve Deliverable]` triggers the async `approveAssetAction` mutation wrapper, updates state, and launches an elegant Sonner toast stating: `"Asset successfully verified and marked as APPROVED."`
  - Clicking `[Request Revision]` reveals a responsive textarea form input box capturing feedback notes. Clicking submit triggers `rejectAssetAction` mutation, updates tracking status context, logs feedback, and fires a Sonner warning alert toast layout stating: `"Revision request submitted directly to the agency desk."`

---

## 🔒 Verification & Compliance Criteria
- Strictly requests an `'use client'` interactive context layer on sub-components handling form input arrays and hover transformations states.
- Rejects plain text database entries loops; maps input mutations securely through the Zod parser to block data leakage or bad string formats.
- Ensures total mobile responsiveness resizing grid cards configurations smoothly downwards to single-column viewports without clipping content texts.
