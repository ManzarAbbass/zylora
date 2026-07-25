# Action: complete
Description: Execute local repository commits, safely merge verified feature streams onto the main production line, clean tracking branches, and archive sprint logs into history.

## 🛠️ Step 1: Staging & Atomic Conventional Commit
Before initiating any branch switching actions, execute clean version control transactions locally:
1. Stage all remaining verified code assets and configuration updates inside the current workspace.
2. Formulate a highly descriptive commit message matching Conventional Commits rules derived from the change metrics (e.g. `feat(client): implement creative asset approval database mutations`).
3. Execute the local repository commit transaction sequence cleanly.

---

## ⚙️ Step 2: Main Merging Integration & Local Branch Cleanup
Transition the repository state to the master tracking line using strict sequential shell commands:
1. Safely switch back to the master production branch pipeline:
   ```bash
   git checkout main
   ```
2. Merge the completed feature branch streams natively onto the production timeline without executing an immediate server push operation:
   ```bash
   git merge feature/[slugified-feature-name]
   ```
3. Permanently wipe and delete the local feature branch tracker from the workspace to maintain clean repository trees:
   ```bash
   git branch -d feature/[slugified-feature-name]
   ```

---

## 🗃️ Step 3: Context Log Resetting & Archiving (`@context/current-feature.md`)
Perform a filesystem transaction to archive completed targets and refresh the workspace tracking context files for the next sprint loop:
1. Extract the active sprint summary and milestone milestones blocks from the top section of `@context/current-feature.md`.
2. Permanently append and log this completed feature text summary block at the very **END** of the `## History` ledger section along with an accurate completed date stamp.
3. Reset the upper active tracking placeholders back to baseline template values:
   - Revert the H1 header line text exactly to: `# Current Feature`
   - Set the state tracking variable line exactly to: `## Status: Complete`
   - Completely wipe all custom text bullet lines inside the `## Goals` and `## Notes` blocks, preserving only the standard native markdown placeholder comments blocks.
4. Execute an independent, atomic clean-up repository commit to record the tracking reset action:
   ```bash
   git add @context/current-feature.md
   git commit -m "chore: reset current-feature.md after completing [feature-name]"
   ```

---

## 🚀 Step 4: Single-Push Live Upstream Synchronization & Origin Cleanup
Deliver the compiled, verified, and integrated codebase to production servers securely in a single transaction step:
1. Push the updated master local branch history up to GitHub/Vercel repositories **ONCE** (A single comprehensive push transaction carrying all changesets securely to eliminate redundant build logs cascades on hosting platforms):
   ```bash
   git push origin main
   ```
2. **Remote Origin Cleanup Rule:** If the development feature branch stream was previously pushed up to the remote server during joint work setups, execute a final closing request command to permanently delete that dead tracking stream from the remote server grid:
   ```bash
   git push origin --delete feature/[slugified-feature-name]
   ```
3. Output a beautiful corporate confirmation scorecard terminal layout block stating: `[SUCCESS: SPRINT MODULE MERGED, TRACKING FILES RESET, AND PRODUCTION CLOUD INFRASTRUCTURE SYNCHRONIZED LIVE].`
