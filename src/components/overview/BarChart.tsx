"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BarChartProps {
  items: { label: string; value: number; unit?: string }[];
  maxValue?: number;
  dark?: boolean;
  compact?: boolean;
}

export function BarChart({ items, maxValue, dark = false, compact = false }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const max = maxValue ?? Math.max(...items.map((i) => i.value));

  return (
    <div ref={ref} className={compact ? "space-y-2" : "space-y-3"}>
      {items.map((item, i) => (
        <div key={item.label}>
          <div className={`mb-1 flex items-center justify-between gap-2 ${compact ? "text-[10px]" : "text-xs"}`}>
            <span
              className={`min-w-0 flex-1 ${compact ? "line-clamp-2 leading-snug" : ""} ${dark ? "text-white/60" : "text-ink-muted"}`}
            >
              {item.label}
            </span>
            <span className={`shrink-0 font-medium tabular-nums ${dark ? "text-white" : "text-ink"}`}>
              {item.value}
              {item.unit ?? "%"}
            </span>
          </div>
          <div className={`h-2 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-surface-muted"}`}>
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-500"
              initial={{ width: 0 }}
              animate={
                inView || reduced ? { width: `${(item.value / max) * 100}%` } : { width: 0 }
              }
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
