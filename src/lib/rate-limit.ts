import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const loginRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "900 s"),
      prefix: "@zylora/login-shield",
    })
  : null;

export const recoveryRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "3600 s"),
      prefix: "@zylora/recovery-shield",
    })
  : null;

export const passwordChangeRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "900 s"),
      prefix: "@zylora/password-change-shield",
    })
  : null;

export const resetExecutionRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "3600 s"),
      prefix: "@zylora/reset-execution-shield",
    })
  : null;
