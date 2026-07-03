"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Calendar, Wallet, Wrench, DoorOpen, UserPlus } from "lucide-react";
import type { Room } from "./room-types";
import { roomStatusConfig } from "./room-types";

interface RoomDrawerProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomDrawer({ room, onClose }: RoomDrawerProps) {
  return (
    <AnimatePresence>
      {room && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-ink-900 border-l border-zinc-200 dark:border-white/[0.08] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
                  <DoorOpen className="w-4.5 h-4.5 w-[18px] h-[18px] text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-ink-950 dark:text-white">
                    Room {room.number}
                  </h2>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 capitalize">
                    {room.type} · Floor {room.floor}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Status */}
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                  Status
                </p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${roomStatusConfig[room.status].bg} ${roomStatusConfig[room.status].border} ${roomStatusConfig[room.status].color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${roomStatusConfig[room.status].dot}`} />
                  {roomStatusConfig[room.status].label}
                </div>
              </div>

              {/* Rent */}
              <div className="bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Monthly rent</span>
                </div>
                <p className="text-2xl font-semibold text-ink-950 dark:text-white font-mono">
                  {room.rent}
                </p>
              </div>

              {/* Tenant info */}
              {room.status === "occupied" && room.tenant ? (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    Current Tenant
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.06]">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {room.tenant.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink-950 dark:text-white">
                          {room.tenant.name}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500">Active tenant</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.06]">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Calendar className="w-3 h-3 text-zinc-400" />
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Since</span>
                        </div>
                        <p className="text-sm font-medium text-ink-950 dark:text-white">
                          {room.tenant.since}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-100 dark:border-white/[0.06]">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Wallet className="w-3 h-3 text-zinc-400" />
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Rent</span>
                        </div>
                        <p className="text-sm font-medium text-ink-950 dark:text-white">
                          {room.tenant.rent}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : room.status === "maintenance" ? (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    Maintenance
                  </p>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        Under maintenance
                      </span>
                    </div>
                    {room.lastCleaned && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Last updated: {room.lastCleaned}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                    Tenant
                  </p>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-dashed border-zinc-200 dark:border-white/[0.08] text-center">
                    <User className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">No tenant assigned</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                      This room is ready to occupy
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="p-5 border-t border-zinc-100 dark:border-white/[0.06] space-y-2">
              {room.status === "vacant" && (
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-ink-950 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors">
                  <UserPlus className="w-4 h-4" />
                  Assign Tenant
                </button>
              )}
              {room.status === "occupied" && (
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-ink-950 dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors">
                  <User className="w-4 h-4" />
                  View Tenant Profile
                </button>
              )}
              {room.status === "maintenance" && (
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors">
                  <Wrench className="w-4 h-4" />
                  Mark as Ready
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full rounded-xl border border-zinc-200 dark:border-white/[0.08] px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}