"use client";

import { motion } from "framer-motion";
import { DoorOpen, CheckCircle2, XCircle, Wrench } from "lucide-react";
import type { Room } from "./room-types";

interface RoomsSummaryProps {
  rooms: Room[];
}

export function RoomsSummary({ rooms }: RoomsSummaryProps) {
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const vacant = rooms.filter((r) => r.status === "vacant").length;
  const maintenance = rooms.filter((r) => r.status === "maintenance").length;
  const occupancyPct = rooms.length > 0 ? Math.round((occupied / rooms.length) * 100) : 0;

  const items = [
    {
      icon: DoorOpen,
      label: "Total rooms",
      value: rooms.length.toString(),
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    {
      icon: CheckCircle2,
      label: "Occupied",
      value: occupied.toString(),
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      icon: XCircle,
      label: "Vacant",
      value: vacant.toString(),
      color: "text-zinc-500 dark:text-zinc-400",
      bg: "bg-zinc-100 dark:bg-zinc-800",
    },
    {
      icon: Wrench,
      label: "Maintenance",
      value: maintenance.toString(),
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-3">
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

      {/* Occupancy progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-xl px-5 py-3.5 shadow-sm flex items-center gap-4"
      >
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
          Overall occupancy
        </span>
        <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${occupancyPct}%` }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
          />
        </div>
        <span className="text-sm font-semibold text-ink-950 dark:text-white font-mono shrink-0">
          {occupancyPct}%
        </span>
      </motion.div>
    </div>
  );
}