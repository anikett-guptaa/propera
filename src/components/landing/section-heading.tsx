"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-violet-600 font-mono dark:text-violet-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[40px] font-semibold tracking-tight text-balance text-ink-950 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-zinc-500 text-balance leading-relaxed dark:text-zinc-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}