"use server"

import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";
import { headers } from "next/headers";
import { Resend } from "resend";
import { db } from "@/db";
import { users } from "@/db/schema";
import { signOut } from "@/auth";
import { loginRateLimiter, recoveryRateLimiter } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function loginAction(email: string, password: string) {
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") ?? "127.0.0.1";
  const trackingKey = `${ip}:${email}`;

  try {
    const { success } = await loginRateLimiter.limit(trackingKey);
    if (!success) {
      return { success: false as const, data: null, error: "rate_limited" };
    }
  } catch {
    console.warn("[RateLimit] Upstash Redis unreachable — login rate limit check skipped.");
  }

  return { success: true as const, data: null, error: undefined };
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function changePasswordAction(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false as const, error: "Unauthorized." };
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .then((rows) => rows[0] ?? null);

    if (!user || !user.password) {
      return { success: false as const, error: "User not found." };
    }

    const { compare } = await import("bcryptjs");
    const isValid = await compare(currentPassword, user.password);
    if (!isValid) {
      return { success: false as const, error: "Current password is incorrect." };
    }

    const hashedPassword = await hash(newPassword, 12);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, user.id));

    return { success: true as const, error: undefined };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to update password.",
    };
  }
}

export async function requestPasswordResetAction(email: string) {
  try {
    const headerStore = await headers();
    const ip = headerStore.get("x-forwarded-for") ?? "127.0.0.1";

    try {
      const { success } = await recoveryRateLimiter.limit(ip);
      if (!success) {
        return { success: false as const, data: null, error: "rate_limited" };
      }
    } catch {
      console.warn("[RateLimit] Upstash Redis unreachable — recovery rate limit check skipped.");
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0] ?? null);

    if (!user) {
      return { success: true as const, data: null, error: undefined };
    }

    const token = randomUUID();
    const expires = new Date(Date.now() + 3600000);

    await db
      .update(users)
      .set({ resetToken: token, resetTokenExpires: expires })
      .where(eq(users.id, user.id));

    const resetUrl = `${process.env.AUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;

    if (resend) {
      await resend.emails.send({
        from: "Zylora Security <onboarding@resend.dev>",
        to: email,
        subject: "Secure Password Reset — Zylora Portal",
        html: `<p>You requested a password reset for your Zylora account.</p>
<p>Click the button below to reset your password. This link expires in 1 hour.</p>
<p style="text-align:center;margin:32px 0">
  <a href="${resetUrl}" style="background-color:#3B5FE0;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Reset Your Password</a>
</p>
<p>If you did not request this, please ignore this email.</p>`,
      });
    }

    return { success: true as const, data: null, error: undefined };
  } catch (error) {
    return {
      success: false as const,
      data: null,
      error: error instanceof Error ? error.message : "Failed to process password reset request.",
    };
  }
}

export async function executePasswordResetAction(
  token: string,
  newPassword: string,
) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(
        and(eq(users.resetToken, token), gt(users.resetTokenExpires, new Date())),
      )
      .then((rows) => rows[0] ?? null);

    if (!user) {
      return {
        success: false as const,
        data: null,
        error: "This reset link is invalid or has expired. Please request a new password reset.",
      };
    }

    const hashedPassword = await hash(newPassword, 12);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      })
      .where(eq(users.id, user.id));

    return { success: true as const, data: null, error: undefined };
  } catch (error) {
    return {
      success: false as const,
      data: null,
      error: error instanceof Error ? error.message : "Failed to reset password.",
    };
  }
}
