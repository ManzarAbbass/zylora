# Action: test
Description: Scan implemented code layers, automatically compose typesafe unit tests for server mutations and utilities using Vitest, and verify comprehensive execution gates coverage.

## 🛠️ Step 1: Feature Code Inspection & Targeting
Before triggering any automated test suites, evaluate the workspace scope definitions:
1. Parse the active specifications inside `@context/current-feature.md` to cleanly understand what functional business requirements were implemented in this sprint loop.
2. Run a repository telemetry check to isolate all newly added or modified Next.js Server Actions (`actions.ts` files inside feature domains) and generic utility functions (`src/lib/` or feature-specific queries).
3. **Existing Harness Verification:** Scan the codebase directories to check if corresponding unit test files (`*.test.ts`) already exist for these specific targeted functions.

---

## ⚙️ Step 2: Automated Unit Test Composition (Vitest Engine)
For any newly introduced server actions or business utilities that contain testable conditional logic and lack active test scripts, programmatically construct a robust Vitest file structure following these criteria:

- **Target Domain Limit:** Focus testing scripts exclusively on backend Server Actions and foundational data-manipulation utility functions. **DO NOT** write unit tests for UI layouts, visual screens, or React layout components.
- **Bi-Directional Testing Blueprint:** Every generated test block must cover:
  1. *The Happy Path:* Validating successful data transactions when arguments comply perfectly with Zod schemas.
  2. *The Error/Exception Case:* Asserting proper try/catch response layouts, verification invalidations, and correct propagation of structural error messages to the frontend toasts layer.
- **Engineering Judgment Constraint:** Do not generate flat, redundant, or boilerplate tests just to maximize baseline line numbers. Write meaningful tests only where true computational branch logic or structural mutation matrix evaluations exist.

---

## 🏁 Step 3: Test Execution & Telemetry Coverage Reporting
1. Programmatically invoke the local terminal test harness runner inside the project root execution terminal:
   ```bash
   npm test
   ```
2. If any test asset fails, breaks, or throws unhandled promise warnings, abort the pipeline instantly and flag the precise file line numbers requiring engineering review.
3. Upon passing all unit test suites, run a secondary dynamic command to compute code coverage metrics for the newly introduced code assets:
   ```bash
   npm run test:coverage
   ```
4. Output a cleanly formatted corporate test scorecard summary panel displaying:
   - `[Total Functional Suites Run]`: Dynamic counts list.
   - `[Target Code Line Coverage]`: Percentage tracker values.
   - `[Verdict State]`: "TEST PIPELINE PASSED SUCCESSFULLY" or "REFRESH BLOCKS REQUIRED".
