# Feature Specification: Corporate Client Content Approvals Portal & Review Board (Phase 3 Secure Isolation)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/approvals/queries.ts`, `src/features/approvals/actions.ts`, and `src/app/client/approvals/page.tsx`
> Module Domain: Multi-Tenant Data Isolation, NextAuth v5 Session Hydration, State Mutation Pipelines

---

## 🎯 Architectural Intent
This task connects the Client Asset Approval interface grid to the real server-side infrastructure securely. It replaces any temporary hardcoded placeholder IDs with dynamic, session-extracted user identification keys. By utilizing NextAuth v5 and Drizzle ORM, it ensures that logged-in clients can only view and interact with media assets belonging strictly to their company, executing immediate database status mutations (`PENDING` -> `APPROVED` / `REJECTED`) inside the Neon PostgreSQL cloud cluster without full-page reloads.

---

## 🔗 Architecture & Context References
- **Master System Blueprint:** `@context/project-overview.md`
- **UI Snapshot Document:** `@context/zyloraUi/client-dashboard-Ui-main.md`
- **Database Schema Anchors:** `src/db/schema.ts` (Targeting `content_approvals` and `approvalStatusEnum`)
- **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing `try/catch` and Sonner toast response patterns)

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Asset Display Cards Layout:** White responsive container panels (`bg-[#ffffff]`) layered with sharp hairline borders (`border-slate-100`) and minimal soft tracking shadows over the light slate canvas background (`bg-[#f8fafc]`).
- **Micro-Interactions State Response Canvas:**
  - `APPROVED` State: Card borders flash and transform dynamically using an executive corporate emerald green border tint (`border-emerald-500 bg-emerald-50/50`).
  - `REJECTED` State: Card triggers conditional validation elements highlighting boundaries via an warning amber border tint (`border-amber-500 bg-amber-50/50`) and reveals the saved feedback notes box clearly underneath.

---

## 💻 Technical Code Specifications

### 1. Sandboxed Database Extraction Queries (`src/features/approvals/queries.ts`)
Create a dedicated backend query function layer utilizing pure typesafe Drizzle syntax to enforce secure B2B data encapsulation:
- **Function Contract (`getClientApprovalsQueue`)**:
  - Accepts a required, explicit `clientId` string parameter dynamically passed from the login session.
  - Joins the Neon Postgres `content_approvals` table with the `campaigns` table.
  - **Strict Security Guard:** Filters all row results where `campaigns.clientId` equals the incoming dynamic `clientId` string context. **DO NOT** hardcode any explicit testing hash strings inside this lookup logic.
  - Returns the typed dataset array sorted chronologically: `desc(content_approvals.createdAt)`.

### ⚙️ 2. Drizzle Database Server Actions Mutations (`src/features/approvals/actions.ts`)
Create secure typesafe mutations executing the exact standard return pattern `{ success: boolean, data?: any, error?: string }`:
- **Action 1 (`approveAssetAction`)**:
  - Accepts an explicit `assetId` string parameter.
  - Updates the `content_approvals` table row status cleanly to exactly: `'APPROVED'`.
  - Fires Next.js cache eviction engine `revalidatePath('/client/approvals')` and `revalidatePath('/admin/approvals')` to instantly sync tracking modules across both workspace layout panels simultaneously.
- **Action 2 (`rejectAssetAction`)**:
  - Accepts explicit parameters: `assetId` string and a custom `feedbackText` string compiled from inputs.
  - Updates the target row status to exactly: `'REJECTED'` and maps the comments text onto the database table `feedback` column.
  - Fires Next.js engine `revalidatePath()` to execute immediate live frame changes.

### 🏛️ 3. Interactive Client View Layer (`src/app/client/approvals/page.tsx`)
Refactor the file view template layer to transform into a high-utility **Async Server Component** integrated with NextAuth:
- **Session Data Hydration:** Extract the active logged-in user session parameters natively on the server layer using `await auth()`. Retrieve the unique identifier: `const clientId = session.user.id`.
- **Backend Fetch Execution:** Invoke the query helper passing this dynamic variable: `getClientApprovalsQueue(clientId)`.
- **The Evaluation Layout Blocks Grid:** Loops array elements securely. When a user executes an action:
  - Clicking `[Approve Deliverable]` triggers the async `approveAssetAction` mutation wrapper, updates state, and launches an elegant Sonner toast stating: `"Asset successfully verified and marked as APPROVED."`
  - Clicking `[Request Revision]` reveals a responsive textarea form input box capturing feedback notes. Clicking submit triggers `rejectAssetAction` mutation, updates tracking status context, logs feedback, and fires a Sonner warning alert toast layout stating: `"Revision request submitted directly to the agency desk."`

---

## 🔒 Verification & Compliance Criteria
- Strictly requests an `'use client'` interactive context layer on sub-components handling form input arrays and hover transformations states.
- Rejects plain text database entries loops; maps input mutations securely through a Zod parser schema to block data leakage or bad string formats.
- **Tenant Data Isolation Rule:** A logged-in client from Ahmed Clothing must **never** be able to see, modify, or intercept asset records belonging to any other corporate tenant.
