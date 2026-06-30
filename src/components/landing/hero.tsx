"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Wallet, Users, AlertCircle } from "lucide-react";
import { AnimatedGradient } from "./animated-gradient";
import { HeroAnimation } from "./hero-animation";
import { FloatingCard } from "./floating-card";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "2,400+", label: "Rooms managed" },
  { value: "Rs. 1.2Cr+", label: "Rent collected monthly" },
  { value: "98.2%", label: "On-time collection rate" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-32 pt-40 sm:pt-48">
      <AnimatedGradient className="left-1/2 top-0 -translate-x-1/2" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/40 bg-violet-50 px-3.5 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
          </span>
          <span className="font-mono text-[11px] tracking-wide text-violet-700">
            Now generating bills automatically every month
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-ink-950 sm:text-6xl md:text-[5rem]"
        >
          Property management
          <br />
          that finally feels{" "}
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-violet-700 via-violet-500 to-violet-600 bg-clip-text text-transparent">
              effortless.
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-balance text-base text-zinc-500 sm:text-lg"
        >
          Rooms, tenants, rent, and reporting, all in one calm workspace. Built
          for owners who are done chasing spreadsheets and WhatsApp reminders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-violet-700 sm:w-auto"
          >
            Start free trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/8 bg-white px-6 py-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 sm:w-auto"
          >
            <PlayCircle className="h-4 w-4" />
            Watch product tour
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mx-auto mt-14 flex max-w-lg flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-mono text-xl font-semibold text-ink-950">
                {s.value}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-20">
        <HeroAnimation />

        <FloatingCard
          icon={Wallet}
          label="Rent collected today"
          value="Rs. 48,200"
          trend="+12%"
          trendUp
          className="left-0 top-10 hidden lg:block"
          delay={1.1}
          floatDuration={7}
        />
        <FloatingCard
          icon={Users}
          label="Active tenants"
          value="88 / 96"
          trend="+5"
          trendUp
          className="right-0 top-4 hidden lg:block"
          delay={1.3}
          floatDuration={8}
        />
        <FloatingCard
          icon={AlertCircle}
          label="Defaulters"
          value="3 tenants"
          trend="-2"
          trendUp={false}
          className="bottom-6 right-6 hidden lg:block"
          delay={1.5}
          floatDuration={6.5}
        />
      </div>
    </section>
  );
}