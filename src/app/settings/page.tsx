import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LayoutClient } from "@/components/layout-client";
import { SettingsForm } from "./settings-form";
import { getUserNotificationPrefs } from "@/features/settings/queries";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { name, email, role, image } = session.user;

  const prefs = await getUserNotificationPrefs(session.user.id);

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
            System Account Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your notification preferences and secure access credentials.
          </p>
        </div>

        <SettingsForm
          initialPrefs={{
            emailNotifications: prefs?.emailNotifications ?? true,
            campaignUpdates: prefs?.campaignUpdates ?? true,
            approvalAlerts: prefs?.approvalAlerts ?? true,
          }}
        />
      </div>
    </LayoutClient>
  );
}