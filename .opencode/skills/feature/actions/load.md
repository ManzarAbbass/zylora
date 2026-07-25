# Action: load
Description: Load an external feature specification module file or generate an inline sprint blueprint inside the active workspace tracking context.

## 🛠️ Argument Evaluation Engine Protocols
Scan the incoming parameters supplied inside the `$ARGUMENTS` context array after the `load` call flag and execute precise parsing routing logic:

1. **Filename Context Detection Constraint:** 
   - If the argument input parses as a **single discrete word containing no whitespace properties** (e.g. `client-campaigns-spec`):
   - Locate and extract the specification data by querying file structures at `@context/features/{name}.md` OR `@context/fixes/{name}.md` natively.
2. **Inline Input Processing Constraint:** 
   - If the argument input parses as a **multi-word text block sequence layered with whitespace properties** (e.g. `"add a responsive royal blue navigation header component"`):
   - Treat the raw string block directly as the inline feature definition token, and programmatically generate a clear structured checklist configuration grid mapping out the validation parameters.
3. **Empty Null Boundary Exception:** 
   - If the argument parameter is completely blank or missing:
   - Abort the execution pipeline immediately and throw an explicit terminal error stating: `[Error]: 'load' requires a valid spec filename configuration link or an inline feature description string input.`

---

## 🗃️ Tracking Layout Hydration Sequences (`@context/current-feature.md`)
Upon successful validation and extraction of the sprint data payload from the step above, permanently wipe any existing template parameters inside the active workspace and re-populate sections matching this explicit template layout structure:

*   **Header Selection Block Node:**
    - Rewrite the top H1 identifier element to tightly encapsulate the new active module scope name text: `# Current Feature: [Extracted Feature Title Context Here]`
*   **Operational Status Flag Layer:**
    - Explicitly hard-set the system execution baseline parameter block string exactly to: `## Status: Not Started`
*   **Success Verification Benchmarks:**
    - Write out the derived sprint task checklists as atomic, actionable checkbox items positioned natively under the structural block title: `## Goals`
*   **Constraints Context Framework:**
    - Map and append any supplementary system parameters, design file specifications references, or specialized code metrics under the tracking section title: `## Notes`

---

## 🏁 Execution Confirmation Feedbacks
- Output a premium formatted visual confirmation template terminal layout summary block once the filesystem transactions execute successfully.
- Display a quick-access summary report card on screen parsing fields:
  - `[Success]`: Target specification asset successfully loaded into current context tracking ledger.
  - `[Feature Context Locked]`: Display the value of the active module name.
  - `[Active Checkpoint State]`: Verification engine safely initialized at 'Not Started'.
