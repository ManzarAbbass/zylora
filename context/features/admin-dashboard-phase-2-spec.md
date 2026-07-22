# Feature Specification: Agency Admin Data Grid Matrix (Phase 2 of 3)

> Status: ACTIVE 🚀
> Target Route: `/src/app/admin/dashboard/page.tsx`
> Module Domain: Admin Core Data Table & Active Clients Ledger

---

## 🎯 Architectural Intent
This phase replaces the placeholder area inside the Admin Dashboard with a highly dense corporate data table matrix. It renders real-time information grids mapping from the mock-data repository and locks interactive filter components directly onto the screen layout.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/admin-dashboard-Ui-main.md`
* **Single Source of Truth Core Vectors:** `src/lib/mock-data.ts` (Importing `mockClientsList` for table loops)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Table Container Grid:** Wrapped inside a pure white background block (`bg-[#ffffff]`) with sharp rounded corners (`rounded-xl`), ultra-fine borders (`border-slate-100`), and clean soft tracking shadows.
- **Pill Badges & Status Indicators:** 
  - Package Tiers: Colored pills (Enterprise = Light Purple, Pro = Light Blue, Growth = Light Zinc/Slate).
  - Status Dots: Active state maps to green dot, Paused state maps to amber/orange dot layout tracking.

---

## 💻 Technical Layout Specifications

### 1. The Interactive Client Grid Header Row
- Left Side: Section Title displaying text `"Onboarded Clients"` (bold typographic font) and a small description caption below reading `"Manage corporate contract parameters and active campaign allocations."`
- Right Side Controls Layout:
  - Form Filter Element: An interface search input text block container with a prefix adjustment icon stating: `"Filter clients by city or status..."`.
  - Secondary Action Node: An explicit minimalist border button stating `+ Onboard Client` (Secondary visual trigger).

### ⚙️ 2. The Main Administrative Data Table Matrix
Construct a robust responsive custom data grid layer or HTML table layout. Map columns precisely according to the UI specification rules:
1. **Column 1: Client** -> Stacked layout. Avatar circle showing initials, adjacent to client name typography string (heavy weight, e.g. `"Ahmed Clothing"`) stacked above corporate client business email text (e.g. `ahmed@clothing.com` running small font size).
2. **Column 2: Package** -> Colored badge wrapper using the exact light pill mapping tokens corresponding to the client package tier.
3. **Column 3: Campaigns** -> Clean numeric footprint text tracking active campaigns totals.
4. **Column 4: Revenue** -> Muted currency dollar notation parsing financial matrix data metrics.
5. **Column 5: Status** -> Inline horizontal block container centering a colored status dot layout beside standard text tracking: `Active` or `Paused`.
6. **Column 6: Joined** -> Absolute timestamp calendar dates text formatting layout.

---

## 🔒 Verification & Compliance Criteria
- Completely typesafe loops parsing direct properties definitions from `mockClientsList` array context.
- Enforces responsive overflows tracking boundaries: table context horizontally scrolls smoothly (`overflow-x-auto`) when loaded inside thin screen constraints without snapping layout wrappers.
- No inline javascript script evaluations allowed; inputs run pure standard react state tracking.
