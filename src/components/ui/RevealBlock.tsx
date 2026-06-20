"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { revealRange } from "./StickySection";
import { TimedRevealContext, timedRevealRange } from "./TimedRevealSection";
import { useContext } from "react";

export function RevealBlock({
  progress,
  index,
  total,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
}) {
  const isTimed = useContext(TimedRevealContext);
  const { start, end } = isTimed ? timedRevealRange(index, total) : revealRange(index, total);
  const opacity = useTransform(progress, (p) => {
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  });
  const y = useTransform(progress, (p) => {
    if (p <= start) return 24;
    if (p >= end) return 0;
    const t = (p - start) / (end - start);
    return 24 * (1 - t);
  });

  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
