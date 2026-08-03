import { sql, eq, and } from "drizzle-orm";
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
  channels: string[];
  totalSpend: string;
  totalRevenue: string;
  netRoi: string;
}

export async function getAdminExecutiveReports(): Promise<ExecutiveReport[]> {
  const campaignAgg = db
    .select({
      clientId: campaigns.clientId,
      totalCampaigns: sql<number>`cast(count(distinct ${campaigns.id}) as int)`.as("totalCampaigns"),
      channels: sql<string[]>`coalesce(array_agg(distinct ${campaigns.channel}::text), array[]::text[])`.as("channels"),
      totalRevenue: sql<string>`coalesce(cast(sum(${campaigns.revenueGenerated}) as varchar), '0')`.as("totalRevenue"),
    })
    .from(campaigns)
    .where(eq(campaigns.status, "ACTIVE"))
    .groupBy(campaigns.clientId)
    .as("campaign_agg");

  const spendAgg = db
    .select({
      clientId: monthlyTrends.clientId,
      totalSpend: sql<string>`coalesce(cast(sum(${monthlyTrends.spend}) as varchar), '0')`.as("totalSpend"),
    })
    .from(monthlyTrends)
    .groupBy(monthlyTrends.clientId)
    .as("spend_agg");

  const rows = await db
    .select({
      id: users.id,
      companyName: users.companyName,
      totalCampaigns: campaignAgg.totalCampaigns,
      channels: campaignAgg.channels,
      totalSpend: spendAgg.totalSpend,
      totalRevenue: campaignAgg.totalRevenue,
    })
    .from(users)
    .innerJoin(campaignAgg, eq(users.id, campaignAgg.clientId))
    .leftJoin(spendAgg, eq(users.id, spendAgg.clientId))
    .where(eq(users.role, "CLIENT"));

  const data = rows as unknown as Array<{
    id: string;
    companyName: string | null;
    totalCampaigns: number;
    channels: string[];
    totalSpend: string;
    totalRevenue: string;
  }>;

  return data.map((r) => ({
    ...r,
    channels: (r.channels ?? []).filter(Boolean),
    totalSpend: r.totalSpend ?? "0",
    netRoi: (parseFloat(r.totalRevenue) - parseFloat(r.totalSpend ?? "0")).toFixed(2),
  }));
}export interface ClientCampaignRow {
  id: string;
  title: string;
  channel: string;
  emailsSent: number;
  openRate: string;
  spend: string;
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
      channel: campaigns.channel,
      emailsSent: campaigns.emailsSent,
      openRate: campaigns.openRate,
      spend: campaigns.spend,
      revenueGenerated: campaigns.revenueGenerated,
    })
    .from(campaigns)
    .where(and(eq(campaigns.clientId, clientId), eq(campaigns.status, "ACTIVE")));

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
