"use client";

import { motion } from "framer-motion";

const logos = [
  "Skyline Residency",
  "Gupta Hostels",
  "Urban Nest PG",
  "Maple Stay",
  "Horizon Living",
  "Nestwell Co-living",
];

export function TrustedBy() {
  return (
    <section className="relative px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl"
      >
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
          Trusted by property teams across India
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 0.55, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ opacity: 1 }}
              className="text-sm font-medium tracking-tight text-zinc-500 transition-opacity"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}