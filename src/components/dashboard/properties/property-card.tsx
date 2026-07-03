"use client";

import { motion } from "framer-motion";
import { MapPin, DoorOpen, Wallet, AlertCircle, Building2, MoreHorizontal, ArrowUpRight } from "lucide-react";
import type { Property } from "./property-types";
import { propertyTypeConfig } from "./property-types";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const config = propertyTypeConfig[property.type];
  const TypeIcon = config.icon;
  const occupancyPct = Math.round((property.occupiedRooms / property.totalRooms) * 100);
  const isFullyOccupied = property.occupiedRooms === property.totalRooms;

  const barColor = isFullyOccupied
    ? "bg-emerald-500"
    : occupancyPct > 80
    ? "bg-violet-500"
    : "bg-amber-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Top occupancy bar */}
      <div className="h-1.5 w-full bg-zinc-100 dark:bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${occupancyPct}%` }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full ${barColor}`}
        />
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
              <TypeIcon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-950 dark:text-white leading-tight">
                {property.name}
              </h3>
              <span className={`inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-md ${config.bg} ${config.color}`}>
                {config.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full ${
              property.status === "active"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                property.status === "active" ? "bg-emerald-500" : "bg-amber-500"
              }`} />
              {property.status === "active" ? "Active" : "Maintenance"}
            </span>
            <button className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all">
              <MoreHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {property.address}, {property.city}, {property.state}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: DoorOpen, label: "Rooms", value: `${property.occupiedRooms}/${property.totalRooms}` },
            { icon: Wallet, label: "Revenue", value: property.monthlyRevenue },
            { icon: AlertCircle, label: "Pending", value: property.pendingDues },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.04] p-2.5 text-center"
            >
              <s.icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 mx-auto mb-1" />
              <p className="text-xs font-semibold text-ink-950 dark:text-white font-mono">{s.value}</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Occupancy bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Occupancy</span>
            <span className="text-[11px] font-semibold text-ink-950 dark:text-white font-mono">
              {occupancyPct}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${occupancyPct}%` }}
              transition={{ duration: 0.8, delay: index * 0.08 + 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
              {property.occupiedRooms} occupied
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
              {property.totalRooms - property.occupiedRooms} vacant
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            <Building2 className="w-3 h-3" />
            {property.floors} floors
          </div>
          <button className="flex items-center gap-1 text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
            View details
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}