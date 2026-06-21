"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  researchGroupsData,
  researchGroupsSection,
} from "@/content/organization/researchGroupsData";
import { useReducedMotion, useScrollEffectsEnabled } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { SectionLabel } from "@/components/ui/SectionLabel";

const COUNT = researchGroupsData.length;
const SEG = 1 / COUNT;

function GroupCard({ group }: { group: (typeof researchGroupsData)[number] }) {
  return (
    <article className="card-hover relative overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-9">
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-600/8 blur-2xl" />
      <svg
        className="pointer-events-none absolute bottom-8 right-8 h-24 w-24 text-brand-600 opacity-[0.07]"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="60 180" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      </svg>

      <p className="text-xs font-semibold tracking-[0.15em] text-brand-600">{group.enLabel}</p>
      <h3 className="mt-2 text-xl font-semibold text-ink md:text-2xl">{group.name}</h3>
      <p className="mt-1 text-xs text-ink-muted">{group.partner}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{group.description}</p>

      <ul className="mt-4 space-y-1.5">
        {group.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-xs text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-full border border-border bg-surface-alt px-2.5 py-0.5 text-[11px] text-ink-muted"
          >
            {kw}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { label: "研究方向", value: group.researchDirection },
          { label: "当前任务", value: group.currentTasks },
          { label: "适合成员", value: group.suitableMembers },
          { label: "负责人", value: group.leaderPlaceholder },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border/80 bg-surface-alt/80 p-3">
            <p className="text-[10px] font-semibold tracking-wider text-brand-600 uppercase">
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button href={group.projectLink} variant="primary" className="!px-5 !py-2.5 !text-xs">
          查看项目详情
        </Button>
      </div>
    </article>
  );
}

function DirectionsIntro() {
  return (
    <>
      <SectionLabel>Research Directions</SectionLabel>
      <h2 className="mt-3 section-title text-ink">{researchGroupsSection.title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
        {researchGroupsSection.subtitle}
      </p>
    </>
  );
}

function PinnedGroups() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      id="research-directions"
      ref={ref}
      className="relative scroll-mt-[72px] bg-gradient-to-b from-white to-surface-alt"
      style={{ height: `${COUNT * 100}vh` }}
    >
      <SectionDecor variant="light" />
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-wide relative flex h-full items-center py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:py-8">
              <DirectionsIntro />
              <div className="mt-8 hidden gap-2 lg:flex">
                {researchGroupsData.map((g, i) => (
                  <ProgressDot key={g.id} index={i} progress={scrollYProgress} />
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] lg:min-h-[480px]">
              {researchGroupsData.map((group, i) => (
                <GroupSlide key={group.id} index={i} progress={scrollYProgress}>
                  <GroupCard group={group} />
                </GroupSlide>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupSlide({
  index,
  progress,
  children,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  children: React.ReactNode;
}) {
  const center = (index + 0.5) * SEG;
  const half = SEG / 2;
  const opacity = useTransform(progress, (p) => {
    const dist = Math.abs(p - center) / half;
    if (dist >= 1) return 0;
    return Math.cos((dist * Math.PI) / 2);
  });
  const y = useTransform(progress, (p) => {
    const dist = Math.abs(p - center) / half;
    if (dist >= 1) return 0;
    return (p < center ? 1 : -1) * dist * 40;
  });

  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function ProgressDot({
  index,
  progress,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const width = useTransform(progress, (p) => {
    const center = (index + 0.5) * SEG;
    const dist = Math.abs(p - center) / (SEG / 2);
    return dist < 1 ? 24 : 8;
  });
  const bg = useTransform(progress, (p) => {
    const center = (index + 0.5) * SEG;
    const dist = Math.abs(p - center) / (SEG / 2);
    return dist < 1 ? "oklch(0.48 0.17 265)" : "oklch(0.48 0.17 265 / 0.2)";
  });

  return <motion.div className="h-1.5 rounded-full" style={{ width, backgroundColor: bg }} />;
}

function StackedGroups() {
  return (
    <section
      id="research-directions"
      className="relative scroll-mt-[72px] overflow-hidden bg-gradient-to-b from-white to-surface-alt section-padding"
    >
      <SectionDecor variant="light" />
      <div className="container-wide relative">
        <DirectionsIntro />
        <div className="mt-10 space-y-6">
          {researchGroupsData.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResearchDirectionsShowcase() {
  const scrollEffects = useScrollEffectsEnabled();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!scrollEffects || isMobile) return <StackedGroups />;
  return <PinnedGroups />;
}
