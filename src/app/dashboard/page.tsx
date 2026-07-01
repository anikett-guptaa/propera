"use client";

import { motion } from "framer-motion";
import {
  Building2, DoorOpen, Users, Wallet,
  AlertCircle, TrendingUp, Plus, ArrowRight,
  Zap, CheckCircle2, Clock, MoreHorizontal,
  Home, Receipt
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

// ── Mock data ─────
const stats = [
  {
    label: "Total Properties",
    value: "3",
    sub: "Across Pune city",
    trend: "+1 this year",
    trendUp: true,
    icon: Building2,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    label: "Occupied Rooms",
    value: "88/96",
    sub: "91.6% occupancy rate",
    trend: "↑ 3 this month",
    trendUp: true,
    icon: DoorOpen,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    label: "Active Tenants",
    value: "88",
    sub: "8 rooms currently vacant",
    trend: "+5 this month",
    trendUp: true,
    icon: Users,
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    label: "Monthly Revenue",
    value: "Rs.7.04L",
    sub: "June 2025",
    trend: "↑ Rs.24K vs May",
    trendUp: true,
    icon: Wallet,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    label: "Pending Dues",
    value: "Rs.1.2L",
    sub: "From 12 tenants",
    trend: "3 cleared today",
    trendUp: true,
    icon: AlertCircle,
    iconColor: "text-rose-500 dark:text-rose-400",
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    label: "Total Expenses",
    value: "Rs.48K",
    sub: "June 2025",
    trend: "↓ Rs.6K vs May",
    trendUp: false,
    icon: TrendingUp,
    iconColor: "text-zinc-500 dark:text-zinc-400",
    iconBg: "bg-zinc-100 dark:bg-zinc-800",
  },
];

const recentPayments = [
  { name: "Rohit Sharma", room: "R-201", property: "Gupta Boys Hostel", amount: "Rs.8,500", status: "paid", time: "2 min ago" },
  { name: "Priya Mehta", room: "R-105", property: "Gupta Girls PG", amount: "Rs.7,200", status: "paid", time: "1 hr ago" },
  { name: "Aakash Verma", room: "R-312", property: "Gupta Boys Hostel", amount: "Rs.9,000", status: "pending", time: "Due Jun 10" },
  { name: "Sneha Patel", room: "R-108", property: "Gupta Girls PG", amount: "Rs.7,500", status: "paid", time: "Jun 3" },
  { name: "Karan Singh", room: "R-207", property: "Gupta Boys Hostel", amount: "Rs.8,000", status: "overdue", time: "Due Jun 1" },
  { name: "Divya Nair", room: "R-403", property: "Sunrise Apartments", amount: "Rs.9,200", status: "paid", time: "Jun 3" },
];

const defaulters = [
  { name: "Karan Singh", room: "R-207", amount: "Rs.16,000", days: 35, property: "Gupta Boys" },
  { name: "Dinesh Kumar", room: "R-118", amount: "Rs.8,000", days: 22, property: "Gupta Boys" },
  { name: "Aakash Verma", room: "R-312", amount: "Rs.9,000", days: 14, property: "Gupta Boys" },
  { name: "Ravi Tiwari", room: "R-209", amount: "Rs.7,500", days: 8, property: "Sunrise Apts" },
];

const activities = [
  { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "Rohit Sharma paid Rs.8,500 for June · Room R-201", time: "2 min ago" },
  { icon: Zap, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10", text: "Auto-billing complete · 84 bills generated · 96 WhatsApp messages sent", time: "1 hr ago" },
  { icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", text: "New tenant Sneha Patel added to Room R-415 · Gupta Boys Hostel", time: "3 hr ago" },
  { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", text: "Reminder sent to 5 defaulters · 3 have opened the message", time: "5 hr ago" },
  { icon: Home, color: "text-zinc-500", bg: "bg-zinc-100 dark:bg-zinc-800", text: "Maintenance request raised · Room R-208 · Water leakage", time: "Yesterday" },
];

const revenueData = [58, 64, 52, 71, 78, 91];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const properties = [
  { name: "Gupta Boys Hostel", type: "Hostel", occupied: 36, total: 40, revenue: "Rs.3.1L", color: "bg-violet-500" },
  { name: "Gupta Girls PG", type: "PG", occupied: 32, total: 36, revenue: "Rs.2.6L", color: "bg-blue-500" },
  { name: "Sunrise Apartments", type: "Apartment", occupied: 20, total: 20, revenue: "Rs.1.4L", color: "bg-emerald-500" },
];

const statusStyle: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  overdue: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

const quickActions = [
  { icon: Users, label: "Add Tenant", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10" },
  { icon: Building2, label: "Add Property", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { icon: Wallet, label: "Record Payment", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { icon: Receipt, label: "Run Billing", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink-950 dark:text-white">
            Good morning, Rahul
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Here is what is happening at Gupta Hostels today.
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors shrink-0">
          <Zap className="w-3.5 h-3.5" />
          Run Auto-Billing
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i < 4 ? "" : "hidden xl:block"}>
            <StatCard {...stat} />
          </div>
        ))}
        {/* show last 2 on smaller screens in a row */}
        <div className="xl:hidden col-span-2 lg:col-span-3 grid grid-cols-2 gap-3">
          {stats.slice(4).map((stat, i) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Revenue chart + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-sm text-ink-950 dark:text-white">Monthly Revenue</h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Rs.7.04L this month</p>
            </div>
            <div className="flex gap-1">
              {["3M", "6M", "1Y"].map((p, i) => (
                <button
                  key={p}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    i === 1
                      ? "bg-ink-950 dark:bg-white text-white dark:text-ink-950"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex h-36 items-end gap-2.5">
            {revenueData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full rounded-t-md ${
                    i === 5
                      ? "bg-gradient-to-t from-violet-600 to-violet-400"
                      : "bg-gradient-to-t from-violet-200 to-violet-100 dark:from-violet-800/60 dark:to-violet-700/40"
                  }`}
                />
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{months[i]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-zinc-100 dark:border-white/[0.06] pt-4">
            {[
              { label: "Avg monthly", value: "Rs.6.5L" },
              { label: "YTD total", value: "Rs.38.9L" },
              { label: "Growth", value: "+18.4%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-sm font-semibold text-ink-950 dark:text-white">{s.value}</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions + property occupancy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          {/* Quick actions */}
          <div className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-100 dark:border-white/[0.06] p-3 hover:border-zinc-200 dark:hover:border-white/10 hover:shadow-sm transition-all group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.bg}`}>
                    <a.icon className={`w-4 h-4 ${a.color}`} />
                  </div>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Properties occupancy */}
          <div className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 shadow-sm flex-1">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Property Occupancy
            </p>
            <div className="space-y-3">
              {properties.map((p) => {
                const pct = Math.round((p.occupied / p.total) * 100);
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.color}`} />
                        <span className="text-xs font-medium text-ink-950 dark:text-white truncate max-w-[130px]">{p.name}</span>
                      </div>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0">{p.occupied}/{p.total}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${p.color}`}
                      />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{pct}% occupied</span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">{p.revenue}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payments table + Defaulters + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Payments table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="lg:col-span-2 bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
            <h3 className="font-semibold text-sm text-ink-950 dark:text-white">Recent Payments</h3>
            <button className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 font-medium">
              View all
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-white/[0.06]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">Tenant</th>
                  <th className="text-left px-3 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden sm:table-cell">Room</th>
                  <th className="text-left px-3 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-3 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden md:table-cell">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-white/[0.04]">
                {recentPayments.map((p) => (
                  <tr key={p.name} className="hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400/30 to-violet-600/30 flex items-center justify-center text-[10px] font-semibold text-violet-700 dark:text-violet-300 shrink-0">
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-ink-950 dark:text-white truncate">{p.name}</p>
                          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate hidden sm:block">{p.property}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-zinc-500 dark:text-zinc-400 hidden sm:table-cell font-mono">{p.room}</td>
                    <td className="px-3 py-3 text-sm font-semibold text-ink-950 dark:text-white font-mono">{p.amount}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusStyle[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs text-zinc-400 dark:text-zinc-600 hidden md:table-cell">
                      <span className="flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        {p.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right column: Defaulters + Activity */}
        <div className="flex flex-col gap-4">

          {/* Defaulters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-ink-950 dark:text-white">Defaulters</h3>
                <span className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  {defaulters.length}
                </span>
              </div>
              <button className="text-xs text-rose-600 dark:text-rose-400 font-medium hover:text-rose-700">
                Send all
              </button>
            </div>
            <div className="divide-y divide-zinc-50 dark:divide-white/[0.04]">
              {defaulters.map((d) => (
                <div key={d.name} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-ink-950 dark:text-white truncate">{d.name}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{d.room} · {d.property}</p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 font-mono">{d.amount}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{d.days}d overdue</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 shadow-sm flex-1"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-ink-950 dark:text-white">Activity</h3>
              <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.bg}`}>
                    <a.icon className={`w-3.5 h-3.5 ${a.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{a.text}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Alert banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex items-start justify-between gap-4 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/10 px-5 py-4"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-[18px] h-[18px] text-rose-500 dark:text-rose-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-rose-700 dark:text-rose-400">
              12 tenants have overdue payments
            </p>
            <p className="text-xs text-rose-500 dark:text-rose-500 mt-0.5">
              Total outstanding: Rs.1,20,000 · Oldest due: 35 days ago · Auto-reminders active
            </p>
          </div>
        </div>
        <button className="shrink-0 text-xs font-medium text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30 rounded-lg px-3 py-1.5 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors whitespace-nowrap flex items-center gap-1">
          View defaulters
          <ArrowRight className="w-3 h-3" />
        </button>
      </motion.div>

    </div>
  );
}