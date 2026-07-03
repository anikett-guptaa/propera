"use client";

import { motion } from "framer-motion";
import type { Room } from "./room-types";
import { roomStatusConfig } from "./room-types";

interface FloorGridProps {
  floor: number;
  rooms: Room[];
  onRoomClick: (room: Room) => void;
  floorIndex: number;
}

export function FloorGrid({ floor, rooms, onRoomClick, floorIndex }: FloorGridProps) {
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const pct = Math.round((occupied / rooms.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: floorIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white dark:bg-ink-900 border border-zinc-200 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Floor header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
              {floor}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-950 dark:text-white">
              Floor {floor}
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              {occupied}/{rooms.length} occupied
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-1.5 rounded-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 w-8 text-right">
            {pct}%
          </span>
        </div>
      </div>

      {/* Room grid */}
      <div className="p-4 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {rooms.map((room, i) => {
          const cfg = roomStatusConfig[room.status];
          return (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: floorIndex * 0.08 + i * 0.02 }}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRoomClick(room)}
              className={`aspect-square flex flex-col items-center justify-center rounded-xl border text-center cursor-pointer transition-shadow hover:shadow-md ${cfg.cellBg} ${cfg.cellBorder}`}
            >
              <span className={`text-[11px] font-bold leading-tight ${cfg.cellText}`}>
                {room.number}
              </span>
              <span className={`text-[8px] mt-0.5 capitalize ${cfg.cellText} opacity-70`}>
                {room.status === "occupied" ? room.tenant?.name.split(" ")[0] : room.status}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}