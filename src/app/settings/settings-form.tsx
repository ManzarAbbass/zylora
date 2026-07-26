"use client";

import { useState } from "react";
import { Bell, Key, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function SettingsForm() {
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyCampaigns, setNotifyCampaigns] = useState(true);
  const [notifyApprovals, setNotifyApprovals] = useState(true);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);

    toast.success("Update Settings Parameters", {
      description: "Your workspace configuration preferences have been saved successfully.",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-slate-100 bg-[#ffffff] shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-[#3B5FE0]" />
            <h2 className="text-base font-semibold text-[#0f172a]">Notification Preferences</h2>
          </div>
        </div>
        <div className="divide-y divide-slate-100 px-6">
          <label className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-[#0f172a]">Email Notifications</p>
              <p className="text-xs text-slate-500">Receive daily digest and alerts via email</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifyEmail}
              onClick={() => setNotifyEmail(!notifyEmail)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                notifyEmail ? "bg-[#3B5FE0]" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform ${
                  notifyEmail ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-[#0f172a]">Campaign Updates</p>
              <p className="text-xs text-slate-500">Get notified when campaigns launch or change status</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifyCampaigns}
              onClick={() => setNotifyCampaigns(!notifyCampaigns)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                notifyCampaigns ? "bg-[#3B5FE0]" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform ${
                  notifyCampaigns ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-[#0f172a]">Approval Requests</p>
              <p className="text-xs text-slate-500">Receive alerts for pending asset approvals</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifyApprovals}
              onClick={() => setNotifyApprovals(!notifyApprovals)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                notifyApprovals ? "bg-[#3B5FE0]" : "bg-slate-200"
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
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Key className="size-4 text-[#3B5FE0]" />
            <h2 className="text-base font-semibold text-[#0f172a]">Secure Access Credentials</h2>
          </div>
        </div>
        <div className="space-y-4 px-6 py-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Current Password</label>
            <div className="relative mt-1">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2 pr-10 text-sm text-[#0f172a] placeholder-slate-400 outline-none ring-[#3B5FE0] transition focus:ring-2"
                placeholder="Enter current password"
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
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2 pr-10 text-sm text-[#0f172a] placeholder-slate-400 outline-none ring-[#3B5FE0] transition focus:ring-2"
                placeholder="Enter new password"
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
                className="w-full rounded-lg border border-slate-200 bg-[#f8fafc] px-3 py-2 pr-10 text-sm text-[#0f172a] placeholder-slate-400 outline-none ring-[#3B5FE0] transition focus:ring-2"
                placeholder="Confirm new password"
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

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-[#3B5FE0] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3B5FE0]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 className="size-4 animate-spin" />}
          [Update Settings Parameters]
        </button>
      </div>
    </form>
  );
}
