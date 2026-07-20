# Feature Specification: Agency Admin Dashboard Base Layout (Phase 1 of 3)

> Status: ACTIVE 🚀
> Target Routes: `/src/app/admin/layout.tsx` and `/src/app/admin/dashboard/page.tsx`
> Module Domain: Agency Workspace Frame, Collapsible Sidebar & Navigation Core

---

## 🎯 Architectural Intent
This phase builds the structural core scaffolding for the Zylora Agency Admin portal based strictly on the captured UI snapshot metrics. It establishes the global multi-column grid layout, a responsive collapsible navigation sidebar with active telemetry badges, a centered action top-bar, and foundational numerical stat frames tracking multi-client operations.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify implementation metrics against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md` (Mapping layout snapshot schema parameters)
* **Single Source of Truth Vectors:** `src/lib/mock-data.ts` (Utilizing `mockUserAdmin`, `mockClientsList`, and extending for aggregate counters)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Global Theme Canvas:** Base views enforce a high-fidelity light slate background context (`bg-[#f8fafc]` or matching slate utilities). Strictly layout out functional sans-serif UI styling.
- **Sidebar & Top Header Navigation Elements:** Render as pure crisp white surfaces (`bg-[#ffffff]`) isolated via modern thin slate bounds (`border-slate-100`) and soft ambient drops shadows.
- **Visual Accent Anchor:** Active navigation item selections, primary action triggers, and stat icon bounding squares use functional **Zylora Dashboard Blue (`#3B5FE0`)** exclusively. Positive deltas map to crisp corporate emerald green.

---

## 💻 Technical Layout Specifications

### 1. The Admin Master Workspace Shell (`src/app/admin/layout.tsx`)
Build an encapsulated layout component utilizing a modern flexible grid split framework (`grid-cols-[auto_1fr]` or standard clean sidebar layout flex mappings) with full screen limits (`h-screen`, `overflow-hidden`):

* **The Left Collapsible Administrative Sidebar Panel:**
  - Standard structural desktop footprint width tracking bounds: `w-64`. Incorporates a collapse trigger icon on the top-right vector of the sidebar header row.
  - Logo Core Identity Layout: Text element displaying `Zylora` paired with a secondary label: `/ B2B Client Portal` (clean UI tracking typography font).
  - Categorized Section Node Section: Labeled precisely as `AGENCY WORKSPACE` (small uppercase text footprint).
  - Administrative Navigation Link Lists (Lucide React Icons Native Render):
    - `Operational Overview` (Icon: `LayoutDashboard`, active configuration baseline displaying `#3B5FE0` background/text accent shifts)
    - `Client Analytics` (Icon: `BarChart3`)
    - `Asset Approvals` (Icon: `CheckCircle2`, appends a static dynamic notification numeric alert badge displaying precisely `4`)
    - `Financial Reports` (Icon: `FileText`)
    - `Communications` (Icon: `MessageSquare`, appends a static dynamic notification numeric alert badge displaying precisely `3`)
    - `Settings` (Icon: `Settings`)
  - Bottom Sidebar Account Block: Pinned container at the base viewport layout displaying avatar placeholders with admin initials, text blocks parsing name `"Zylora Admin"`, role title `"Agency operator"`, and an interactive standalone settings gear icon widget.

* **The Upper Horizontal Admin Action Header Layer (Top Bar Layout):**
  - Horizontal canvas extension layer running full-width tracking along the upper grid border line.
  - Left Breadcrumb Module: Displaying compound labels stacked: `"ADMIN · OPERATIONAL OVERVIEW"` (small print) paired with subtitle text `"Welcome back, Zylora team"`.
  - Centered Search Input Container: A highly styled mockup input text control field block with prefix search icon element stating placeholder text: `"Search clients, campaigns..."`.
  - Right Header Access Nodes: Incorporates an active simulated **Admin/Client toggle switcher component widget** layer alongside an notification bell icon.

### ⚙️ 2. The Admin Dashboard Landing Content View (`src/app/admin/dashboard/page.tsx`)
This page handles the injection of macro performance aggregations panels and core content viewport grids:

* **Page Header Layout Block:**
  - Main Title: Large crisp typography node displaying `"Operational Overview"`.
  - Primary Action Submit Trigger: Positioned top-right of the layout block container, a solid full-color button layout stating `+ Onboard Client` (Background fill: `#3B5FE0`). Clicking this trigger fires a standard Sonner notification toast tracking: *"Client provisioning wizard sheet instantiated."*

* **4-Column Performance Aggregate Stat Card Row (UI Spec Match):**
  Render a responsive layout matrix matching 4 distinct statistical calculation cards. Each card template places a tinted rounded square icon wrapper on the top-right vector, a muted label, a bold massive numerical footprint, and a green tracking delta string below:
  1. Card 1 (Total Revenue): Displays label `"Total Revenue"`, Icon: `DollarSign`, numerical text value: `"$602,170"`, delta text: `"+18.4% MoM"`.
  2. Card 2 (Onboarded Clients): Displays label `"Onboarded Clients"`, Icon: `Users`, numerical text value: `"34"`, delta text: `"+3 this month"`.
  3. Card 3 (Active Campaigns): Displays label `"Active Campaigns"`, Icon: `Megaphone`, numerical text value: `"62"`, delta text: `"+8 vs last quarter"`.
  4. Card 4 (Avg. Open Rate): Displays label `"Avg. Open Rate"`, Icon: `Percent`, numerical text value: `"41.6%"`, delta text: `"+2.1% progressive"`.

* **Main Area Workspace Data Grid Base Frame:**
  Below the card layouts, allocate a clean placeholder panel framework containing structural labels for subsequent feature deployment:
  - Title Heading Anchor Node: `<h2>Onboarded Clients Management Schema Baseline</h2>`
  - Additional Component Description Element: `<p>Interactive client rows data grid table listing Ahmed Clothing, Northwind Coffee, and additional matrix entities embeds inside this viewport layout segment in Phase 2.</p>`
