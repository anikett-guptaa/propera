import {
  Building2,
  DoorOpen,
  Users,
  Wallet,
  AlertCircle,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

// Demo for checking the dashboard layout and components.

const stats = [
  {
    label: "Total Properties",
    value: "3",
    sub: "Across Pune",
    trend: "+1 this year",
    trendUp: true,
    icon: Building2,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    label: "Occupied Rooms",
    value: "88 / 96",
    sub: "91.6% occupancy",
    trend: "↑ 3 this month",
    trendUp: true,
    icon: DoorOpen,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    label: "Active Tenants",
    value: "88",
    sub: "8 vacant rooms",
    trend: "+5 this month",
    trendUp: true,
    icon: Users,
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-50 dark:bg-violet-950/40",
  },
  {
    label: "Monthly Revenue",
    value: "₹7.04L",
    sub: "June 2025",
    trend: "↑ ₹24K vs May",
    trendUp: true,
    icon: Wallet,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    label: "Pending Dues",
    value: "₹1.2L",
    sub: "From 12 tenants",
    trend: "3 cleared today",
    trendUp: true,
    icon: AlertCircle,
    iconColor: "text-red-500 dark:text-red-400",
    iconBg: "bg-red-50 dark:bg-red-950/40",
  },
  {
    label: "Total Expenses",
    value: "₹48,000",
    sub: "June 2025",
    trend: "↓ ₹6K vs May",
    trendUp: false,
    icon: TrendingUp,
    iconColor: "text-zinc-600 dark:text-zinc-400",
    iconBg: "bg-zinc-100 dark:bg-zinc-800",
  },
];

const recentPayments = [
  {
    name: "Rohit Sharma",
    room: "R-201",
    amount: "₹8,500",
    status: "paid",
    time: "2 min ago",
  },
  {
    name: "Priya Mehta",
    room: "R-105",
    amount: "₹7,200",
    status: "paid",
    time: "1 hr ago",
  },
  {
    name: "Aakash Verma",
    room: "R-312",
    amount: "₹9,000",
    status: "pending",
    time: "Due Jun 10",
  },
  {
    name: "Sneha Patel",
    room: "R-108",
    amount: "₹7,500",
    status: "paid",
    time: "Jun 3",
  },
  {
    name: "Karan Singh",
    room: "R-207",
    amount: "₹8,000",
    status: "overdue",
    time: "Due Jun 1",
  },
];

const quickActions = [
  { label: "Add Tenant", href: "/dashboard/tenants/new", icon: Users },
  { label: "Add Property", href: "/dashboard/properties/new", icon: Building2 },
  { label: "Record Payment", href: "/dashboard/payments/new", icon: Wallet },
  { label: "Add Room", href: "/dashboard/rooms/new", icon: DoorOpen },
];

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  pending:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  overdue: "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400",
};

export default async function DashboardPage() {

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Good morning, Rahul 👋
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Here is what happening at Gupta Hostels today.
          </p>
        </div>
        <Button
          size="sm"
          className="shrink-0 gap-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          <Plus className="w-3.5 h-3.5" />
          Run Auto-Billing
        </Button>
      </div>

      {/* Stat cards */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* Quick actions + Recent payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-center hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                </div>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Recent Payments
            </h2>
            <Link
              href="/dashboard/payments"
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="text-left px-4 py-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider hidden sm:table-cell">
                    Room
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider hidden md:table-cell">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentPayments.map((p) => (
                  <tr
                    key={p.name}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">
                      {p.room}
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                      {p.amount}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[p.status]}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-zinc-400 hidden md:table-cell">
                      {p.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Defaulters alert */}
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4.5 h-4.5 w-[18px] h-[18px] text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              12 tenants have overdue payments
            </p>
            <p className="text-xs text-red-500 dark:text-red-500 mt-0.5">
              Total outstanding: ₹1,20,000 · Oldest due: 35 days ago
            </p>
          </div>
        </div>
        <Link href="/dashboard/payments?filter=overdue">
          <Button
            size="sm"
            variant="outline"
            className="shrink-0 text-red-600 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/50 text-xs"
          >
            View defaulters
          </Button>
        </Link>
      </div>
    </div>
  );
}
