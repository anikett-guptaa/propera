"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FloatingCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  delay?: number;
  floatDuration?: number;
}

export function FloatingCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp = true,
  className = "",
  delay = 0,
  floatDuration = 7,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-[0_20px_50px_-15px_rgba(124,92,252,0.3)] dark:border-white/10 dark:bg-ink-900/90 dark:shadow-[0_20px_50px_-15px_rgba(124,92,252,0.45)]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 ring-1 ring-violet-300/40 dark:from-violet-500/20 dark:to-violet-700/20 dark:ring-violet-400/20">
          <Icon className="h-4 w-4 text-violet-700 dark:text-violet-300" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-zinc-400 whitespace-nowrap dark:text-zinc-500">{label}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-ink-950 font-mono dark:text-white">{value}</p>
            {trend && (
              <span className={`text-[10px] font-medium font-mono ${trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {trend}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}