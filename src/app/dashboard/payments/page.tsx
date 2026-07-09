"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Wallet } from "lucide-react";

import { mockPayments, mockProperties, mockMonths } from "@/components/dashboard/payments/mock-data";
import { PaymentsSummary } from "@/components/dashboard/payments/payments-summary";
import { PaymentsFilters } from "@/components/dashboard/payments/payments-filters";
import { PaymentRow } from "@/components/dashboard/payments/payment-row";
import { PaymentDrawer } from "@/components/dashboard/payments/payment-drawer";
import type { Payment, PaymentStatus } from "@/components/dashboard/payments/payment-types";

type StatusFilter = "all" | PaymentStatus;

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(mockMonths[0]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filtered = mockPayments.filter((p) => {
    const matchSearch =
      p.tenantName.toLowerCase().includes(search.toLowerCase()) ||
      p.room.toLowerCase().includes(search.toLowerCase()) ||
      (p.reference ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchProperty =
      selectedProperty === "all" || p.propertyId === selectedProperty;
    const matchMonth = p.month === selectedMonth;
    return matchSearch && matchStatus && matchProperty && matchMonth;
  });

  const monthPayments = mockPayments.filter((p) => p.month === selectedMonth);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink-950 dark:text-white">
            Payments
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {selectedMonth} · {monthPayments.filter((p) => p.status === "paid").length} of{" "}
            {monthPayments.length} collected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
            <Wallet className="w-3.5 h-3.5" />
            Record Payment
          </button>
          <button className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors shrink-0">
            <Zap className="w-3.5 h-3.5" />
            Run Auto-Billing
          </button>
        </div>
      </div>

      {/* Summary */}
      <PaymentsSummary payments={monthPayments} />

      {/* Filters */}
      <PaymentsFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        properties={mockProperties}
        months={mockMonths}
      />

      {/* Table */}
      {filtered.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-white/[0.06]">
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden sm:table-cell">
                    Month
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden md:table-cell">
                    Method
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden xl:table-cell">
                    Reference
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((payment, i) => (
                  <PaymentRow
                    key={payment.id}
                    payment={payment}
                    index={i}
                    onClick={setSelectedPayment}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-5 py-3 border-t border-zinc-50 dark:border-white/[0.04] flex items-center justify-between">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Showing {filtered.length} of {monthPayments.length} payments
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {monthPayments.filter((p) => p.status === "paid").length} paid
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                {monthPayments.filter((p) => p.status === "overdue").length} overdue
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {monthPayments.filter((p) => p.status === "pending").length} pending
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            No payments found
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
            Try adjusting your filters
          </p>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setSelectedProperty("all");
            }}
            className="mt-4 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Payment detail drawer */}
      <PaymentDrawer
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}
