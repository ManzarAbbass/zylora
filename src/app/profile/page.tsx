import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Mail, Shield, Building2, Award, LogOut } from "lucide-react";
import { LayoutClient } from "@/components/layout-client";
import { UserAvatar } from "@/components/user-avatar";
import { signOutAction } from "@/features/auth/actions";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { name, email, role, companyName, image } = session.user;

  return (
    <LayoutClient
      role={role}
      userName={name ?? undefined}
      userEmail={email ?? undefined}
      userImage={image}
    >
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] sm:text-3xl">
            Corporate Profile Workspace
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Executive corporate identity card linked to your authenticated session.
          </p>
        </div>

        <div className="rounded-lg border border-slate-100 bg-[#ffffff] shadow-sm">
          <div className="flex flex-col items-center gap-4 border-b border-slate-100 px-6 py-8">
            <UserAvatar
              name={name ?? "User"}
              image={image}
              className="size-16 rounded-full bg-[#3B5FE0]/10 text-lg text-[#3B5FE0]"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-[#0f172a]">{name ?? "—"}</p>
              <p className="text-sm text-slate-500">{email ?? "—"}</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#3B5FE0]/10">
                <Mail className="size-5 text-[#3B5FE0]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">Business Email Address</p>
                <p className="truncate text-sm font-medium text-[#0f172a]">{email ?? "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#3B5FE0]/10">
                <Award className="size-5 text-[#3B5FE0]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">Account Plan</p>
                <div>
                  <span className="inline-flex items-center rounded-full bg-[#3B5FE0]/10 px-2.5 py-0.5 text-xs font-semibold text-[#3B5FE0]">
                    {role === "ADMIN" ? "Agency Partner" : "Enterprise"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#3B5FE0]/10">
                <Shield className="size-5 text-[#3B5FE0]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">System Access Role</p>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      role === "ADMIN"
                        ? "bg-[#3B5FE0]/10 text-[#3B5FE0]"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {role === "ADMIN" ? "ADMIN" : "CLIENT"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#3B5FE0]/10">
                <Building2 className="size-5 text-[#3B5FE0]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">Registered Company Group Name</p>
                <p className="truncate text-sm font-medium text-[#0f172a]">
                  {companyName ?? "—"}
                </p>
              </div>
            </div>
          </div>

          <form action={signOutAction} className="px-6 pb-6">
            <button
              type="submit"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </LayoutClient>
  );
}
