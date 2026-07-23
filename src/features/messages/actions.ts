"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { messages } from "@/db/schema";

export async function sendAdminMessageAction(clientId: string, messageText: string) {
  if (!clientId || !messageText.trim()) {
    return { success: false as const, data: null, error: "Client ID and message text are required." };
  }

  try {
    await db.insert(messages).values({
      clientId,
      senderRole: "ADMIN",
      messageText: messageText.trim(),
    });

    revalidatePath("/admin/messages");
    return { success: true as const, data: null, error: undefined };
  } catch (error) {
    return {
      success: false as const,
      data: null,
      error: error instanceof Error ? error.message : "Failed to send message.",
    };
  }
}
