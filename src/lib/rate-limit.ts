import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const loginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "900 s"),
  prefix: "@zylora/login-shield",
});

export const recoveryRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "3600 s"),
  prefix: "@zylora/recovery-shield",
});

export const passwordChangeRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "900 s"),
  prefix: "@zylora/password-change-shield",
});

export const resetExecutionRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "3600 s"),
  prefix: "@zylora/reset-execution-shield",
});
