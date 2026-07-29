"use client";

import { useState } from "react";
import { Bell, Key, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { changePasswordAction } from "@/features/auth/actions";
import { updateNotificationPrefsAction } from "@/features/settings/actions";
import type { UserNotificationPrefs } from "@/features/settings/queries";

interface Props {
  initialPrefs: UserNotificationPrefs;
}

export function SettingsForm({ initialPrefs }: Props) {
  const [notifyEmail, setNotifyEmail] = useState(initialPrefs.emailNotifications);
  const [notifyCampaigns, setNotifyCampaigns] = useState(initialPrefs.campaignUpdates);
  const [notifyApprovals, setNotifyApprovals] = useState(initialPrefs.approvalAlerts);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  async function handleToggle(field: string, value: boolean) {
    setToggling(field);
    const prefs = {
      emailNotifications: field === "email" ? value : notifyEmail,
      campaignUpdates: field === "campaigns" ? value : notifyCampaigns,
      approvalAlerts: field === "approvals" ? value : notifyApprovals,
    };

    const result = await updateNotificationPrefsAction(prefs);
    setToggling(null);

    if (!result.success) {
      toast.error("Update Failed", { description: result.error });
      return;
    }

    toast.success("Preferences Updated");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Validation Error", {
        description: "All password fields are required.",
      });
      return;
    }

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
      toast.error("Validation Error", {
        description: "Password must be at least 8 characters with uppercase, lowercase, digit, and special character.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Validation Error", {
        description: "New passwords do not match.",
      });
      return;
    }

    setSubmitting(true);

    const result = await changePasswordAction(currentPassword, newPassword);

    setSubmitting(false);

    if (!result.success) {
      toast.error("Password Update Failed", {
        description: result.error,
      });
      return;
    }

    toast.success("Credentials Updated", {
      description: "Your password has been changed successfully.",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-slate-100 bg-[#ffffff] shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-[#2563eb]" />
            <h2 className="text-base font-semibold text-[#0f172a]">Notification Preferences</h2>
          </div>
        </div>
        <div className="divide-y divide-slate-100 px-4 sm:px-6">
          <label className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#0f172a]">Email Notifications</p>
              <p className="text-xs text-slate-500">Receive daily digest and alerts via email</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifyEmail}
              disabled={toggling === "email"}
              onClick={() => {
                const next = !notifyEmail;
                setNotifyEmail(next);
                handleToggle("email", next);
              }}
              className={`self-start sm:self-auto relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors disabled:opacity-50 ${
                notifyEmail ? "bg-[#2563eb]" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform ${
                  notifyEmail ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#0f172a]">Campaign Updates</p>
              <p className="text-xs text-slate-500">Get notified when campaigns launch or change status</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifyCampaigns}
              disabled={toggling === "campaigns"}
              onClick={() => {
                const next = !notifyCampaigns;
                setNotifyCampaigns(next);
                handleToggle("campaigns", next);
              }}
              className={`self-start sm:self-auto relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors disabled:opacity-50 ${
                notifyCampaigns ? "bg-[#2563eb]" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform ${
                  notifyCampaigns ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#0f172a]">Approval Requests</p>
              <p className="text-xs text-slate-500">Receive alerts for pending asset approvals</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifyApprovals}
              disabled={toggling === "approvals"}
              onClick={() => {
                const next = !notifyApprovals;
                setNotifyApprovals(next);
                handleToggle("approvals", next);
              }}
              className={`self-start sm:self-auto relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors disabled:opacity-50 ${
                notifyApprovals ? "bg-[#2563eb]" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform ${
                  notifyApprovals ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-slate-100 bg-[#ffffff] shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Key className="size-4 text-[#2563eb]" />
            <h2 className="text-base font-semibold text-[#0f172a]">Secure Access Credentials</h2>
          </div>
        </div>
        <div className="space-y-4 px-4 py-4 sm:px-6">
          <div>
            <label className="text-xs font-medium text-slate-500">Current Password</label>
            <div className="relative mt-1">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2 pr-10 text-sm text-[#0f172a] placeholder-slate-400 outline-none ring-[#2563eb] transition focus:ring-2"
                placeholder="Enter current password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">New Password</label>
            <div className="relative mt-1">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2 pr-10 text-sm text-[#0f172a] placeholder-slate-400 outline-none ring-[#2563eb] transition focus:ring-2"
                placeholder="Enter new password"
                required
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Confirm New Password</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2 pr-10 text-sm text-[#0f172a] placeholder-slate-400 outline-none ring-[#2563eb] transition focus:ring-2"
                placeholder="Confirm new password"
                required
                minLength={8}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2563eb]/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {submitting && <Loader2 className="size-4 animate-spin" />}
          Update Credentials
        </button>
      </div>
    </form>
  );
}