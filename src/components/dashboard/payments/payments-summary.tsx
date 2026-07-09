"use client";

import { motion } from "framer-motion";
import { Wallet, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { Payment } from "./payment-types";

interface PaymentsSummaryProps {
  payments: Payment[];
}

export function PaymentsSummary({ payments }: PaymentsSummaryProps) {
  const paid = payments.filter((p) => p.status === "paid");
  const overdue = payments.filter((p) => p.status === "overdue");
  const pending = payments.filter((p) => p.status === "pending");

  const totalCollected = paid.reduce((a, p) => a + p.amountRaw, 0);
  const totalOverdue = overdue.reduce((a, p) => a + p.amountRaw, 0);
  const totalPending = pending.reduce((a, p) => a + p.amountRaw, 0);

  const fmt = (n: number) =>
    n >= 100000
      ? `Rs.${(n / 100000).toFixed(1)}L`
      : `Rs.${n.toLocaleString("en-IN")}`;

  const items = [
    {
      icon: Wallet,
      label: "Total collected",
      value: fmt(totalCollected),
      sub: `${paid.length} payments`,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    {
      icon: CheckCircle2,
      label: "Paid on time",
      value: paid.length.toString(),
      sub: `${Math.round((paid.length / payments.length) * 100)}% collection rate`,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      icon: AlertCircle,
      label: "Overdue amount",
      value: fmt(totalOverdue),
      sub: `${overdue.length} tenants`,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
    },
    {
      icon: Clock,
      label: "Pending amount",
      value: fmt(totalPending),
      sub: `${pending.length} tenants`,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 shadow-sm"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${item.bg}`}>
            <item.icon className={`w-[18px] h-[18px] ${item.color}`} />
          </div>
          <p className="text-xl font-semibold text-ink-950 dark:text-white font-mono">
            {item.value}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.label}</p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-1">{item.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
