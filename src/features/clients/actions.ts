"use server";

import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { db } from "@/db";
import { users } from "@/db/schema";

function generateTempPassword(): string {
  return randomUUID().replace(/-/g, "").slice(0, 16);
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function onboardNewClientAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as "CLIENT" | "ADMIN";
  const companyName = formData.get("companyName") as string;
  const packageTier = formData.get("packageTier") as string;

  if (!name || !email || !role) {
    return { success: false as const, data: null, error: "Name, email, and role are required." };
  }

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
    return {
      success: false as const,
      data: null,
      error: error instanceof Error ? error.message : "Failed to onboard user.",
    };
  }
}
