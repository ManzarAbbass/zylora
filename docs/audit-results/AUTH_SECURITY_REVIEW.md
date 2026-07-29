# AUTH_SECURITY_REVIEW.md

## Metadata Tracking Banner

| Field | Value |
|-------|-------|
| **Audit Timestamp** | 2026-07-28T02:41:00Z |
| **Audit Engine** | opencode auth-auditor v1 |
| **Target Commit** | `git HEAD` |
| **Scope** | `src/features/auth/actions.ts`, `src/db/schema.ts`, `src/auth.ts`, `src/auth.config.ts`, recovery view pages, `src/app/settings/settings-form.tsx`, `src/app/settings/page.tsx` |
| **Methodology** | Static analysis per `.opencode/agents/auth-auditor.md` |

---

## Defect Triage Ledger

### High

| # | Vulnerability | File | Lines | Description | Remediation |
|---|--------------|------|-------|-------------|-------------|
| H1 | **Missing Rate Limiting on All Auth Endpoints** | `src/features/auth/actions.ts` | 19–60, 62–106, 108–148 | No rate-limiting gates exist on `changePasswordAction`, `requestPasswordResetAction`, `executePasswordResetAction`, or the credentials `signIn` path (`src/auth.ts:18–51`). An attacker can spray unlimited password guesses, reset-token requests, or reset attempts with no back-pressure. | Wrap each Server Action with a rate-limiter (e.g. Upstash Ratelimit, or a database-backed sliding window counter keyed on IP or session). Enforce: 5 forgot-password requests per email per hour; 10 password-reset attempts per IP per hour; 3 password-change attempts per session per 15 min. |
| H2 | **Reset Token Passed as URL Query Parameter** | `src/features/auth/actions.ts` | 82 | The reset token is embedded directly in the URL: `` `${resetUrl}?token=${token}` ``. This leaks the token via: (a) `Referer` header when the page loads external resources; (b) browser history and autocomplete; (c) server access logs and reverse-proxy logs; (d) any intermediate HTTP cache. | Move the token from a URL query param to a `POST`-only body field. On the reset page, collect the token from a hidden form field submitted via `POST`, never from `GET` search params. Alternatively, use a two-legged flow: send a link with a short-lived `code` that the page exchanges for the real token via a server-side fetch. |
| H3 | **Plaintext Reset Tokens in Database** | `src/db/schema.ts` | 17 | `resetToken` is stored as raw `text` (the UUID value). A database breach exposes all active reset tokens, enabling password compromise of every pending-reset account. | Store `SHA-256(token)` instead of the raw token. Look up by hashed value on reset. The email still carries the raw token — the database never sees it in plaintext. |

### Medium

| # | Vulnerability | File | Lines | Description | Remediation |
|---|--------------|------|-------|-------------|-------------|
| M1 | **Client Layout — Hardcoded Email** | `src/app/client/layout.tsx` | 12 | `getClientIdByEmail("ahmed@clothing.com")` is a hardcoded development placeholder. Every client user sees data belonging to the same hardcoded account. | Replace with `session.user.email` to scope the query to the authenticated user. |
| M2 | **No Session Role Verification in Layouts** | `src/app/admin/layout.tsx`, `src/app/client/layout.tsx` | 7, 11 | Both layouts call `auth()` but do **not** verify `session.user.role` matches the route namespace. An ADMIN accessing `/client/` or a CLIENT accessing `/admin/` would render the wrong layout with potentially wrong data. | After `auth()`, assert `session?.user?.role === 'ADMIN'` (admin layout) or `=== 'CLIENT'` (client layout); redirect or throw `notFound()` on mismatch. |
| M3 | **No Password Complexity Validation** | `src/features/auth/actions.ts` | 46, 129; `src/app/reset-password/page.tsx`, `src/app/settings/settings-form.tsx` | Only a minimum-8-char check exists (`minLength={8}`). No requirement for uppercase, lowercase, digit, or special character. Corporate security policies typically require higher entropy. | Add zod schemas for password fields that enforce: `min(8)`, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character. Apply in both the Server Action and the client form. |
| M4 | **Password Change Not Logged** | `src/features/auth/actions.ts`, `src/app/settings/settings-form.tsx` | 46–51, 57–63 | `changePasswordAction` silently updates the password with no audit trail. No record exists of when a password was changed, by whom, or whether it succeeded/failed. Critical for incident response. | Log password change events (user ID, timestamp, success/failure) to a dedicated `audit_logs` table or use structured logging with a persisted backend. |

### Low

