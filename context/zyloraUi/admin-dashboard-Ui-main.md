# Screen: Admin Dashboard — Operational Overview

## Layout
- Left sidebar (collapsible, collapse icon top-right of sidebar header): logo + "Zylora / B2B Client Portal" label top, "AGENCY WORKSPACE" section label, nav list (Operational Overview, Client Analytics, Asset Approvals [badge: 4], Financial Reports, Communications [badge: 3], Settings), user account block pinned bottom (avatar initials, name "Zylora Admin", role "Agency operator", settings gear icon).
- Top bar: breadcrumb-style label left ("ADMIN · OPERATIONAL OVERVIEW" + "Welcome back, Zylora team"), centered search input ("Search clients, campaigns..."), right side: Admin/Client toggle switch, notification bell icon.
- Page header: large title "Operational Overview", subtitle description, primary action button top-right ("+ Onboard Client", solid blue).
- 4-column stat card row: Total Revenue, Onboarded Clients, Active Campaigns, Avg. Open Rate — each card has label, icon (in tinted rounded square, top-right of card), large bold value, small green delta text below (e.g. "+18.4%", "+3 this month").
- Data table section below: header row ("Onboarded Clients" title + subtitle, filter input, secondary "+ Onboard Client" button), table columns: Client (avatar initials + name + email, stacked), Package (colored pill: Enterprise/Pro/Growth), Campaigns (number), Revenue (dollar value), Status (colored dot + label: Active/Paused), Joined (date).
- Floating toolbar overlay visible mid-table (annotation/comment tool icons — likely a design-review artifact, not part of the actual product UI).

## Content structure
- Role: Admin/Agency view — sees aggregate metrics across ALL onboarded clients.
- Stat cards: Total Revenue ($602,170), Onboarded Clients (34), Active Campaigns (62), Avg. Open Rate (41.6%) — all with positive month-over-month deltas.
- Table rows: 5 client accounts shown (Ahmed Clothing, Northwind Coffee, Lumen Skincare, Meridian Home, Kestrel Motors) with varying package tiers, campaign counts, revenue, and status (mostly Active, one Paused).

## Design notes
- Palette: white/light gray background, blue (#3B5FE0-ish) as primary accent (buttons, active nav item, stat icons), green for positive deltas, amber/orange for "Paused" status, light purple/blue pill for package tiers.
- Typography: clean sans-serif throughout (product-UI style, distinct from the marketing site's serif branding) — this is an internal tool, not the public-facing Zylora landing page.
- Consistent stat-card pattern (icon top-right, label, big number, delta) reused across both admin and client dashboards — establishes a shared design system between the two roles.
- Admin/Client toggle in top bar suggests this is a single portal with role-switching, not two separate apps.

## To build
- This is Zylora's internal B2B client portal (agency-facing admin view), separate from the public marketing landing page (see @context/zylora/hero.md etc.). Needs its own design token set — functional/dashboard-oriented (sans-serif, data-dense) rather than the marketing site's editorial serif+doodle style.
- Sidebar nav badges (4, 3) indicate pending-item counts — needs live state, not static.
