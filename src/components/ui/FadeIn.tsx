"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  children: React.ReactNode;
}

export function FadeIn({ delay = 0, children, ...props }: FadeInProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12, margin: "0px 0px -8% 0px" });
  const [revealed, setRevealed] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 900);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const visible = reduced || inView || revealed;

  if (reduced) {
    return (
      <div ref={ref} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: visible ? 1 : 0.25, y: visible ? 0 : 14 }}
      transition={{ duration: 0.55, delay: visible ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
