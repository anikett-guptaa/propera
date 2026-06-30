import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "done" | "active" | "pending";

export interface Step {
  label: string;
  status: StepStatus;
}

interface OnboardingStepperProps {
  steps: Step[];
}

export function OnboardingStepper({ steps }: OnboardingStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {/* Dot */}
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all",
                step.status === "done" &&
                  "bg-zinc-900 dark:bg-white",
                step.status === "active" &&
                  "bg-zinc-900 dark:bg-white ring-4 ring-zinc-200 dark:ring-zinc-700",
                step.status === "pending" &&
                  "bg-zinc-200 dark:bg-zinc-800"
              )}
            >
              {step.status === "done" ? (
                <Check className="w-3 h-3 text-white dark:text-zinc-900 stroke-[2.5]" />
              ) : (
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    step.status === "active"
                      ? "text-white dark:text-zinc-900"
                      : "text-zinc-400 dark:text-zinc-500"
                  )}
                >
                  {index + 1}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-xs font-medium transition-colors",
                step.status === "active"
                  ? "text-zinc-900 dark:text-white"
                  : step.status === "done"
                  ? "text-zinc-500 dark:text-zinc-400"
                  : "text-zinc-400 dark:text-zinc-500"
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-8 h-px transition-colors",
                step.status === "done"
                  ? "bg-zinc-900 dark:bg-white"
                  : "bg-zinc-200 dark:bg-zinc-700"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}