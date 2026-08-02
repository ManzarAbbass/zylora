"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Kanban, Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/landing/site-header";
import { AccessRequestProvider } from "@/components/landing/access-request-dialog";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(emailVal: string, passwordVal: string) {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: emailVal,
        password: passwordVal,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials provided. Please double-check your security tokens.");
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "ADMIN") {
        toast.success("Welcome back, Zylora Admin.");
        router.push("/admin/dashboard");
      } else {
        toast.success("Welcome back.");
        router.push("/client/dashboard");
      }
    } catch {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleSignIn(email, password);
  }

  return (
    <AccessRequestProvider>
      <div className="flex min-h-screen flex-col bg-zylora-blue">
        <SiteHeader variant="navy" />

        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
          <div className="w-full max-w-md">
            <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-lg border border-white/20 bg-[#124768] shadow-[0_6px_16px_rgba(18,71,104,0.35)]">
                  <Kanban className="size-6 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Welcome back
                </h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  Sign in to access your Zylora enterprise workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      autoComplete="email"
                      className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none ring-[#3B5FE0] transition focus:ring-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Secure Access Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none ring-[#3B5FE0] transition focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 shrink-0 text-[#3B5FE0]" />
                    <span className="text-xs text-slate-500">Enterprise-grade security</span>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#3B5FE0] transition hover:text-[#2A4CC7]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3B5FE0] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2A4CC7] focus:outline-none focus:ring-2 focus:ring-[#3B5FE0] focus:ring-offset-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Authenticating..." : "Authenticate Credentials"}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-white/50">
              &copy; {new Date().getFullYear()} Zylora. All rights reserved.
            </p>
          </div>
        </main>
      </div>
    </AccessRequestProvider>
  );
}
