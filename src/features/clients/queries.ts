import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, campaigns } from "@/db/schema";

export interface OnboardedClient {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  packageName: string | null;
  status: "Active";
  campaignCount: number;
  totalRevenue: string;
  createdAt: Date;
}

export async function getOnboardedClientsWithMetrics(): Promise<OnboardedClient[]> {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      companyName: users.companyName,
      packageName: users.packageName,
      campaignCount: sql<number>`cast(count(${campaigns.id}) as int)`,
      totalRevenue: sql<string>`coalesce(cast(sum(${campaigns.revenueGenerated}) as varchar), '0')`,
      createdAt: users.createdAt,
    })
    .from(users)
    .leftJoin(campaigns, eq(users.id, campaigns.clientId))
    .where(eq(users.role, "CLIENT"))
    .groupBy(users.id);

  return rows.map((r) => ({
    ...r,
    status: "Active" as const,
  }));
}
