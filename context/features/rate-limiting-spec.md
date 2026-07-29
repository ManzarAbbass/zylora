# Feature Specification: Secure Serverless Upstash Redis Rate Limiting Shield (Phase 3 Enterprise)

> Status: ACTIVE 🚀
> Target Core Files: `src/lib/rate-limit.ts`, `src/features/auth/actions.ts` (Extend Logic), and `src/app/login/page.tsx`
> Module Domain: Cyber Security Shield, Multi-Tenant Brute-Force Defense, Upstash Redis Namespacing

---

## 🎯 Architectural Intent
This task deploys a distributed, serverless-compatible rate-limiting infrastructure over Zylora's critical access pathways. By leveraging Upstash Redis inside our Next.js Server Actions execution flow, the system programmatically counts verification velocity based on client network IP signatures to mitigate Brute-Force matching attacks and prevent resource drain on the Resend API mail server.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify structural parameters against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Strict parameter: Closed B2B boundary constraints)
* **Auth Recovery Blueprint:** `@context/features/forgot-password-spec.md` (Securing reset pipelines)
* **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing the typesafe `{ success, data, error }` mutation return patterns)

---

## 💻 Technical Code Specifications

### 1. Dedicated Multi-Tenant Redis Limiter Utility (`src/lib/rate-limit.ts`)
Initialize the distributed in-memory token bucket registry using the existing `devstash` database keys. To avoid namespace collision with your old project, register a strict corporate prefix structure:
- **Client Factory Settings:** Instantiate `new Redis()` reading standard environmental variables: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- **Limiter Profile 1 (Credentials Sign-In Lock):**
  - Strategy: `Ratelimit.slidingWindow(5, "900 s")` (Restricts access to maximum 5 attempts per 15-minute window block).
  - Prefix Namespace Identification: Hard-set exactly to: `prefix: "@zylora/login-shield"`.
- **Limiter Profile 2 (Account Recovery Mail Lock):**
  - Strategy: `Ratelimit.slidingWindow(3, "3600 s")` (Restricts recovery requests to maximum 3 calls per 1-hour window block to prevent mail server spam).
  - Prefix Namespace Identification: Hard-set exactly to: `prefix: "@zylora/recovery-shield"`.

### ⚙️ 2. Core Server Actions Security Injection (`src/features/auth/actions.ts`)
Inject the rate limit checking block at the absolute first execution line of your authentication backend mutations:
- **IP Dynamic Telemetry Capture:** Extract the user's remote network identifier inside the server boundary safely:
  ```typescript
  import { headers } from "next-headers";
  const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
  ```
- **Action Gate 1 (Live User Login Call):**
  - Extract input data variables: `email` and `password`. Combine identifiers: `const trackingKey = `${ip}:${email}`;`
  - Execute check: `const { success, reset } = await loginRateLimiter.limit(trackingKey);`
  - **Exception Trigger:** If success returns `false`, abort the mutation instantly without querying Neon Postgres database or hashing. Return a clean typesafe response error block structure directly back to the interface layers.
- **Action Gate 2 (Forgot Password & Settings Form nodes):**
  - Check the incoming client IP signature against the recovery limiter window. If exceeded, drop execution immediately to stop outbound mail triggers.

### 🏛 =3. Frontend Interface Toast Alerts Propagation
- Ensure all forms wrapper components block loading states during active rejections.
- Catch the custom error status response payload cleanly and display a high-visibility human-readable warning notice using **Sonner toast layout alerts** stating precisely:
  `"Too many security validation attempts. Your access vector has been rate-limited. Please try again later."`

---

## 🔒 Verification & Compliance Criteria
- Requires absolute type-safety under strict TypeScript compilation with zero fallback utilization of `any`.
- **Fail-Open Strategy Constraint:** Wrap the Redis execution line inside a `try/catch` layer. If Upstash servers experience temporary downtime, log a warning console message locally but allow the core authentication pipeline to execute smoothly (Fail-Open safety checkpoint).
- Database metrics rows and Resend mail pipelines must remain 100% untouched when a request gets intercepted and throttled by Redis.
