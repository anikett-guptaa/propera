"use client";

import { Search } from "lucide-react";
import type { PropertyType } from "./property-types";

type FilterValue = "all" | PropertyType;

interface PropertiesFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterValue;
  onFilterChange: (value: FilterValue) => void;
}

const filterOptions: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hostel", label: "Hostel" },
  { value: "pg", label: "PG" },
  { value: "apartment", label: "Apartment" },
  { value: "residential", label: "Residential" },
  { value: "villa", label: "Villa" },
];

export function PropertiesFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: PropertiesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
        <input
          type="text"
          placeholder="Search properties…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-3 h-9 text-sm rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
        />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFilterChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === opt.value
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