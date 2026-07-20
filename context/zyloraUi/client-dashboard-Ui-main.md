# Screen: Client Dashboard — Campaign Analytics

## Layout
- Left sidebar (same shell as admin dashboard): logo + "Zylora / B2B Client Portal" label, "BRAND WORKSPACE" section label (differs from admin's "AGENCY WORKSPACE" label), nav list (Campaign Analytics, Approvals Queue [badge: 4], Performance Reports, Agency Chat [badge: 1], Workspace), user account block bottom (avatar initials "AC", name "Ahmed Clothing", plan label "Enterprise plan", settings gear icon).
- Top bar: breadcrumb label left ("CLIENT · CAMPAIGN ANALYTICS" + "Welcome back, Ahmed"), centered search input (same placeholder as admin view), right side: Admin/Client toggle (switched to Client position here), notification bell.
- Page header: greeting-style title "Good morning, Ahmed", subtitle ("Here's how your campaigns are performing today").
- 4-column stat card row: Revenue attributed, Emails delivered, Open rate, Click-through — same visual pattern as admin cards (icon top-right, label, big value, green delta).
- Chart section below: "Revenue trend" card with subtitle ("Attributed revenue vs. ad spend, last 7 months"), legend top-right (Revenue / Spend, color-coded dots), area/line chart with two series (filled area for revenue, thin line for spend), month labels on x-axis (Jan–Jul), dollar labels on y-axis ($0k–$80k).
- Floating annotation toolbar overlay visible mid-chart (same design-review artifact icons as admin screenshot — not part of actual product UI).

## Content structure
- Role: Client view — scoped to a single brand's own data only (Ahmed Clothing), not aggregate across all clients.
- Stat cards: Revenue attributed ($68,420), Emails delivered (128,400), Open rate (42.8%), Click-through (6.4%) — all positive deltas vs. last month.
- Chart: 7-month revenue vs. spend trend, both trending upward, revenue growing faster than spend (widening gap toward Jul).

## Design notes
- Shares identical shell/component system with admin dashboard (same sidebar structure, top bar, stat-card pattern, color palette) — only nav items, section label, and data scope change per role.
- Greeting-style header ("Good morning, Ahmed") vs. admin's more formal "Welcome back, Zylora team" — client view is warmer/more personal in tone, admin view is more operational/neutral.
- Chart uses brand blue for revenue (primary metric) and muted gray for spend (secondary/reference metric) — visual hierarchy reinforces which number matters more to the reader.

## To build
- Same component library as admin dashboard (@context/zylora/11-admin-dashboard.md) — stat card, sidebar, top bar are shared/reusable components with role-based content swapped in, not separate implementations.
- Chart needs real data-viz library (recharts/d3) for the area+line combo with dual y-axis-style legend.
- Role toggle (Admin/Client switch in top bar) implies either a demo/preview mode for agency staff to view-as-client, or a genuine dual-role account — clarify which before building the toggle's actual behavior.
