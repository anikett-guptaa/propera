"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { SettingsCard, SettingsInput, Field, SaveButton } from "./settings-ui";

interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  badge?: string;
  emoji: string;
}

const integrations: Integration[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Send bills, receipts, and reminders directly to tenants via WhatsApp.",
    connected: true,
    emoji: "💬",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Accept online rent payments via UPI, cards, and net banking.",
    connected: false,
    emoji: "💳",
  },
  {
    id: "google",
    name: "Google Sheets",
    description: "Sync payment and occupancy data to a Google Sheet automatically.",
    connected: false,
    emoji: "📊",
  },
  {
    id: "tally",
    name: "Tally",
    description: "Export monthly transactions to Tally for accounting.",
    connected: false,
    badge: "Coming soon",
    emoji: "📒",
  },
  {
    id: "fastag",
    name: "Fast2SMS",
    description: "Send bulk SMS reminders to tenants without WhatsApp.",
    connected: false,
    emoji: "📱",
  },
];

export function IntegrationsSettings() {
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.connected]))
  );

  return (
    <div className="space-y-4">
      <SettingsCard
        title="Connected apps"
        description="Connect Propera with the tools you already use."
      >
        <div className="space-y-3">
          {integrations.map((integration) => {
            const isConnected = connected[integration.id];
            const isSoon = !!integration.badge;

            return (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-white/[0.06] bg-zinc-50/50 dark:bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-xl shadow-sm shrink-0">
                    {integration.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-ink-950 dark:text-white">
                        {integration.name}
                      </p>
                      {integration.badge && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                          {integration.badge}
                        </span>
                      )}
                      {isConnected && (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 max-w-xs">
                      {integration.description}
                    </p>
                  </div>
                </div>
                {!isSoon && (
                  <button
                    onClick={() =>
                      setConnected((prev) => ({ ...prev, [integration.id]: !prev[integration.id] }))
                    }
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isConnected
                        ? "border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-rose-500 dark:hover:text-rose-400"
                        : "bg-ink-950 dark:bg-white text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100"
                    }`}
                  >
                    {isConnected ? "Disconnect" : "Connect"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </SettingsCard>

      {/* WhatsApp config - shown when connected */}
      {connected["whatsapp"] && (
        <SettingsCard
          title="WhatsApp configuration"
          description="Settings for your WhatsApp Business API connection."
          footer={
            <>
              <a
                href="#"
                className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline"
              >
                View WhatsApp API docs
                <ExternalLink className="w-3 h-3" />
              </a>
              <SaveButton />
            </>
          }
        >
          <Field label="Phone number ID" hint="From Meta Business dashboard">
            <SettingsInput defaultValue="1234567890123456" />
          </Field>
          <Field label="Access token" hint="Permanent token from Meta">
            <SettingsInput type="password" defaultValue="EAAbcdef..." />
          </Field>
          <Field label="Bill message template" hint="Template name approved by Meta">
            <SettingsInput defaultValue="propera_monthly_bill" />
          </Field>
        </SettingsCard>
      )}
    </div>
  );
}
