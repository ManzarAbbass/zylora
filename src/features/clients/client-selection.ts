import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { ADMIN_CLIENT_COOKIE } from "./client-selection-constants";
import type { AdminClientOption } from "./client-selection-constants";

export async function getAdminClientOptions(): Promise<AdminClientOption[]> {
  const rows = await db
    .select({ id: users.id, companyName: users.companyName, name: users.name })
    .from(users)
    .where(eq(users.role, "CLIENT"));
  return rows.map((r) => ({
    id: r.id,
    companyName: r.companyName ?? r.name,
    name: r.name,
  }));
}

export async function resolveAdminClientSelection(): Promise<{
  clients: AdminClientOption[];
  selectedClientId: string | null;
}> {
  const clients = await getAdminClientOptions();
  if (clients.length === 0) {
    return { clients, selectedClientId: null };
  }

  const store = await cookies();
  const cookieId = store.get(ADMIN_CLIENT_COOKIE)?.value ?? null;
  const match = cookieId ? clients.find((c) => c.id === cookieId) : undefined;
  const selectedClientId = match?.id ?? clients[0].id;

  return { clients, selectedClientId };
}
