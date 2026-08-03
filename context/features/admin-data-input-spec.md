# Administrative Data Entry Terminal — Feature Specification

Status: In Progress
Target: Deploy the Administrative Data Entry Terminal inside the admin dashboard space.

## Goals

- Add a strict Zod validation schema `injectMetricsValidationSchema` tracking: `clientId` (string UUID), `channel` (enum: `EMAIL` | `META` | `GOOGLE` | `TIKTOK`), `spend` (coerced non-negative number), `revenueGenerated` (coerced non-negative number), and `emailsSent` (coerced non-negative integer).
- Implement a Next.js Server Action `injectClientLiveMetricsAction` accepting the schema variables wrapper.
- Implement a Drizzle upsert against the `campaigns` table keyed on BOTH `clientId` AND `channel`:
  - Row matched → overwrite `spend`, `revenueGenerated`, `emailsSent` natively.
  - No active row matched → insert a new campaign track for the enterprise client.
- Force cache-eviction loops on success:
  - `revalidatePath('/admin/dashboard')`
  - `revalidatePath('/admin/analytics')`
  - `revalidatePath('/admin/reports')`
  - `revalidatePath('/client/dashboard')`
  - `revalidatePath('/client/reports')`
- Add a high-density responsive client dialog modal at `src/app/admin/dashboard/components/` using Shadcn UI primitives and React `useTransition`.
- Mount a sleek gray action icon control button labeled `[Update Data Metrics]` right beside the campaigns table list entries inside the Admin control panel.
- Render form inputs inside a `#ffffff` modal card: Channel Platform dropdown + numeric inputs for New Spend, New Revenue, and Emails Sent with Light Slate tokens (`#f8fafc`).
- On submit invoke `injectClientLiveMetricsAction` inside a transition lifecycle. On success dismiss the modal and fire a Sonner toast reading precisely:
  `Enterprise telemetry logs successfully injected and synchronized across multi-tenant dashboards.`

## Notes

- 100% type safety, total ban on loose `any` fallbacks.
- Database code wrapped in try/catch for fail-safe resilience.
- Do not remove existing layout states or graphs configurations.
- `campaigns` table requires a native `spend` column to satisfy the native overwrite requirement.
- Migration applies to the Neon development branch only.
- Server Action returns the shared `{ success, data?, error? }` contract.
