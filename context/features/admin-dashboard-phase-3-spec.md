# Feature Specification: Agency Admin Messaging Desk & Global Inbox (Phase 3 of 3)

> Status: ACTIVE 🚀
> Target Route: `/src/app/admin/messages/page.tsx`
> Module Domain: Admin Shared Inbox UI & Client Communication Network

---

## 🎯 Architectural Intent
This phase builds the internal B2B messaging hub on the Admin dashboard side. It maps historical chat histories directly from the mock data repository, implements active notification counters matching the sidebar badges, and handles mock state updates for tracking client change requests cleanly.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md` (Specifically tracking the [badge: 3] communications counter indicator)
* **Single Source of Truth Core Vectors:** `src/lib/mock-data.ts` (Importing `mockMessages` and `mockClientsList`)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Chat Grid Container:** Fluid double-panel layout frame. Left chat-list panel, right message stream screen wrapper. Uses pure white surfaces (`bg-[#ffffff]`) layered with sharp thin dividers (`border-slate-100`) over the light slate background canvas (`bg-[#f8fafc]`).
- **Aesthetic Focus Accents:** Sent bubbles from the Admin use a clean slate shade (`bg-slate-100`), while incoming corporate client bubble strings feature a solid **Zylora Blue (`bg-[#3B5FE0]`)** framework or clear light blue indicators.

---

## 💻 Technical Layout Specifications

### 1. Multi-Client Shared Inbox Panel Flex Layout
- **Left Panel (Conversations Threads List Grid):**
  - Displays a clean filter list showing active corporate brands tracking directly from `mockClientsList`.
  - Ahmed Clothing row element displays a premium real-time indicator alert marker matching the precise notification badge count: `3`.
- **Right Panel (Active Chat Window Canvas Grid):**
  - **Upper Title Header bar:** Renders client identity text `"Ahmed Clothing Channel"` paired with a sub-caption status reading `"Enterprise Tier Communication Pipeline • Active"`.
  - **Message History Scroller Container:** Loops and maps array items from `mockMessages` cleanly using React state mapping. Distinguishes text alignment configurations based on `senderRole` properties (`ADMIN` aligned right, `CLIENT` aligned left).
  - **Interactive Text Action Input Layer:** A modern corporate text input field containing prefix utility icons with a single full-color submit navigation action control button stating: `[Send Response]`. Clicking submit appends the mock message array state and launches a Sonner toast: *"Message successfully updated onto the system communication ledger."*

---

## 🔒 Verification & Compliance Criteria
- Completely typesafe react state mappings processing parameters with zero fallback usage of loose `any` variables.
- Full viewport height compliance (`h-[calc(100vh-theme(spacing.16))]`) with internal independent message stream scrolling mechanics (`overflow-y-auto`).
