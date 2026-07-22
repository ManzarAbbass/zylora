"use client";

import { useState } from "react";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { mockClientsList, mockMessages } from "@/lib/mock-data";
import { toast, Toaster } from "sonner";

interface Message {
  id: string;
  clientId: string;
  senderRole: "CLIENT" | "ADMIN";
  messageText: string;
  createdAt: Date;
}

const clientNotificationBadges: Record<string, number> = {
  "usr_client_4206": 3,
};

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function MessagingDesk() {
  const [messages, setMessages] = useState<Message[]>([...mockMessages]);
  const [inputText, setInputText] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(
    mockClientsList[0]?.id ?? null,
  );

  const selectedClient = selectedClientId
    ? mockClientsList.find((c) => c.id === selectedClientId) ?? null
    : null;

  function handleSend() {
    if (!inputText.trim() || !selectedClient) return;
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      clientId: selectedClient.id,
      senderRole: "ADMIN",
      messageText: inputText.trim(),
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    toast.success("Message successfully updated onto the system communication ledger.");
  }

  return (
    <div className="flex min-h-0 flex-1 bg-[#ffffff]">
      <div
        className={`w-80 shrink-0 flex-col border-r border-slate-100 lg:flex ${
          selectedClient ? "hidden" : "flex"
        }`}
      >
        <div className="border-b border-slate-100 p-4 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900">Inbox</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Active client communication channels
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockClientsList.map((client) => {
            const badge = clientNotificationBadges[client.id] ?? 0;
            return (
              <button
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3.5 text-left transition hover:bg-slate-50 sm:px-6 ${
                  client.id === selectedClientId ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700">
                  {initials(client.name)}
                  {badge > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-[#3B5FE0] text-[10px] font-semibold text-white">
                      {badge}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {client.name}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {client.packageName} &bull; {client.activeCampaignsCount}{" "}
                    campaigns
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col ${
          selectedClient ? "flex" : "hidden lg:flex"
        }`}
      >
        {selectedClient ? (
          <>
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
              <button
                onClick={() => setSelectedClientId(null)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 lg:hidden"
              >
                <ArrowLeft className="size-5" />
              </button>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {selectedClient.name} Channel
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Enterprise Tier Communication Pipeline &bull; Active
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              <div className="space-y-4">
                {messages
                  .filter((m) => m.clientId === selectedClient.id)
                  .map((msg) => {
                    const isAdmin = msg.senderRole === "ADMIN";
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-xl px-4 py-2.5 ${
                            isAdmin
                              ? "bg-slate-100 text-slate-900"
                              : "bg-[#3B5FE0] text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.messageText}</p>
                          <p
                            className={`mt-1 text-[10px] ${
                              isAdmin ? "text-slate-400" : "text-blue-100"
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="border-t border-slate-100 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                  <Paperclip className="size-4" />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Type your corporate communication message..."
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#124768] focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-[#3B5FE0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B5FE0]/90"
                >
                  <Send className="size-4" />
                  <span className="hidden sm:inline">Send Response</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-slate-400">
              Select a client to start messaging
            </p>
          </div>
        )}
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
