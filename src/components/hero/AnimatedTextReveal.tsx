"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/components/hero/heroIntroConfig";

interface AnimatedTextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  enabled?: boolean;
}

export function AnimatedTextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  enabled = true,
}: AnimatedTextRevealProps) {
  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}
