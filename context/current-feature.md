# Current Feature: Rate Limiting Shield

## Status: In Progress

## Goals

- [ ] Create `src/lib/rate-limit.ts` — initialize Upstash Redis with `@upstash/ratelimit` sliding-window strategies:
  - Login limiter: `slidingWindow(5, "900 s")` with prefix `@zylora/login-shield`
  - Recovery limiter: `slidingWindow(3, "3600 s")` with prefix `@zylora/recovery-shield`
- [ ] Inject IP-based rate limit checks at top of server actions in `src/features/auth/actions.ts`:
  - Login gate: check `loginRateLimiter.limit(`${ip}:${email}`)` before DB query or password hash
  - Recovery gate: check `recoveryRateLimiter.limit(ip)` before Resend mail trigger
- [ ] Return clean `{ success, data, error }` error responses when rate limit exceeded (no DB/mail touch)
- [ ] Frontend Sonner toast on rate-limit rejection with spec-matching warning copy
- [ ] Implement fail-open strategy: wrap Redis calls in try/catch, log warning, allow auth pipeline to proceed on Redis outage
- [ ] Zero `any` types — strict TypeScript throughout

## Notes

- **Env vars required:** `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- **Package:** `@upstash/ratelimit` (peer dependency on `@upstash/redis`)
- **IP extraction:** `headers().get("x-forwarded-for") ?? "127.0.0.1"` via `next/headers`
- **Toast message:** `"Too many security validation attempts. Your access vector has been rate-limited. Please try again later."`
- **Cross-ref specs:** `@context/features/forgot-password-spec.md` (recovery pipeline), `@context/project-overview.md` (closed B2B constraints), `@context/coding-standards.md` (typesafe `{ success, data, error }` pattern)
- **Fail-open constraint:** Redis downtime must not block auth — log warning and proceed
- **Phase 3 Enterprise** — Distributed serverless-compatible rate limiting via Upstash Redis

## History

- **2026-07-26** — Full B2B Credentials Token Validation Engine (Phase 2) implemented on `feature/full-b2b-credentials-token-validation-engine-phase-2`. Extended `src/auth.config.ts` with Credentials provider edge placeholder (`id: "edge-placeholder"`). Added Zod validation (`z.string().email()`, `z.string().min(8)`) to `src/auth.ts` with Drizzle `eq()` user lookup and `bcryptjs.compare()` password verification. Stripped simulation tester buttons from login page, bound standard form with `signIn("credentials")` flow, and wired Sonner error toasts with spec-matching copy. Premium Corporate Light Slate theme, strict TypeScript, zero `any` types. Built per `context/features/auth-spec-files/auth-phase-2-spec.md`.

- **2026-07-26** — Premium Session Dropdowns & Secure Sign-Out Core (Phase 3) implemented on `feature/premium-session-dropdowns-secure-sign-out-core-phase-3`. Created `UserAvatar` component (initials-fallback), integrated real `auth()` session into sidebar account blocks with Radix Popover showing email + Sign Out button. Built `/profile` page (corporate identity card with plan badge), `/settings` page (notification toggles, password visibility toggle, theme selection). Extended onboarding modal with CLIENT/ADMIN role selection, dynamic form (Package Tier hidden for ADMIN), Company Name field, and Resend email template differentiation. Added eye toggle to password fields on login and settings pages. Gear icon in sidebar opens menu with Profile/Settings links. Routes `/profile` and `/settings` protected via middleware. Built per `context/features/auth-spec-files/auth-phase-3-spec.md`.

- **2026-07-26** — Executive Intelligence Ledger & Deep-Linking (Phase 3 Matrix) implemented on `feature/admin-executive-reports-hub-deep-linking-phase-3-matrix`. Extended `src/features/clients/queries.ts` with `getAdminExecutiveReports()` — Drizzle inner join aggregating CLIENT users + campaigns + monthlyTrends for spend. Created `src/app/admin/reports/page.tsx` — async server component with "Executive Intelligence Ledger" header, 5-column data grid (Client Name, Campaigns, Spend, Revenue, Net ROI) with dollar formatting and amber/blue ROI coloring, overflow-x-auto responsive scroll, and live CSV export via server action + download button component. Existing sidebar "Financial Reports" nav item routes to `/admin/reports`. Premium Corporate Light Slate theme, strict TypeScript, zero `any` types, zero `'use client'` in page layer. Built per `context/features/admin-reports-spec.md`.

- **2026-07-27** — Administrative Platform Visual Analytics Hub (Phase 3 Component Integration) implemented on `feature/administrative-platform-visual-analytics-hub-phase-3-component-integration`. Created `src/features/analytics/queries.ts` with `getAdminGlobalAnalytics()` — 3 parallel Drizzle aggregations (monthly revenue/spend from `monthly_trends`, campaign performance from `campaigns`, avg open rate). Created 3 `'use client'` Recharts components in `src/app/admin/analytics/components/`: `global-trends-chart.tsx` (Area/Line combo), `campaign-performance-chart.tsx` (BarChart), `conversion-donut-chart.tsx` (PieChart). Created `src/app/admin/analytics/page.tsx` as async Server Component with responsive 2-column grid. Sidebar "Client Analytics" link already routed to `/admin/analytics`. Premium Corporate Light Slate theme, strict TypeScript, zero `any` types. Built per `context/features/admin-analytics-spec.md`.

- **2026-07-27** — Administrative Global Approvals Queue & Asset Re-Submission Engine (Phase 3) implemented on `feature/administrative-global-approvals-queue-asset-re-submission-engine-phase-3`.

- **2026-07-27** — Secure Credentials Forgot & Reset Password Pipeline (Phase 3 Extra) implemented on `feature/secure-credentials-forgot-reset-password-pipeline-phase-3-extra`. Extended `users` table schema with `resetToken`/`resetTokenExpires` columns. Created `requestPasswordResetAction` (crypto.randomUUID, 1hr expiry, Resend email delivery via onboarding@resend.dev) and `executePasswordResetAction` (token validation, bcryptjs 12-round hashing, token flush). Added gray "Forgot Password?" link to `/login`. Built `/forgot-password` page with email form and Sonner success toast. Built `/reset-password` page with Suspense-wrapped token extraction, new password + confirm fields, and redirect to `/login`. All crypto wrapped in try/catch. Zero `any` types, build clean. Built per `context/features/forgot-password-spec.md`. Extended `src/features/approvals/queries.ts` with `getGlobalAdminApprovalsQueue` — Drizzle inner join across `content_approvals` → `campaigns` → `users` returning Asset ID, Campaign Title, Client Company Name, Content Type, Preview URL, Status, Feedback, Created Timestamp, sorted by `createdAt DESC`. Extended `src/features/approvals/actions.ts` with `resubmitRevisedAssetAction` — sets `status → 'PENDING'`, clears `feedback → null`, revalidates `/admin/approvals` and `/client/approvals`. Created `src/app/admin/approvals/page.tsx` as Async Server Component. Created `AdminApprovalsGrid` client component with multi-column card grid, status badges (slate/emerald/amber), status-based sections (Pending Review / Changes Requested / Approved), `[Re-Submit Revised Deliverable]` button on REJECTED cards via `useTransition`, Sonner toasts, and empty state placeholder. Premium Corporate Light Slate theme, strict TypeScript, zero `any` types. Built per `context/features/admin-approvals-spec.md`.

- **2026-07-29** — Rate Limiting Shield loaded via `feature load rate-limiting-spec`. Spec defines two Upstash Redis sliding-window limiters (login 5/15min, recovery 3/1hr) with `@zylora/*` prefix namespacing, IP-based tracking, fail-open safety, and Sonner toast alerts.
