"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { propertyTypeConfig } from "./property-types";
import type { PropertyType } from "./property-types";

interface AddPropertyModalProps {
  onClose: () => void;
}

function InputField({
  label,
  placeholder,
  type = "text",
  defaultValue,
  maxLength,
}: {
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={maxLength}
        className="w-full rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-3 py-2 text-sm text-ink-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
      />
    </div>
  );
}

export function AddPropertyModal({ onClose }: AddPropertyModalProps) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<PropertyType | null>(null);

  const types = Object.entries(propertyTypeConfig) as [
    PropertyType,
    (typeof propertyTypeConfig)[PropertyType]
  ][];

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
              Add Property
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Step {step} of 2
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-1.5">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  s <= step
                    ? "bg-violet-600 dark:bg-violet-400"
                    : "bg-zinc-100 dark:bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-5 space-y-4"
            >
              <div>
                <p className="text-sm font-medium text-ink-950 dark:text-white mb-3">
                  Select property type
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {types.map(([value, config]) => {
                    const Icon = config.icon;
                    const selected = selectedType === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedType(value)}
                        className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                          selected
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 dark:border-violet-400"
                            : "border-zinc-200 dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-white/20"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selected ? config.bg : "bg-zinc-50 dark:bg-white/5"
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            selected ? config.color : "text-zinc-400 dark:text-zinc-500"
                          }`} />
                        </div>
                        <span className={`text-[11px] font-medium ${
                          selected
                            ? "text-violet-700 dark:text-violet-300"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}>
                          {config.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <InputField label="Property name" placeholder="e.g. Gupta Boys Hostel" />
              <InputField label="Number of floors" placeholder="3" type="number" />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="px-6 py-5 space-y-3"
            >
              <p className="text-sm font-medium text-ink-950 dark:text-white">
                Address details
              </p>
              <InputField label="Address line" placeholder="123 MG Road, Koregaon Park" />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="City" placeholder="Pune" />
                <InputField label="State" placeholder="Maharashtra" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Pincode" placeholder="411001" maxLength={6} />
                <InputField label="Country" placeholder="India" defaultValue="India" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 dark:border-white/[0.06]">
          <button
            type="button"
            onClick={() => (step === 1 ? onClose() : setStep(1))}
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-ink-950 dark:hover:text-white transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            type="button"
            onClick={() => (step === 1 ? setStep(2) : onClose())}
            className="flex items-center gap-1.5 rounded-xl bg-ink-950 dark:bg-white px-5 py-2 text-sm font-medium text-white dark:text-ink-950 hover:bg-violet-700 dark:hover:bg-violet-100 transition-colors"
          >
            {step === 1 ? "Continue" : "Add Property"}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}