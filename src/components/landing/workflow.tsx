"use client";

import { motion } from "framer-motion";
import { Building2, DoorOpen, UserPlus, Wallet, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    icon: Building2,
    title: "Add a property",
    description: "Name it, set the address, pick how many floors it has.",
  },
  {
    icon: DoorOpen,
    title: "Rooms generate themselves",
    description: "Tell us floors and rooms per floor. We number them instantly.",
  },
  {
    icon: UserPlus,
    title: "Move tenants in",
    description: "Assign a room, set the rent, upload an ID. Done in a minute.",
  },
  {
    icon: Wallet,
    title: "Billing runs on its own",
    description: "Every 1st of the month, bills go out. You just watch it happen.",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative px-4 py-28 sm:py-36">
      <SectionHeading
        eyebrow="How it works"
        title="From empty property to running on autopilot"
        description="Each step depends on the one before it, the same way a real property does. Floors hold rooms, rooms hold tenants, tenants generate rent."
      />

      <div className="mx-auto mt-16 max-w-5xl">
        {/* Desktop: horizontal connected timeline */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center px-4 text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-7 h-px w-full translate-x-1/2 bg-gradient-to-r from-violet-200 to-violet-100" />
              )}
              <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200 bg-white shadow-[0_8px_24px_-8px_rgba(124,92,252,0.35)]">
                <step.icon className="h-6 w-6 text-violet-700" />
              </div>
              <h3 className="text-[15px] font-semibold text-ink-950">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-zinc-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="flex flex-col gap-6 lg:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-white shadow-sm">
                  <step.icon className="h-5 w-5 text-violet-700" />
                </div>
                {i < steps.length - 1 && (
                  <div className="my-1 h-full w-px flex-1 bg-violet-100" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="text-[15px] font-semibold text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-violet-700 hover:text-violet-800"
          >
            See the full workflow in the product tour
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}