import { z } from "zod";

export const injectMetricsValidationSchema = z.object({
  clientId: z.string().uuid(),
  channel: z.enum(["EMAIL", "META", "GOOGLE", "TIKTOK"]),
  spend: z.coerce.number().nonnegative(),
  revenueGenerated: z.coerce.number().nonnegative(),
  emailsSent: z.coerce.number().int().nonnegative(),
});

export type InjectMetricsInput = z.infer<typeof injectMetricsValidationSchema>;
