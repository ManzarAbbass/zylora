import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const PRESENCE_PREFIX = "@zylora/presence";
const HEARTBEAT_TTL = 40;

export async function setUserOnline(userId: string) {
  try {
    await redis.set(`${PRESENCE_PREFIX}:${userId}`, "1", { ex: HEARTBEAT_TTL });
  } catch {
    console.warn("[Presence] Redis unreachable — presence heartbeat skipped.");
  }
}

export async function isUserOnline(userId: string): Promise<boolean> {
  try {
    const exists = await redis.exists(`${PRESENCE_PREFIX}:${userId}`);
    return exists === 1;
  } catch {
    console.warn("[Presence] Redis unreachable — presence check skipped.");
    return false;
  }
}