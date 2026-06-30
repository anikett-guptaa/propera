"use client";

import { motion } from "framer-motion";
import {
  Building2,
  DoorOpen,
  Wallet,
  Users,
  TrendingUp,
  Bell,
} from "lucide-react";

const occupancyData = [62, 71, 68, 80, 74, 88, 91];

export function HeroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-full max-w-3xl"
    >
      <motion.div
        initial={{ rotateX: 4, rotateY: -3 }}
        whileInView={{ rotateX: 0, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl border border-black/[0.06] bg-white shadow-[0_40px_100px_-30px_rgba(124,92,252,0.35)] overflow-hidden"
      >
        <div className="flex items-center gap-2 border-b border-black/[0.05] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-zinc-50 px-3 py-1 text-[11px] text-zinc-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            app.propera.in/dashboard
          </div>
        </div>

        <div className="flex">
          <div className="hidden w-44 shrink-0 border-r border-black/[0.05] p-3 sm:block">
            <div className="mb-4 flex items-center gap-2 px-1.5">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-400 to-violet-700" />
              <span className="text-xs font-semibold text-ink-950">Propera</span>
            </div>
            {[
              { icon: Building2, label: "Overview", active: true },
              { icon: DoorOpen, label: "Rooms" },
              { icon: Users, label: "Tenants" },
              { icon: Wallet, label: "Payments" },
            ].map((item) => (
              <div
                key={item.label}
                className={`mb-0.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${
                  item.active
                    ? "bg-violet-50 text-violet-700"
                    : "text-zinc-400"
                }`}
              >
                <item.icon className="h-3 w-3" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="flex-1 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-ink-950">
                  Good evening, Aarav
                </p>
                <p className="text-[11px] text-zinc-400">
                  Skyline Residency · 96 rooms
                </p>
              </div>
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-50">
                <Bell className="h-3.5 w-3.5 text-zinc-400" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-white" />
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { label: "Occupancy", value: "91%", icon: Building2 },
                { label: "Revenue", value: "Rs. 7.4L", icon: TrendingUp },
                { label: "Pending", value: "Rs. 82K", icon: Wallet },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="rounded-xl border border-black/5 bg-zinc-50/70 p-2.5"
                >
                  <s.icon className="mb-1.5 h-3 w-3 text-violet-600" />
                  <p className="text-sm font-semibold text-ink-950 font-mono">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-zinc-400">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border border-black/[0.05] bg-zinc-50/70 p-3">
              <p className="mb-2.5 text-[10px] font-medium text-zinc-400">
                Weekly occupancy trend
              </p>
              <div className="flex h-16 items-end gap-1.5">
                {occupancyData.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      delay: 0.8 + i * 0.07,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex-1 rounded-t-sm bg-linear-to-t from-violet-600 to-violet-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div
        aria-hidden
        className="absolute -inset-x-10 top-1/2 -z-10 h-75 -translate-y-1/2 rounded-full opacity-50 blur-[80px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,92,252,0.35) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}