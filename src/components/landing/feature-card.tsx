"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  large?: boolean;
}

export function FeatureCard({ icon: Icon, title, description, index, large = false }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm transition-all hover:border-violet-300/50 hover:shadow-md dark:border-white/[0.08] dark:bg-ink-900 dark:hover:border-violet-400/25 ${large ? "sm:col-span-2" : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-400/0 blur-3xl transition-colors duration-500 group-hover:bg-violet-400/15"
      />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 ring-1 ring-violet-300/40 dark:from-violet-500/15 dark:to-violet-700/15 dark:ring-violet-400/15">
        <Icon className="h-[18px] w-[18px] text-violet-700 dark:text-violet-300" />
      </div>
      <h3 className="text-[15px] font-semibold text-ink-950 dark:text-white">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
    </motion.div>
  );
}