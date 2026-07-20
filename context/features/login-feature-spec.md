# Feature Specification: Unified Gateway & Role Simulation Panel

> Status: ACTIVE 🚀
> Target Path: `src/app/login/page.tsx`
> Module Domain: Authentication & Gateway Infrastructure

---

## 🎯 Architectural Intent
Zylora portal security dictates a closed perimeter. This task builds the universal entry gate (`/login`) that routes both Agency Administrators and Corporate Clients. Since we are in the mock data sprint, this screen incorporates a visual interface switch node to trigger simulated environment states safely.

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Main Canvas Backdrop:** Full-viewport wrapper running a subtle slate-gray canvas tone (`#f8fafc`).
- **Gateway Component:** Centered pure white card element (`#ffffff`) isolated via sharp modern corners (`rounded-xl`), ultra-fine line separation bounds (`border-slate-100`), and a soft ambient floating shadow depth (`shadow-sm`).
- **Typography Matrix:** Master branding header utilizes dense bold text (`text-slate-900`), secondary captions utilize clean corporate neutral zinc text (`text-slate-500`).
- **Visual Accent Anchor:** Interactive fields, rings focus triggers, and the primary submit button use elite **Royal Blue (`#2563eb`)** exclusively.

---

## 💻 Technical Layout Specifications

### 1. The Gateway Credentials Form Card
- **Branding Header Node:** Minimal text configuration layout tracking:
  - Title: `Zylora Portal` (Semantics: `<h1>`, heavy font, tracking-tight).
  - Subtitle: `Sign in to access your enterprise workspace management suite.` (`<p>`, small footprint).
- **Interactive Form Wrapper:** Includes standard typesafe input block layers tracking Native React or Tailwind v4 tokens:
  - **Email Block:** Incorporates a Lucide `Mail` icon asset inside the prefix padding. Label: `Corporate Email Address`. Input type: `email`. Input placeholder text: `name@company.com`.
  - **Password Block:** Incorporates a Lucide `Lock` icon asset inside the prefix padding. Label: `Secure Access Key`. Input type: `password`. Input placeholder text: `••••••••••••`.
- **Primary Submit Node:** A high-contrast, edge-to-edge solid block button spanning full width (`w-full`) displaying the text `Authenticate Credentials`. Focus rings match `--color-primary` (Royal Blue).

### ⚙️ 2. Internal Role Simulation Matrix (Testing Hook Component)
- Positioned natively directly underneath or wrapped within the login block framework container.
- Renders an clear structural helper badge label stating: `🛠️ Internal Workflow Simulation Engine`.
- Incorporates two decoupled, high-fidelity responsive mockup selection controls structured with standard clean borders:
  - **Admin Switcher Trigger:** Layout button labeled `Simulate Zylora Agency Admin`. Fills field values to display `admin@zylora.com` and fires a beautiful Sonner success notification toast layout stating: `"Admin credentials injected. Mode locked."`
  - **Client Switcher Trigger:** Layout button labeled `Simulate Ahmed Clothing Profile`. Fills field values to display `ahmed@clothing.com` and fires a beautiful Sonner success notification toast layout stating: `"Client session profile loaded. Mode locked."`

---

## 🔒 Verification & Compliance Criteria
- Must compile cleanly under strict TypeScript compilation routines without relying on loose `any` variables parameters.
- Utilizes purely native Lucide React structural asset elements (no hard-coded svg bundles).
- Avoids dark-mode color variations or code-editor code elements to ensure full premium light design alignment tracking.
- Implements state logic hooks internally to toggle and fill email string fields dynamically during manual mouse interaction testing loops.
