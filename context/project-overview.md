# Zylora — Project Overview

>A premium, whitelabel B2B client portal and automated analytics dashboard for digital marketing agencies.
> Stack: Next.js 15 · React 19 · TypeScript · Drizzle ORM · Neon PostgreSQL · Tailwind v4 · ShadCN UI

---

## Problem

Digital marketing agencies struggle with data transparency, communication latency, and scattered asset verification when interfacing with corporate brand clients:

|Where| What lives there / Operational Mess|
|---|---| 
|Excel / Sheets|Manual entry of campaign performance data, open rates, and metrics logs|
|WhatsApp Groups|Fragmented ad-creative raw design asset uploads and unstructured caption approvals|
|Email Threads|Long, unorganized loops for project revisions, feedback notes, and updates|
|Shared Drives|Scattered historical data metrics, monthly performance pitch decks, and client invoices|

Zylora consolidates this entire corporate B2B operational pipeline into a unified, secure, real-time analytics and management workspace.

## Target Users 

|User|Core System Need|
|---|---| 
|Agency Admin|Onboards brands, provisions campaigns, updates metrics, and uploads creative assets|
|Corporate Client|Monitors live campaign graphs, executes creative approvals, and downloads summaries|

## Tech Stack

|Layer|Choice|
|Framewor|kNext.js 15 / React 19 (App Router, Server Actions ecosystem)|
|Language|TypeScript|
|Database|Neon PostgreSQL (Decoupled Serverless Cloud Stack)|
|ORM|Drizzle ORM|
|Caching|Upstash Redis|
|Queue / Crons|Upstash QStash|
|Outbound Mail|Resend API (Automated credentials transmission pipeline)|
|Auth|NextAuth.js v5 (Auth.js with Credentials Provider authentication)|
|CSS Layer|Tailwind v4 + ShadCN UI|

>⚠️ **Database Infrastructure Rule:** Never execute hazardous `db push` mutations inside active backend environments. Always generate and run deterministic migrations — in dev first, then prod.

---

## Monetization / Tiers (Package System)

### Growth Plan

- Max 3 active campaigns simultaneously
- Basic email tracking views
- Dedicated single-channel text communication
- No automated reporting metrics exports

### Pro Plan — $199/month
- Max 10 active campaigns concurrently
- Dynamic analytics graphical views
- Creative assets approval node enabled
- Clean corporate PDF report export functionality

### Enterprise Plan — $499/month
- Unlimited live operational campaigns
- High-fidelity visual trend graphics (Gradient filled curves)
- Premium priority dedicated synchronization channel
- Access to custom asset staging environments

> **During development:** All test client profiles have automated Pro/Enterprise access parameters unlocked.

---

## Features

### A. Role-Based Access Control & Gateways
> Perimeter Guard: Public registration pathways do not exist (`/register` route is entirely disabled).
> Unified Entry Gateway (`/login`): Admins and clients authenticate using a single card interface layout at `/login`. NextAuth middleware intercepts active tokens to run dynamic runtime redirects:
- token.role === 'ADMIN' → Secure redirect to /admin/dashboard
- token.role === 'CLIENT' → Secure redirect to /client/dashboard

### B. Automated Client Provisioning Pipeline
> Admin inputs core operational values inside a dashboard form (Client Name, Corporate Email, Assigned Tier Package).
> Form submission handles serverless transaction pipelines: saves user profiles, builds encrypted passwords (bcryptjs), updates Neon DB via Drizzle, and calls Resend API to instantly deliver keys: "Your workspace is ready. Access it using the temporary keys enclosed..."

### C. Client Campaign Performance Metrics Hub
> Interactive tracking metrics cards monitor active performance points:
- Total Emails Delivered / Target Ad Impressions
- Live Calculated Open Rate % / Click-Through Rate (CTR)%
- Aggregate Revenue Attributed to Operations
- Total Budget Spend to Date Balance
> Renders real-time progressive performance timelines using gradient-filled Recharts area curves styled in corporate focus shades.

### D. Centralized Creative Asset Approval Queue
> Agency managers upload live marketing assets directly to campaign tracking profiles.
> Client portals display active review modules where users execute state modifications: APPROVED (updates layouts instantly with toast triggers) or REJECTED (opens text input nodes to record structured feedback tags).

### E. Corporate PDF Report Generator
> Client side features an integrated rendering structure running local document compilation hooks (html2canvas + jspdf).
> Clicking [Download Performance Summary] freezes dashboard configurations, appends commercial layout blocks, compiles the layout into an optimized corporate PDF document, and forces a native browser file download.

### F. Internal B2B Messaging Interface
> Restricts random platform messaging leaks by capturing adjustments inside the dashboard. Clients append revision queries (e.g., "Can we execute a new campaign setup for Black Friday?") which route instantly to the core Agency Admin management desk panel.

