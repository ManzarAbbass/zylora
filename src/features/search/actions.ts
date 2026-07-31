"use server";

import { auth } from "@/auth";
import { executeUniversalSearch } from "./queries";

export async function universalSearchAction(searchString: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  const data = await executeUniversalSearch(
    searchString,
    session.user.role ?? "CLIENT",
    session.user.id,
  );

  return { success: true as const, data, error: undefined };
}
