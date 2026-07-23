import { getClientChatHistory } from "@/features/messages/queries";
import ChatClient from "./chat-client";

const SEEDED_CLIENT_ID = "31ef43a7-d86f-4455-960d-8dba5d197363";

export default async function ClientMessagesPage() {
  const messages = await getClientChatHistory(SEEDED_CLIENT_ID);

  return (
    <ChatClient
      initialMessages={messages}
      clientId={SEEDED_CLIENT_ID}
    />
  );
}
