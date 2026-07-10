"use client";

import { useState } from "react";
import { SettingsNav } from "@/components/dashboard/settings/settings-nav";
import { ProfileSettings } from "@/components/dashboard/settings/profile-settings";
import { OrganizationSettings } from "@/components/dashboard/settings/organization-settings";
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings";
import { SecuritySettings } from "@/components/dashboard/settings/security-settings";
import { BillingSettings } from "@/components/dashboard/settings/billing-settings";
import { IntegrationsSettings } from "@/components/dashboard/settings/integrations-settings";
import type { SettingsTab } from "@/components/dashboard/settings/settings-nav";

const tabTitles: Record<SettingsTab, { title: string; description: string }> = {
  profile: {
    title: "Profile",
    description: "Manage your personal information and account.",
  },
  organization: {
    title: "Organization",
    description: "Configure your business details and billing defaults.",
  },
  notifications: {
    title: "Notifications",
    description: "Choose when and how you receive alerts.",
  },
  security: {
    title: "Security",
    description: "Manage your password, 2FA, and active sessions.",
  },
  billing: {
    title: "Billing",
    description: "View your plan, invoices, and payment method.",
  },
  integrations: {
    title: "Integrations",
    description: "Connect Propera with WhatsApp, payments, and more.",
  },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const { title, description } = tabTitles[activeTab];

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-ink-950 dark:text-white">{title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <aside className="lg:w-48 shrink-0">
          <div className="lg:sticky lg:top-20">
            <SettingsNav active={activeTab} onChange={setActiveTab} />
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "organization" && <OrganizationSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "integrations" && <IntegrationsSettings />}
        </div>
      </div>
    </div>
  );
}
