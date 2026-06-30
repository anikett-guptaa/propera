"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeading } from "./section-heading";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How does the auto-billing engine work?",
    answer:
      "On the 1st of every month, Propera automatically generates bills for every tenant in your properties. It calculates the base rent, reads electricity usage (via OCR from meter photos), adds food or miscellaneous charges, applies any discounts, generates a PDF, and sends it to each tenant over WhatsApp. Unpaid bills are automatically flagged after the due date and reminders go out at Day 3 and Day 7.",
  },
  {
    question: "Can I manage multiple properties under one account?",
    answer:
      "Yes. Propera is built for multi-property management from the ground up. You can add unlimited properties on the Growth and Enterprise plans, switch between them instantly from the dashboard, and see a combined view of all your occupancy and revenue in one place.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most owners are fully set up within 30 minutes. The onboarding wizard walks you through creating your organization, adding your first property, and generating rooms automatically. Once that is done, you can start adding tenants immediately.",
  },
  {
    question: "Do tenants need to install anything?",
    answer:
      "No. Tenants receive their bills and receipts directly on WhatsApp as PDF attachments. They do not need to install any app or create an account unless you want to give them access to a tenant portal for viewing their lease and payment history.",
  },
  {
    question: "Is the OCR meter reading accurate?",
    answer:
      "Yes, it works with standard analogue and digital meter displays. You photograph the meter at the start and end of the period, Propera reads the numbers using OCR, calculates the units consumed, and applies your per-unit rate. You can always override the reading manually if needed.",
  },
  {
    question: "What happens if a tenant's bill calculation is wrong?",
    answer:
      "Bills can be edited before they are sent. You have a review window each month to check every bill before the WhatsApp messages go out. Individual line items — rent, electricity, food, discounts — are all editable per tenant.",
  },
  {
    question: "Can I export reports?",
    answer:
      "Yes. All reports — monthly revenue, occupancy trends, payment history, and defaulter lists — can be exported as Excel or PDF at any time. Useful for your accountant or for keeping records.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Every plan starts with a 14-day free trial. No credit card is required. You get full access to all features in the plan you choose during the trial period.",
  },
];

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/[0.06]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-ink-950 sm:text-[15px]">
          {item.question}
        </span>
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-zinc-50">
          {open ? (
            <Minus className="h-3 w-3 text-zinc-500" />
          ) : (
            <Plus className="h-3 w-3 text-zinc-500" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-zinc-500">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative px-4 py-28 sm:py-36">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions we get a lot"
        description="If your question is not here, email us at hello@propera.in and we will get back within one business day."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-12 max-w-2xl"
      >
        {faqs.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </motion.div>
    </section>
  );
}