"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { markMessagesRead } from "./queries";
import { setUserOnline, isUserOnline } from "@/lib/presence";

export async function sendAdminMessageAction(clientId: string, messageText: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

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

export async function sendClientMessageAction(clientId: string, messageText: string) {
  const session = await auth();
  if (session?.user?.role !== "CLIENT" || session.user.id !== clientId) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  if (!clientId || !messageText.trim()) {
    return { success: false as const, data: null, error: "Client ID and message text are required." };
  }

  try {
    await db.insert(messages).values({
      clientId,
      senderRole: "CLIENT",
      messageText: messageText.trim(),
    });

    revalidatePath("/client/messages");
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

export async function markMessagesReadAction(clientId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  if (session.user.role === "ADMIN") {
    await markMessagesRead(clientId, "ADMIN");
  } else if (session.user.role === "CLIENT" && session.user.id === clientId) {
    await markMessagesRead(clientId, "CLIENT");
  } else {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  revalidatePath("/admin/messages");
  revalidatePath("/client/messages");
  revalidatePath("/admin");
  revalidatePath("/client");
  return { success: true as const, data: null, error: undefined };
}

export async function heartbeatAction(userId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  await setUserOnline(userId);
  return { success: true as const, data: null, error: undefined };
}

export async function checkPresenceAction(userId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false as const, data: null, error: "Unauthorized." };
  }

  return { success: true as const, data: await isUserOnline(userId), error: undefined };
}
