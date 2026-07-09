"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Users } from "lucide-react";

import { mockTenants, mockProperties } from "@/components/dashboard/tenants/mock-data";
import { TenantsSummary } from "@/components/dashboard/tenants/tenants-summary";
import { TenantsFilters } from "@/components/dashboard/tenants/tenants-filters";
import { TenantRow } from "@/components/dashboard/tenants/tenant-row";
import { TenantDrawer } from "@/components/dashboard/tenants/tenant-drawer";
import { AddTenantModal } from "@/components/dashboard/tenants/add-tenant-modal";
import type { Tenant, TenantStatus } from "@/components/dashboard/tenants/tenant-types";

type StatusFilter = "all" | TenantStatus;

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = mockTenants.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.room.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search);
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchProperty =
      selectedProperty === "all" || t.propertyId === selectedProperty;
    return matchSearch && matchStatus && matchProperty;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink-950 dark:text-white">
            Tenants
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {mockTenants.length} tenants across{" "}
            {[...new Set(mockTenants.map((t) => t.propertyName))].length} properties
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Tenant
        </button>
      </div>

      {/* Summary */}
      <TenantsSummary tenants={mockTenants} />

      {/* Filters */}
      <TenantsFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
        properties={mockProperties}
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
                    Room
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden md:table-cell">
                    Rent
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden lg:table-cell">
                    Last Paid
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider hidden lg:table-cell">
                    Lease End
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((tenant, i) => (
                  <TenantRow
                    key={tenant.id}
                    tenant={tenant}
                    index={i}
                    onClick={setSelectedTenant}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-5 py-3 border-t border-zinc-50 dark:border-white/[0.04] flex items-center justify-between">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Showing {filtered.length} of {mockTenants.length} tenants
            </p>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded-lg text-xs text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-white/[0.08] hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors disabled:opacity-40" disabled>
                Previous
              </button>
              <button className="px-2.5 py-1 rounded-lg text-xs text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-white/[0.08] hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors disabled:opacity-40" disabled>
                Next
              </button>
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
            <Users className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            No tenants found
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
            Try adjusting your search or filters
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

      {/* Tenant detail drawer */}
      <TenantDrawer
        tenant={selectedTenant}
        onClose={() => setSelectedTenant(null)}
      />

      {/* Add tenant modal */}
      <AnimatePresence>
        {showModal && <AddTenantModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
