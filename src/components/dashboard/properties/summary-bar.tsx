"use client";

import { motion } from "framer-motion";
import { Building2, DoorOpen, CheckCircle2, TrendingUp } from "lucide-react";
import type { Property } from "./property-types";

interface SummaryBarProps {
  properties: Property[];
}

export function SummaryBar({ properties }: SummaryBarProps) {
  const totalRooms = properties.reduce((a, p) => a + p.totalRooms, 0);
  const totalOccupied = properties.reduce((a, p) => a + p.occupiedRooms, 0);
  const avgOccupancy = totalRooms > 0 ? Math.round((totalOccupied / totalRooms) * 100) : 0;

  const items = [
    {
      icon: Building2,
      label: "Properties",
      value: properties.length.toString(),
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    {
      icon: DoorOpen,
      label: "Total rooms",
      value: totalRooms.toString(),
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      icon: CheckCircle2,
      label: "Occupied",
      value: totalOccupied.toString(),
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      icon: TrendingUp,
      label: "Avg occupancy",
      value: `${avgOccupancy}%`,
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
          className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl p-4 flex items-center gap-3 shadow-sm"
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
            <item.icon className={`w-[18px] h-[18px] ${item.color}`} />
          </div>
          <div>
            <p className="text-lg font-semibold text-ink-950 dark:text-white font-mono">
              {item.value}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}