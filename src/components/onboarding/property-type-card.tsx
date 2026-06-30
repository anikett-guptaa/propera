import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyTypeCardProps {
  label: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export function PropertyTypeCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
}: PropertyTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl border p-3.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
        selected
          ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800"
          : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
            selected
              ? "bg-zinc-900 dark:bg-white"
              : "bg-zinc-100 dark:bg-zinc-800"
          )}
        >
          <Icon
            className={cn(
              "w-4 h-4 transition-colors",
              selected
                ? "text-white dark:text-zinc-900"
                : "text-zinc-500 dark:text-zinc-400"
            )}
          />
        </div>
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-medium transition-colors",
              selected
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {label}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
            {description}
          </p>
        </div>
        <div
          className={cn(
            "ml-auto w-4 h-4 rounded-full border-2 shrink-0 transition-all",
            selected
              ? "border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white"
              : "border-zinc-300 dark:border-zinc-600"
          )}
        >
          {selected && (
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-900" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}