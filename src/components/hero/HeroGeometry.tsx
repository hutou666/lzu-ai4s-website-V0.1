"use client";

import { motion } from "framer-motion";
import {
  DESKTOP_TIMELINE,
  EASE_OUT_EXPO,
  MOBILE_TIMELINE,
} from "@/components/hero/heroIntroConfig";

const DATA_POINTS = [
  { x: "12%", y: "22%", delay: 0.1 },
  { x: "78%", y: "18%", delay: 0.18 },
  { x: "86%", y: "62%", delay: 0.24 },
  { x: "24%", y: "72%", delay: 0.14 },
  { x: "52%", y: "84%", delay: 0.2 },
] as const;

export type HeroGeometryMode = "intro" | "static";

interface HeroGeometryProps {
  mode: HeroGeometryMode;
  reduced: boolean;
  isMobile?: boolean;
  className?: string;
}

export function HeroGeometry({
  mode,
  reduced,
  isMobile = false,
  className = "",
}: HeroGeometryProps) {
  const timeline = isMobile ? MOBILE_TIMELINE : DESKTOP_TIMELINE;
  const introSequence = mode === "intro";
  const { geoStart, geoStagger } = timeline;

  const leftDelay = introSequence ? geoStart : 0;
  const rightRectDelay = introSequence ? geoStart + geoStagger : 0;
  const circleDelay = introSequence ? geoStart + geoStagger * 2 : 0;
  const squareDelay = introSequence ? geoStart + geoStagger * 3 : 0;
  const arcDelay = introSequence ? geoStart + geoStagger * 4 : 0;
  const floatDelay = introSequence ? timeline.titleHold + 0.2 : 0;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {introSequence && (
        <IntroAtmosphere timeline={timeline} isMobile={isMobile} />
      )}

      <motion.div
        className="hero-left-shape absolute top-[18%] -left-8 h-[420px] w-[280px] rounded-3xl bg-gradient-to-br from-brand-700/80 to-brand-600/40"
        initial={introSequence ? { opacity: 0, x: -56, scale: 0.96 } : false}
        animate={
          reduced
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 1, x: 0, scale: 1, y: [0, -12, 0] }
        }
        transition={
          introSequence
            ? {
                opacity: { duration: 0.9, delay: leftDelay, ease: EASE_OUT_EXPO },
                x: { duration: 0.9, delay: leftDelay, ease: EASE_OUT_EXPO },
                scale: { duration: 0.9, delay: leftDelay, ease: EASE_OUT_EXPO },
                y: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
              }
            : { y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }
        }
      />

      <motion.div
        className="hero-geometry absolute top-[12%] right-[8%] h-[200px] w-[200px] rounded-3xl bg-gradient-to-br from-brand-500/50 to-brand-400/20"
        initial={introSequence ? { opacity: 0, y: 28, scale: 0.94 } : false}
        animate={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 1, y: [0, 16, 0], scale: 1, rotate: [0, 2, 0] }
        }
        transition={
          introSequence
            ? {
                opacity: { duration: 0.75, delay: rightRectDelay, ease: EASE_OUT_EXPO },
                y: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay + 0.1,
                },
                scale: { duration: 0.75, delay: rightRectDelay, ease: EASE_OUT_EXPO },
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay + 0.1,
                },
              }
            : {
                y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }
        }
      />

      <motion.div
        className="hero-geometry absolute right-[15%] bottom-[20%] hidden h-[160px] w-[160px] rounded-full border border-brand-500/30 bg-brand-600/10 sm:block"
        initial={introSequence ? { opacity: 0, y: 28, scale: 0.94 } : false}
        animate={
          reduced
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 1, y: 0, scale: [1, 1.05, 1] }
        }
        transition={
          introSequence
            ? {
                opacity: { duration: 0.75, delay: circleDelay, ease: EASE_OUT_EXPO },
                y: { duration: 0.75, delay: circleDelay, ease: EASE_OUT_EXPO },
                scale: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay + 0.2,
                },
              }
            : { scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
        }
      />

      <motion.div
        className="hero-geometry absolute right-[5%] bottom-[30%] hidden h-[120px] w-[120px] rounded-2xl bg-brand-700/30 backdrop-blur-sm md:block"
        initial={introSequence ? { opacity: 0, y: 28, scale: 0.94 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          introSequence
            ? { duration: 0.75, delay: squareDelay, ease: EASE_OUT_EXPO }
            : { duration: 0 }
        }
      />

      <motion.svg
        className="hero-geometry absolute top-[40%] right-[22%] hidden h-24 w-24 md:block"
        viewBox="0 0 100 100"
        initial={introSequence ? { opacity: 0, y: 28, scale: 0.94 } : false}
        animate={{ opacity: 0.4, y: 0, scale: 1 }}
        transition={
          introSequence
            ? { duration: 0.75, delay: arcDelay, ease: EASE_OUT_EXPO }
            : { duration: 0 }
        }
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="oklch(0.55 0.19 265)"
          strokeWidth="12"
          strokeDasharray="80 170"
        />
      </motion.svg>
    </div>
  );
}

function IntroAtmosphere({
  timeline,
  isMobile,
}: {
  timeline: typeof DESKTOP_TIMELINE | typeof MOBILE_TIMELINE;
  isMobile: boolean;
}) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.65 0.15 265 / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.15 265 / 0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.035 }}
        transition={{ duration: 0.5, delay: timeline.bgFade }}
      />

      <motion.div
        className="absolute top-1/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-600/6 blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: timeline.bgFade + 0.05 }}
      />

      {DATA_POINTS.slice(0, isMobile ? 3 : 5).map((point) => (
        <motion.span
          key={`${point.x}-${point.y}`}
          className="absolute h-1 w-1 rounded-full bg-brand-400/40"
          style={{ left: point.x, top: point.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: timeline.bgFade + point.delay,
          }}
        />
      ))}
    </>
  );
}
