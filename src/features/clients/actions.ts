"use server";

import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users, campaigns, monthlyTrends } from "@/db/schema";
import { getAdminExecutiveReports } from "./queries";
import { injectMetricsValidationSchema, type InjectMetricsInput } from "./inject-metrics-schema";

const onboardSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  role: z.enum(["CLIENT", "ADMIN"]),
  companyName: z.string().trim().max(200).nullable().optional(),
  packageTier: z.string().trim().max(80).nullable().optional(),
});

const campaignStatusSchema = z.object({
  campaignId: z.string().uuid(),
});

function generateTempPassword(): string {
  return randomUUID().replace(/-/g, "").slice(0, 16);
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function onboardNewClientAction(formData: FormData) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  const parsed = onboardSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    companyName: formData.get("companyName"),
    packageTier: formData.get("packageTier"),
  });

  if (!parsed.success) {
    return { success: false as const, data: null, error: "Name, email, and role are required." };
  }

  const { name, email, role, companyName, packageTier } = parsed.data;

  try {
    const tempPassword = generateTempPassword();
    const hashedPassword = await hash(tempPassword, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role,
      companyName: companyName || null,
      packageName: role === "ADMIN" ? null : packageTier,
    });

    const isAdmin = role === "ADMIN";

    if (resend) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: isAdmin ? "Your Zylora Administrator Access" : "Your Zylora Client Portal Access",
        html: isAdmin
          ? `<p>Hello ${name},</p>
<p>You have been onboarded as an Agency Administrator for Zylora Portal.</p>
<p><strong>Temporary Access Credentials:</strong></p>
<p>Email: ${email}<br/>Password: ${tempPassword}</p>
<p>Use your temporary access key to log in at <a href="${process.env.AUTH_URL || "http://localhost:3000"}/login">the portal</a>.</p>`
          : `<p>Welcome to Zylora, ${name}!</p>
<p>Your account has been provisioned with the <strong>${packageTier}</strong> package.</p>
<p><strong>Temporary Access Credentials:</strong></p>
<p>Email: ${email}<br/>Password: ${tempPassword}</p>
<p>Please log in at <a href="${process.env.AUTH_URL || "http://localhost:3000"}/login">the portal</a> and change your password immediately.</p>`,
      });
    }

    revalidatePath("/admin/dashboard");
    return { success: true as const, data: null, error: undefined };
  } catch (error) {
    console.error("[onboard] failed:", error);
    return { success: false as const, data: null, error: "Failed to onboard user." };
  }
}

export async function injectClientLiveMetricsAction(input: InjectMetricsInput) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  const parsed = injectMetricsValidationSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, data: null, error: "Invalid telemetry payload provided." };
  }

  const { clientId, channel, spend, revenueGenerated, emailsSent } = parsed.data;

  try {
    const [existing] = await db
      .select({ id: campaigns.id })
      .from(campaigns)
      .where(and(eq(campaigns.clientId, clientId), eq(campaigns.channel, channel)))
      .orderBy(desc(campaigns.updatedAt))
      .limit(1);

    if (existing) {
      await db
        .update(campaigns)
        .set({
          spend: spend.toFixed(2),
          revenueGenerated: revenueGenerated.toFixed(2),
          emailsSent,
          updatedAt: new Date(),
        })
        .where(eq(campaigns.id, existing.id));
    } else {
      await db.insert(campaigns).values({
        clientId,
        title: `${channel} Live Telemetry`,
        channel,
        status: "ACTIVE",
        emailsSent,
        spend: spend.toFixed(2),
        revenueGenerated: revenueGenerated.toFixed(2),
      });
    }

    const monthLabel = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date());

    const [trendRow] = await db
      .select({ id: monthlyTrends.id })
      .from(monthlyTrends)
      .where(and(eq(monthlyTrends.clientId, clientId), eq(monthlyTrends.month, monthLabel)))
      .orderBy(desc(monthlyTrends.createdAt))
      .limit(1);

    if (trendRow) {
      await db
        .update(monthlyTrends)
        .set({
          revenue: revenueGenerated.toFixed(2),
          spend: spend.toFixed(2),
        })
        .where(eq(monthlyTrends.id, trendRow.id));
    } else {
      await db.insert(monthlyTrends).values({
        clientId,
        month: monthLabel,
        revenue: revenueGenerated.toFixed(2),
        spend: spend.toFixed(2),
      });
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/analytics");
    revalidatePath("/admin/reports");
    revalidatePath("/client/dashboard");
    revalidatePath("/client/reports");

    return { success: true as const, data: null, error: undefined };
  } catch (error) {
    console.error("[injectClientLiveMetrics] failed:", error);
    return { success: false as const, data: null, error: "Failed to inject live telemetry metrics." };
  }
}

export async function toggleCampaignStatusAction(input: { campaignId: string }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  const parsed = campaignStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, data: null, error: "Invalid campaign reference provided." };
  }

  const { campaignId } = parsed.data;

  try {
    const [campaign] = await db
      .select({ id: campaigns.id, status: campaigns.status })
      .from(campaigns)
      .where(eq(campaigns.id, campaignId))
      .limit(1);

    if (!campaign) {
      return { success: false as const, data: null, error: "Campaign not found." };
    }

    const nextStatus = campaign.status === "ACTIVE" ? "PAUSED" : "ACTIVE";

    await db
      .update(campaigns)
      .set({ status: nextStatus, updatedAt: new Date() })
      .where(eq(campaigns.id, campaignId));

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/analytics");
    revalidatePath("/admin/reports");
    revalidatePath("/client/dashboard");
    revalidatePath("/client/reports");

    return { success: true as const, data: { status: nextStatus }, error: undefined };
  } catch (error) {
    console.error("[toggleCampaignStatus] failed:", error);
    return { success: false as const, data: null, error: "Failed to update campaign status." };
  }
}

export async function exportCsvReportAction() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  try {
    const reports = await getAdminExecutiveReports();

    const headers = ["Client Name", "Campaigns", "Channels", "Total Ad Spend", "Total Revenue", "Net ROI"];
    const rows = reports.map((r) => [
      r.companyName ?? "Unknown",
      String(r.totalCampaigns),
      r.channels.join(", "),
      r.totalSpend,
      r.totalRevenue,
      r.netRoi,
    ]);

    const csvEscape = (cell: string): string => {
      let out = cell.replace(/"/g, '""');
      if (/^[=+\-@]/.test(out)) out = `'${out}`;
      return `"${out}"`;
    };

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map(csvEscape).join(",")),
    ].join("\n");

    return { success: true as const, data: csv, error: undefined };
  } catch (error) {
    return {
      success: false as const,
      data: null,
      error: error instanceof Error ? error.message : "Failed to export CSV.",
    };
  }
}
