"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestAccessAction } from "@/features/landing/actions";

interface AccessRequestContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AccessRequestContext = createContext<AccessRequestContextValue>({
  open: false,
  setOpen: () => {},
});

export function useAccessRequest() {
  return useContext(AccessRequestContext);
}

const roleOptions = [
  "Agency Executive",
  "Brand Marketing Lead",
  "Corporate Procurement",
  "Media Buyer",
  "Other",
];

const spendOptions = ["Under $10k", "$10k – $50k", "$50k – $250k", "$250k +"];

interface AccessRequestTriggerProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "block";
  onClick?: () => void;
}

export function AccessRequestTrigger({
  className,
  children = "Request Access Demo",
  variant = "default",
  size = "default",
  onClick,
}: AccessRequestTriggerProps) {
  const { setOpen } = useAccessRequest();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => {
        setOpen(true);
        onClick?.();
      }}
      className={className}
    >
      {children}
    </Button>
  );
}

interface AccessRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AccessRequestDialog({ open, onOpenChange }: AccessRequestDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [monthlyAdSpend, setMonthlyAdSpend] = useState("");
  const [message, setMessage] = useState("");

  function reset() {
    setName("");
    setWorkEmail("");
    setCompanyName("");
    setRole("");
    setMonthlyAdSpend("");
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const result = await requestAccessAction({
      name,
      workEmail,
      companyName,
      role: role || null,
      monthlyAdSpend: monthlyAdSpend || null,
      message: message || null,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success("Access Request Submitted", {
        description: "Our onboarding team will reach out shortly with next steps.",
      });
      reset();
      onOpenChange(false);
    } else {
      toast.error("Submission Failed", {
        description: result.error,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Access Demo</DialogTitle>
          <DialogDescription>
            Tell us about your advertising ecosystem and our team will provision a private
            executive walkthrough.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="access-name">Full Name</Label>
              <Input
                id="access-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Whitfield"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="access-email">Work Email</Label>
              <Input
                id="access-email"
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="name@company.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="access-company">Company Name</Label>
            <Input
              id="access-company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Northwind Coffee"
              required
              autoComplete="organization"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="access-role">Your Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="access-role" aria-label="Your Role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="access-spend">Monthly Ad Spend</Label>
              <Select value={monthlyAdSpend} onValueChange={setMonthlyAdSpend}>
                <SelectTrigger id="access-spend" aria-label="Monthly Ad Spend">
                  <SelectValue placeholder="Select a band" />
                </SelectTrigger>
                <SelectContent>
                  {spendOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="access-message">Current Ecosystem (optional)</Label>
            <Textarea
              id="access-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Channels, tools, and pain points you want to consolidate..."
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2.5">
            <ShieldCheck className="size-4 shrink-0 text-[#2563eb]" />
            <p className="text-xs text-slate-600">
              Your request is logged securely and reviewed by our provisioning team — no credit
              card required.
            </p>
          </div>

          <Button
            type="submit"
            size="block"
            disabled={submitting}
            className="bg-zylora-blue hover:bg-[#0d3a54]"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {submitting ? "Submitting Request..." : "Submit Access Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AccessRequestProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const setOpenCb = useCallback((next: boolean) => setOpen(next), []);

  return (
    <AccessRequestContext.Provider value={{ open, setOpen: setOpenCb }}>
      {children}
      <AccessRequestDialog open={open} onOpenChange={setOpenCb} />
      <Toaster position="bottom-right" richColors />
    </AccessRequestContext.Provider>
  );
}
