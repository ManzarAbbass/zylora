# Feature Specification: Corporate Client Dashboard Base Layout (Phase 1 of 3)

> Status: ACTIVE 🚀
> Target Routes: `/src/app/client/layout.tsx` and `/src/app/client/dashboard/page.tsx`
> Module Domain: Corporate Workspace Frame, Shared Sidebar System & Analytics Layout Core

---

## 🎯 Architectural Intent
This phase builds the structural core scaffolding for the Zylora Corporate Client portal workspace (e.g., Ahmed Clothing view) mapping layout metadata precisely from the captured UI snapshot. It sets up the shared flexible grid container, the role-customized workspace navigation sidebar with live counters, a breadcrumb-driven header bar, and structural frames tracking personalized multi-series performance curves.

---

## 🔗 Architecture & Context References
The developer agent must evaluate and cross-verify implementation rules against these strict validation criteria:
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/client-dashboard-Ui-main.md` (Reading screen layout tokens)
* **Single Source of Truth Core Vectors:** `src/lib/mock-data.ts` (Utilizing `mockUserClient`, `mockCampaigns`, and extending structural metrics arrays)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Global Theme Canvas:** Base views execute a high-fidelity light slate backdrop layout context (`bg-[#f8fafc]` or matching slate gray primitives). Employs clean product-UI sans-serif layouts.
- **Sidebar & Top Bar Environments:** Shares the exact identical white system containers (`bg-[#ffffff]`) bounded by fine, clean line dividers (`border-slate-100`) and minimal soft drops shadows.
- **Accent & Hierarchy Markers:** Primary client navigation assets use functional **Zylora Blue (`#3B5FE0`)** for layout active accents. Trend chart area fills inherit brand blue gradients, while ad spend reference vectors utilize muted grey mapping states.

---

## 💻 Technical Layout Specifications

### 1. The Client Master Workspace Shell (`src/app/client/layout.tsx`)
Build an encapsulated layout component mirroring the exact structure of the admin framework, modifying role-scoped properties natively inside standard grid parameters (`grid-cols-[auto_1fr]`, `h-screen`, `overflow-hidden`):

* **The Left Collapsible Workspace Sidebar Panel:**
  - Standard desktop footprint layout width tracking bounds: `w-64`. Supports identical collapse actions toggled via top-right panel vector elements.
  - Logo Identity Label: Text element displaying `Zylora` paired with a secondary label: `/ B2B Client Portal` (clean UI tracking typography font).
  - Categorized Section Node Section: Labeled precisely as `BRAND WORKSPACE` (differs strictly from admin's agency classification title).
  - Corporate Portal Navigation Link Lists (Lucide React Icons Native Render):
    - `Campaign Analytics` (Icon: `BarChart3`, active configuration baseline displaying `#3B5FE0` background/text accent shifts)
    - `Approvals Queue` (Icon: `CheckCircle2`, appends a static dynamic notification numeric alert badge displaying precisely `4`)
    - `Performance Reports` (Icon: `FileText`)
    - `Agency Chat` (Icon: `MessageSquare`, appends a static dynamic notification numeric alert badge displaying precisely `1`)
    - `Workspace` (Icon: `Briefcase`)
  - Bottom Sidebar Block: Profile container card displaying avatar placeholder initials `"AC"`, text name layout parsing `"Ahmed Clothing"`, description subtitle `"Enterprise plan"`, and an interactive standalone settings gear icon widget.

* **The Upper Horizontal Client Action Header Layer (Top Bar Layout):**
  - Left Breadcrumb Module: Displaying compound labels stacked: `"CLIENT · CAMPAIGN ANALYTICS"` paired with subtitle text `"Welcome back, Ahmed"`.
  - Centered Search Input Container: Shared input element layout displaying placeholder text: `"Search clients, campaigns..."`.
  - Right Header Access Nodes: Mapped with an active simulated **Admin/Client toggle switcher component widget** (preset dynamically to the explicit Client selection index context state) alongside a standard notification bell icon.

### ⚙️ 2. The Client Dashboard Landing Content View (`src/app/client/dashboard/page.tsx`)
This page handles the injection of warmlly-toned brand graphics layers and core data viewport metrics frames:

* **Page Header Layout Block (Personalized Greeting Tone):**
  - Main Title: Large warm typography node displaying `"Good morning, Ahmed"`.
  - Subtitle Description Element: Text layout block displaying `"Here's how your campaigns are performing today"`.

* **4-Column Performance Client Stat Card Row (UI Spec Match):**
  Render a responsive layout grid row matching 4 distinct metric metrics cards. Reuses the structural icon top-right template layout displaying green tracking delta strings below:
  1. Card 1 (Revenue Attributed): Displays label `"Revenue attributed"`, Icon: `DollarSign`, numerical text value: `"$68,420"`, delta text text: `"+12.5% vs last month"`.
  2. Card 2 (Emails Delivered): Displays label `"Emails delivered"`, Icon: `Mail`, numerical text value: `"128,400"`, delta text: `"+15,200 scale"`.
  3. Card 3 (Open Rate): Displays label `"Open rate"`, Icon: `Percent`, numerical text value: `"42.8%"`, delta text: `"+1.4% progression"`.
  4. Card 4 (Click-through): Displays label `"Click-through"`, Icon: `MousePointerClick`, numerical text value: `"6.4%"`, delta text: `"+0.8% CTR optimization"`.

* **Main Area Data Curves Dashboard Graph Placeholder Layout:**
  Below the client metric components layout row, allocate an structured section card containing labels for subsequent graphics integration:
  - Title Heading Anchor Node: `<h2>Revenue Trend Graphical Tracking Baseline</h2>`
  - Additional Component Description Element: `<p>Dual-series Recharts Area+Line chart combination tracking attributed revenue versus ad spend over last 7 months (Jan-Jul) embeds inside this container layout segment in Phase 2.</p>`
