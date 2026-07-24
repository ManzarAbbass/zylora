import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle({ client: pool });

process.on("SIGTERM", () => { pool.end().catch(() => {}); });
process.on("SIGINT", () => { pool.end().catch(() => {}); });
