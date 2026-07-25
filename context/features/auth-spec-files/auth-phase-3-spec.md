# Feature Specification: Premium Session Dropdowns & Secure Sign-Out Core (Phase 3)

> Status: ACTIVE 🚀
> Target Core Files: `src/app/login/page.tsx` (Polish), `src/app/admin/layout.tsx` (Update), and `src/app/client/layout.tsx` (Update)
> Module Domain: Session UI Hydration, Reusable Custom Avatars, NextAuth SignOut Mutations

---

## 🎯 Architectural Intent
This final auth phase polishes the identity presentation layers across both portals. It maps real authenticated session variables (`name`, `role`, `email`) onto the left navigation sidebars, implements a reusable initials-fallback avatar rendering client, and wires up secure NextAuth v5 session destruction endpoints (`signOut`) inside functional dropdown/popover menus to replace flat mock text indicators.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify interface patterns against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Strict constraint: Enforce Closed B2B borders; No public registration pathways)
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard.md` and `client-dashboard.md` (To ensure precise dropdown styling alignment matching Vercel/Linear panels)
* **Authentication Core Framework:** `@context/features/auth-spec-files/auth-phase-2-spec.md`
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Dropdown & Popover Cards Layout:** Renders as a crisp pure white overlay banner (`bg-[#ffffff]`) fixed with fine hairline dividers (`border-slate-100`) and modern soft floating drop shadows (`shadow-md`).
- **Interactive Hover States:** Selection lines within menu rows toggle smoothly using light slate gray primitives (`hover:bg-slate-50`) paired with deep charcoal text typography. Danger paths (Sign Out) trigger soft muted red text indicators.

---

## 💻 Technical Code Specifications

### 1. Reusable Initials Fallback Avatar Component (`src/components/ui/user-avatar.tsx`)
Create a robust typesafe component to handle corporate identity avatars natively:
- **Properties Definition Interface:** Accepts an optional `image` string (e.g. from GitHub OAuth payload) and a required `name` string payload validation.
- **Rendering Logic Framework:**
  - If the user has an active image link: Render a native styled HTML `<img>` element or standard Next.js image node using clean boundary frames (`rounded-full`, `object-cover`).
  - Fallback Layout Node: If the image endpoint is null, extract the uppercase initial letters dynamically from the name input (e.g., `"Ahmed Clothing"` → `"AC"`, `"Zylora CEO"` → `"ZC"`). Render inside a structured circular badge utilizing a muted light slate context color palette.

### ⚙️ 2. Sidebar Identity Shell Integration (`src/app/admin/layout.tsx` & `src/app/client/layout.tsx`)
Refactor the pinned bottom account tracking blocks inside both responsive layout files to inject real NextAuth runtime hooks:
- **Data Session Hook Integration:** Replace hardcoded strings with the async `auth()` configuration check or client-side context hooks parameters seamlessly. Extract live data arrays mapping `session.user.name`, `session.user.email`, and `session.user.role`.
- **The Account Toggle Menu Matrix:** Wrap the bottom profile block element inside a clean Shadcn UI Popover or Dropdown Menu component widget layer. Clicking or interacting reveals an floating administrative context stack:
  - Line Item 1: Displaying current user email text (Muted, fine typography print).
  - Line Item 2 (The Log Out Trigger Node): An interactive full-width button component block displaying the explicit action label: `Sign Out from Workspace`.

### 🏛️ 3. Asynchronous Sign Out Server Mutations Logic
- Bind the NextAuth native session termination method directly into the click form trigger of the newly deployed `Sign Out` button block element natively:
  ```typescript
  "use server"
  import { signOut } from "@/auth";
  
  await signOut({ redirectTo: "/login" });
  ```
- Executing sign-out must instantly clear edge authorization memory tokens, terminate the secure JWT runtime pipeline, and perform an immediate hardware browser redirect routing the user back to the primary `/login` screen gateway panel.

---

## 🔒 Verification & Compliance Criteria
- Strictly rejects any generation of registration page files (`/register`) or public signup API endpoints to maintain a hardened corporate network footprint.
- Must compile cleanly under strict TypeScript compilation routines with zero usage of loose `any` properties definitions.
- **End-to-End Execution Validation:** Logging in with valid credentials, verifying the custom initials avatar displays instantly at the sidebar base layout grid, clicking the profile popover, and triggering `Sign Out` must smoothly drop cookies states and secure the application routing perimeter gates cleanly.
