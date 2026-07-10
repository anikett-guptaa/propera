"use client";

import { CheckCircle2, CreditCard, Download, ArrowUpRight } from "lucide-react";
import { SettingsCard, DangerButton } from "./settings-ui";

const invoices = [
  { id: "INV-2025-06", date: "Jun 1, 2025", amount: "Rs.2,499", status: "Paid" },
  { id: "INV-2025-05", date: "May 1, 2025", amount: "Rs.2,499", status: "Paid" },
  { id: "INV-2025-04", date: "Apr 1, 2025", amount: "Rs.2,499", status: "Paid" },
  { id: "INV-2025-03", date: "Mar 1, 2025", amount: "Rs.2,499", status: "Paid" },
];

export function BillingSettings() {
  return (
    <div className="space-y-4">
      {/* Current plan */}
      <SettingsCard
        title="Current plan"
        description="You are on the Growth plan."
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-violet-800 text-white text-xs font-semibold">
                Growth
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            </div>
            <p className="text-2xl font-semibold text-ink-950 dark:text-white font-mono mb-1">
              Rs.2,499
              <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500"> / month</span>
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Up to 100 rooms · Auto-billing · OCR · Analytics
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                "Auto-billing engine",
                "OCR meter reading",
                "WhatsApp bills",
                "Analytics dashboard",
                "Priority support",
              ].map((f) => (
                <span
                  key={f}
                  className="text-[10px] px-2 py-1 rounded-md bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
              Next billing
            </p>
            <p className="text-sm font-medium text-ink-950 dark:text-white">Jul 1, 2025</p>
            <button className="mt-3 flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:underline">
              Upgrade plan
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </SettingsCard>

      {/* Payment method */}
      <SettingsCard
        title="Payment method"
        description="Used for your monthly subscription."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Secured by Razorpay
            </p>
            <button className="rounded-xl border border-zinc-200 dark:border-white/[0.08] px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
              Update payment method
            </button>
          </>
        }
      >
        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.06]">
          <div className="w-10 h-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-ink-950 dark:text-white">
              •••• •••• •••• 4521
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Visa · Expires 08/27
            </p>
          </div>
          <span className="ml-auto text-[10px] font-medium px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            Default
          </span>
        </div>
      </SettingsCard>

      {/* Invoices */}
      <SettingsCard
        title="Billing history"
        description="Download invoices for your records."
      >
        <div className="space-y-2">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between py-2.5 border-b border-zinc-50 dark:border-white/[0.04] last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-ink-950 dark:text-white">{inv.id}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-ink-950 dark:text-white font-mono">
                  {inv.amount}
                </span>
                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {inv.status}
                </span>
                <button className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Cancel */}
      <SettingsCard
        title="Cancel subscription"
        description="Your access will continue until the end of the billing period."
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Cancel before Jul 1, 2025 to avoid the next charge.
          </p>
          <DangerButton label="Cancel plan" />
        </div>
      </SettingsCard>
    </div>
  );
}
