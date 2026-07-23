import "dotenv/config";
import { db } from "./index";
import { users, campaigns, contentApprovals, messages } from "./schema";
import { hashSync } from "bcryptjs";

async function main() {
  console.log("⏳ Zylora database seeding started...");

  // Step 1: Clean slate cascade purge
  await db.delete(contentApprovals);
  await db.delete(messages);
  await db.delete(campaigns);
  await db.delete(users);
  console.log("  Cleaned existing data.");

  // Step 2: Onboard Agency Super Admin (ADMIN)
  const adminHash = hashSync("ZyloraAdmin2026!", 12);
  const [admin] = await db
    .insert(users)
    .values({
      name: "Zylora CEO",
      email: "ceo@zylora.com",
      password: adminHash,
      role: "ADMIN",
      companyName: "Zylora Agency",
    })
    .returning({ id: users.id });
  console.log(`  ✅ Admin created: ${admin.id}`);

  // Step 3: Onboard Corporate Brand Client (CLIENT)
  const clientHash = hashSync("AhmedClient123!", 12);
  const [client] = await db
    .insert(users)
    .values({
      name: "Ahmed Clothing Team",
      email: "ahmed@clothing.com",
      password: clientHash,
      role: "CLIENT",
      companyName: "Ahmed Clothing Ltd",
      packageName: "Pro",
    })
    .returning({ id: users.id });
  console.log(`  ✅ Client created: ${client.id}`);

  // Step 4: Provision Client Campaigns
  const [campaign1] = await db
    .insert(campaigns)
    .values({
      clientId: client.id,
      title: "Welcome Email Series",
      status: "ACTIVE",
      emailsSent: 5420,
      openRate: "42.50",
      revenueGenerated: "12400.00",
    })
    .returning({ id: campaigns.id });

  const [campaign2] = await db
    .insert(campaigns)
    .values({
      clientId: client.id,
      title: "Abandoned Cart Recovery Flow",
      status: "ACTIVE",
      emailsSent: 1200,
      openRate: "38.00",
      revenueGenerated: "4800.00",
    })
    .returning({ id: campaigns.id });
  console.log(`  ✅ Campaigns created: ${campaign1.id}, ${campaign2.id}`);

  // Step 5: Pending Asset Approval (linked to Campaign 2)
  await db
    .insert(contentApprovals)
    .values({
      campaignId: campaign2.id,
      contentType: "Meta Creative Video/Banner",
      previewUrl: "https://unsplash.com",
      captionText:
        "Don't let your style wait in the cart! 🛍️ Use code RETAKE10 for an exclusive 10% off on your corporate attire sequence.",
      status: "PENDING",
    });
  console.log("  ✅ Content approval created.");

  // Step 6: B2B Chat Messages
  await db.insert(messages).values([
    {
      clientId: client.id,
      senderRole: "CLIENT",
      messageText:
        "Can we execute a new campaign setup for Black Friday launch week?",
    },
    {
      clientId: client.id,
      senderRole: "ADMIN",
      messageText:
        "Sure! We can easily orchestrate a high-converting automated setup. We'll have the strategy and copy ready for approval by Friday.",
    },
  ]);
  console.log("  ✅ Messages created.");

  console.log("🎉 Database seeding completed successfully.");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
