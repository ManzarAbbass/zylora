---
name: cleanup
description: Clean up project housekeeping tasks, audit environment synchronization, and eliminate stale artifacts (add "run" to execute fixes).
argument-hint: run|check
---

# Project Housekeeping & Optimization Workflow
Systematically reviews the workspace code layer, context directory trees, and server parameters to identify and purge structural drifts.

## 🔎 Core Housekeeping Inspection Checklist
The cleanup engine must scan the entire active repository tree to check for these 8 specific technical criteria:

1. **Chronological History Check:** Ensure that the completed milestone entries inside the `## History` block of `@context/current-feature.md` are ordered sequentially from oldest to newest.
2. **Telemetry Logs Audit:** Scan the entire `src/` directory to locate unnecessary or legacy `console.log()` statements that leak processing data to production browsers.
3. **Dead Imports Detection:** Analyze TypeScript imports across all workspace files to discover unused package dependencies or orphan module references.
4. **Stale Action Items Mapping:** Trace all `// TODO:` comment anchors left inside code files to verify if their goals are already completed or require immediate fixes.
5. **Orphaned Assets Discovery:** Search file paths to identify dead, unreferenced, or duplicate layout components that are not actively used in page trees.
6. **Context Sync Verification:** Cross-audit macro documentation inside `@context/` files to ensure descriptions completely match the actual current state of repository schemas and routes.
7. **Multi-Environment Variables Sync (.env vs .env.production):** Run an absolute validation loop to confirm that `.env.production` contains the exact identical array names of environment variables (such as `DATABASE_URL`, `RESEND_API_KEY`) as your local testing `.env` file (regardless of their backend values). Explicitly report any missing keys layout immediately.
8. **TypeScript Compiler Overrides Audit:** Identify any `@ts-ignore` or `@ts-nocheck` override statements that might be stale and are blocking native types checking integrations.

---

## 💻 Operational Execution Modes Protocol

The engine processes workflows based strictly on the parameter provided inside the `$ARGUMENTS` context array:

### Mode: Empty Parameter or "check" (Audit Staging Only)
- Perform non-destructive read-only queries across the entire repository canvas.
- **Strict Guardrail:** Do NOT apply any file modifications, line deletions, or environmental structural alters.
- Output a comprehensive, beautifully formatted report card listing what items and codes WOULD be cleaned up during an active fix run.

### Mode: "run" or "fix" (Interactive Remediation Pipeline)
1. First, perform the full auditing sweep and output a numbered summary report card detailing all detected drifts line-by-line onto the terminal screen.
2. Immediately pause execution flow and present an interactive user selection prompt asking:
   `"Which items would you like me to fix? (enter numbers like 1,3,5 or 'all' or 'none')"`
3. **Interactive Validation Lock:** Wait securely for explicit user keyboard response entries before implementing any file mutations or cleanups.
4. Only fix and refactor the specific numbered files or parameters the user explicitly designates.
5. Conclude the process by compiling a final summary report card detailing precisely what changed, where, and what bytes were securely saved on the filesystem infrastructure.
