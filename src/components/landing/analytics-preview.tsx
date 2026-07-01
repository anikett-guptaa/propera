"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./section-heading";

const defaulters = [
  { name: "Karan Singh", room: "R-207", amount: "Rs. 16,000", days: 35 },
  { name: "Dinesh Kumar", room: "R-118", amount: "Rs. 8,000", days: 22 },
  { name: "Aakash Verma", room: "R-312", amount: "Rs. 9,000", days: 14 },
];

const monthlyData = [
  { month: "Jan", occupancy: 78, revenue: 58 },
  { month: "Feb", occupancy: 82, revenue: 64 },
  { month: "Mar", occupancy: 75, revenue: 52 },
  { month: "Apr", occupancy: 86, revenue: 71 },
  { month: "May", occupancy: 88, revenue: 78 },
  { month: "Jun", occupancy: 91, revenue: 91 },
];

const highlights = [
  { icon: CheckCircle2, label: "Bills sent on time", value: "96 / 96", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { icon: Users, label: "Tenants active", value: "88", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10" },
  { icon: AlertCircle, label: "Overdue payments", value: "3", color: "text-rose-500 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { icon: TrendingUp, label: "Collection rate", value: "96.8%", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
];

export function AnalyticsPreview() {
  return (
    <section className="relative px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Analytics"
          title="Reports that show the full picture, not just the good parts"
          description="Occupancy trends, revenue growth, and defaulter lists — updated in real time, always one click away."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm dark:border-white/[0.08] dark:bg-ink-900 lg:col-span-2"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-950 dark:text-white">Occupancy vs Revenue</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Last 6 months</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-sm bg-violet-500" />
                  Occupancy
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-sm bg-violet-200 dark:bg-violet-700" />
                  Revenue
                </span>
              </div>
            </div>

            <div className="flex h-40 items-end gap-3">
              {monthlyData.map((d, i) => (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex w-full items-end gap-1" style={{ height: "128px" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${d.occupancy}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600 to-violet-400"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${d.revenue}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-violet-200 to-violet-100 dark:from-violet-700 dark:to-violet-600"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{d.month}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className={`flex items-center gap-2 rounded-xl ${h.bg} px-3 py-2`}>
                  <h.icon className={`h-3.5 w-3.5 shrink-0 ${h.color}`} />
                  <div>
                    <p className={`font-mono text-sm font-semibold ${h.color}`}>{h.value}</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{h.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm dark:border-white/[0.08] dark:bg-ink-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-950 dark:text-white">Defaulters</p>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 font-mono text-[11px] font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                3 overdue
              </span>
            </div>

            <div className="space-y-3">
              {defaulters.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="flex items-start justify-between gap-3 rounded-xl border border-black/[0.04] bg-zinc-50/60 p-3 dark:border-white/[0.04] dark:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">{d.name}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{d.room}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">{d.amount}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{d.days}d overdue</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
              <p className="text-xs font-medium text-violet-800 dark:text-violet-300">Auto-reminders enabled</p>
              <p className="mt-1 text-[11px] leading-relaxed text-violet-600 dark:text-violet-400">
                Propera sends WhatsApp reminders at Day 3 and Day 7 automatically. No manual follow-up needed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}