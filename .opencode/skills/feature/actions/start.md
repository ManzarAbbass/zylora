# Action: start
Description: Validate active feature context parameters, initialize an isolated development branch environment, and toggle tracking status to 'In Progress'.

## 🛠️ Step 1: Context Verification & Boundary Assertions
Before instantiating any file mutations or local server environments, inspect the contents of the root tracking file `@context/current-feature.md` cleanly:
1. Parse the structural `## Goals` block layer to check for populated task rows or verification checklists.
2. **Empty Slate Exception Guard:** If the `## Goals` section is completely blank, unpopulated, or contains placeholder tokens:
   - Abort the operational pipeline immediately and throw an explicit terminal error stating: `[Error]: Active context is empty. Please execute 'opencode feature load' with a target spec module before starting development.`

---

## ⚙️ Step 2: System Status Mutation & Branch Automation
Upon passing the validation gate above, proceed with automated filesystem and local version control system orchestration routines:
1. Locate the top `# Current Feature` H1 text heading row. Programmatically extract the active module title string.
2. Clean and format the title string to derive a standardized development branch token (convert spaces to hyphens, lowercase characters, and strip special punctuation parameters).
3. Execute a terminal Git shell command line call to securely create and switch onto an isolated workspace stream branch:
   ```bash
   git checkout -b feature/[slugified-feature-name-context]
   ```
4. Update the core operational parameter line inside `@context/current-feature.md` to precisely reflect the active implementation state:
   - `## Status: In Progress`

---

## 🏁 Step 3: Implementation Roadmapping & Visual Outputs
1. Clear the terminal interface canvas and output a beautifully formatted corporate confirmation layout block.
2. List out all extracted `## Goals` checklist items line-by-line onto the terminal screen as the definitive sprint roadmap tracker.
3. Append a concluding actionable directive to the developer agent stating: `"Workspace environments initialized. Execute code mutations matching the displayed goals list one-by-one."`
