import { and, or, like, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, campaigns } from "@/db/schema";

export interface UniversalSearchResult {
  clients: Array<{
    id: string;
    name: string;
    email: string;
    companyName: string | null;
  }>;
  campaigns: Array<{
    id: string;
    title: string;
    status: string;
  }>;
}

export async function executeUniversalSearch(
  searchString: string,
  userRole: "ADMIN" | "CLIENT",
  clientId: string,
): Promise<UniversalSearchResult> {
  const pattern = `%${searchString}%`;

  if (userRole === "ADMIN") {
    const [clientResults, campaignResults] = await Promise.all([
      db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          companyName: users.companyName,
        })
        .from(users)
        .where(
          and(
            eq(users.role, "CLIENT"),
            or(
              like(users.name, pattern),
              like(users.email, pattern),
              like(users.companyName, pattern),
            ),
          ),
        )
        .limit(10),
      db
        .select({
          id: campaigns.id,
          title: campaigns.title,
          status: campaigns.status,
        })
        .from(campaigns)
        .where(like(campaigns.title, pattern))
        .limit(10),
    ]);

    return { clients: clientResults, campaigns: campaignResults };
  }

  const campaignResults = await db
    .select({
      id: campaigns.id,
      title: campaigns.title,
      status: campaigns.status,
    })
    .from(campaigns)
    .where(and(like(campaigns.title, pattern), eq(campaigns.clientId, clientId)))
    .limit(10);

  return { clients: [], campaigns: campaignResults };
}
