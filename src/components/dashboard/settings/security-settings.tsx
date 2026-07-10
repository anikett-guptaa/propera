"use client";

import { useState } from "react";
import { Shield, Smartphone, LogOut } from "lucide-react";
import { SettingsCard, Field, SettingsInput, SaveButton, DangerButton, Toggle } from "./settings-ui";

const sessions = [
  { device: "MacBook Pro · Chrome", location: "Pune, Maharashtra", time: "Now · Active", current: true },
  { device: "iPhone 14 · Safari", location: "Pune, Maharashtra", time: "2 hours ago", current: false },
  { device: "Windows PC · Firefox", location: "Mumbai, Maharashtra", time: "3 days ago", current: false },
];

export function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-4">
      <SettingsCard
        title="Change password"
        description="Use a strong password with uppercase, numbers, and symbols."
        footer={
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              You will be logged out after changing your password
            </p>
            <SaveButton />
          </>
        }
      >
        <Field label="Current password">
          <SettingsInput type="password" placeholder="••••••••" />
        </Field>
        <Field label="New password" hint="Minimum 8 characters">
          <SettingsInput type="password" placeholder="••••••••" />
        </Field>
        <Field label="Confirm password">
          <SettingsInput type="password" placeholder="••••••••" />
        </Field>
      </SettingsCard>

      <SettingsCard
        title="Two-factor authentication"
        description="Add an extra layer of security to your account."
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink-950 dark:text-white">
                  Authenticator app
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Use Google Authenticator or similar for login codes
                </p>
              </div>
              <Toggle
                enabled={twoFactor}
                onChange={setTwoFactor}
                label=""
              />
            </div>
            {twoFactor && (
              <div className="mt-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
                    2FA is enabled
                  </p>
                </div>
                <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">
                  Your account is protected with two-factor authentication.
                </p>
              </div>
            )}
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Active sessions"
        description="Devices currently logged into your Propera account."
      >
        <div className="space-y-3">
          {sessions.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-ink-950 dark:text-white">
                      {s.device}
                    </p>
                    {s.current && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        This device
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {s.location} · {s.time}
                  </p>
                </div>
              </div>
              {!s.current && (
                <button className="flex items-center gap-1 text-xs text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-50 dark:border-white/[0.04]">
          <DangerButton label="Sign out all other sessions" />
        </div>
      </SettingsCard>
    </div>
  );
}
