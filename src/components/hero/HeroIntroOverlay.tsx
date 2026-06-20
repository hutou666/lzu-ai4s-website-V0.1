"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { siteConfig } from "@/content/site";
import {
  DESKTOP_TIMELINE,
  EASE_OUT_EXPO,
  MOBILE_TIMELINE,
} from "@/components/hero/heroIntroConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroIntroOverlayProps {
  isMobile?: boolean;
  onHeroRevealStart: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

export function HeroIntroOverlay({
  isMobile = false,
  onHeroRevealStart,
  onComplete,
  onSkip,
}: HeroIntroOverlayProps) {
  const reduced = useReducedMotion();

  const timeline = useMemo(
    () => (isMobile ? MOBILE_TIMELINE : DESKTOP_TIMELINE),
    [isMobile],
  );

  useEffect(() => {
    if (reduced) {
      const revealTimer = window.setTimeout(onHeroRevealStart, 300);
      const completeTimer = window.setTimeout(onComplete, 450);
      return () => {
        window.clearTimeout(revealTimer);
        window.clearTimeout(completeTimer);
      };
    }

    const revealTimer = window.setTimeout(
      onHeroRevealStart,
      timeline.heroReveal * 1000,
    );
    const completeTimer = window.setTimeout(
      onComplete,
      timeline.complete * 1000,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [reduced, timeline, onHeroRevealStart, onComplete]);

  if (reduced) {
    return (
      <motion.div
        className="absolute inset-0 z-[30] flex items-center justify-center bg-deep"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        aria-hidden
      >
        <motion.h2
          className="intro-brand-title px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderBrandName()}
        </motion.h2>
      </motion.div>
    );
  }

  const exitDuration = timeline.heroReveal - timeline.titleExit + 0.15;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[20] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
      aria-label="品牌标题前奏"
    >
      {/* 仅中心暗角，不遮挡边缘几何图形 */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_48%_40%_at_50%_48%,oklch(0.11_0.025_265/0.62)_0%,transparent_70%)]"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 0.75, 0] }}
        transition={{
          duration: exitDuration + 0.3,
          delay: timeline.bgFade,
          times: [0, 0.55, 1],
          ease: EASE_OUT_EXPO,
        }}
      />

      <div className="pointer-events-none relative flex h-full items-center justify-center px-5 sm:px-8">
        <div className="relative w-full max-w-5xl text-center">
          {/* 科技感坐标装饰 */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 md:h-64 md:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 0.8, delay: timeline.bgFade + 0.1 }}
            aria-hidden
          >
            <div className="absolute inset-x-0 top-1/2 h-px bg-brand-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-brand-500/20" />
            <div className="absolute inset-4 rounded-full border border-brand-500/15" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/10 blur-3xl md:h-96 md:w-96"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: timeline.bgFade,
              ease: EASE_OUT_EXPO,
            }}
          />

          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: 0.9,
              delay: timeline.titleReveal + 0.15,
              ease: "easeInOut",
            }}
          >
            {!isMobile && (
              <motion.div
                className="h-px w-24 bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "420%" }}
                transition={{
                  duration: 0.85,
                  delay: timeline.titleReveal + 0.15,
                  ease: EASE_OUT_EXPO,
                }}
              />
            )}
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            animate={{
              opacity: [1, 1, 0],
              y: [0, 0, -32],
              filter: ["blur(0px)", "blur(0px)", "blur(8px)"],
            }}
            transition={{
              duration: exitDuration,
              delay: timeline.titleExit,
              times: [0, 0.2, 1],
              ease: EASE_OUT_EXPO,
            }}
          >
            <motion.div
              className="mb-6 flex items-center justify-center gap-3 md:mb-8 md:gap-5"
              initial={{ opacity: 0, y: 12, letterSpacing: "0.32em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
              transition={{
                duration: 0.65,
                delay: timeline.titleReveal,
                ease: EASE_OUT_EXPO,
              }}
            >
              <span className="intro-brand-kicker-line" aria-hidden />
              <p className="intro-brand-kicker shrink-0">
                {siteConfig.tagline.toUpperCase()}
              </p>
              <span className="intro-brand-kicker-line" aria-hidden />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.012, 1] }}
              transition={{
                duration: 0.5,
                delay: timeline.titleHold,
                ease: "easeInOut",
              }}
            >
              <div className="overflow-hidden px-2">
                <motion.h2
                  className="intro-brand-title"
                  initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.75,
                    delay: timeline.titleReveal + 0.12,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {renderBrandName()}
                </motion.h2>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={onSkip}
        className="pointer-events-auto absolute right-5 bottom-5 z-40 text-[11px] tracking-wide text-white/30 transition-colors hover:text-white/55 md:right-8 md:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        aria-label="跳过品牌前奏动画"
      >
        跳过
      </motion.button>
    </motion.div>
  );
}

/** 将「AI」高亮，强化科技感 */
function renderBrandName() {
  return siteConfig.name.split(/(AI)/).map((part, index) =>
    part === "AI" ? (
      <span key={index} className="intro-brand-title-accent">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}
