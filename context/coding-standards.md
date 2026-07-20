# Coding Standards — Next.js 15+ / React 19 Serverless Layer

All codebase contributions inside this workspace must execute according to the modern serverless paradigm guidelines specified below.

## TypeScript
- Strict mode must remain enabled at all times.
- Zero fallback use of `any` types. Explicitly declare interface contracts or fallback to `unknown`.
- Define rigid interfaces/types for all component Props, Server Action payloads, and database parameters.
- Leverage implicit type inference where operations are transparent, apply explicit types where complexity increases.

## React
- Functional components exclusively combined with standard modern hooks configuration blocks (no class components).
- Keep component domains atomic: enforce single-responsibility behaviors per layout component.
- Abstract repeating workflow side-effects and data transformations cleanly into modular custom hooks.

## Next.js
- Server Components by default to maintain minimalist baseline client bundle weights.
- Enforce `'use client'` strictly at the border lines of active UI interactivity, React hooks usage, or browser global context executions.
- Leverage Next.js Server Actions for processing state updates, form submissions, and data manipulations.
- Restrict `/app/api/` routing engines exclusively to:
  - Third-party webhook handlers (Stripe, Resend, or inbound automation frameworks).
  - Background autonomous task routines orchestrating signature tokens (Upstash QStash Crons).
  - Specialized asset stream pipelines requiring explicit HTTP response header settings.

## Tailwind CSS v4 & Visual Styling
**CRITICAL CONSTRAINT**: We operate strictly under Tailwind CSS v4 running CSS-native theme configurations.
- **DO NOT** instantiate standalone JavaScript/TypeScript mapping scripts (`tailwind.config.ts` or `tailwind.config.js`). Those are deprecated legacy parameters.
- Core workspace brand parameters, custom sizing thresholds, and color primitives inject directly via the `@theme` runtime flag situated inside `src/app/globals.css`.
- **Theme Directive**: The system targets an executive demographic. Application enforces a **Premium Corporate Light Mode First** architecture pattern. Avoid dark coder themes or neon dashboard layouts.

Example Tailwind v4 baseline layout configuration inside `src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: oklch(98% 0.01 210);    /* Clean Light Corporate Slate Canvas */
  --color-card: oklch(100% 0 0);              /* Pure White Dashboard Containers */
  --color-primary: oklch(55% 0.21 260);       /* Elite Brand Royal Blue Focus Accent */
  --color-text-main: oklch(20% 0.02 220);     /* Deep Charcoal Luxury Typography */
}
```

## File Organization & Architecture Mapping
The repository implements a strict **Domain-Driven Feature-Centric Modular Architecture**. Never drop files loosely inside flat generic sorting folders:

```text
src/
├── app/                  # Application routing definitions, wrappers, and screen shell components
├── db/                   # Connection initializers, pool orchestration scripts, and static migration nodes
├── components/           # Primitives and shared UI elements (Shadcn tables, custom outer inputs)
└── features/             # Fully atomic self-contained functional business domains
    └── [feature-name]/
        ├── actions.ts     # Type-safe Next.js Server Mutations ('use server')
        ├── queries.ts     # Specialized backend database data extraction reads
        ├── schemas.ts     # Zod schema definitions handling client request assertions
        └── components/    # Feature-specific custom views (e.g., ApprovalWidget.tsx)
```

## Naming Conventions
- React Components: PascalCase (`ApprovalCard.tsx`).
- File Trees: Match interface descriptor names accurately using kebab-case for generic assets.
- Functions & State Contexts: camelCase (`processClientOnboarding`).
- Global Scope Constants: SCREAMING_SNAKE_CASE (`ZYLORA_MAX_CAMPAIGN_LIMIT`).
- Structural Schemas & Interfaces: PascalCase without prefixes.

## Database Core Operations (Drizzle ORM + Neon)
- Enforce type-safe **Drizzle ORM** for processing serverless SQL transactions against the Neon backend engine.
- **Strict Migration Guardrail**: Never bypass safety boundaries using dangerous unverified mutations (`db push`). Generate change tracking assets using `drizzle-kit generate` and apply files using `drizzle-kit migrate` operations inside the sandbox development terminal.
- Test changes exclusively inside the isolated Neon **development** branch before packing deployment assets to the master environment infrastructure.

## Request Validation & Exception Pipelines
- Intercept and process all user-supplied data mutations using robust **Zod validation schemas** before updating internal database tables.
- Encapsulate server logic execution flows within safe `try/catch` scopes.
- Standardized response formatting from Server Actions: return the unified `{ success: boolean, data?: T, error?: string }` pattern.
- Propagate exceptional results back to client runtimes to fire elegant visual user alerts using toast engines (`sonner`).

## Code Cleanliness
- Eliminate dead blocks, legacy commented out code segments, or unused utility references from production merge requests.
- Limit single function layouts below 50 lines to maximize component auditing speeds.
