"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  children: React.ReactNode;
}

export function FadeIn({ delay = 0, children, ...props }: FadeInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
