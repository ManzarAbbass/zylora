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
  const packageTier = formData.get("packageTier") as string;

  if (!name || !email || !packageTier) {
    return { success: false as const, data: null, error: "All fields are required." };
  }

  try {
    const tempPassword = generateTempPassword();
    const hashedPassword = await hash(tempPassword, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "CLIENT",
      companyName: null,
      packageName: packageTier,
    });

    if (resend) {
      await resend.emails.send({
        from: "Zylora <onboarding@zylora.com>",
        to: email,
        subject: "Your Zylora Client Portal Access",
        html: `<p>Welcome to Zylora, ${name}!</p>
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
      error: error instanceof Error ? error.message : "Failed to onboard client.",
    };
  }
}
