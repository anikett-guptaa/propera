"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Wallet, Calendar, Hash, Building2,
  MessageSquare, Download, CheckCircle2, AlertCircle,
} from "lucide-react";
import type { Payment } from "./payment-types";
import { paymentStatusConfig, paymentMethodConfig } from "./payment-types";

interface PaymentDrawerProps {
  payment: Payment | null;
  onClose: () => void;
}

function InfoRow({ icon: Icon, label, value }: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-zinc-50 dark:bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
      </div>
      <div>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-ink-950 dark:text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function RecordPaymentForm({ onDone }: { onDone: () => void }) {
  const methods = ["UPI", "Cash", "Bank Transfer", "Cheque"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        Record Payment
      </p>
      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
          Amount (Rs.)
        </label>
        <input
          type="number"
          placeholder="7500"
          className="w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
          Payment method
        </label>
        <div className="grid grid-cols-2 gap-2">
          {methods.map((m, i) => (
            <button
              key={m}
              type="button"
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                i === 0
                  ? "border-violet-400 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                  : "border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
          Reference / Notes
        </label>
        <input
          type="text"
          placeholder="UPI ref or notes"
          className="w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onDone}
          className="flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/[0.08] rounded-xl py-2.5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Confirm
        </button>
      </div>
    </motion.div>
  );
}

export function PaymentDrawer({ payment, onClose }: PaymentDrawerProps) {
  const [showRecordForm, setShowRecordForm] = useState(false);

  return (
    <AnimatePresence>
      {payment && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-ink-900 border-l border-zinc-200 dark:border-white/[0.08] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-5 border-b border-zinc-100 dark:border-white/[0.06]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {payment.tenantAvatar}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-ink-950 dark:text-white">
                      {payment.tenantName}
                    </h2>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {payment.room} · {payment.month}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Amount + status */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-violet-50 dark:bg-violet-500/10 rounded-xl p-3">
                  <p className="text-[10px] text-violet-600 dark:text-violet-400 font-medium uppercase tracking-wider">
                    Amount
                  </p>
                  <p className="text-xl font-semibold text-ink-950 dark:text-white font-mono mt-0.5">
                    {payment.amount}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${paymentStatusConfig[payment.status].bg}`}>
                  <p className={`text-[10px] font-medium uppercase tracking-wider ${paymentStatusConfig[payment.status].color}`}>
                    Status
                  </p>
                  <div className={`flex items-center gap-1.5 mt-1`}>
                    <span className={`w-2 h-2 rounded-full ${paymentStatusConfig[payment.status].dot}`} />
                    <p className={`text-sm font-semibold ${paymentStatusConfig[payment.status].color}`}>
                      {paymentStatusConfig[payment.status].label}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Overdue warning */}
              {payment.status === "overdue" && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30">
                  <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                      Payment overdue
                    </p>
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
                      Was due on {payment.dueDate}
                      {payment.notes && ` · ${payment.notes}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Record payment form (toggle) */}
              {showRecordForm && (
                <RecordPaymentForm onDone={() => setShowRecordForm(false)} />
              )}

              {/* Details */}
              {!showRecordForm && (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    Details
                  </p>
                  <div className="space-y-3">
                    <InfoRow icon={Building2} label="Property" value={payment.propertyName} />
                    <InfoRow icon={Wallet} label="Month" value={payment.month} />
                    <InfoRow icon={Calendar} label="Due date" value={payment.dueDate} />
                    {payment.paidOn && (
                      <InfoRow icon={CheckCircle2} label="Paid on" value={payment.paidOn} />
                    )}
                    {payment.method && (
                      <InfoRow
                        icon={Wallet}
                        label="Method"
                        value={`${paymentMethodConfig[payment.method].icon} ${paymentMethodConfig[payment.method].label}`}
                      />
                    )}
                    {payment.reference && (
                      <InfoRow icon={Hash} label="Reference" value={payment.reference} />
                    )}
                    {payment.notes && (
                      <InfoRow icon={Hash} label="Notes" value={payment.notes} />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-zinc-100 dark:border-white/[0.06] space-y-2">
              {(payment.status === "overdue" || payment.status === "pending") && !showRecordForm && (
                <button
                  onClick={() => setShowRecordForm(true)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors"
                >
                  <Wallet className="w-4 h-4" />
                  Record Payment
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Receipt
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
