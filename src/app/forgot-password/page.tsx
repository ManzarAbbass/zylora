"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { requestPasswordResetAction } from "@/features/auth/actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await requestPasswordResetAction(email);
      if (!result.success) {
        toast.error(result.error ?? "Failed to process request.");
        return;
      }
      setSubmitted(true);
      toast.success(
        "If account exists, a secure recovery token has been transmitted directly to your corporate desk.",
      );
    } catch {
      toast.error("Failed to process password reset request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100">
                <Mail className="size-6 text-emerald-600" />
              </div>
              <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Check Your Inbox
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                If account exists, a secure recovery token has been transmitted directly to your corporate desk.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#3B5FE0] hover:text-[#2A4CC7] transition"
              >
                <ArrowLeft className="size-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition"
              >
                <ArrowLeft className="size-4" />
                Back
              </Link>

              <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Forgot Password
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Enter your corporate email and we&apos;ll send you a recovery link.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Corporate Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none ring-[#3B5FE0] transition focus:ring-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3B5FE0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2A4CC7] focus:outline-none focus:ring-2 focus:ring-[#3B5FE0] focus:ring-offset-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Sending..." : "Send Recovery Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
