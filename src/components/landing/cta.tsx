"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export function Cta() {
  return (
    <section className="relative overflow-hidden px-4 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900 px-8 py-16 text-center sm:px-16"
      >
        <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-violet-400/30 blur-3xl" />

        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5">
            <Zap className="h-3.5 w-3.5 text-violet-200" />
            <span className="font-mono text-[11px] tracking-wide text-violet-100">
              14-day free trial, no card required
            </span>
          </div>

          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Your next 1st of the month can run itself.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-violet-200">
            Join 500+ property owners who have automated their rent collection,
            eliminated defaulter awkwardness, and finally understood their numbers.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-medium text-violet-700 transition-all hover:bg-violet-50 sm:w-auto"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
            >
              Book a demo
            </a>
          </div>

          <p className="mt-6 text-xs text-violet-300">
            Setup takes under 30 minutes. No spreadsheets required.
          </p>
        </div>
      </motion.div>
    </section>
  );
}