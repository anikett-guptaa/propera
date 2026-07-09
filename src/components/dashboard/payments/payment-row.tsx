"use client";

import { motion } from "framer-motion";
import { ChevronRight, Clock } from "lucide-react";
import type { Payment } from "./payment-types";
import { paymentStatusConfig, paymentMethodConfig } from "./payment-types";

interface PaymentRowProps {
  payment: Payment;
  index: number;
  onClick: (payment: Payment) => void;
}

export function PaymentRow({ payment, index, onClick }: PaymentRowProps) {
  const cfg = paymentStatusConfig[payment.status];

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.035 }}
      onClick={() => onClick(payment)}
      className="group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-zinc-50 dark:border-white/[0.04] last:border-0"
    >
      {/* Tenant */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
            {payment.tenantAvatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-950 dark:text-white truncate">
              {payment.tenantName}
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
              {payment.room} · {payment.propertyName}
            </p>
          </div>
        </div>
      </td>

      {/* Month */}
      <td className="px-4 py-3.5 hidden sm:table-cell">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{payment.month}</p>
      </td>

      {/* Amount */}
      <td className="px-4 py-3.5">
        <p className="text-sm font-semibold text-ink-950 dark:text-white font-mono">
          {payment.amount}
        </p>
      </td>

      {/* Method */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        {payment.method ? (
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{paymentMethodConfig[payment.method].icon}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {paymentMethodConfig[payment.method].label}
            </span>
          </div>
        ) : (
          <span className="text-xs text-zinc-300 dark:text-zinc-600">—</span>
        )}
      </td>

      {/* Date */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        {payment.paidOn ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{payment.paidOn}</p>
        ) : (
          <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
            <Clock className="w-3 h-3" />
            <span className="text-xs">Due {payment.dueDate}</span>
          </div>
        )}
      </td>

      {/* Reference */}
      <td className="px-4 py-3.5 hidden xl:table-cell">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono truncate max-w-[130px]">
          {payment.reference ?? "—"}
        </p>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </td>

      {/* Arrow */}
      <td className="px-4 py-3.5 text-right">
        <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors ml-auto" />
      </td>
    </motion.tr>
  );
}
