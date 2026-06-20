"use client";

import {
  createContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  animate,
  type MotionValue,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TimedRevealContext = createContext(false);

interface TimedRevealSectionProps {
  id?: string;
  className?: string;
  align?: "center" | "start";
  headerPad?: boolean;
  decor?: ReactNode;
  /** 时间线总时长（秒） */
  duration?: number;
  hintTheme?: "light" | "dark";
  children: (progress: MotionValue<number>) => ReactNode;
}

const SKIP_WHEEL_DELTA = 10;

export function TimedRevealSection({
  id,
  className = "",
  align = "center",
  headerPad = false,
  decor,
  duration = 3.2,
  hintTheme = "dark",
  children,
}: TimedRevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const reduced = useReducedMotion();
  const playedRef = useRef(false);
  const playingRef = useRef(false);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const finishPlayback = useCallback(
    (skipped = false) => {
      if (!playingRef.current) return;

      animationRef.current?.stop();
      animationRef.current = null;
      progress.set(1);
      playingRef.current = false;
      playedRef.current = true;
      setIsPlaying(false);
      setReady(true);

      if (skipped && ref.current) {
        requestAnimationFrame(() => {
          ref.current?.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
    },
    [progress],
  );

  const startPlayback = useCallback(async () => {
    if (playedRef.current || playingRef.current || reduced) return;

    const el = ref.current;
    if (!el) return;

    playingRef.current = true;
    setIsPlaying(true);
    progress.set(0);

    const rect = el.getBoundingClientRect();
    const headerOffset = headerPad ? 88 : 0;
    const needsSnap = rect.top > headerOffset + 4 || rect.top < headerOffset - 4;

    if (needsSnap) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      await new Promise((r) => setTimeout(r, 480));
    }

    if (!playingRef.current) return;

    const controls = animate(progress, 1, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    animationRef.current = controls;

    try {
      await controls;
    } catch {
      // stopped via skip
    }

    if (playingRef.current) {
      finishPlayback(false);
    }
  }, [duration, finishPlayback, headerPad, progress, reduced]);

  useEffect(() => {
    if (reduced) {
      progress.set(1);
      setReady(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || playedRef.current || playingRef.current) return;

        const top = entry.boundingClientRect.top;
        const vh = window.innerHeight;
        const headerOffset = headerPad ? 88 : 0;

        if (top < vh * 0.82 && top > headerOffset - 24) {
          startPlayback();
        }
      },
      { threshold: [0, 0.15, 0.35, 0.55], rootMargin: "-8% 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [headerPad, progress, reduced, startPlayback]);

  useEffect(() => {
    if (!isPlaying) return;

    const onWheel = (e: WheelEvent) => {
      if (!playingRef.current) return;

      if (Math.abs(e.deltaY) >= SKIP_WHEEL_DELTA) {
        e.preventDefault();
        finishPlayback(true);
        requestAnimationFrame(() => {
          window.scrollBy({ top: e.deltaY, behavior: "auto" });
        });
        return;
      }

      e.preventDefault();
    };

    const sectionEl = ref.current;

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!playingRef.current) return;

      const startY = touchStartYRef.current;
      const currentY = e.touches[0]?.clientY;
      if (startY !== null && currentY !== undefined && Math.abs(startY - currentY) >= 24) {
        e.preventDefault();
        const delta = startY - currentY;
        finishPlayback(true);
        requestAnimationFrame(() => {
          window.scrollBy({ top: delta, behavior: "auto" });
        });
        return;
      }

      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!playingRef.current) return;
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        finishPlayback(true);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!playingRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, label")) return;
      finishPlayback(true);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    sectionEl?.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      sectionEl?.removeEventListener("pointerdown", onPointerDown);
    };
  }, [finishPlayback, isPlaying]);

  const innerPad = headerPad ? "pt-[88px]" : "py-16";
  const alignClass = align === "start" ? "justify-start" : "justify-center";

  if (reduced) {
    return (
      <section id={id} className={`section-padding relative overflow-hidden scroll-mt-[72px] ${className}`}>
        {decor}
        <div className="container-wide relative">{children(progress)}</div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`relative isolate min-h-screen scroll-mt-[72px] ${className}`}
      data-timed-reveal={ready ? "done" : "pending"}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {decor}

        {isPlaying && (
          <p
            className={`pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full px-4 py-1.5 text-[11px] backdrop-blur-sm ${
              hintTheme === "light"
                ? "border border-border/80 bg-white/85 text-ink-muted"
                : "border border-white/10 bg-black/20 text-white/45"
            }`}
            aria-hidden
          >
            滚动、点击或按 Esc 跳过
          </p>
        )}

        <div
          className={`container-wide relative flex h-full flex-col px-5 pb-12 md:px-8 lg:px-12 ${innerPad} ${alignClass}`}
        >
          <TimedRevealContext.Provider value>{children(progress)}</TimedRevealContext.Provider>
        </div>
      </div>
    </section>
  );
}

/** 与 StickySection 共用区间计算，供 RevealBlock 时间线驱动 */
export { revealRange } from "./StickySection";
export { TimedRevealContext };

export function timedRevealRange(index: number, total: number) {
  const slot = 0.9 / Math.max(total, 1);
  const start = 0.04 + index * slot;
  const end = Math.min(0.98, start + slot * 0.88);
  return { start, end };
}
