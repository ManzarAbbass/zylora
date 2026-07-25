# Feature Specification: Typesafe NextAuth v5 & Drizzle Edge Protection Gateway (Phase 1)

> Status: ACTIVE 🚀
> Target Core Files: `src/auth.config.ts`, `src/auth.ts`, `src/middleware.ts`, `src/app/api/auth/[...nextauth]/route.ts`, and `src/types/next-auth.d.ts`
> Module Domain: B2B Authentication, Edge Guards, Role-Based Route Redirection

---

## 🎯 Architectural Intent
This task configures NextAuth.js v5 (Auth.js) combined natively with the `@auth/drizzle-adapter` over Neon PostgreSQL. To ensure Vercel edge deployment compatibility, the architecture enforces the split-config pattern. It intercepts incoming dynamic routing requests at the edge server layer to block unauthenticated users, checks user roles (`ADMIN` vs `CLIENT`), and implements secure credentials verification.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify structural parameters against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading dynamic user profiles, credentials hashing logic, and role paths)
* **Database Infrastructure Schema:** `src/db/schema.ts` (Targeting users table and custom `userRoleEnum`)
* **Strict Programming Standards:** `@context/coding-standards.md` (Enforcing Typesafe Next.js 15+ execution patterns)

---

## 💻 Technical Code Specifications

### 1. Edge-Compatible Strategy Bridge (`src/auth.config.ts`)
Create a root level specification configuration file. To prevent edge runtime bundle breaks, this file must **NOT** import the Drizzle database client or database instances:
- **Session Strategy:** Hard-set explicitly to `session: { strategy: "jwt" }`.
- **Providers Matrix Configuration:**
  - **Credentials Provider:** Implements form fields authorization matching email and password strings. It runs a server-side runtime verification check: hashes input passwords utilizing `bcryptjs` and asserts parameters against seeded schemas layout.
  - **GitHub OAuth Provider:** Integrated cleanly utilizing system credentials mapping tokens.
- **Authorization Callbacks Engine (`auth` middleware block):**
  - Intercepts requests tracking route lines. If a user tries to access `/admin/*` or `/client/*` without an active session token, force a hard redirect back to the central `/login` layout.

### 🗄️ 2. Full Core Authentication Engine (`src/auth.ts`)
Create the secondary orchestration file combining the configurations with our database schemas layer:
- Import the base configurations from `src/auth.config.ts`.
- Import the compiled `db` connector client and table definitions from `src/db/`.
- Instantiate the full pipeline using `adapter: DrizzleAdapter(db)`.
- **JWT & Session Callbacks:** Extend token properties. When a session triggers, read the user row fields from the database and inject `token.role`, `token.companyName`, and `token.id` securely inside the user session state object wrapper.

### 🏛️ 3. NextAuth API Route Handler (`src/app/api/auth/[...nextauth]/route.ts`)
Instantiate the automated App Router routing endpoints:
- Import the typesafe network handlers from `src/auth.ts`.
- Export the HTTP verb vectors exactly as: `export const { GET, POST } = handlers`.

### 🛡️ 4. Global Edge Route Protection Guard (`src/middleware.ts`)
Create the master Next.js middleware file at the root of `src/` directory to lock route boundaries cleanly:
- Export the session authorization checker as the global middleware router:
  ```typescript
  import NextAuth from "next-auth";
  import authConfig from "./auth.config";
  
  export const { auth: middleware } = NextAuth(authConfig);
  ```
- **Matcher Configuration Array:** Target strict routing directories matching:
  ```typescript
  export const config = {
    matcher: ["/admin/:path*", "/client/:path*"],
  };
  ```

### 🏷️ 5. NextAuth Module Types Extension (`src/types/next-auth.d.ts`)
Extend NextAuth module type declarations natively to guarantee zero TypeScript flags inside layout files:
```typescript
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "ADMIN" | "CLIENT";
    companyName?: string | null;
  }
  interface Session {
    user: {
      id: string;
      role?: "ADMIN" | "CLIENT";
      companyName?: string | null;
    } & DefaultSession["user"];
  }
}
```

---

## 🔒 Verification & Compliance Criteria
- Strictly demands absolute type-safety with zero fallback usage of loose `any` values.
- **Role Router Verification:** Logging in with `ceo@zylora.com` must intercept tokens and safely redirect layouts to `/admin/dashboard`. Logging in with `ahmed@clothing.com` must route tokens cleanly to `/client/dashboard`.
- All password validation algorithms must execute safely within try/catch scopes.
