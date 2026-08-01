
# Feature Specification: Zylora Premium B2B Enterprise Homepage Mockup (Phase 3 Visual System)

> Status: ACTIVE 🚀
> Target Core Files: `prototypes/zylora-landing/index.html`, `prototypes/zylora-landing/styles.css`, and `prototypes/zylora-landing/script.js`
> Module Domain: B2B Omni-Channel Visulization, Pure Vanilla Frontend Vector Canvas, 60-FPS Collision Physics

---

## 🎯 Architectural Intent
This task creates a standalone, high-performance interactive marketing homepage mockup for Zylora inside the `prototypes/zylora-landing/` directory. It uses the "Chaos to Order" interactive framework to visualize how Zylora consolidates scattered, chaotic advertising networks (Meta, Google, TikTok, Email tracks) into a single, unified typesafe corporate dashboard ledger.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify interface patterns against these strict design tracks:
* **Master System Blueprint:** `@context/project-overview.md` (Aligning with Zylora's corporate multi-tenant enterprise goals)
* **Visual Theme Alignment:** `@context/zyloraUi/admin-dashboard.md` (To ensure the generated dashboard mockup matches the Premium Light Slate corporate theme)
* **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing clean, standard semantic structures with zero loose dependencies)

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate - UNIQUE B2B SYSTEM)
- **Canvas Base Color Profile:** Crisp clean light slate background (`#f8fafc`) paired with stark white structural grid cards (`#ffffff`).
- **Core Corporate Accent Fills:**
  - Primary Enterprise Target: Zylora Royal Blue (`#2563eb`)
  - Meta Advertising Track: `#1877F2` (Blue)
  - Google Adwords Track: `#EA4335` (Red)
  - TikTok Marketing Track: `#010101` (Deep Charcoal)
  - Direct Email/Resend Track: `#3B5FE0` (Indigo)
  - Custom Media Assets Track: `#ec4899` (Pink)

---

## 💻 Technical Code Specifications

### 1. Structure Blueprint Layout (`prototypes/zylora-landing/index.html`)
Build a semantic HTML5 template completely standalone from the internal application routers:
- **Sticky Executive Header Nav:** Fixed top header layout containing the Zylora wordmark, anchor links (`Features`, `Enterprise Pricing`, `API docs`), a gray `[Sign In]` button, and a solid Royal Blue `[Request Access Demo]` button.
- **The Core Visual Hero Section:** A balanced 3-column structural layout grid:
  1. *The Chaos Box (Left Canvas):* Titled `"Your Advertising Ecosystem Today..."` containing 8 scattered animated icon vector bubbles tracking disconnected channels (Meta Ads, Google Sheets logs, Slack ping channels, Email servers, detached analytics tabs).
  2. *The Transformation Vector (Center Canvas):* A corporate blue pulsing arrow pointing elegantly from left to right. On mobile screens, it automatically rotates 90° pointing down.
  3. *The Order Matrix (Right Canvas):* Titled `"...With Zylora Cloud"` showing a beautiful minimalist live dashboard layout preview showcasing simulated graphs, tenant filter capsules, and mock approval status logs.
- **Enterprise Tier Pricing Section:** Features a sliding pricing structure switch toggle (`Monthly Billing` vs `Annual Commit $720/year`). Shows a clear Pro corporate tier package table mapping B2B features list matrices.

### ⚙️ 2. CSS Visual Animations Framework (`prototypes/zylora-landing/styles.css`)
- Embed standard Tailwind CSS configuration layers or build ultra-clean native class attributes.
- Set transition curves (`transition-all duration-300 ease-in-out`) for all interactive card containers.
- Enforce smooth scrolling transitions across anchor links tags natively (`html { scroll-behavior: smooth; }`).

### 🏛️ 3. High-Fidelity Physics Interaction Script (`prototypes/zylora-landing/script.js`)
Build pure native JavaScript code using **`requestAnimationFrame`** loops to ensure 60-FPS continuous fluid layout transitions:
- **Chaos Vector Collision Engine:** 
  - Code an active velocity physics model where the 8 scattered chaos channel icons float around their container workspace autonomously, seamlessly bouncing off the container boundary wall edges.
  - **Mouse Repulsion Physics Hook:** Implement mouse position tracking event listeners (`mousemove`). When the admin cursor hovers close to any chaos icon, apply an inverse vector force to make the icon float away from the cursor pointer cleanly.
- **Dynamic Scroll Fade In Trigger:** Build an `IntersectionObserver` instance handler to automatically trigger soft fade-up animations as the user scrolls into view of the feature matrices blocks.

---

## 🔒 Verification & Compliance Criteria
- Must be 100% standalone inside `prototypes/zylora-landing/` with absolutely no dependency leakage into the core App Router system.
- Completely fluid and mobile-responsive layout matching, safely stacking columns vertically on viewport screens smaller than `768px` wide without clipping text weights.
- Guarantees zero runtime browser console exception flags or memory leakage within the infinite animation loops.
