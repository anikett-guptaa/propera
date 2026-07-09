"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

interface AddTenantModalProps {
  onClose: () => void;
}

function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
        {label}
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
      />
    </div>
  );
}

function SelectField({ label, options, required = false }: {
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
        {label}
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      <select
        className="w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all appearance-none cursor-pointer"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2371717a' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          paddingRight: "32px",
        }}
      >
        {options.map((o) => (
          <option key={o} className="dark:bg-ink-900">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

const steps = ["Personal", "Room & Lease", "Identity"];

export function AddTenantModal({ onClose }: AddTenantModalProps) {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-white dark:bg-ink-900 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
          <div>
            <h2 className="text-base font-semibold text-ink-950 dark:text-white">
              Add Tenant
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Step {step + 1} of {steps.length} — {steps[step]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Step tabs */}
        <div className="px-6 pt-4">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step
                    ? "bg-violet-600 dark:bg-violet-400"
                    : "bg-zinc-100 dark:bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="px-6 py-5 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <InputField label="First name" placeholder="Rahul" required />
                <InputField label="Last name" placeholder="Gupta" required />
              </div>
              <InputField label="Email" placeholder="rahul@gmail.com" type="email" />
              <InputField label="Phone" placeholder="+91 98765 43210" type="tel" required />
              <InputField label="Emergency contact" placeholder="+91 98765 00000" type="tel" />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="px-6 py-5 space-y-3"
            >
              <SelectField
                label="Property"
                options={["Gupta Boys Hostel", "Gupta Girls PG", "Sunrise Apartments"]}
                required
              />
              <SelectField
                label="Room"
                options={["R-103 (Vacant · Floor 1)", "R-110 (Vacant · Floor 1)", "R-205 (Vacant · Floor 2)"]}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Lease start" placeholder="01/07/2025" type="date" required />
                <InputField label="Lease end" placeholder="30/06/2026" type="date" required />
              </div>
              <InputField label="Monthly rent (Rs.)" placeholder="7500" type="number" required />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="px-6 py-5 space-y-3"
            >
              <SelectField
                label="ID type"
                options={["Aadhaar Card", "PAN Card", "Passport"]}
                required
              />
              <InputField label="ID number" placeholder="XXXX-XXXX-1234" required />
              <div>
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Upload ID proof
                  <span className="text-zinc-400 ml-1">(optional)</span>
                </label>
                <div className="border-2 border-dashed border-zinc-200 dark:border-white/[0.08] rounded-xl p-5 text-center hover:border-violet-300 dark:hover:border-violet-500/50 transition-colors cursor-pointer">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[10px] text-zinc-300 dark:text-zinc-600 mt-1">
                    PNG, JPG or PDF up to 5MB
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 dark:border-white/[0.06]">
          <button
            type="button"
            onClick={() => (step === 0 ? onClose() : setStep(step - 1))}
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-ink-950 dark:hover:text-white transition-colors"
          >
            {step === 0 ? "Cancel" : "Back"}
          </button>
          <button
            type="button"
            onClick={() => (step < steps.length - 1 ? setStep(step + 1) : onClose())}
            className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-5 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors"
          >
            {step < steps.length - 1 ? "Continue" : "Add Tenant"}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