--- 
## Data Models (Drizzle ORM Schema)

### User

```export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),                 // e.g., "Ahmed Clothing" or "Zylora Admin"
  email: text('email').notNull().unique(),      // e.g., ahmed@clothing.com
  password: text('password').notNull(),         // Fully hashed credentials string
  role: roleEnum('role').default('CLIENT').notNull(),
  companyName: text('company_name'),            
  packageName: text('package_name'),            // "Growth" | "Pro" | "Enterprise"
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```
### Campaign
```export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),               // e.g., "Welcome Series Emails"
  status: text('status').default('ACTIVE').notNull(), // ACTIVE, PAUSED, COMPLETED
  emailsSent: integer('emails_sent').default(0).notNull(),
  openRate: numeric('open_rate', { precision: 5, scale: 2 }).default('0.00').notNull(),
  revenueGenerated: numeric('revenue_generated', { precision: 12, scale: 2 }).default('0.00').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```
### ContentApproval
```export const contentApprovals = pgTable('content_approvals', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id').references(() => campaigns.id, { onDelete: 'cascade' }).notNull(),
  contentType: text('content_type').notNull(),  // e.g., "Email Copy", "Meta Graphic Assets"
  previewUrl: text('preview_url').notNull(),    // Cloudinary or Supabase Storage asset file link
  captionText: text('caption_text'),            
  status: approvalStatusEnum('status').default('PENDING').notNull(),
  feedback: text('feedback'),                   // Rejection notes written by client
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```
### Message
```export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  senderRole: roleEnum('sender_role').notNull(), // Tracks sender identification (ADMIN or CLIENT)
  messageText: text('message_text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

---
## UI / UX 

### Layout
```
┌────────────────────────────────────────────────────────────────────────┐
│  Sidebar Workspace Navigation Panel  │  Main Dynamic Administrative Canvas     │
│  (Pure White Canvas Background)      │  (Premium Slate Light Hue #f8fafc)      │
│                                      │                                         │
│  Zylora B2B Portal [Logo Widget]     │  [Header Element: Real-time Account Welcome]│
│                                      │                                         │
│  • Operational Overview Overview     │  ┌──────────────────────────────────┐   │
│  • Asset Approvals Queue [Count Alert]│  │ Metric Display Component Widget │   │
│  • Financial Reports Portfolio       │  │ (Revenue Metrics Tracking Module)│   │
│  • Channel Communications Hub        │  └──────────────────────────────────┘   │
│                                      │                                         │
│  [Active Identity Shell Component]   │  ┌──────────────────────────────────┐   │
│                                      │  │ Recharts Area Data Display Curve │   │
│                                      │  └──────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```
- **Sidebar:** Dynamic operational navigation actions routing triggers + current user tracking information profile widget. Collapses to minimalist mobile drawer layout profiles if required.
- **Main content panel:** Color-coded structural layouts. Corporate dashboards render analytics graphics data over clean light gray slate canvasses.
- **Data tracking matrices:** Items display on pure white container cards isolated with razor-thin line separators (border-slate-100) and minimal soft tracking shadows.
- **Data Curves:** Integrated responsive Recharts charts rendering curves built in premium deep corporate royal blue accents layout patterns.

### Design Principles

- Premium Light Corporate mode default configuration canvas framework rules. Strictly avoids coder themes.
- Design aesthetics standard vectors reference nodes matching Stripe, Linear, and Vercel analytics panels.
- Highly optimized typography hierarchies, clean generous white spacing allocations, hair-thin soft isolation borders.
- Responsive desktop-first application structures smoothly rendering tracking properties down to standard viewport layout dimensions.

### Reference UI
Refer to the files below as a base for the workspace visual layouts. Use them as solid configurations to style client interfaces:

- @context/zyloraUi/admin-dashboard-Ui-main.md
- @context/zyloraUi/client-dashboard-Ui-main.md

### Micro-interactions
- Smooth fluid CSS transition hooks on card states.
- Dedicated hover feedback response nodes on interactive workspace tables elements.
- Clean programmatic toast configurations firing status messages (sonner triggers).
- Fast loading shell component placeholders (Shadcn Skeleton blocks).

---

## Open Questions / Deferred Decisions
- [ ] Upstash Redis Memory Management Layer — Is caching absolutely required on Day 1 local staging?
- [ ] Multiple Admin Sub-Staff Allocation Rules — Deferred to Post-MVP scaling parameters.
- [ ] PDF Compilation Structural Boundaries — Decide exact layout matrix adjustments for exports.
- [ ] Email Delivery Validation Checks — Verify if custom domains configuration layer should execute during initial tests.