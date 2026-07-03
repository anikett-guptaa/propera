"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Building2 } from "lucide-react";

import { mockProperties } from "@/components/dashboard/properties/mock-data";
import { SummaryBar } from "@/components/dashboard/properties/summary-bar";
import { PropertyCard } from "@/components/dashboard/properties/property-card";
import { PropertiesFilters } from "@/components/dashboard/properties/properties-filters";
import { AddPropertyModal } from "@/components/dashboard/properties/add-property-modal";
import type {
  PropertyType,
  Property,
} from "@/components/dashboard/properties/property-types";

type FilterValue = "all" | PropertyType;

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = mockProperties.filter((p: Property) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.type === filter;
    return matchSearch && matchFilter;
  });

  const cities = [...new Set(mockProperties.map((p: Property) => p.city))].join(
    ", ",
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink-950 dark:text-white">
            Properties
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {mockProperties.length} properties across {cities}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Property
        </button>
      </div>

      {/* Summary stats */}
      <SummaryBar properties={mockProperties} />

      {/* Search + filters */}
      <PropertiesFilters
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((property: Property, i: number) => (
            <PropertyCard
              key={property.id as string | number}
              property={property}
              index={i}
            />
          ))}

          {/* Ghost add card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: filtered.length * 0.08 }}
            onClick={() => setShowModal(true)}
            className="group min-h-[280px] flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-white/[0.08] hover:border-violet-300 dark:hover:border-violet-500/50 hover:bg-violet-50/50 dark:hover:bg-violet-500/5 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-500/15 transition-colors">
              <Plus className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                Add a property
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                Hostel, PG, apartment and more
              </p>
            </div>
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            No properties found
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
            Try adjusting your search or filter
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="mt-4 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && <AddPropertyModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
