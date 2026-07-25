# Action: explain
Description: Generate a high-utility technical document summarizing code mutations, individual file architectural impacts, and macro data/control flow dynamics.

## 🛠️ Step 1: Feature Context & Change-Set Discovery
Before compiling the explanation output structure, analyze the scope of modifications:
1. Parse the active specification benchmarks inside `@context/current-feature.md` to cleanly identify what feature domain logic was scheduled for implementation.
2. Execute a local version control terminal pipeline to dynamically extract the absolute array list of all created, deleted, or modified repository file paths matching the active sprint:
   ```bash
   git diff main --name-only
   ```

---

## ⚙️ Step 2: Line-by-Line File Analysis Protocols
For every single relative workspace path detected from the step above, the developer agent must compile a highly dense architectural explanation matching these conditions:
- **Path Mapping:** Explicitly state the exact relative repository path and its state modifier handle (e.g. `(new)` or `(modified)`).
- **Core Functional Descriptor:** Provide a hyper-focused 1-2 sentence engineering explanation of the module's target job, detailing why it was introduced or updated inside this repository branch context.
- **Pattern Telemetry Highlights:** Call out any critical typesafe interfaces, structural React hooks layout, modern Next.js server actions decorators, Drizzle SQL query matrices, or custom Tailwind v4 theme variables implemented inside the file.

---

## 🏛️ Step 3: Final Data Flow Synthesis (Control Connections)
- Conclude the document by abstracting away localized code changes to explain the high-level system framework architecture.
- Synthesize a concise architectural summary tracking exactly how these new modules pass variables, handle typesafe assertions, trigger client-side interactions states, and update table entries on the Neon Postgres cloud backend engine seamlessly.

---

## 🏁 Output Interface Layout Format Specification
The generated output report compiled by the agent on the terminal screen console must follow this exact markdown typography presentation structure strictly:

## Files Changed

**[path/to/file.ts]** (new)
Brief 1-2 sentence engineering explanation of what this file does, key functions/patterns used, and why it was added to the repository layout.

**[path/to/other.tsx]** (modified)
Precise architectural explanation of exactly what changed inside this module, key functional layout blocks updated, and why.

## How It All Connects
Brief high-utility summary mapping out the complete data hydration, state mutation, or control flow pipeline executing natively between these modified files inside the Zylora architecture.
