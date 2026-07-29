import { sql, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, campaigns, monthlyTrends } from "@/db/schema";

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

export async function getClientIdByEmail(email: string): Promise<string | null> {
  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));
  return user?.id ?? null;
}

export interface ExecutiveReport {
  id: string;
  companyName: string | null;
  totalCampaigns: number;
  totalSpend: string;
  totalRevenue: string;
  netRoi: string;
}

export async function getAdminExecutiveReports(): Promise<ExecutiveReport[]> {
  const rows = await db
    .select({
      id: users.id,
      companyName: users.companyName,
      totalCampaigns: sql<number>`cast(count(distinct ${campaigns.id}) as int)`,
      totalSpend: sql<string>`coalesce(cast(sum(${monthlyTrends.spend}) as varchar), '0')`,
      totalRevenue: sql<string>`coalesce(cast(sum(${campaigns.revenueGenerated}) as varchar), '0')`,
    })
    .from(users)
    .innerJoin(campaigns, eq(users.id, campaigns.clientId))
    .leftJoin(monthlyTrends, eq(users.id, monthlyTrends.clientId))
    .where(eq(users.role, "CLIENT"))
    .groupBy(users.id);

  return rows.map((r) => ({
    ...r,
    netRoi: (parseFloat(r.totalRevenue) - parseFloat(r.totalSpend)).toFixed(2),
  }));
}

export interface ClientCampaignRow {
  id: string;
  title: string;
  emailsSent: number;
  openRate: string;
  revenueGenerated: string;
}

export interface ClientExecutiveSummary {
  totalSpend: string;
  totalRevenue: string;
  netRoi: string;
}

export interface ClientExecutiveReportsData {
  campaigns: ClientCampaignRow[];
  summary: ClientExecutiveSummary;
}

export async function getClientExecutiveReportsData(clientId: string): Promise<ClientExecutiveReportsData> {
  const campaignRows = await db
    .select({
      id: campaigns.id,
      title: campaigns.title,
      emailsSent: campaigns.emailsSent,
      openRate: campaigns.openRate,
      revenueGenerated: campaigns.revenueGenerated,
    })
    .from(campaigns)
    .where(eq(campaigns.clientId, clientId));

  const [spendResult] = await db
    .select({
      totalSpend: sql<string>`coalesce(cast(sum(${monthlyTrends.spend}) as varchar), '0')`,
    })
    .from(monthlyTrends)
    .where(eq(monthlyTrends.clientId, clientId));

  const totalSpend = spendResult?.totalSpend ?? "0";
  const totalRevenue = campaignRows.reduce(
    (sum, c) => sum + parseFloat(c.revenueGenerated),
    0,
  ).toFixed(2);
  const netRoi = (parseFloat(totalRevenue) - parseFloat(totalSpend)).toFixed(2);

  return {
    campaigns: campaignRows,
    summary: { totalSpend, totalRevenue, netRoi },
  };
}
