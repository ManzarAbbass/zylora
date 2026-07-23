import "dotenv/config";
import { db } from "../src/db";
import { users } from "../src/db/schema";
import { count } from "drizzle-orm";

async function main() {
  const result = await db.select({ count: count() }).from(users);
  const userCount = result[0]?.count ?? 0;

  console.log("\n========================================");
  console.log("  ✅  Neon Database Connected");
  console.log(`  📊  Users in database: ${userCount}`);
  console.log("========================================\n");

  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ Database connection failed:", err, "\n");
  process.exit(1);
});
