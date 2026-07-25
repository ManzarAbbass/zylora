# Feature Specification: Full B2B Credentials Token Validation Engine (Phase 2)

> Status: ACTIVE 🚀
> Target Core Files: `src/auth.config.ts` (Extend), `src/auth.ts` (Extend), and `src/app/login/page.tsx` (Refactor)
> Module Domain: Credentials Provider, Bcrypt Verification, Role-Based Edge Redirections

---

## 🎯 Architectural Intent
This task fully activates the real credentials authentication engine for Zylora. It removes all testing simulation buttons from the login page interface, replaces them with standard form submission data nodes, and configures NextAuth v5 to read credentials (`email` and `password`), run decryption checks via `bcryptjs`, and validate signatures directly against the Neon PostgreSQL production database rows using Drizzle ORM.

---

## 🔗 Architecture & Context References
The developer agent must cross-verify system behaviors and validation rules against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Explicit rule: No public registration allowed)
* **Single Source of Truth Vectors:** `src/db/seed.ts` (Targeting seeded `ceo@zylora.com` and `ahmed@clothing.com` credentials profiles)
* **Authentication Split Blueprint:** `@context/features/auth-spec-files/auth-phase-1-spec.md`
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 💻 Technical Code Specifications

### 1. Edge Configuration Extension (`src/auth.config.ts`)
Extend the existing configuration file to register the placeholder for credentials handling, ensuring zero database client dependencies are imported into this edge file boundary line:
- **Credentials Provider Placeholder:**
  - Inject the modern `Credentials` provider class layout natively inside the `providers` array.
  - Hard-set the initial `authorize` callback signature to return `null` explicitly: `authorize: async () => null`. This placeholder satisfies edge build parameters.

### 🗄️ 2. Production Database Core Validation (`src/auth.ts`)
Override the `Credentials` provider settings inside the main engine file to implement concrete verification layers utilizing full Drizzle SQL query utilities:
- **Zod Request Assertion Handling:** Intercept incoming login requests payload using a rigid Zod compilation validation schema enforcing formatting checks: `email: z.string().email()` and `password: z.string().min(8)`.
- **Database Identity Query:** Query rows inside the Neon Postgres `users` table matching the verified email input: `eq(users.email, validatedEmail)`. If no row is discovered, throw a strict NextAuth exception.
- **Bcrypt Encryption Matching:** Extract the stored hashed password string from the database user record layer. Utilize **`bcryptjs.compare()`** asynchronously to evaluate the incoming plaintext password string against the hashed token string.
- **Profile Token Aggregation:** If encryption validation passes with 100% precision, return the clean typesafe user profile object container mapping attributes `id`, `name`, `email`, and `role` to hydrate session tokens.

### 🏛️ 3. Login Interface Production Refactor (`src/app/login/page.tsx`)
Completely wipe and strip out the temporary simulation tester buttons grid framework container to secure the production environment, and lock down standard secure credential forms:
- **Form Actions Logic:** Bind standard client states handles (`useState`) or native Next.js Server Actions directly onto the input email and password field modules.
- **Submission Trigger execution:** When the user hits `[Authenticate Credentials]`, initiate the asynchronous login trigger node natively:
  ```typescript
  import { signIn } from "@/auth"; // Or corresponding client side next-auth/react handlers
  
  const result = await signIn("credentials", {
    email: inputEmail,
    password: inputPassword,
    redirect: true,
  });
  ```
- **Error Propagation Metrics:** Wrap authentication transactions within solid exception gates to catch bad login states (e.g. wrong passwords or missing accounts) and propagate human-readable warnings to the user via Sonner toasts layout elements stating: `"Invalid credentials provided. Please double-check your security tokens."`

---

## 🔒 Verification & Compliance Criteria
- Strictly blocks the creation of any standalone `/api/auth/register` endpoints or sign-up page paths to maintain closed perimeter layouts.
- **Manual End-to-End Live Validation:** 
  - Submitting `ceo@zylora.com` with password `"ZyloraAdmin2026!"` must clear the edge middleware and instantly route the browser to `/admin/dashboard`.
  - Submitting `ahmed@clothing.com` with password `"AhmedClient123!"` must validate credentials and instantly route the browser layout to `/client/dashboard`.
- Any invalid credentials string attempt must fire a Sonner notification warning block layout immediately without crashing client sessions.
