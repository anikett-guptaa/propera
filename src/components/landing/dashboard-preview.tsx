"use client";

import { motion } from "framer-motion";
import {
  Home,
  DoorOpen,
  Wallet,
  TrendingDown,
  Users2,
  Receipt,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

const recentPayments = [
  { name: "Rohit Sharma", room: "R-201", amount: "₹8,500", status: "Paid" },
  { name: "Priya Mehta", room: "R-105", amount: "₹7,200", status: "Paid" },
  { name: "Aakash Verma", room: "R-312", amount: "₹9,000", status: "Pending" },
];

const previewCards = [
  {
    icon: Home,
    label: "Occupancy rate",
    value: "91.6%",
    sub: "88 of 96 rooms",
    accent: "text-emerald-400",
    accentBg: "from-emerald-500/15 to-emerald-700/10 ring-emerald-400/15",
  },
  {
    icon: Wallet,
    label: "Monthly revenue",
    value: "₹7.04L",
    sub: "↑ ₹24K vs last month",
    accent: "text-violet-300",
    accentBg: "from-violet-500/15 to-violet-700/10 ring-violet-400/15",
  },
  {
    icon: TrendingDown,
    label: "Pending rent",
    value: "₹1.2L",
    sub: "12 tenants overdue",
    accent: "text-rose-400",
    accentBg: "from-rose-500/15 to-rose-700/10 ring-rose-400/15",
  },
  {
    icon: DoorOpen,
    label: "Vacant rooms",
    value: "8",
    sub: "Across 3 properties",
    accent: "text-amber-400",
    accentBg: "from-amber-500/15 to-amber-700/10 ring-amber-400/15",
  },
];

export function DashboardPreview() {
  return (
    <section className="relative px-4 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Inside Propera"
        title="A dashboard that answers questions before you ask them"
        description="No digging through tabs. The numbers that matter sit right at the top, every time you open it."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-16 max-w-5xl rounded-3xl border border-white/[0.08] bg-ink-900/60 p-3 shadow-[0_40px_120px_-40px_rgba(124,92,252,0.45)] backdrop-blur-xl sm:p-5"
      >
        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {previewCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div
                className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ring-1 ${c.accentBg}`}
              >
                <c.icon className={`h-4 w-4 ${c.accent}`} />
              </div>
              <p className="font-mono text-xl font-semibold text-white sm:text-2xl">
                {c.value}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{c.label}</p>
              <p className="mt-2 text-[11px] text-zinc-600">{c.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Two column: chart + payments */}
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 lg:col-span-3"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">
                Revenue, last 6 months
              </p>
              <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-400">
                ₹7.04L this month
              </span>
            </div>
            <div className="flex h-32 items-end gap-2.5">
              {[58, 64, 52, 71, 78, 91].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + i * 0.08,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex-1 rounded-t-md ${
                    i === 5
                      ? "bg-gradient-to-t from-violet-500 to-violet-300"
                      : "bg-gradient-to-t from-violet-700/60 to-violet-500/40"
                  }`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">Recent payments</p>
              <Receipt className="h-3.5 w-3.5 text-zinc-500" />
            </div>
            <div className="space-y-3">
              {recentPayments.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400/30 to-violet-700/30 text-[10px] font-medium text-violet-200">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-zinc-200">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">{p.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs font-medium text-white">
                      {p.amount}
                    </p>
                    <p
                      className={`text-[10px] ${
                        p.status === "Paid"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {p.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-zinc-500">
              <Users2 className="h-3 w-3" />
              88 active tenants across 3 properties
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}