import "dotenv/config";
import { db } from "./index";
import { users, campaigns, contentApprovals, messages, monthlyTrends } from "./schema";
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

  // Step 3: Onboard Corporate Brand Clients (CLIENT)
  const clientHash = hashSync("AhmedClient123!", 12);
  const novaHash = hashSync("NovaClient123!", 12);
  const vertexHash = hashSync("VertexClient123!", 12);

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

  const [novaClient] = await db
    .insert(users)
    .values({
      name: "Nova Retail Team",
      email: "nova@retail.com",
      password: novaHash,
      role: "CLIENT",
      companyName: "Nova Retail Group",
      packageName: "Enterprise",
    })
    .returning({ id: users.id });
  console.log(`  ✅ Client created: ${novaClient.id}`);

  const [vertexClient] = await db
    .insert(users)
    .values({
      name: "Vertex Media Team",
      email: "vertex@media.com",
      password: vertexHash,
      role: "CLIENT",
      companyName: "Vertex Media Co",
      packageName: "Growth",
    })
    .returning({ id: users.id });
  console.log(`  ✅ Client created: ${vertexClient.id}`);

  // Step 4: Provision Client Campaigns
  const [campaign1] = await db
    .insert(campaigns)
    .values({
      clientId: client.id,
      title: "Welcome Email Series",
      channel: "EMAIL",
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
      channel: "EMAIL",
      status: "ACTIVE",
      emailsSent: 1200,
      openRate: "38.00",
      revenueGenerated: "4800.00",
    })
    .returning({ id: campaigns.id });

  const [campaign3] = await db
    .insert(campaigns)
    .values({
      clientId: client.id,
      title: "Summer Sale Meta Ads",
      channel: "META",
      status: "ACTIVE",
      emailsSent: 8900,
      openRate: "31.20",
      revenueGenerated: "26800.00",
    })
    .returning({ id: campaigns.id });

  const [campaign4] = await db
    .insert(campaigns)
    .values({
      clientId: client.id,
      title: "Google Search — Core Range",
      channel: "GOOGLE",
      status: "PAUSED",
      emailsSent: 12400,
      openRate: "24.60",
      revenueGenerated: "15200.00",
    })
    .returning({ id: campaigns.id });

  const [campaign5] = await db
    .insert(campaigns)
    .values({
      clientId: client.id,
      title: "TikTok Spark — Influencer Push",
      channel: "TIKTOK",
      status: "ACTIVE",
      emailsSent: 17800,
      openRate: "18.40",
      revenueGenerated: "9200.00",
    })
    .returning({ id: campaigns.id });
  console.log(
    `  ✅ Campaigns created: ${campaign1.id}, ${campaign2.id}, ${campaign3.id}, ${campaign4.id}, ${campaign5.id}`,
  );

  // Step 4b: Provision Nova Retail Campaigns
  const [novaCamp1] = await db
    .insert(campaigns)
    .values({
      clientId: novaClient.id,
      title: "Nova Seasonal Catalog Drop",
      channel: "EMAIL",
      status: "ACTIVE",
      emailsSent: 18400,
      openRate: "45.20",
      revenueGenerated: "31800.00",
    })
    .returning({ id: campaigns.id });

  const [novaCamp2] = await db
    .insert(campaigns)
    .values({
      clientId: novaClient.id,
      title: "Nova Instagram Carousel Ads",
      channel: "META",
      status: "ACTIVE",
      emailsSent: 22100,
      openRate: "29.80",
      revenueGenerated: "41200.00",
    })
    .returning({ id: campaigns.id });

  const [novaCamp3] = await db
    .insert(campaigns)
    .values({
      clientId: novaClient.id,
      title: "Nova Google Shopping — PMax",
      channel: "GOOGLE",
      status: "ACTIVE",
      emailsSent: 31200,
      openRate: "22.40",
      revenueGenerated: "52800.00",
    })
    .returning({ id: campaigns.id });
  console.log(
    `  ✅ Nova campaigns created: ${novaCamp1.id}, ${novaCamp2.id}, ${novaCamp3.id}`,
  );

  // Step 4c: Provision Vertex Media Campaigns
  const [vertexCamp1] = await db
    .insert(campaigns)
    .values({
      clientId: vertexClient.id,
      title: "Vertex Webinar Invites",
      channel: "EMAIL",
      status: "ACTIVE",
      emailsSent: 9400,
      openRate: "51.60",
      revenueGenerated: "12600.00",
    })
    .returning({ id: campaigns.id });

  const [vertexCamp2] = await db
    .insert(campaigns)
    .values({
      clientId: vertexClient.id,
      title: "Vertex YouTube Skips",
      channel: "GOOGLE",
      status: "PAUSED",
      emailsSent: 26700,
      openRate: "15.30",
      revenueGenerated: "8600.00",
    })
    .returning({ id: campaigns.id });

  const [vertexCamp3] = await db
    .insert(campaigns)
    .values({
      clientId: vertexClient.id,
      title: "Vertex TikTok B2B Stories",
      channel: "TIKTOK",
      status: "ACTIVE",
      emailsSent: 15600,
      openRate: "21.90",
      revenueGenerated: "18400.00",
    })
    .returning({ id: campaigns.id });
  console.log(
    `  ✅ Vertex campaigns created: ${vertexCamp1.id}, ${vertexCamp2.id}, ${vertexCamp3.id}`,
  );

  // Step 5: Content Approvals for all clients
  await db.insert(contentApprovals).values([
    {
      campaignId: campaign2.id,
      contentType: "Meta Creative Video/Banner",
      previewUrl: "https://unsplash.com",
      captionText:
        "Don't let your style wait in the cart! 🛍️ Use code RETAKE10 for an exclusive 10% off on your corporate attire sequence.",
      status: "PENDING",
    },
    {
      campaignId: novaCamp2.id,
      contentType: "Instagram Carousel — Set A",
      previewUrl: "https://unsplash.com",
      captionText:
        "Elevate your retail season with the Nova catalog — new arrivals landing every week.",
      status: "PENDING",
    },
    {
      campaignId: novaCamp2.id,
      contentType: "Instagram Carousel — Set B",
      previewUrl: "https://unsplash.com",
      captionText:
        "Nova Home Collection: minimal design, maximum comfort. Explore the full range.",
      status: "REJECTED",
      feedback: "Please update the hero image to the spring lookbook shot.",
    },
    {
      campaignId: vertexCamp3.id,
      contentType: "TikTok Spark Storyboard",
      previewUrl: "https://unsplash.com",
      captionText:
        "B2B growth playbook: how Vertex Media scaled pipeline 3x with one retainer.",
      status: "APPROVED",
      feedback: "Approved — launch at 9am EST.",
    },
  ]);
  console.log("  ✅ Content approvals created.");

  // Step 6: B2B Chat Messages for all clients
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
    {
      clientId: novaClient.id,
      senderRole: "CLIENT",
      messageText:
        "The PMax shopping campaign is performing well — can we raise the daily budget?",
    },
    {
      clientId: novaClient.id,
      senderRole: "ADMIN",
      messageText:
        "Great to hear! We'll raise the cap to $240/day and monitor the CPA over the next 72 hours.",
    },
    {
      clientId: vertexClient.id,
      senderRole: "CLIENT",
      messageText:
        "Why was the YouTube campaign paused? We saw strong early CTR.",
    },
    {
      clientId: vertexClient.id,
      senderRole: "ADMIN",
      messageText:
        "We paused it to protect frequency — re-launching on Tuesday with refreshed creative.",
    },
  ]);
  console.log("  ✅ Messages created.");

  // Step 7: Monthly Trends for all clients
  await db.insert(monthlyTrends).values([
    { clientId: client.id, month: "Jan", revenue: "4000.00", spend: "800.00" },
    { clientId: client.id, month: "Feb", revenue: "5500.00", spend: "1100.00" },
    { clientId: client.id, month: "Mar", revenue: "7800.00", spend: "1500.00" },
    { clientId: client.id, month: "Apr", revenue: "11000.00", spend: "2200.00" },
    { clientId: client.id, month: "May", revenue: "13400.00", spend: "2900.00" },
    { clientId: client.id, month: "Jun", revenue: "15800.00", spend: "3400.00" },
    { clientId: client.id, month: "Jul", revenue: "17200.00", spend: "3850.00" },
    { clientId: novaClient.id, month: "Jan", revenue: "5200.00", spend: "1100.00" },
    { clientId: novaClient.id, month: "Feb", revenue: "7800.00", spend: "1600.00" },
    { clientId: novaClient.id, month: "Mar", revenue: "11600.00", spend: "2400.00" },
    { clientId: novaClient.id, month: "Apr", revenue: "18200.00", spend: "3600.00" },
    { clientId: novaClient.id, month: "May", revenue: "26400.00", spend: "5100.00" },
    { clientId: novaClient.id, month: "Jun", revenue: "34800.00", spend: "6800.00" },
    { clientId: novaClient.id, month: "Jul", revenue: "43800.00", spend: "8400.00" },
    { clientId: vertexClient.id, month: "Jan", revenue: "2200.00", spend: "600.00" },
    { clientId: vertexClient.id, month: "Feb", revenue: "3400.00", spend: "900.00" },
    { clientId: vertexClient.id, month: "Mar", revenue: "4900.00", spend: "1300.00" },
    { clientId: vertexClient.id, month: "Apr", revenue: "6300.00", spend: "1700.00" },
    { clientId: vertexClient.id, month: "May", revenue: "8100.00", spend: "2200.00" },
    { clientId: vertexClient.id, month: "Jun", revenue: "9800.00", spend: "2700.00" },
    { clientId: vertexClient.id, month: "Jul", revenue: "12400.00", spend: "3300.00" },
  ]);
  console.log("  ✅ Monthly trends (Jan–Jul) created for all clients.");

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
