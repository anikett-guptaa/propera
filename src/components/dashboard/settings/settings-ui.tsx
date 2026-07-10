import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function SettingsCard({ title, description, children, footer }: SettingsCardProps) {
  return (
    <div className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-zinc-100 dark:border-white/[0.06]">
        <h3 className="text-sm font-semibold text-ink-950 dark:text-white">{title}</h3>
        {description && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
}

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start py-4 border-b border-zinc-50 dark:border-white/[0.04] last:border-0 last:pb-0 first:pt-0">
      <div>
        <p className="text-sm font-medium text-ink-950 dark:text-white">{label}</p>
        {hint && <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{hint}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SettingsInput({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all ${className}`}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function SettingsTextarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all resize-none ${className}`}
    />
  );
}

export function SaveButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-ink-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors"
    >
      Save changes
    </button>
  );
}

export function DangerButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-rose-200 dark:border-rose-500/30 px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
    >
      {label}
    </button>
  );
}

interface ToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export function Toggle({ enabled, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-50 dark:border-white/[0.04] last:border-0 last:pb-0 first:pt-0">
      <div>
        <p className="text-sm font-medium text-ink-950 dark:text-white">{label}</p>
        {description && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
          enabled ? "bg-violet-600" : "bg-zinc-200 dark:bg-zinc-700"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
