"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X, Phone, Mail, MapPin, Calendar,
  Wallet, FileText, User, AlertCircle,
  MessageSquare, Receipt,
} from "lucide-react";
import type { Tenant } from "./tenant-types";
import { tenantStatusConfig } from "./tenant-types";

interface TenantDrawerProps {
  tenant: Tenant | null;
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

export function TenantDrawer({ tenant, onClose }: TenantDrawerProps) {
  return (
    <AnimatePresence>
      {tenant && (
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
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-ink-900 border-l border-zinc-200 dark:border-white/[0.08] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-5 border-b border-zinc-100 dark:border-white/[0.06]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {tenant.avatar}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-ink-950 dark:text-white">
                      {tenant.name}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${tenantStatusConfig[tenant.status].bg} ${tenantStatusConfig[tenant.status].border} ${tenantStatusConfig[tenant.status].color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tenantStatusConfig[tenant.status].dot}`} />
                        {tenantStatusConfig[tenant.status].label}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {tenant.propertyName}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>

              {/* Rent highlight */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-violet-50 dark:bg-violet-500/10 rounded-xl p-3">
                  <p className="text-[10px] text-violet-600 dark:text-violet-400 font-medium uppercase tracking-wider">
                    Monthly Rent
                  </p>
                  <p className="text-lg font-semibold text-ink-950 dark:text-white font-mono mt-0.5">
                    {tenant.rentAmount}
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${tenant.pendingAmount ? "bg-rose-50 dark:bg-rose-500/10" : "bg-emerald-50 dark:bg-emerald-500/10"}`}>
                  <p className={`text-[10px] font-medium uppercase tracking-wider ${tenant.pendingAmount ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {tenant.pendingAmount ? "Pending" : "Paid Up"}
                  </p>
                  <p className="text-lg font-semibold text-ink-950 dark:text-white font-mono mt-0.5">
                    {tenant.pendingAmount ?? "Clear"}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Overdue warning */}
              {tenant.status === "overdue" && tenant.pendingAmount && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30">
                  <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                      Payment overdue
                    </p>
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
                      {tenant.pendingAmount} pending since last payment on {tenant.lastPaid}
                    </p>
                  </div>
                </div>
              )}

              {/* Vacating warning */}
              {tenant.status === "vacating" && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                  <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                      Lease ending soon
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                      This tenant is vacating on {tenant.leaseEnd}. Room will be available after.
                    </p>
                  </div>
                </div>
              )}

              {/* Contact */}
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  Contact
                </p>
                <div className="space-y-3">
                  <InfoRow icon={Phone} label="Phone" value={tenant.phone} />
                  <InfoRow icon={Mail} label="Email" value={tenant.email} />
                  <InfoRow icon={User} label="Emergency contact" value={tenant.emergencyContact} />
                </div>
              </div>

              {/* Room & lease */}
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  Room & Lease
                </p>
                <div className="space-y-3">
                  <InfoRow icon={MapPin} label="Room" value={`${tenant.room} · Floor ${tenant.floor} · ${tenant.propertyName}`} />
                  <InfoRow icon={Calendar} label="Joined" value={tenant.joinDate} />
                  <InfoRow icon={Calendar} label="Lease ends" value={tenant.leaseEnd} />
                  <InfoRow icon={Wallet} label="Last paid" value={tenant.lastPaid} />
                </div>
              </div>

              {/* ID */}
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  Identity
                </p>
                <div className="space-y-3">
                  <InfoRow
                    icon={FileText}
                    label="ID type"
                    value={tenant.idType.charAt(0).toUpperCase() + tenant.idType.slice(1)}
                  />
                  <InfoRow icon={FileText} label="ID number" value={tenant.idNumber} />
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-5 border-t border-zinc-100 dark:border-white/[0.06] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
                <button className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <Receipt className="w-3.5 h-3.5" />
                  Receipt
                </button>
              </div>
              {tenant.status === "overdue" && (
                <button className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-600 transition-colors">
                  <AlertCircle className="w-4 h-4" />
                  Send Reminder
                </button>
              )}
              <button className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors">
                <Wallet className="w-4 h-4" />
                Record Payment
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
