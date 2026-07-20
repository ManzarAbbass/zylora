# Zylora
A premium white-label B2B client portal and automated analytics dashboard for digital marketing agencies and enterprise corporate brands.

# Context Files
Read the following to get the full context of the project:
- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

# NeonDatabase — Default to Development

When working with Neon (via CLI, API, MCP, or direct queries), ALWAYS default to the zylora project and development branch. Never touch production unless explicitly told.
- **Project:** `zylora-b2b-portal` (Update with your exact Neon Project ID if different)
- **Production branch:** `br-live-prod-main` (name: `production`, primary) 
- **Development branch:** `br-sandbox-dev-env` (name: `development`)
- **API key:** `{env:NEON_API_KEY}` (set in `.env` or .env.production — never commit raw keys)
- **Connection string (dev branch):** postgresql://zylora_owner:[your-dev-password]@ep-[your-dev-pooler-id].neon.tech/neondb?sslmode=require

Usage rule:
- Any local terminal execution, migrations (drizzle-kit generate), or seed scripts → strictly connect via variables in .env to the `development` branch.
- Production deployment or build pipelines (npm run build) → use values from .env.production targeting the `production` branch exclusively. Never run hazardous schema drops or dangerous testing mutations against this branch.
<!-- END:neon-rules -->

# Bleeding Edge Next.js 15+ & React 19 Framework Runtime 
This version relies entirely on Server Components hydration models, Next.js Server Actions, and explicit type systems that break traditional Node/Express paradigms.

Core Constraints:
- No Standalone API Routes: Do not build standalone REST API routing endpoints inside /app/api/ vectors to handle standard frontend form actions, credentials adjustments, or card entry updates. Use type-safe Next.js Server Actions ('use server') partitioned inside modular features/ paths.
- API Directory Purpose: Keep the /app/api/ directory strictly reserved for structural external integrations like third-party automated inbound cron jobs (Upstash QStash) or secure payment webhooks.
- Explicit Redirection Checks: Implement session verification and role authentication checks (ADMIN vs CLIENT) directly inside dynamic layout files and Server Actions before data mutations execute:typescript

```import { auth } from "@/auth"; // NextAuth v5 Core abstraction layout

export async function processSecureMutation() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized B2B system mutation runtime execution path blocked.');
  }
}
```
# Executive Visual Design Standards
This portal interfaces directly with corporate executive brand managers and C-suite stakeholders. Follow these strict layout directives:
- No Dark Mode Default: Rejects typical high-contrast hacker templates or all-dark development grids. Maintain a highly professional Premium Corporate Light Slate Theme.

- Canvas System: Base backgrounds utilize soft light gray hues (#f8fafc or #f1f5f9). Layer main cards, dashboard data tracking tables, and sidebars on pure white surfaces (#ffffff) bounded by clean paper-thin boundaries (border-slate-100) and minimal soft drop shadows.
- Color Accent: Primary visual elements, Recharts area graphs curves, tracking status highlights, loading states, and core control actions use deep Royal Blue (#2563eb) or Indigo (#4f46e5) highlights exclusively.

- Closed Gate Protocol: Public user sign-up features do not exist. The system gateway resolves strictly via a unified credential validation card located at /login.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
