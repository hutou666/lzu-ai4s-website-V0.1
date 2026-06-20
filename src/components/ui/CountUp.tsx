"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  immediate?: boolean;
}

export function CountUp({ end, suffix = "", duration = 2000, immediate = false }: CountUpProps) {
  const [count, setCount] = useState(immediate ? end : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (immediate || prefersReducedMotion) {
      setCount(end);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, prefersReducedMotion, immediate]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
