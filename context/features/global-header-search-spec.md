# Feature Specification: Universal Header Search Command Center (Phase 3 Layout Integration)

> Status: ACTIVE 🚀
> Target Core Files: `src/features/search/queries.ts`, `src/components/shared/header.tsx`, and Page Layout Files
> Module Domain: Global Layout Hydration, Typesafe Multi-Tenant Subqueries, Client Debouncing Hooks

---

## 🎯 Architectural Intent
This task relocates individual local workspace search fields into the shared top header panel. It replaces static local input components with a central, typesafe asynchronous search engine that uses active NextAuth session roles to deliver global client discovery for Admins and strictly sandboxed asset lookup metrics for corporate Clients.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **Authentication Split Configuration:** `@context/features/auth-spec-files/auth-phase-2-spec.md`
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Header Placement Grid:** Pinned centered inside the sticky global top header section (`bg-[#ffffff] border-b border-slate-100 h-16`).
- **Input Field Styling:** A minimalist rounded input bar (`bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:bg-white text-slate-900`) accompanied by a sleek magnifying glass icon block.
- **Floating Overlay Menu Dashboard:** Matches the theme using an absolute overlay box layout (`bg-white shadow-xl border border-slate-100 rounded-xl z-50 mt-2 w-full max-w-xl`).

---

## 💻 Technical Code Specifications

### 1. Secure Multi-Tenant Search Queries Layer (`src/features/search/queries.ts`)
Declare a dedicated backend query function layer utilizing type-safe Drizzle syntax:
- **Function Contract (`executeUniversalSearch`):**
  - Accepts parameters: `searchString` string, `userRole` enum, and `clientId` string.
  - **Admin Context Route:** If role matches `'ADMIN'`, perform parallel standard SQL `LIKE` queries matching title/name variables across the `users` and `campaigns` tables globally.
  - **Client Context Route:** If role matches `'CLIENT'`, strictly bound queries by checking the incoming identifier: `where(and(like(campaigns.title, `%${searchString}%`), eq(campaigns.clientId, clientId)))`.
  - Return result metrics sorted cleanly inside a composite object array payload: `{ clients: [...], campaigns: [...] }`.

### ⚙️ 2. Header Interaction UI Client Component (`src/components/shared/header.tsx`)
Refactor the master layout header component file to implement active event hooks:
- **Session Parsing Gate:** Extract live metadata descriptors (`session.user.role`, `session.user.id`) securely inside the component branch layout [1.1].
- **Client Side Input Debouncing:** Build a standard 300ms debounce handling hook interval wrapper state to eliminate heavy, redundant database roundtrips to Neon PostgreSQL on every keystroke.
- **Floating Matrix Dropdown Container:** When the debounced lookup string resolves, render an absolute-positioned floating dropdown mapping matching items to their relative internal dashboard routes (`/admin/dashboard?id=...` or `/client/messages`).

### 🏛️ 3. Page Layout Cleanup Refactoring
- Remove old localized inline page table filter text inputs from your primary page files to eliminate visual redundancy in search capabilities.

---

## 🔒 Verification & Compliance Criteria
- Requires complete type safety under strict TypeScript compiler flags with a ban on loose `any` variables.
- Automatically collapses or unmounts the floating results dropdown dashboard if the user fires an `Escape` keypress event or clicks anywhere outside the input bounds.
- Ensures zero data leak lines; a Client profile can never view search hits belonging to other corporate accounts under any structural scenario.
