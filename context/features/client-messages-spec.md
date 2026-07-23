# Feature Specification: Corporate Client Direct Agency Message Pipeline (Phase 3 Final Core)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/messages/actions.ts` (Extend), `src/features/messages/queries.ts` (Extend), and `src/app/client/messages/page.tsx`
> Module Domain: Client Workspace Chat, Real Database Pipeline, Active Cache Eviction

---

## 🎯 Architectural Intent
This task completes the dual-portal B2B communication network by building the client-side channel view (`/client/messages`). It configures the user interface to pull historical data logs matching the active user session, and implements typesafe Next.js Server Actions to post chat requests directly into the Neon PostgreSQL `messages` table, synchronizing live with the Agency Admin's master dashboard inbox.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify implementation rules against these strict validation criteria:
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/client-dashboard-Ui-main.md` (To maintain exact message box input widths and typography styles)
* **Database Schema Anchors:** `src/db/schema.ts` (Targeting `messages` relational layout)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Chat Environment Frame:** Single crisp white focus container (`bg-[#ffffff]`) bounding a fixed viewport layout, responsive chat window scroller, and lower action container input block.
- **Visual Bubble Hierarchy:** Pinned nicely along a fluid light slate background canvas (`bg-[#f8fafc]`). Client responses align right featuring executive dark charcoal or clear structural blue text weights, while agency admin incoming responses align left in a soft gray panel wrapper (`bg-slate-100`).

---

## 💻 Technical Code Specifications

### 1. Database Client Query Extension (`src/features/messages/queries.ts`)
Ensure the existing query engine accommodates safe personal brand data restrictions:
- **Function Contract (`getClientChatHistory`)**:
  - Accepts an explicit `clientId` string parameter.
  - Queries the Neon Postgres `messages` table matching `eq(messages.clientId, clientId)`.
  - Sorts results chronologically via `asc(messages.createdAt)` to return the dataset to the client view layer.

### ⚙️ 2. Server Action Extension (`src/features/messages/actions.ts`)
Extend or declare the secure mutation executing the exact standard return pattern `{ success: boolean, data?: any, error?: string }`:
- **Action Contract (`sendClientMessageAction`)**:
  - Accepts explicit parameters: `clientId` string and `messageText` string payload validation.
  - Inserts a new row into the `messages` table with `senderRole: 'CLIENT'`.
  - Fires Next.js engine `revalidatePath('/client/messages')` to instantly purge old data cache nodes on screens.

### 🏛️ 3. Client Messaging View Hydration (`src/app/client/messages/page.tsx`)
Refactor the file view template layer to transform into an async **Server Component**:
- **Data Hydration:** Fetch live corporate records directly using `getClientChatHistory("31ef43a7-d86f-4455-960d-8dba5d197363")` (Passing the actual seeded client UUID from the database).
- **The Chat Layout Window:** Mount an interactive viewport scroller mapping chat bubbles smoothly based on roles.
- **Action Input Layer Container:** An elegant text input control field panel with a single full-color submit navigation action control button stating: `[Send Request]`. Submit invokes `sendClientMessageAction`, clears text inputs using optimistic hooks states, and triggers a Sonner alert toast: `"Operational message successfully routed to the Zylora agency desk."`

---

## 🔒 Verification & Compliance Criteria
- Requires strict `'use client'` interactive context layer on sub-components handling message streams and input fields states.
- Completely typesafe react state mappings processing parameters with zero fallback usage of loose `any` variables.
- Implements full screen height lock constraints (`h-[calc(100vh-theme(spacing.16))]`) with automated down scroll alignment mapping so the latest sent message bubble is hamesha visible instantly on the screen view.
