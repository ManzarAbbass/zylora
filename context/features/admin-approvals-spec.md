# Feature Specification: Administrative Global Approvals Queue & Asset Re-Submission Engine (Phase 3)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/approvals/queries.ts` (Extend), `src/features/approvals/actions.ts` (Extend), and `src/app/admin/approvals/page.tsx`
> Module Domain: Admin Asset Control room, Relational Joins, State Re-Submission Mutations

---

## 🎯 Architectural Intent
This task instantiates the centralized master verification tracking queue at `/admin/approvals`. It provides the Agency Admin with a complete multi-tenant view of all media deliverables, email copy drafts, and ad creative states across all clients. It builds secure typesafe Server Actions enabling the admin to override or re-submit revised assets back into the client queue seamlessly.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify structural parameters against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading campaign content verification fields)
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md` (To match exact status colors, grid spacing, and media container aspect ratios)
* **Client Approvals Logic Anchor:** `@context/features/client-approvals-spec.md` (Ensuring perfect alignment with client approval status enums)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Global Approvals Container Grid:** Multi-column layout tracking individual media cards. Panels utilize pure crisp white cards (`bg-[#ffffff]`) isolated by modern hairline boundaries (`border-slate-100`) fixed over the premium slate canvas (`bg-[#f8fafc]`).
- **Interactive Triage Status Mapping Codes:**
  - `PENDING` State: Renders a clean neutral slate outline badge layout.
  - `APPROVED` State: Renders a tight corporate emerald capsule tag (`bg-emerald-50 text-emerald-700 border-emerald-200`).
  - `REJECTED` State: Flash warning border accents (`border-amber-400 bg-amber-50/40`) and highlights the raw client feedback description text block in red/amber typography weights.

---

## 💻 Technical Code Specifications

### 1. Database Multi-Tenant Approvals Queries (`src/features/approvals/queries.ts`)
Extend your backend query module using type-safe Drizzle syntax to extract cross-client row logs:
- **Function Contract (`getGlobalAdminApprovalsQueue`):**
  - Executes a relational database extraction query that inner-joins the `content_approvals` table with the `campaigns` table and the `users` table.
  - Compiles an exhaustive dataset array tracking: Asset ID, Campaign Title Name, Client's Corporate Company Name, Asset Name Descriptor, Media URL/Content Text, Status String, Client Feedback Comments, and Created Timestamp.
  - Returns the compiled dataset sorted chronologically via `desc(content_approvals.createdAt)`.

### ⚙️ 2. Administrative Re-Submission Server Action (`src/features/approvals/actions.ts`)
Extend your mutations layer executing the exact standard return pattern `{ success: boolean, data?: any, error?: string }`:
- **Action Contract (`resubmitRevisedAssetAction`):**
  - Accepts an explicit `assetId` string parameter.
  - Updates the targeted row inside the Neon Postgres `content_approvals` table:
    * Sets `status` string value back to exactly: `'PENDING'`.
    * Clears out old feedback columns by mapping the `feedback` attribute back to `null` (wiping the stale review strings).
  - Fires the Next.js cache eviction engine command `revalidatePath('/admin/approvals')` and `revalidatePath('/client/approvals')` to instantly update tracking modules across both web layout panels simultaneously.

### 🏛️ 3. Core Approvals Dashboard Page (`src/app/admin/approvals/page.tsx`)
Create the main directory route page view to transform into a high-utility **Async Server Component**:
- **Data Hydration Architecture:** Fetch live asset data metrics at the top processing boundary using `getGlobalAdminApprovalsQueue()`.
- **The Main Workspace Queue Grid Layout:**
  - Header: Large executive titles "Global Creative Approvals Queue", subheadings "Monitor multi-client content asset validation cycles, review client revision notes, and re-submit corrected campaign deliverables."
  - Loops over the asset array records securely. Every single card displaying a `REJECTED` status state locks an active, responsive action control button stating: **`[Re-Submit Revised Deliverable]`**.
  - Clicking this button invokes the `resubmitRevisedAssetAction` server mutation inside a transition hook, instantly clearing feedback arrays, resetting state back to pending, and triggering a Sonner toast: `"Asset successfully reset and routed back to the client's validation queue."`

---

## 🔒 Verification & Compliance Criteria
- Strictly demands absolute type-safety with a total ban on fallback loose `any` variables parameters.
- Empty State Graceful Handling: If zero creative items have been submitted to the database, display an elegant placeholder state banner stating: `"No campaigns creative deliverables have been queued for validation loops."`
- Guarantees seamless multi-device layout safety utilizing horizontal scrolling boxes over dense data layers to prevent component clipping.
