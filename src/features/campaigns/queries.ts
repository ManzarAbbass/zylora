import { eq } from "drizzle-orm";
import { db } from "@/db";
import { campaigns } from "@/db/schema";

export async function getCampaignsByClientId(clientId: string) {
  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.clientId, clientId));
}
