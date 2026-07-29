"use server";

import { auth } from "@/auth";
import { executeUniversalSearch } from "./queries";

export async function universalSearchAction(searchString: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { clients: [], campaigns: [] };
  }

  return executeUniversalSearch(
    searchString,
    session.user.role ?? "CLIENT",
    session.user.id,
  );
}
