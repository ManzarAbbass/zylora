# Feature Specification: Agency Admin Messaging Desk & Global Inbox (Phase 3 of 3)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/messages/queries.ts`, `src/features/messages/actions.ts`, and `src/app/admin/messages/page.tsx`
> Module Domain: Admin Shared Inbox UI, Real Database Communication Flow, Action States

---

## 🎯 Architectural Intent
This task implements the central communication cockpit for the Agency Admin panel (`/admin/messages`). It moves the messaging interface from flat mock files onto the live Neon PostgreSQL `messages` table via Drizzle ORM. It enables the admin to view all client chat threads, view individual conversation streams, and execute instant server mutations to reply.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify implementation rules against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading messages schema constraints)
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md` (To ensure precise dual-panel width split and sidebar badge sync)
* **Database Schema Anchors:** `src/db/schema.ts` (Targeting `messages` table fields and relationships)
* **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing `{ success, data, error }` pattern and Server Actions data mutations)

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Shared Chat Layout Frame:** Full-height dual-panel flex container workspace. Left column lists corporate client threads, right area displays the active communication stream layout panel.
- **Surface Matrix Panels:** Pure crisp white backgrounds (`bg-[#ffffff]`) isolated by modern, hairline boundaries (`border-slate-100`) layered over the base corporate light slate canvas (`bg-[#f8fafc]`).
- **Typography & Bubbles Hierarchy:** Muted text parameters for metadata stamps. Admin responses align right in a sleek light slate wrapper (`bg-slate-100`), while incoming Corporate Client message string vectors feature text colored in focus weights.

---

## 💻 Technical Code Specifications

### 1. Database Messaging Queries Layer (`src/features/messages/queries.ts`)
Create a dedicated backend query function layer utilizing typesafe Drizzle syntax:
- **Function Contract (`getAdminChatThreads`)**:
  - Fetches all entries from the `messages` table grouped or arranged by unique client links.
  - Returns individual client names, latest sent text snippet, and timestamps.
- **Function Contract (`getChatMessagesByClient`)**:
  - Accepts an explicit `clientId` string parameter.
  - Queries the Neon Postgres `messages` table matching `eq(messages.clientId, clientId)`.
  - Sorts results chronologically via `asc(messages.createdAt)` and returns the dataset.

### ⚙️ 2. Drizzle Database Chat Server Actions (`src/features/messages/actions.ts`)
Create secure typesafe mutations executing the exact standard return pattern `{ success: boolean, data?: any, error?: string }`:
- **Action Contract (`sendAdminMessageAction`)**:
  - Accepts explicit parameters: `clientId` string and `messageText` string payload validation.
  - Inserts a new row into the `messages` table with `senderRole: 'ADMIN'`.
  - Fires Next.js engine `revalidatePath('/admin/messages')` to instantly synchronize data cache streams.

### 🏛️ 3. Administrative Inbox Screen Hydration (`src/app/admin/messages/page.tsx`)
Refactor or create the main routing file view to transform into a high-utility dynamic dashboard layout shell:
- **Data Hydration Layout:** Server Component fetches live threads using `getAdminChatThreads()`.
- **Left Column (Clients Threads List Grid):** Maps over client records securely. The active conversation item row highlights via a subtle border tint, reflecting the system sync indicators.
- **Right Column (Active Chat Window Canvas Grid):**
  - Renders upper card summary component tracing client details (e.g. `"Ahmed Clothing Channel"`) stacked above server status tags.
  - Message History Scroller View: Renders message bubbles dynamically from `getChatMessagesByClient(selectedClientId)`. Aligns chat text blocks cleanly according to `senderRole` properties.
  - Interactive Action Form Input: An elegant text input control field panel with single full-width submission controller trigger stating: `[Send Response]`. Form submit executes the `sendAdminMessageAction` mutation wrapper, resets input arrays, and launches a Sonner toast: `"Message successfully updated onto the system communication ledger."`

---

## 🔒 Verification & Compliance Criteria
- Must compile cleanly under strict TypeScript constraints. Does not instantiate fallback generic `any` structures.
- Restricts viewports breakages; handles absolute messaging boxes inner sizing (`overflow-y-auto`) smoothly downward to responsive mobile view limits.
- Integrates empty message placeholder wrappers displaying: `"Select a client conversation thread to begin secure B2B communications."`
