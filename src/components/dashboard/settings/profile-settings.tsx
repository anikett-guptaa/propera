"use client";

import { Camera } from "lucide-react";
import { SettingsCard, Field, SettingsInput, SettingsTextarea, SaveButton, DangerButton } from "./settings-ui";

export function ProfileSettings() {
  return (
    <div className="space-y-4">
      <SettingsCard
        title="Personal information"
        description="Update your name, email, and contact details."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Last updated June 1, 2025
            </p>
            <SaveButton />
          </>
        }
      >
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-50 dark:border-white/[0.04]">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white text-xl font-semibold">
              RG
            </div>
            <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors shadow-sm">
              <Camera className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-ink-950 dark:text-white">Rahul Gupta</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Owner · Gupta Hostels
            </p>
            <button className="text-xs text-violet-600 dark:text-violet-400 hover:underline mt-1">
              Change photo
            </button>
          </div>
        </div>

        <Field label="Full name" hint="Your display name across Propera">
          <SettingsInput defaultValue="Rahul Gupta" />
        </Field>

        <Field label="Email address" hint="Used for login and notifications">
          <SettingsInput type="email" defaultValue="rahul@guptahostels.in" />
        </Field>

        <Field label="Phone number" hint="For WhatsApp and SMS alerts">
          <SettingsInput type="tel" defaultValue="+91 98765 43210" />
        </Field>

        <Field label="Bio" hint="Brief description (optional)">
          <SettingsTextarea
            rows={3}
            defaultValue="Property owner managing 3 hostels and PGs in Pune since 2018."
          />
        </Field>
      </SettingsCard>

      <SettingsCard
        title="Danger zone"
        description="Irreversible actions for your account."
      >
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-ink-950 dark:text-white">Delete account</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Permanently delete your account and all associated data
            </p>
          </div>
          <DangerButton label="Delete account" />
        </div>
      </SettingsCard>
    </div>
  );
}
