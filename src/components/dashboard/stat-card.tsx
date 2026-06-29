import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({
  label,
  value,
  sub,
  trend,
  trendUp,
  icon: Icon,
  iconColor = "text-zinc-700 dark:text-zinc-300",
  iconBg = "bg-zinc-100 dark:bg-zinc-800",
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", iconBg)}>
          <Icon className={cn("w-4.5 h-4.5 w-[18px] h-[18px]", iconColor)} />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trendUp
                ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "text-red-500 bg-red-50 dark:bg-red-950/40 dark:text-red-400"
            )}
          >
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
        {sub && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{sub}</p>
        )}
      </div>
    </div>
  );
}