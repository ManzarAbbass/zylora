import { eq, and, sql, asc } from "drizzle-orm";
import { db } from "@/db";
import { campaigns, users, monthlyTrends } from "@/db/schema";

export async function getCampaignsByClientId(clientId: string) {
  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.clientId, clientId));
}

export interface AdminGlobalStats {
  totalRevenue: string;
  onboardedClients: number;
  activeCampaigns: number;
  avgOpenRate: string;
}

export async function getAdminGlobalStats(): Promise<AdminGlobalStats> {
  const [revenueResult] = await db
    .select({
      total: sql<string>`coalesce(cast(sum(${campaigns.revenueGenerated}) as varchar), '0')`,
    })
    .from(campaigns);

  const [clientCount] = await db
    .select({
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(users)
    .where(eq(users.role, "CLIENT"));

  const [activeCount] = await db
    .select({
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(campaigns)
    .where(eq(campaigns.status, "ACTIVE"));

  const [avgOpenRateResult] = await db
    .select({
      avg: sql<string>`coalesce(cast(avg(${campaigns.openRate}) as varchar), '0')`,
    })
    .from(campaigns);

  return {
    totalRevenue: revenueResult?.total ?? "0",
    onboardedClients: clientCount?.count ?? 0,
    activeCampaigns: activeCount?.count ?? 0,
    avgOpenRate: avgOpenRateResult?.avg ?? "0",
  };
}

export interface ClientWorkspaceStats {
  totalRevenue: string;
  totalImpressions: number;
  avgOpenRate: string;
  activeCampaigns: number;
}

export async function getClientWorkspaceStats(clientId: string): Promise<ClientWorkspaceStats> {
  const [revenueResult] = await db
    .select({
      total: sql<string>`coalesce(cast(sum(${campaigns.revenueGenerated}) as varchar), '0')`,
    })
    .from(campaigns)
    .where(eq(campaigns.clientId, clientId));

  const [impressionsResult] = await db
    .select({
      total: sql<number>`coalesce(cast(sum(${campaigns.emailsSent}) as int), 0)`,
    })
    .from(campaigns)
    .where(eq(campaigns.clientId, clientId));

  const [avgOpenRateResult] = await db
    .select({
      avg: sql<string>`coalesce(cast(avg(${campaigns.openRate}) as varchar), '0')`,
    })
    .from(campaigns)
    .where(eq(campaigns.clientId, clientId));

  const [activeCount] = await db
    .select({
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(campaigns)
    .where(and(eq(campaigns.clientId, clientId), eq(campaigns.status, "ACTIVE")));

  return {
    totalRevenue: revenueResult?.total ?? "0",
    totalImpressions: impressionsResult?.total ?? 0,
    avgOpenRate: avgOpenRateResult?.avg ?? "0",
    activeCampaigns: activeCount?.count ?? 0,
  };
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  spend: number;
}

export async function getClientMonthlyTrends(clientId: string): Promise<MonthlyTrend[]> {
  const rows = await db
    .select()
    .from(monthlyTrends)
    .where(eq(monthlyTrends.clientId, clientId))
    .orderBy(asc(monthlyTrends.createdAt));

  return rows.map((r) => ({
    month: r.month,
    revenue: Number(r.revenue),
    spend: Number(r.spend),
  }));
}
