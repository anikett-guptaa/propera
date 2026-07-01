"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Before Propera, I spent three days every month collecting rent and sending reminders manually. Now it all happens while I sleep on the 1st.",
    name: "Rajesh Gupta",
    role: "Hostel Owner, Pune",
    initials: "RG",
    gradient: "from-violet-400 to-violet-600",
  },
  {
    quote: "The WhatsApp billing alone was worth switching. Tenants actually pay faster because they receive a proper PDF instead of a casual message asking for money.",
    name: "Meera Sharma",
    role: "PG Owner, Bangalore",
    initials: "MS",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    quote: "Managing four properties with 120 tenants used to mean four different spreadsheets. Propera gave me one place and I actually understand my finances now.",
    name: "Vikram Patel",
    role: "Apartment Manager, Mumbai",
    initials: "VP",
    gradient: "from-violet-600 to-purple-700",
  },
  {
    quote: "The defaulter list with auto-reminders changed everything. I do not have to feel awkward calling tenants anymore. The system does it professionally for me.",
    name: "Sunita Nair",
    role: "Building Owner, Chennai",
    initials: "SN",
    gradient: "from-indigo-400 to-violet-500",
  },
  {
    quote: "Setup took under 30 minutes. I added my three properties, created all the rooms, and the first batch of bills went out automatically the very next 1st.",
    name: "Arjun Mehta",
    role: "PG Owner, Hyderabad",
    initials: "AM",
    gradient: "from-violet-400 to-fuchsia-500",
  },
  {
    quote: "The occupancy and revenue charts finally let me see which property is actually profitable. I had a unit sitting underpriced for two years and had no idea.",
    name: "Priya Iyer",
    role: "Multi-property Owner, Kochi",
    initials: "PI",
    gradient: "from-violet-500 to-violet-700",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="#7c5cfc" className="h-3 w-3">
          <path d="M6 1l1.4 2.8 3.1.5-2.2 2.1.5 3.1L6 8.1 3.2 9.5l.5-3.1L1.5 4.3l3.1-.5L6 1z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden px-4 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,92,252,0.06) 0%, transparent 70%)" }}
      />

      <SectionHeading
        eyebrow="Testimonials"
        title="Owners who stopped chasing rent"
        description="Real property managers across India who switched from spreadsheets to Propera."
      />

      <div className="mx-auto mt-16 max-w-6xl columns-1 gap-4 sm:columns-2 lg:columns-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 break-inside-avoid rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm dark:border-white/[0.08] dark:bg-ink-900"
          >
            <StarRow />
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t.quote}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-xs font-semibold text-white`}>
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-950 dark:text-white">{t.name}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}