# Feature Specification: Corporate Client Direct Agency Message Pipeline (Phase 3 Final Core)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/messages/actions.ts`, `src/features/messages/queries.ts`, and `src/app/client/messages/page.tsx`
> Module Domain: Client Workspace Chat, Real Database Pipeline, NextAuth v5 Dynamic Isolation

---

## 🎯 Architectural Intent
This task completes the dual-portal B2B communication network by building the client-side channel view (`/client/messages`). It configures the user interface to pull historical data logs dynamically matching the active authenticated user session, and implements typesafe Next.js Server Actions to post chat requests directly into the Neon PostgreSQL `messages` table, synchronizing live with the Agency Admin's master dashboard inbox.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/client-dashboard-Ui-main.md`
* **Database Schema Anchors:** `src/db/schema.ts` (Targeting `messages` relational layout)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Chat Environment Frame:** Single crisp white focus container (`bg-[#ffffff]`) bounding a fixed viewport layout, responsive chat window scroller, and lower action container input block.
- **Visual Bubble Hierarchy:** Pinned nicely along a fluid light slate background canvas (`bg-[#f8fafc]`). Client responses align right featuring executive clear structural blue text weights, while agency admin incoming responses align left in a soft gray panel wrapper (`bg-slate-100`).

---

## 💻 Technical Code Specifications

### 1. Database Client Query Extension (`src/features/messages/queries.ts`)
Ensure the existing query engine accommodates safe personal brand data restrictions:
- **Function Contract (`getClientChatHistory`)**:
  - Accepts a required, explicit `clientId` string parameter dynamically passed from the session.
  - Queries the Neon Postgres `messages` table matching `eq(messages.clientId, clientId)`.
  - Sorts results chronologically via `asc(messages.createdAt)` to return the dataset to the client view layer.

### ⚙️ 2. Server Action Extension (`src/features/messages/actions.ts`)
Extend or declare the secure mutation executing the exact standard return pattern `{ success: boolean, data?: any, error?: string }`:
- **Action Contract (`sendClientMessageAction`)**:
  - Accepts explicit parameters: `clientId` string and `messageText` string payload validation via Zod.
  - Inserts a new row into the `messages` table setting `senderRole: 'CLIENT'` and tracking `clientId`.
  - Fires Next.js engine `revalidatePath('/client/messages')` and `revalidatePath('/admin/messages')` to instantly purge old data cache nodes on both portals simultaneously.

### 🏛️ 3. Client Messaging View Hydration (`src/app/client/messages/page.tsx`)
Refactor the file view template layer to transform into an async **Server Component** integrated with NextAuth:
- **Dynamic Data Hydration:** Extract the active logged-in user session parameters natively on the server layer using `await auth()`. Isolate credentials parameters: `const clientId = session.user.id`.
- **Backend Fetch Execution:** Invoke the query helper passing this dynamic variable: `getClientChatHistory(clientId)`. **DO NOT** hardcode any structural hash IDs inside this component cascade.
- **The Chat Layout Window:** Mount an interactive viewport scroller mapping chat bubbles smoothly based on roles.
- **Action Input Layer Container:** An elegant text input control field panel with a single full-color submit navigation action control button stating: `[Send Request]`. Submit invokes `sendClientMessageAction`, clears text inputs using optimistic hooks states, and triggers a Sonner alert toast: `"Operational message successfully routed to the Zylora agency desk."`

---

## 🔒 Verification & Compliance Criteria
- Requires strict `'use client'` interactive context layer on sub-components handling message streams and input fields states.
- Completely typesafe react state mappings processing parameters with zero fallback usage of loose `any` variables.
- Implements full screen height lock constraints (`h-[calc(100vh-theme(spacing.16))]`) with automated down scroll alignment mapping so the latest sent message bubble is always visible instantly on the screen view.
- **Tenant Data Isolation Enforcement Check:** Client A must **never** be able to see, modify, or intercept message records belonging to Client B.
