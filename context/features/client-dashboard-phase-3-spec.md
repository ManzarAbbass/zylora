# Feature Specification: Client Approvals Queue & Pipeline Chat (Phase 3 of 3)

> Status: ACTIVE 🚀
> Target Routes: `/src/app/client/approvals/page.tsx` and `/src/app/client/messages/page.tsx`
> Module Domain: Asset Evaluation Grid, Action Nodes & Direct Agency Chat Pipeline

---

## 🎯 Architectural Intent
This final phase builds the functional core interface tools on the Client brand workspace side. It instantiates the interactive Creative Asset Evaluation Grid layout, creates actionable state management control button nodes, and completes the dedicated real-time looking client-to-agency messenger console panel.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **UI Design Visual Snapshot Spec:** `@context/zyloraUi/client-dashboard-Ui-main.md` (Tracking [badge: 4] Approvals Queue and [badge: 1] Chat indicators)
* **Single Source of Truth Core Vectors:** `src/lib/mock-data.ts` (Importing `mockContentApprovals`, `mockMessages`)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Corporate Light Slate)
- **Asset Review Cards:** Crisp white container units (`bg-[#ffffff]`) bounding a fixed media display frame, full text copy layers, and a horizontal flex row grid centering action buttons.
- **Micro-Interactions State Colors:** Clicking validation nodes alters element states visually. Approving highlights borders with green accents (`border-emerald-500`), while requesting revisions updates tracking variables with warning amber flags.

---

## 💻 Technical Layout Specifications

### 1. Centralized Creative Asset Approval Queue View (`/client/approvals/page.tsx`)
- **Page Header Context Title Node:** Large corporate bold text: `"Creative Assets Approval Queue"` paired with a status text reading `"Review and verify marketing copies and ad designs sent by Zylora Agency."`
- **The Media Asset Evaluation Grid:** Render a clean multi-column layout grid looping elements from `mockContentApprovals` array context variables:
  - **Asset Card Blueprint Header:** Displays text metadata parameters cleanly (e.g. Content Type string text `"Meta Creative Video/Banner"`).
  - **Visual Media Content Frame:** Standard image box container displaying placeholder images mapping high-fidelity asset image source targets tracking direct from `previewUrl` properties.
  - **Ad Copy Content Node:** A dedicated text callout container showcasing the exact marketing caption strings (`captionText`).
  - **Horizontal Interaction Controls Flex Row:** Centers two distinct button layout elements with standard micro-interactions configurations:
    - Button Node 1 (Approve): Text label `[Approve Deliverable]`. Clicking updates local card layout state dynamically, adds green ambient border drops, and triggers a Sonner alert toast: `"Asset reference successfully updated status context to APPROVED."`
    - Button Node 2 (Reject): Text label `[Request Revision]`. Clicking opens a sleek textarea container input block enabling custom text entries with a submit verification node.

### ⚙️ 2. The Direct Agency Pipeline Chat Page Layout (`/client/messages/page.tsx`)
- Implements a dedicated client communication terminal container layout mirroring the admin console logic.
- Loops and maps data metrics tracking directly from the `mockMessages` structure array context.
- Input submit hooks execute state modification loops to append custom text messages strings cleanly onto the mock data history list view without reloading pages.

---

## 🔒 Verification & Compliance Criteria
- Requires strict `'use client'` interactive component architecture declarations on top lines to enable local state management hooks.
- Aligns perfectly with the functional sans-serif Premium Light Slate look and whitespace tokens mapped inside system designs documents.
- Images container frames enforce strict scaling bounds (`aspect-video`, `object-cover`) to avoid breakages when external URL endpoints load inside viewport constraints.
