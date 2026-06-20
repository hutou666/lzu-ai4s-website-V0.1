"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "hero" | "section" | "minimal";

interface DarkGeoDecorProps {
  variant?: Variant;
  showLogo?: boolean;
  className?: string;
}

export function DarkGeoDecor({
  variant = "section",
  showLogo = false,
  className = "",
}: DarkGeoDecorProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {variant === "hero" && (
        <>
          <motion.div
            className="absolute top-[8%] right-[4%] hidden h-[340px] w-[240px] rounded-[2rem] bg-gradient-to-br from-brand-700/70 to-brand-600/30 lg:block"
            animate={reduced ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[22%] right-[28%] hidden h-[180px] w-[180px] rounded-3xl border border-brand-500/25 bg-brand-600/10 lg:block"
            animate={reduced ? undefined : { rotate: [0, 3, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[12%] bottom-[18%] hidden h-[140px] w-[140px] rounded-full border border-brand-400/30 bg-brand-500/10 lg:block"
            animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-[35%] right-[8%] hidden h-[100px] w-[100px] rounded-2xl bg-brand-700/25 backdrop-blur-sm lg:block" />
          <svg
            className="absolute top-[48%] right-[22%] hidden h-28 w-28 opacity-30 lg:block"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="oklch(0.55 0.19 265)"
              strokeWidth="8"
              strokeDasharray="70 190"
            />
          </svg>
          <svg
            className="absolute top-[15%] right-[18%] hidden h-40 w-40 opacity-[0.06] lg:block"
            viewBox="0 0 200 200"
          >
            <defs>
              <pattern id="about-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#about-grid)" />
          </svg>
          {showLogo && (
            <div className="absolute top-1/2 right-[10%] hidden -translate-y-1/2 opacity-[0.07] lg:block">
              <Image
                src="/assets/club-logo.jpg"
                alt=""
                width={280}
                height={280}
                className="rounded-full"
                unoptimized
              />
            </div>
          )}
        </>
      )}

      {variant === "section" && (
        <>
          <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-brand-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-3xl bg-brand-700/15" />
          <svg className="absolute top-[20%] left-[6%] hidden h-16 w-16 opacity-20 md:block" viewBox="0 0 100 100">
            <rect x="15" y="15" width="70" height="70" rx="14" fill="none" stroke="oklch(0.55 0.19 265)" strokeWidth="6" />
          </svg>
        </>
      )}

      {variant === "minimal" && (
        <div className="absolute -bottom-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-brand-600/8 blur-3xl" />
      )}
    </div>
  );
}
