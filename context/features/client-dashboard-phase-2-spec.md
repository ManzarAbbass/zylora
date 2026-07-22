# Feature Specification: Corporate Client Analytics Graph Curve (Phase 2 of 3)

> Status: ACTIVE 🚀
> Target Route: `/src/app/client/dashboard/page.tsx`
> Module Domain: Client Performance Revenue Curves Visualization

---

## 🎯 Architectural Intent
This phase introduces the primary data-viz component into the Client Dashboard workspace interface. It replaces the phase 1 graphics placeholder canvas layout wrapper with an dual-series interactive Area and Line combination trend tracking chart layer utilizing Recharts engines.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/client-dashboard-Ui-main.md`
* **Single Source of Truth Core Vectors:** `src/lib/mock-data.ts` (Importing `mockAnalyticsMonthlyTrends` for visual graph curves loops)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Chart Card Environment:** Encapsulated in a pure white panel bounding surface (`bg-[#ffffff]`) layered with sharp whitespace grids, thin gray borders, and soft shadows.
- **Data Series Colors:** Primary execution line metric (Attributed Revenue) renders via an elegant filled Gradient Area curve using brand blue accents (`#3B5FE0`). Secondary reference comparison line metric (Ad Spend) maps via an ultra-thin neutral gray line overlay.

---

## 💻 Technical Layout Specifications

### 1. Analytics Graphics Title Matrix Layout
- Left Header Side: Visual card title layout tracking text block: `"Revenue trend"` paired with a small secondary caption text string reading: `"Attributed revenue vs. ad spend, last 7 months"`.
- Right Side Chart Legend Layout: Custom color-coded horizontal indicator dots tracking stacked labels matching the active graphics series entries:
  - Blue Indicator Dot -> Label string text: `"Revenue"`
  - Grey Indicator Dot -> Label string text: `"Spend"`

### ⚙️ 2. Dual-Series Interactive Recharts Chart Component
Integrate a responsive `<ResponsiveContainer>` component wrapping a customized `<ComposedChart>` architecture mapping properties from `mockAnalyticsMonthlyTrends`:
- **X-Axis Element Config:** Maps chronological monthly interval values tracking from `Jan` to `Jul`. Zero vertical grid lines enabled.
- **Y-Axis Element Config:** Maps financial value metrics boundaries scaling mathematically from `$0k` up to `$80k`. Enforces soft hair-line horizontal cartesian grid layout lines (`border-slate-100` context paths).
- **Series 1: Attributed Sales Area (`<Area>`)** -> Active primary metric node. Connects dots via fluid smooth curve algorithms (`type="monotone"`), fill background runs an elegant brand blue transparency gradient block overlay canvas loop.
- **Series 2: Operational Ad Spend Vector (`<Line>`)** -> Active secondary validation check node. Rendered as a minimalist thin layout tracking path line tracking over data marks seamlessly.
- **Interactive Tooltip Canvas (`<Tooltip>`)** -> Triggers on mouse hover interaction properties. Renders a small floating white slate overlay panel parsing localized monthly summary balances cleanly.

---

## 🔒 Verification & Compliance Criteria
- Explicitly demands the installation installation rules of the official typesafe `recharts` software package layout.
- Strictly rejects client bundle crashes; layout must declare client interactivity constraints (`'use client'`) cleanly at the file top line.
- Completely responsive frame behavior instantly resizing graphics outputs across diverse viewport sizes without page width overflow disruptions.
