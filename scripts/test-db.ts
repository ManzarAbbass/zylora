import "dotenv/config";
import { db } from "../src/db";
import { users, campaigns, contentApprovals, messages } from "../src/db/schema";
import { count } from "drizzle-orm";

async function main() {
  const [userCount] = await db.select({ count: count() }).from(users);
  const [campaignCount] = await db.select({ count: count() }).from(campaigns);
  const [approvalCount] = await db.select({ count: count() }).from(contentApprovals);
  const [messageCount] = await db.select({ count: count() }).from(messages);

  console.log("\n========================================");
  console.log("  ✅  Neon Database Connected");
  console.log("========================================\n");

  console.log("── Users ──────────────────────────────────");
  console.log(`  Total: ${userCount.count}`);
  const allUsers = await db.select().from(users);
  for (const u of allUsers) {
    console.log(`  [${u.role}] ${u.name} — ${u.email} (${u.companyName ?? "—"})`);
  }

  console.log("\n── Campaigns ──────────────────────────────");
  console.log(`  Total: ${campaignCount.count}`);
  const allCampaigns = await db.select().from(campaigns);
  for (const c of allCampaigns) {
    console.log(`  ${c.title} | Status: ${c.status} | Sent: ${c.emailsSent} | Open: ${c.openRate}% | Revenue: $${c.revenueGenerated}`);
  }

  console.log("\n── Content Approvals ──────────────────────");
  console.log(`  Total: ${approvalCount.count}`);
  const allApprovals = await db.select().from(contentApprovals);
  for (const a of allApprovals) {
    console.log(`  ${a.contentType} | Status: ${a.status}`);
    console.log(`  Caption: ${a.captionText?.slice(0, 80)}...`);
  }

  console.log("\n── Messages ───────────────────────────────");
  console.log(`  Total: ${messageCount.count}`);
  const allMessages = await db.select().from(messages);
  for (const m of allMessages) {
    console.log(`  [${m.senderRole}] ${m.messageText.slice(0, 90)}`);
  }

  console.log("\n========================================");
  console.log("  🎉  All seed data verified");
  console.log("========================================\n");

  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ Database verification failed:", err, "\n");
  process.exit(1);
});
