# Feature Specification: Secure Credentials Forgot & Reset Password Pipeline (Phase 3 Extra)

> Status: ACTIVE 🚀
> Target Core Files: `src/db/schema.ts` (Extend), `src/features/auth/actions.ts`, `src/app/forgot-password/page.tsx`, and `src/app/reset-password/page.tsx`
> Module Domain: Account Recovery, Crypto Tokens, Resend Outbound Links, Password Re-Hashing

---

## 🎯 Architectural Intent
This task implements a secure self-service password recovery flow. It removes manual database edits for lost keys, adding custom routing views for recovery request submission and password updates. It leverages the Resend API to deliver signed, time-locked validation links to verified user inboxes seamlessly.

---

## 🔗 Architecture & Context References
* **Master System Blueprint:** `@context/project-overview.md`
* **Authentication Split Configuration:** `@context/features/auth-spec-files/auth-phase-2-spec.md`
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 🎨 Visual Design Standard (Premium Functional Corporate Light Slate)
- **Recovery Layout Frames:** Independent modular container cards centered neatly over the base slate canvas (`bg-[#f8fafc]`). Panels feature pure white sheets (`bg-[#ffffff] border border-slate-100 shadow-sm`).
- **Interactive Action Buttons:** Form controls utilize the standard Zylora Royal Blue accents (`bg-[#3B5FE0] hover:bg-[#2A4CC7] text-white focus:ring-2`) paired with dynamic Sonner notification statuses.

---

## 💻 Technical Code Specifications

### 1. Database Schema Extension (`src/db/schema.ts`)
Extend the existing `users` table definitions to append two secure recovery monitoring attributes natively:
- `resetToken`: Custom text column (accepts randomized unique string tokens, defaults to null).
- `resetTokenExpires`: Custom timestamp column (tracks token validity matrix milestones, defaults to null).

### ⚙️ 2. Recovery Orchestration Server Actions (`src/features/auth/actions.ts`)
Create secure typesafe mutations executing the standard return pattern `{ success: boolean, data?: any, error?: string }`:
- **Action 1 (`requestPasswordResetAction`):**
  - Accepts an explicit `email` string argument. Verifies rows in the `users` table matching the input email.
  - Automatically generates a secure random token string using native `crypto.randomUUID()`.
  - Calculates an expiration boundary exactly 1 hour into the future (`new Date(Date.now() + 3600000)`).
  - Updates the targeted user row to store the token and expiry data parameters.
  - Invokes the **Resend API Client** to deliver the recovery link:
    * `from`: Must utilize the sandbox target `'Zylora Security <onboarding@resend.dev>'`.
    * `to`: Maps directly to the user's registered corporate email.
    * `html`: Renders a premium button linking to: `[APP_URL]/reset-password?token=[TOKEN_STRING]`.
- **Action 2 (`executePasswordResetAction`):**
  - Accepts parameters: `token` string, `newPassword` string.
  - Queries the `users` table matching `eq(users.resetToken, token)` AND checks if `users.resetTokenExpires` is greater than the current timestamp.
  - If token checks fail or expire, return an explicit error.
  - If token is valid, encrypt the new plaintext password utilizing `bcryptjs` (exactly 12 salting rounds).
  - Updates the user row with the new password hash, and completely flushes the `resetToken` and `resetTokenExpires` columns back to `null`.

### 🏛️ 3. Interface Views Implementation & Layout Links
- **Login Link Update (`src/app/login/page.tsx`):** Embed a text link right below the password input field: `<Link href="/forgot-password">Forgot Password?</Link>`.
- **Request Page (`src/app/forgot-password/page.tsx`):** A minimalist single-input form capture component. Submitting the email invokes `requestPasswordResetAction` and displays a Sonner success toast: `"If account exists, a secure recovery token has been transmitted directly to your corporate desk."`
- **Reset Form Page (`src/app/reset-password/page.tsx`):** Extract the URL token string using parameters hooks. Renders New Password inputs. Submitting invokes `executePasswordResetAction`, flushes memory nodes, and triggers an immediate client redirect routing the user back onto `/login`.

---

## 🔒 Verification & Compliance Criteria
- Enforces absolute type safety with zero utilization of fallback loose `any` variables.
- Clears out security token parameters immediately from the database once a reset executes successfully to prevent link replay exploits.
- Wrap all cryptography, token checking, and password hashing loops safely inside tight try/catch exception wrappers.
