"use client";

import { User, Building2, Bell, Shield, CreditCard, Zap } from "lucide-react";

export type SettingsTab =
  | "profile"
  | "organization"
  | "notifications"
  | "security"
  | "billing"
  | "integrations";

interface SettingsNavProps {
  active: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}

const tabs: { value: SettingsTab; label: string; icon: React.ElementType }[] = [
  { value: "profile", label: "Profile", icon: User },
  { value: "organization", label: "Organization", icon: Building2 },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "security", label: "Security", icon: Shield },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "integrations", label: "Integrations", icon: Zap },
];

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
      {tabs.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            active === value
              ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-ink-950 dark:hover:text-white"
          }`}
        >
          <Icon className="w-4 h-4 shrink-0" />
          {label}
        </button>
      ))}
    </nav>
  );
}
