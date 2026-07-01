"use client";

import { motion } from "framer-motion";
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
  index?: number;
}

export function StatCard({
  label,
  value,
  sub,
  trend,
  trendUp,
  icon: Icon,
  iconColor = "text-violet-600 dark:text-violet-400",
  iconBg = "bg-violet-50 dark:bg-violet-500/10",
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-[18px] h-[18px]", iconColor)} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full font-mono",
            trendUp
              ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10"
              : "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-ink-950 dark:text-white font-mono">
          {value}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
        {sub && (
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">{sub}</p>
        )}
      </div>
    </motion.div>
  );
}