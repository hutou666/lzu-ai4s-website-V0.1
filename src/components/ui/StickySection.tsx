"use client";

import { useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StickySectionProps {
  id?: string;
  className?: string;
  heightVh?: number;
  align?: "center" | "start";
  headerPad?: boolean;
  decor?: ReactNode;
  children: ReactNode | ((progress: MotionValue<number>) => ReactNode);
}

export function StickySection({
  id,
  className = "",
  heightVh = 140,
  align = "center",
  headerPad = false,
  decor,
  children,
}: StickySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <section id={id} className={`section-padding relative overflow-hidden ${className}`}>
        {decor}
        <div className="container-wide relative">
          {typeof children === "function" ? children(scrollYProgress) : children}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`relative isolate ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {decor}
        <div
          className={`container-wide relative flex h-full flex-col px-5 pb-12 md:px-8 lg:px-12 ${
            align === "start" ? "justify-start" : "justify-center"
          } ${headerPad ? "pt-[88px]" : "py-16"}`}
        >
          {typeof children === "function" ? children(scrollYProgress) : children}
        </div>
      </div>
    </section>
  );
}

/** 按滚动进度计算淡入 */
export function revealRange(index: number, total: number, span = 0.12) {
  const start = 0.08 + index * (span * 0.85);
  const end = start + span;
  return { start, end };
}
