# Feature Specification: Drizzle ORM & Neon Postgres Core Integration

> Status: ACTIVE 🚀
> Target Core Files: `src/db/schema.ts`, `src/db/index.ts`, and `drizzle.config.ts`
> Module Domain: Database Core Relational Framework & NextAuth Tables

---

## 🎯 Architectural Intent
This task establishes the concrete type-safe database layer for the Zylora B2B Portal. It maps all relational physical SQL tables (Users, Campaigns, Approvals, Messages) and fully instantiates NextAuth.js v5-compatible tables inside Drizzle ORM, connected to the Neon Serverless PostgreSQL backend.

---

## 🔗 Architecture & Context References
The developer agent must cross-verify implementation constraints against these tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading user identities, campaigns, and approvals data tables spec)
* **Strict Programming Standards:** `@context/coding-standards.md` (Strict Drizzle + Neon branch requirements)
* **Single Source of Truth:** `src/lib/mock-data.ts` (Ensuring structural alignment with currently running mockup layers)

---

## 🔒 Neon Branching & Environment Safety Constraints
- **Strict Migration Guardrail**: NEVER execute dangerous push actions (`db push`) against staging environments. Always create change tracking schemas locally via `drizzle-kit generate` and run files via `drizzle-kit migrate` within the development terminal.
- Everyday sandbox coding loops map cleanly via variables in `.env` to the Neon **`development`** database branch [⚡]. Production assets read configurations from `.env.production` inside live cloud deployment containers.

---

## 💻 Technical Code Specifications

### 1. Drizzle Compiler Configuration (`drizzle.config.ts`)
Create a root level TypeScript config file mapping exactly where the physical tracking data nodes export:
- Schema path: `./src/db/schema.ts`
- Out directory: `./src/db/migrations`
- Dialect: `postgresql`
- Database Credentials: Linked securely via `process.env.DATABASE_URL`.

### 2. Multi-Role Relational SQL Tables Schema (`src/db/schema.ts`)
Define the explicit Drizzle schemas executing clean Postgres data mappings. Include appropriate cascade deletes on linked columns:

* **Enums Creation**: 
  - `userRoleEnum` -> Options strictly bound to `'ADMIN'`, `'CLIENT'`.
  - `approvalStatusEnum` -> Options strictly bound to `'PENDING'`, `'APPROVED'`, `'REJECTED'`.
* **Users Table (`users`)**:
  - `id` (uuid, default random, Primary Key)
  - `name` (text, not null)
  - `email` (text, not null, unique)
  - `password` (text, not null - for hashed strings storage)
  - `role` (userRoleEnum, default 'CLIENT', not null)
  - `companyName` (text)
  - `packageName` (text - Growth / Pro / Enterprise)
  - `createdAt` (timestamp with timezone, default now)
* **Campaigns Table (`campaigns`)**:
  - `id` (uuid, default random, Primary Key)
  - `clientId` (uuid, references `users.id` with cascade deletion, not null)
  - `title` (text, not null)
  - `status` (text, default 'ACTIVE', not null)
  - `emailsSent` (integer, default 0, not null)
  - `openRate` (numeric precision 5 scale 2, default 0.00, not null)
  - `revenueGenerated` (numeric precision 12 scale 2, default 0.00, not null)
  - `updatedAt` (timestamp, default now)
* **Content Approvals Table (`content_approvals`)**:
  - `id` (uuid, default random, Primary Key)
  - `campaignId` (uuid, references `campaigns.id` with cascade deletion, not null)
  - `contentType` (text, not null)
  - `previewUrl` (text, not null)
  - `captionText` (text)
  - `status` (approvalStatusEnum, default 'PENDING', not null)
  - `feedback` (text)
  - `createdAt` (timestamp, default now)
* **Messages Table (`messages`)**:
  - `id` (uuid, default random, Primary Key)
  - `clientId` (uuid, references `users.id` with cascade deletion, not null)
  - `senderRole` (userRoleEnum, not null)
  - `messageText` (text, not null)
  - `createdAt` (timestamp, default now)

### 3. Serverless Database Initializer Client (`src/db/index.ts`)
Set up the pooled multi-session connector mapping cleanly to the Neon engine endpoint:
- Utilize `@neondatabase/serverless` client abstractions natively.
- Export a single queryable client token instance named precisely `db`.
