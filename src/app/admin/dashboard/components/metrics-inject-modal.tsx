"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { BarChart3, Loader2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { injectClientLiveMetricsAction } from "@/features/clients/actions";
import type { InjectMetricsInput } from "@/features/clients/inject-metrics-schema";

const CHANNEL_OPTIONS = [
  { value: "EMAIL", label: "Email" },
  { value: "META", label: "Meta Ads" },
  { value: "GOOGLE", label: "Google Ads" },
  { value: "TIKTOK", label: "TikTok" },
] as const;

interface Props {
  clientId: string;
  clientName: string;
}

export function MetricsInjectModal({ clientId, clientName }: Props) {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<InjectMetricsInput["channel"]>("EMAIL");
  const [spend, setSpend] = useState("");
  const [revenue, setRevenue] = useState("");
  const [emailsSent, setEmailsSent] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: InjectMetricsInput = {
      clientId,
      channel,
      spend: Number(spend),
      revenueGenerated: Number(revenue),
      emailsSent: Number(emailsSent),
    };

    startTransition(async () => {
      const result = await injectClientLiveMetricsAction(payload);
      if (result.success) {
        toast.success("Enterprise telemetry logs successfully injected and synchronized across multi-tenant dashboards.");
        setOpen(false);
        setSpend("");
        setRevenue("");
        setEmailsSent("");
        setChannel("EMAIL");
      } else {
        toast.error(result.error || "Failed to inject telemetry metrics.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-800"
        >
          <BarChart3 className="size-3.5" />
          [Update Data Metrics]
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-white p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle>Update Data Metrics</DialogTitle>
          <DialogDescription>
            Inject live telemetry for <span className="font-medium text-slate-700">{clientName}</span>. Matching channel
            rows are overwritten; new channels seed a fresh campaign track.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="channel" className="text-sm font-medium text-slate-700">
              Channel Platform
            </Label>
            <Select
              value={channel}
              onValueChange={(value) => setChannel(value as InjectMetricsInput["channel"])}
            >
              <SelectTrigger id="channel" className="w-full bg-[#f8fafc]">
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent>
                {CHANNEL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="spend" className="text-sm font-medium text-slate-700">
              New Spend
            </Label>
            <Input
              id="spend"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              required
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              placeholder="e.g. 4250.00"
              className="bg-[#f8fafc]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="revenue" className="text-sm font-medium text-slate-700">
              New Revenue
            </Label>
            <Input
              id="revenue"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              required
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="e.g. 12800.00"
              className="bg-[#f8fafc]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emailsSent" className="text-sm font-medium text-slate-700">
              Emails Sent
            </Label>
            <Input
              id="emailsSent"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              required
              value={emailsSent}
              onChange={(e) => setEmailsSent(e.target.value)}
              placeholder="e.g. 5400"
              className="bg-[#f8fafc]"
            />
          </div>

          <Button type="submit" size="block" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Injecting telemetry...
              </>
            ) : (
              "Inject Live Metrics"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
