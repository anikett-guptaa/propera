"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

interface Plan {
  name: string;
  price: string;
  period: string;
  rooms: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "Rs. 999",
    period: "/ month",
    rooms: "Up to 20 rooms",
    description: "For a single property just getting started.",
    features: ["Tenant management", "Rent tracking", "WhatsApp billing", "Basic reports", "Email support"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "Rs. 2,499",
    period: "/ month",
    rooms: "Up to 100 rooms",
    description: "For owners who want billing on autopilot.",
    features: ["Everything in Starter", "Auto-billing engine", "OCR meter reading", "Defaulter auto-reminders", "Analytics dashboard", "Priority support"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    rooms: "Unlimited rooms",
    description: "For large operators managing multiple buildings.",
    features: ["Everything in Growth", "Unlimited properties", "Multi-user access", "Custom integrations", "Dedicated account manager", "SLA guarantee"],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple pricing, no surprises"
        description="Every plan includes a 14-day free trial. No credit card required to start."
      />

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col rounded-2xl p-6 ${
              plan.highlighted
                ? "bg-gradient-to-b from-violet-600 to-violet-800 shadow-[0_24px_60px_-20px_rgba(124,92,252,0.65)]"
                : "border border-black/[0.06] bg-white shadow-sm dark:border-white/[0.08] dark:bg-ink-900"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-violet-700 shadow-sm">
                  Most popular
                </span>
              </div>
            )}

            <div className="mb-5">
              <p className={`text-sm font-semibold ${plan.highlighted ? "text-violet-200" : "text-zinc-500 dark:text-zinc-400"}`}>
                {plan.name}
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`font-mono text-3xl font-bold ${plan.highlighted ? "text-white" : "text-ink-950 dark:text-white"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ${plan.highlighted ? "text-violet-300" : "text-zinc-400 dark:text-zinc-500"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`mt-1 text-xs ${plan.highlighted ? "text-violet-300" : "text-zinc-400 dark:text-zinc-500"}`}>
                {plan.rooms}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${plan.highlighted ? "text-violet-200" : "text-zinc-500 dark:text-zinc-400"}`}>
                {plan.description}
              </p>
            </div>

            <div className="mb-6 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${plan.highlighted ? "bg-white/20" : "bg-violet-100 dark:bg-violet-500/20"}`}>
                    <Check className={`h-2.5 w-2.5 ${plan.highlighted ? "text-white" : "text-violet-700 dark:text-violet-300"}`} />
                  </div>
                  <span className={`text-sm ${plan.highlighted ? "text-violet-100" : "text-zinc-600 dark:text-zinc-400"}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#"
              className={`group flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-all ${
                plan.highlighted
                  ? "bg-white text-violet-700 hover:bg-violet-50"
                  : "bg-ink-950 text-white hover:bg-violet-700 dark:bg-white dark:text-ink-950 dark:hover:bg-violet-100"
              }`}
            >
              {plan.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600"
      >
        All plans include SSL security, daily backups, and 99.9% uptime. Prices exclude GST.
      </motion.p>
    </section>
  );
}