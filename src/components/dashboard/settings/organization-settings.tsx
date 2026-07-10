"use client";

import { SettingsCard, Field, SettingsInput, SettingsTextarea, SaveButton } from "./settings-ui";

export function OrganizationSettings() {
  return (
    <div className="space-y-4">
      <SettingsCard
        title="Organization details"
        description="How your business appears to tenants and on bills."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Shown on all WhatsApp bills and PDFs
            </p>
            <SaveButton />
          </>
        }
      >
        <Field label="Organization name" hint="Appears on all tenant communications">
          <SettingsInput defaultValue="Gupta Hostels" />
        </Field>

        <Field label="Slug" hint="Your unique URL identifier">
          <div className="flex items-center rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] overflow-hidden focus-within:ring-2 focus-within:ring-violet-300 dark:focus-within:ring-violet-700 transition-all">
            <span className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 border-r border-zinc-200 dark:border-white/[0.08] select-none shrink-0">
              propera.in/
            </span>
            <input
              type="text"
              defaultValue="gupta-hostels"
              className="flex-1 px-3 py-2 text-sm text-ink-950 dark:text-white bg-transparent outline-none"
            />
          </div>
        </Field>

        <Field label="Contact email" hint="For tenant queries and receipts">
          <SettingsInput type="email" defaultValue="info@guptahostels.in" />
        </Field>

        <Field label="Contact phone" hint="Shown on all communications">
          <SettingsInput type="tel" defaultValue="+91 98765 43210" />
        </Field>

        <Field label="Address" hint="Your primary business address">
          <SettingsTextarea rows={2} defaultValue="45 Koregaon Park Road, Pune, Maharashtra 411001" />
        </Field>

        <Field label="GST number" hint="For tax invoices (optional)">
          <SettingsInput placeholder="27AABCG1234A1Z5" />
        </Field>
      </SettingsCard>

      <SettingsCard
        title="Billing configuration"
        description="Default settings applied when auto-billing runs."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Applied to all new bills from next cycle
            </p>
            <SaveButton />
          </>
        }
      >
        <Field label="Bill due date" hint="Day of month payment is due">
          <div className="flex items-center gap-2">
            <SettingsInput type="number" defaultValue="5" min={1} max={28} className="w-20" />
            <span className="text-sm text-zinc-400 dark:text-zinc-500">of each month</span>
          </div>
        </Field>

        <Field label="Late fee" hint="Charged after due date (optional)">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 dark:text-zinc-500">Rs.</span>
            <SettingsInput type="number" defaultValue="500" className="w-28" />
            <span className="text-sm text-zinc-400 dark:text-zinc-500">per day</span>
          </div>
        </Field>

        <Field label="Electricity rate" hint="Per unit rate for billing">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 dark:text-zinc-500">Rs.</span>
            <SettingsInput type="number" defaultValue="12" className="w-24" />
            <span className="text-sm text-zinc-400 dark:text-zinc-500">per unit</span>
          </div>
        </Field>
      </SettingsCard>
    </div>
  );
}
