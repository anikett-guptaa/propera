"use client";

import { motion } from "framer-motion";

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className = "" }: AnimatedGradientProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute -z-10 ${className}`}>
      <motion.div
        className="absolute h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,252,0.22) 0%, rgba(124,92,252,0) 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute h-[360px] w-[360px] rounded-full left-[55%] top-[20%]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.2) 0%, rgba(167,139,250,0) 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}