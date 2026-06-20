"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Theme = "light" | "dark";

interface ScrollNarrativeSectionProps {
  id?: string;
  theme?: Theme;
  left: ReactNode;
  panel: ReactNode;
  panelContentWidth: number;
  scrollHeightVh?: number;
  hintText?: string;
  showHint?: boolean;
  reducedFallback: ReactNode;
}

function usePanelTravel(contentWidth: number) {
  const [vw, setVw] = useState(1200);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const half = vw * 0.5;
  const panelW = contentWidth + half + 48;
  return { startX: 0, endX: -(panelW - vw), panelW };
}

function ScrollHint({
  opacity,
  theme,
  text,
}: {
  opacity: MotionValue<number>;
  theme: Theme;
  text: string;
}) {
  const muted = theme === "dark" ? "text-white/50" : "text-ink-muted";
  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2"
      style={{ opacity, left: "calc(50% - 24px)" }}
      aria-hidden
    >
      <p className={`whitespace-nowrap text-[11px] font-medium ${muted}`}>向下滚动</p>
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        className="text-accent-sky"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 3v10M4 9l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <p className={`max-w-[5rem] text-center text-[10px] leading-snug ${muted}`}>{text}</p>
    </motion.div>
  );
}

const themeStyles = {
  light: {
    section: "bg-gradient-to-b from-surface to-surface-alt",
    decor: "light" as const,
    panel:
      "bg-gradient-to-br from-surface-alt via-surface to-surface-alt shadow-[-12px_0_40px_rgba(15,23,42,0.08)]",
  },
  dark: {
    section: "bg-story",
    decor: "dark" as const,
    panel: "bg-gradient-to-br from-[oklch(0.14_0.04_255)] via-story to-[oklch(0.18_0.045_255)] shadow-[-12px_0_40px_rgba(0,0,0,0.35)]",
  },
};

export function ScrollNarrativeSection({
  id,
  theme = "light",
  left,
  panel,
  panelContentWidth,
  scrollHeightVh,
  hintText = "继续浏览",
  showHint = true,
  reducedFallback,
}: ScrollNarrativeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef({ startX: 0, endX: -2000, panelW: 2000 });
  const reduced = useReducedMotion();
  const { startX, endX, panelW } = usePanelTravel(panelContentWidth);
  const styles = themeStyles[theme];

  useEffect(() => {
    travelRef.current = { startX, endX, panelW };
  }, [startX, endX, panelW]);

  const heightVh = scrollHeightVh ?? 44 + Math.max(panelContentWidth / 80, 36);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftVisibility = useTransform(scrollYProgress, (p) => (p >= 0.98 ? "hidden" : "visible"));

  const hintOpacity = useTransform(scrollYProgress, (p) => {
    if (!showHint) return 0;
    if (p < 0.04) return p / 0.04;
    if (p <= 0.12) return 1;
    if (p >= 0.22) return 0;
    return 1 - (p - 0.12) / 0.1;
  });

  const panelX = useTransform(scrollYProgress, (p) => {
    const { startX: sx, endX: ex } = travelRef.current;
    if (p <= 0) return sx;
    if (p >= 0.98) return ex;
    const t = p / 0.98;
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    return sx + (ex - sx) * eased;
  });

  if (reduced) {
    return <>{reducedFallback}</>;
  }

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative isolate ${styles.section}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <SectionDecor variant={styles.decor} />

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-1/2 px-6 md:px-10 lg:px-14">
            <motion.div style={{ visibility: leftVisibility }}>{left}</motion.div>
          </div>
        </div>

        <motion.div
          className={`absolute inset-y-0 z-20 flex items-center ${styles.panel}`}
          style={{ left: "50%", width: panelW, x: panelX }}
        >
          <div className="flex h-full w-max items-center gap-[18px] px-8 py-16 md:px-10">{panel}</div>
        </motion.div>

        {showHint && <ScrollHint opacity={hintOpacity} theme={theme} text={hintText} />}
      </div>
    </section>
  );
}

export function PanelCard({
  children,
  width,
  theme = "light",
  label,
  index,
}: {
  children: ReactNode;
  width: number;
  theme?: Theme;
  label?: string;
  index?: number;
}) {
  const border = theme === "dark" ? "border-white/12 bg-white/[0.06]" : "border-border/60 bg-white";
  const headerText = theme === "dark" ? "text-white/50" : "text-brand-600";

  return (
    <article
      className={`shrink-0 overflow-hidden rounded-2xl border shadow-lg ${border}`}
      style={{ width }}
    >
      {label !== undefined && index !== undefined && (
        <div
          className={`flex items-center justify-between border-b px-4 py-2.5 ${theme === "dark" ? "border-white/10" : "border-border/50"}`}
        >
          <span className={`text-[10px] font-semibold tracking-[0.15em] uppercase ${headerText}`}>
            {label} {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-sky text-white">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      )}
      {children}
    </article>
  );
}
