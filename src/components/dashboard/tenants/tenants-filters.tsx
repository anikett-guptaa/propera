"use client";

import { Search } from "lucide-react";
import type { TenantStatus } from "./tenant-types";

type StatusFilter = "all" | TenantStatus;

interface TenantsFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (v: StatusFilter) => void;
  selectedProperty: string;
  onPropertyChange: (v: string) => void;
  properties: { id: string; name: string }[];
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "overdue", label: "Overdue" },
  { value: "vacating", label: "Vacating" },
];

export function TenantsFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedProperty,
  onPropertyChange,
  properties,
}: TenantsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
        <input
          type="text"
          placeholder="Search tenants…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 pr-3 h-9 w-56 text-sm rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
        />
      </div>

      {/* Property selector */}
      <select
        value={selectedProperty}
        onChange={(e) => onPropertyChange(e.target.value)}
        className="h-9 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 text-sm text-ink-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all appearance-none pr-8 cursor-pointer"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2371717a' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
        }}
      >
        {properties.map((p) => (
          <option key={p.id} value={p.id} className="dark:bg-ink-900">
            {p.name}
          </option>
        ))}
      </select>

      {/* Status filters */}
      <div className="flex items-center gap-1.5">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onStatusFilterChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === opt.value
                ? "bg-ink-950 dark:bg-white text-white dark:text-ink-950"
                : "bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20 hover:text-ink-950 dark:hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
