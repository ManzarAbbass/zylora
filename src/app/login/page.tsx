"use client";

import { useState } from "react";
import { Mail, Lock, TrendingUp, BarChart3, Shield, Users } from "lucide-react";
import { Toaster, toast } from "sonner";

interface Shape {
  className: string;
  element: React.ReactNode;
  duration: number;
  delay: number;
}

const shapes: Shape[] = [
  {
    className: "-left-12 -top-12",
    element: <div className="size-48 rounded-full bg-[#124768]/5" />,
    duration: 8,
    delay: 0,
  },
  {
    className: "-bottom-16 left-1/3",
    element: <div className="size-64 rounded-full bg-[#124768]/5" />,
    duration: 10,
    delay: 1.5,
  },
  {
    className: "right-16 top-1/4",
    element: <div className="size-32 rounded-xl bg-[#124768]/5" />,
    duration: 7,
    delay: 0.8,
  },
  {
    className: "bottom-1/3 right-8",
    element: <div className="size-24 rotate-45 bg-[#124768]/5" />,
    duration: 9,
    delay: 2.2,
  },
  {
    className: "left-1/4 top-1/3",
    element: <div className="size-40 rounded-full bg-[#124768]/5" />,
    duration: 6,
    delay: 1.2,
  },
];

const features = [
  { icon: BarChart3, label: "Real-Time Analytics" },
  { icon: TrendingUp, label: "Performance Insights" },
  { icon: Shield, label: "Enterprise Security" },
  { icon: Users, label: "Client Management" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function injectCredentials(cred: { email: string; toastMsg: string }) {
    setEmail(cred.email);
    setPassword("••••••••••••");
    toast.success(cred.toastMsg);
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        {shapes.map((s, i) => (
          <div
            key={i}
            className={`absolute ${s.className}`}
            style={{
              animation: `float ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.element}
          </div>
        ))}

        <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-16">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Zylora
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enterprise Client Portal
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="text-3xl font-bold leading-tight text-slate-900">
              Your Agency&apos;s
              <br />
              Command Center.
            </h3>
            <p className="mt-3 max-w-md text-slate-500">
              Manage clients, track campaign performance, and deliver
              enterprise-grade reports — all from one unified dashboard.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 rounded-lg border border-slate-100 bg-[#f8fafc] p-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#124768]">
                      <Icon className="size-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {f.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Zylora. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[#124768] p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Zylora Portal
            </h1>
            <p className="mt-1 text-sm text-blue-200">
              Enterprise Client Portal
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="mb-8 hidden lg:block">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Sign in to access your enterprise workspace.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none ring-[#124768] transition focus:ring-2"
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none ring-[#124768] transition focus:ring-2"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#124768] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#124768]/90 focus:outline-none focus:ring-2 focus:ring-[#124768] focus:ring-offset-2"
              >
                Authenticate Credentials
              </button>
            </form>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="mb-3 text-center text-xs font-medium text-slate-400">
                🛠️ Internal Workflow Simulation Engine
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() =>
                    injectCredentials({
                      email: "admin@zylora.com",
                      toastMsg: "Admin credentials injected. Mode locked.",
                    })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#124768] focus:ring-offset-1"
                >
                  Simulate Zylora Agency Admin
                </button>
                <button
                  type="button"
                  onClick={() =>
                    injectCredentials({
                      email: "ahmed@clothing.com",
                      toastMsg: "Client session profile loaded. Mode locked.",
                    })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#124768] focus:ring-offset-1"
                >
                  Simulate Ahmed Clothing Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
