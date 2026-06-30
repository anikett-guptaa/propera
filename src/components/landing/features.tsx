"use client"

import {
  Building2,
  Users,
  Wallet,
  FileText,
  Zap,
  BarChart3,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: Zap,
    title: "Auto-billing engine",
    description:
      "On the 1st of every month, bills generate themselves. Rent, electricity, food charges, discounts — sent as a WhatsApp PDF to every tenant automatically.",
    large: true,
  },
  {
    icon: Building2,
    title: "Multi-property control",
    description:
      "Switch between properties in one click. Each with its own rooms, rates, and rules.",
  },
  {
    icon: Users,
    title: "Tenant records",
    description:
      "ID proof, lease history, and contact details — searchable in seconds, not folders.",
  },
  {
    icon: Wallet,
    title: "Payment tracking",
    description:
      "Partial payments, UPI references, and due dates tracked automatically per tenant.",
  },
  {
    icon: FileText,
    title: "Lease management",
    description:
      "Digital agreements with renewal reminders before a lease quietly expires.",
  },
  {
    icon: BarChart3,
    title: "Reports that matter",
    description:
      "Occupancy, revenue, and defaulter trends — exportable and never buried in tabs.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-4 py-28 sm:py-36">
      <SectionHeading
        eyebrow="Product"
        title="Everything a property runs on, in one place"
        description="Propera replaces the spreadsheet, the WhatsApp group, and the notebook by the front desk with one connected system."
      />

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={f.title} index={i} {...f} />
        ))}
      </div>
    </section>
  );
}