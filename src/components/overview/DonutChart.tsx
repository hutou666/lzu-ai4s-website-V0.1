"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface DonutChartProps {
  segments: { percent: number; color: string; label: string }[];
  centerValue: string;
  centerLabel: string;
  dark?: boolean;
  size?: "md" | "lg";
}

export function DonutChart({
  segments,
  centerValue,
  centerLabel,
  dark = false,
  size = "md",
}: DonutChartProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const dim = size === "lg" ? 180 : 140;
  const r = size === "lg" ? 68 : 54;
  const stroke = size === "lg" ? 16 : 14;
  const cx = dim / 2;
  const cy = dim / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="relative mx-auto" style={{ width: dim, height: dim }}>
      <svg ref={ref} viewBox={`0 0 ${dim} ${dim}`} className="h-full w-full">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={dark ? "oklch(1 0 0 / 0.1)" : "oklch(0.94 0.01 255)"}
          strokeWidth={stroke}
        />
        {segments.map((seg) => {
          const dash = (seg.percent / 100) * circumference;
          const gap = circumference - dash;
          const rotation = (offset / 100) * 360 - 90;
          offset += seg.percent;
          return (
            <motion.circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${rotation} ${cx} ${cy})`}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={
                inView || reduced
                  ? { strokeDasharray: `${dash} ${gap}` }
                  : { strokeDasharray: `0 ${circumference}` }
              }
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-semibold tabular-nums ${dark ? "text-white" : "text-ink"} ${size === "lg" ? "text-3xl" : "text-2xl"}`}
        >
          {centerValue}
        </span>
        <span className={`text-[10px] ${dark ? "text-white/50" : "text-ink-muted"}`}>{centerLabel}</span>
      </div>
    </div>
  );
}
