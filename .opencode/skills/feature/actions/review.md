# Action: review
Description: Parse active sprint goals, execute rigorous algorithmic code reviews on staged repository mutations, and deliver a definitive quality status verdict.

## 🛠️ Step 1: Context Extraction & Change-Set Tracking
Before initiating the code auditing engine, read the reference vectors inside the tracking files:
1. Parse the explicit checkbox items logged inside the `## Goals` block of `@context/current-feature.md` to establish the baseline criteria for success.
2. Run a local repository transaction tracking query to analyze all file creations, deletions, and line modifications introduced inside this active feature branch context.

---

## ⚙️ Step 2: Quality Gate Auditing & Boundary Checks
The evaluation engine must systematically inspect the code changes against the active specification layers, outputting exact structural tags based on these 4 verification dimensions:

*   **✅ Goals Met:** Confirm which specific sprint targets are 100% completed, fully typed, and cleanly integrated into the active interface pages.
*   **❌ Goals Missing or Incomplete:** Explicitly flag any functional specifications, data models hooks, or responsive UI properties that were logged in the goals list but are missing or partially built in the codebase.
*   **⚠️ Code Quality Issues or Bugs:** Scan code arrays strictly against the rules mapped in `@context/coding-standards.md`. Isolate any fallback use of `any` variables, improper Next.js server/client boundaries hydration cascading, missing try/catch blocks, or broken import paths.
*   **🚫 Scope Creep Guard:** Inspect for any unapproved code expansions, extra "nice-to-have" features layout, or unnecessary refactors of unrelated utility domains that bypass the explicit bounds logged under the active feature spec.

---

## 🏁 Step 3: Definitive Structural Verdict Output
1. Clear the console workspace screen and compile a beautifully formatted corporate audit report card summarizing the results from the evaluation gates above.
2. Deliver a final single actionable validation token status indicator at the base footprint of the terminal output:
   - **`[STATUS: READY FOR COMPLETION]`**: Triggered ONLY if all goals are cleanly completed with zero quality flags, zero compilation warnings, and zero scope creep anomalies.
   - **`[STATUS: CHANGES REQUIRED]`**: Triggered if any goals are missing, bug flags are identified, or scope boundaries are violated. Append the specific lines index layout that requires refactoring focus.
