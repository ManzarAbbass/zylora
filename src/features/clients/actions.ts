"use server";

import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getAdminExecutiveReports } from "./queries";

const onboardSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  role: z.enum(["CLIENT", "ADMIN"]),
  companyName: z.string().trim().max(200).nullable().optional(),
  packageTier: z.string().trim().max(80).nullable().optional(),
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

export async function exportCsvReportAction() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  try {
    const reports = await getAdminExecutiveReports();

    const headers = ["Client Name", "Campaigns", "Total Ad Spend", "Total Revenue", "Net ROI"];
    const rows = reports.map((r) => [
      r.companyName ?? "Unknown",
      String(r.totalCampaigns),
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
