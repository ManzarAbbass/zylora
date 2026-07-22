"use client";

import { useState } from "react";
import { Send, Paperclip, MessageSquare } from "lucide-react";
import { mockMessages, mockUserClient, mockUserAdmin } from "@/lib/mock-data";
import { toast, Toaster } from "sonner";

interface Message {
  id: string;
  clientId: string;
  senderRole: "CLIENT" | "ADMIN";
  messageText: string;
  createdAt: Date;
}

const currentClientId = mockUserClient.id;

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function shouldShowDateSeparator(
  current: Date,
  previous: Date | null,
): boolean {
  if (!previous) return true;
  const cur = new Date(current);
  const prev = new Date(previous);
  return (
    cur.getDate() !== prev.getDate() ||
    cur.getMonth() !== prev.getMonth() ||
    cur.getFullYear() !== prev.getFullYear()
  );
}

export default function ClientMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([...mockMessages]);
  const [inputText, setInputText] = useState("");

  const clientMessages = messages.filter(
    (m) => m.clientId === currentClientId,
  );

  function handleSend() {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      clientId: currentClientId,
      senderRole: "CLIENT",
      messageText: inputText.trim(),
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    toast.success("Message sent to Zylora Agency.");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Agency Chat
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Direct communication channel with your agency team
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
          <div className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700">
            ZA
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Zylora Agency
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
              Active now
            </p>
          </div>
        </div>

        <div className="scrollbar-none flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {clientMessages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MessageSquare className="mx-auto size-8 text-slate-300" />
                <p className="mt-2 text-sm text-slate-400">
                  No messages yet. Start a conversation with your agency.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {clientMessages.map((msg, idx) => {
                const prevMsg = idx > 0 ? clientMessages[idx - 1] : null;
                const showDateSep = shouldShowDateSeparator(
                  msg.createdAt,
                  prevMsg?.createdAt ?? null,
                );
                const isClient = msg.senderRole === "CLIENT";
                return (
                  <div key={msg.id}>
                    {showDateSep && (
                      <div className="mb-4 flex items-center justify-center">
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-400">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-xl px-4 py-2.5 ${
                          isClient
                            ? "bg-[#3B5FE0] text-white"
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <p className="text-sm">{msg.messageText}</p>
                        <p
                          className={`mt-1 text-[10px] ${
                            isClient ? "text-blue-100" : "text-slate-400"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#124768] focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-[#3B5FE0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B5FE0]/90"
            >
              <Send className="size-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
