"use client";

import { motion } from "framer-motion";
import { orgHero } from "@/content/organization/orgData";
import { Button } from "@/components/ui/Button";
import { OrgBand } from "@/components/organization/OrgBand";
import { OrgNetworkVisual } from "@/components/organization/OrgNetworkVisual";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function OrgHero() {
  const reduced = useReducedMotion();
  const headlineLines = orgHero.headline.split("，");

  return (
    <OrgBand tone="dark" decor="hero" grid className="!pt-[88px] !pb-16 md:!pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl lg:max-w-none">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.2em] text-brand-400 uppercase"
          >
            {orgHero.label}
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 display-title text-white"
          >
            {orgHero.title}
          </motion.h1>

          <div className="mt-5 space-y-1">
            {headlineLines.map((line, i) => (
              <motion.p
                key={i}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 + i * 0.08 }}
                className="text-lg font-semibold leading-snug text-white/85 md:text-xl lg:text-2xl"
              >
                {line}
                {i < headlineLines.length - 1 ? "，" : ""}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.36 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/50"
          >
            {orgHero.subtitle}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.44 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href={orgHero.ctaPrimary.href} variant="primary">
              {orgHero.ctaPrimary.label}
            </Button>
            <Button href={orgHero.ctaSecondary.href} variant="secondary">
              {orgHero.ctaSecondary.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden h-[320px] lg:block xl:h-[360px]"
        >
          <OrgNetworkVisual />
        </motion.div>
      </div>
    </OrgBand>
  );
}
