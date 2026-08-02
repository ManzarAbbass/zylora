"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db";
import { accessRequests } from "@/db/schema";
import { accessRequestRateLimiter } from "@/lib/rate-limit";

const accessRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  workEmail: z.string().trim().toLowerCase().email().max(254),
  companyName: z.string().trim().min(1).max(200),
  role: z.string().trim().max(80).optional().nullable(),
  monthlyAdSpend: z.string().trim().max(80).optional().nullable(),
  message: z.string().trim().max(500).optional().nullable(),
});

export type AccessRequestInput = z.infer<typeof accessRequestSchema>;

export async function requestAccessAction(input: AccessRequestInput) {
  try {
    const parsed = accessRequestSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false as const,
        data: null,
        error: "Please complete all required corporate fields correctly.",
      };
    }

    const headerStore = await headers();
    const ip = headerStore.get("x-forwarded-for") ?? "127.0.0.1";

    try {
      if (accessRequestRateLimiter) {
        const { success } = await accessRequestRateLimiter.limit(ip);
        if (!success) {
          return {
            success: false as const,
            data: null,
            error: "Too many access requests from this network. Please try again later.",
          };
        }
      }
    } catch {
      console.warn("[RateLimit] Upstash Redis unreachable — access request rate limit check skipped.");
    }

    const { name, workEmail, companyName, role, monthlyAdSpend, message } = parsed.data;

    await db.insert(accessRequests).values({
      name,
      workEmail,
      companyName,
      role: role || null,
      monthlyAdSpend: monthlyAdSpend || null,
      message: message || null,
      ip,
    });

    return { success: true as const, data: null, error: undefined };
  } catch (error) {
    console.error("[requestAccess] failed:", error);
    return {
      success: false as const,
      data: null,
      error: "Failed to submit your access request. Please try again.",
    };
  }
}
