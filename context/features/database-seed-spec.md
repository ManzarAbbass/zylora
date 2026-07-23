# Feature Specification: Relational Database Seeding Engine

> Status: ACTIVE 🚀
> Target Core File: `src/db/seed.ts`
> Module Domain: Testing Automation & Core Sample Entities Ledger

---

## 🎯 Architectural Intent
This phase creates a fully deterministic, automated seeding script for the Zylora platform inside Drizzle ORM. It loads local environment variables via `dotenv`, purges old sandbox entities, handles secure encryption hashing hooks (`bcryptjs`), and populates the database layout with high-fidelity production-ready rows matching both portals' Phase 3 visual specs.

---

## 🔗 Architecture & Context References
The developer agent must look at and cross-verify structural parameters against these strict tracking vectors:
* **Master System Blueprint:** `@context/project-overview.md` (Reading user identities and campaigns schemas)
* **Single Source of Truth Core Vectors:** `src/lib/mock-data.ts` (Ensuring parity between data layer data points and real DB metrics)
* **Strict Programming Standards:** `@context/coding-standards.md`

---

## 💻 Technical Code Specifications

### 1. Environment Loading & Dependency Check
- At the root top line of the script execution frame, parse the local environmental configuration wrapper via `import 'dotenv/config'`.
- Import the compiled `db` connector instance along with database schema objects (`users`, `campaigns`, `contentApprovals`, `messages`) from `src/db/schema.ts`.

### ⚙️ 2. Core Operational Seed Transaction Pipeline (`src/db/seed.ts`)
Inside an encapsulated asynchronous `main()` execution thread, perform these sequential database mutations:

* **Step 1: Clean Slate Cascade Purge**
  - Execute independent or sequential deletions on tables (`campaigns`, `contentApprovals`, `messages`, `users`) to ensure old duplicate entities are wiped before loading new sets.

* **Step 2: Onboard Agency Super Admin Account (`ADMIN`)**
  - Run secure bcrypt hashing processing code on raw string `"ZyloraAdmin2026!"` utilizing precisely `12` salting rounds.
  - Insert entity row into the `users` table layout: Name: `"Zylora CEO"`, Email: `"ceo@zylora.com"`, Role: `"ADMIN"`, CompanyName: `"Zylora Agency"`.

* **Step 3: Onboard Corporate Brand Account (`CLIENT`)**
  - Run secure bcrypt hashing processing code on raw string `"AhmedClient123!"` utilizing precisely `12` salting rounds.
  - Insert entity row into the `users` table layout: Name: `"Ahmed Clothing Team"`, Email: `"ahmed@clothing.com"`, Role: `"CLIENT"`, CompanyName: `"Ahmed Clothing Ltd"`, PackageName: `"Pro"`. Capture the generated UUID identifier string to route subsequent relations hooks.

* **Step 4: Provision Client Performance Campaigns**
  - Link and insert 2 starter campaigns into the `campaigns` table under the newly created Client UUID context:
    1. Campaign 1: Title: `"Welcome Email Series"`, Status: `"ACTIVE"`, EmailsSent: `5420`, OpenRate: `"42.50"`, RevenueGenerated: `12400.00`.
    2. Campaign 2: Title: `"Abandoned Cart Recovery Flow"`, Status: `"ACTIVE"`, EmailsSent: `1200`, OpenRate: `"38.00"`, RevenueGenerated: `4800.00`.

* **Step 5: Instantiate Pending Asset Approvals Queue Items**
  - Link and insert starter media mock tokens into the `content_approvals` table mapped onto Campaign 2 (`Abandoned Cart Recovery Flow` UUID context):
    - Content Type: `"Meta Creative Video/Banner"`.
    - Preview URL: `"https://unsplash.com"`.
    - Caption Text: `"Don't let your style wait in the cart! 🛍️ Use code RETAKE10 for an exclusive 10% off on your corporate attire sequence."`.
    - Status: `"PENDING"`.

* **Step 6: Log Initial B2B Chat Messages History**
  - Link and insert 2 sample cross-communication items into the `messages` table under the Client UUID context matching Phase 3 chat boxes layout:
    - Message 1: Sender: `"CLIENT"`, Message: `"Can we execute a new campaign setup for Black Friday launch week?"`.
    - Message 2: Sender: `"ADMIN"`, Message: `"Sure! We can easily orchestrate a high-converting automated setup. We'll have the strategy and copy ready for approval by Friday."`.

---

## 🔒 Verification & Error Handling
- Wrap the execution loop within structural `try/catch` handlers. Log clear success indicators with visual formatting markers onto the developer workspace terminal.
- Call `process.exit(0)` on smooth execution termination; catch exceptions to output explicit error logs before calling `process.exit(1)`.