| # | Finding | File | Lines | Notes |
|---|---------|------|-------|-------|
| L1 | **No Account Lockout on Failed Login** | `src/auth.ts` | 18–51 | Repeated credential failures do not trigger account suspension. Risk is partially mitigated by `H1` (once rate limiting is added). | Add a `failed_attempts` / `locked_until` column to the `users` table; increment on failed authorize; refuse login when `locked_until > now()`. |
| L2 | **Minor User-Enumeration Timing Leak** | `src/features/auth/actions.ts` | 62–106 | The action returns success for both found and missing emails (correct), but the execution path differs — missing emails skip the DB `update` and `resend.send()`, causing a measurable timing difference at the network layer. | Add a fixed `setTimeout` or `sleep` on the early-return path to normalize response time. |
| L3 | **`RESEND_API_KEY` Gating Is Silent** | `src/features/auth/actions.ts` | 11–13, 84 | When `RESEND_API_KEY` is unset, `requestPasswordResetAction` still returns `success: true` but never sends an email — the user is left waiting for a message that will never arrive. | Validate required env vars during app startup. If Resend is not configured, return a clear `error` from the action or, better, refuse to start the app. |
| L4 | **Missing `autoComplete`, `required`, `minLength` HTML Attributes** | `src/app/settings/settings-form.tsx` | 150–206 | Password inputs lack `autoComplete="current-password"` / `autoComplete="new-password"` and native `required` / `minLength={8}` attributes. Reset-password page (`reset-password/page.tsx`) has these correctly set — inconsistency leads to poor browser autofill behavior and one fewer defense layer. | Add `autoComplete="current-password"` to current password field, `autoComplete="new-password"` to new/confirm fields, and `required` + `minLength={8}` to all three password inputs. |

---

## Passed Checks Section

The following controls are implemented correctly and should be preserved:

| # | Check | File(s) | Rationale |
|---|-------|---------|-----------|
| ✅ P1 | **bcryptjs with 12 salt rounds** | `src/features/auth/actions.ts:46,129` | Password hashing uses `bcryptjs.hash(newPassword, 12)` — the prescribed 12-round cost factor. The `changePasswordAction` and `executePasswordResetAction` both comply. |
| ✅ P2 | **CSPRNG token generation** | `src/features/auth/actions.ts:74` | Reset tokens are generated via `crypto.randomUUID()` from Node's built-in `node:crypto` module, a cryptographically secure PRNG. |
| ✅ P3 | **1-hour token expiration** | `src/features/auth/actions.ts:75,117` | `expires = new Date(Date.now() + 3600000)` sets a precise 1-hour TTL. The lookup in `executePasswordResetAction` enforces `gt(users.resetTokenExpires, new Date())`. |
| ✅ P4 | **Token wiped on successful use** | `src/features/auth/actions.ts:135–136` | `resetToken: null, resetTokenExpires: null` is set atomically inside the same `update` call that sets the new password — guaranteeing single-use semantics. |
| ✅ P5 | **Session verification in Server Actions** | `src/features/auth/actions.ts:24–26` | `changePasswordAction` calls `auth()` at the top of the handler and rejects unauthenticated requests before any mutation. |
| ✅ P6 | **Session verification in layouts** | `src/app/admin/layout.tsx:7`, `src/app/client/layout.tsx:11` | Both admin and client layouts call `await auth()` and pass user data to the client component, preventing rendering of privileged UI for unauthenticated visitors. |
| ✅ P7 | **Login page parameter validation** | `src/auth.ts:21` | Zod schema `loginSchema` enforces `z.string().email()` and `z.string().min(8)` on credentials before any DB query. |
| ✅ P8 | **Ambiguous forgot-password response** | `src/features/auth/actions.ts:70–71` | Returns `success: true` even when the email is not found, preventing user enumeration via error messages. The UI message is equally ambiguous (`"If account exists…"`). |
| ✅ P9 | **Client-side password confirmation** | `src/app/reset-password/page.tsx:39–42` | The reset form validates password === confirmPassword on the client before calling the Server Action, reducing unnecessary network calls. |
| ✅ P10 | **`authorized` middleware callback** | `src/auth.config.ts:19–29` | Protects `/admin`, `/client`, `/settings`, and `/profile` routes at the NextAuth middleware layer, creating a defense-in-depth boundary before any layout renders. |
| ✅ P11 | **Settings page session gate** | `src/app/settings/page.tsx:7–8` | Calls `await auth()` and redirects to `/login` when no session exists, preventing unauthenticated access at the server component level. |
| ✅ P12 | **Fields cleared after successful password change** | `src/app/settings/settings-form.tsx:61–63` | All three password fields are reset to empty strings after a successful update, preventing accidental re-submission or shoulder-surfing of the new password in the DOM. |
| ✅ P13 | **Current password verification before update** | `src/features/auth/actions.ts:40–44` | `changePasswordAction` verifies the current password against the stored bcrypt hash before accepting the new password, preventing session-hijack-based password changes. |
