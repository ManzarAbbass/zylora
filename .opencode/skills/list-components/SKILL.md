# Skill: List Components

## Description
List project components inside the structural source directory tree natively.

## Schema Configuration
- **Name:** `list-components`
- **Argument Hint:** `[subdirectory]`

## Execution Target Protocol
List all React component files (`.tsx`, `.ts`, `.jsx`, `.js`) inside the `src/components/` folder framework. If a explicit `[subdirectory]` parameter is supplied via `$ARGUMENTS`, strictly isolate the lookup query to discover files situated matching only inside that specific sub-folder boundary path.

## Output Interface Format
1. Numbered list format tracking all detected workspace files with clean relative system paths.
2. Brief one-line functional explanation descriptor deduced directly from the component filename context.
3. Summary statistical integer accumulator count printed securely at the very end footprint.

*If zero component modules match the query constraints, output the absolute message: "No components found."*
