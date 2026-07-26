import { sql } from "drizzle-orm";
import { db } from "@/db";
import { campaigns, monthlyTrends } from "@/db/schema";

export interface AdminGlobalAnalytics {
  monthlyTrends: {
    month: string;
    revenue: number;
    spend: number;
  }[];
  campaignPerformance: {
    title: string;
    revenueGenerated: number;
    emailsSent: number;
  }[];
  conversionMetrics: {
    avgOpenRate: number;
  };
}

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export async function getAdminGlobalAnalytics(): Promise<AdminGlobalAnalytics> {
  const [monthlyRows, campaignRows, conversionResult] = await Promise.all([
    db
      .select({
        month: monthlyTrends.month,
        revenue: sql<string>`coalesce(cast(sum(${monthlyTrends.revenue}) as varchar), '0')`,
        spend: sql<string>`coalesce(cast(sum(${monthlyTrends.spend}) as varchar), '0')`,
      })
      .from(monthlyTrends)
      .groupBy(monthlyTrends.month)
      .orderBy(sql`min(${monthlyTrends.createdAt})`),

    db
      .select({
        title: campaigns.title,
        revenueGenerated: sql<string>`coalesce(cast(sum(${campaigns.revenueGenerated}) as varchar), '0')`,
        emailsSent: sql<number>`coalesce(cast(coalesce(sum(${campaigns.emailsSent}), 0) as int), 0)`,
      })
      .from(campaigns)
      .groupBy(campaigns.title),

    db
      .select({
        avgOpenRate: sql<string>`coalesce(cast(avg(${campaigns.openRate}) as varchar), '0')`,
      })
      .from(campaigns),
  ]);

  const sorted = [...monthlyRows].sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month),
  );

  return {
    monthlyTrends: sorted.map((r) => ({
      month: r.month,
      revenue: Number(r.revenue),
      spend: Number(r.spend),
    })),
    campaignPerformance: campaignRows.map((r) => ({
      title: r.title,
      revenueGenerated: Number(r.revenueGenerated),
      emailsSent: Number(r.emailsSent),
    })),
    conversionMetrics: {
      avgOpenRate: Number(conversionResult[0]?.avgOpenRate ?? 0),
    },
  };
}
