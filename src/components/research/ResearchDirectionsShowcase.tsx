"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  researchGroupsData,
  researchGroupsSection,
} from "@/content/organization/researchGroupsData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";

const COUNT = researchGroupsData.length;
const SEG = 1 / COUNT;

function GroupCard({ group }: { group: (typeof researchGroupsData)[number] }) {
  return (
    <article className="glass-card-dark relative overflow-hidden rounded-3xl p-7 md:p-9">
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-600/10 blur-2xl" />
      <svg className="pointer-events-none absolute bottom-8 right-8 h-24 w-24 opacity-[0.06]" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(0.55 0.19 265)" strokeWidth="4" strokeDasharray="60 180" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="oklch(0.62 0.18 235)" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="oklch(0.78 0.12 175)" strokeWidth="2" strokeOpacity="0.5" />
      </svg>

      <p className="text-xs font-semibold tracking-[0.15em] text-brand-400">{group.enLabel}</p>
      <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{group.name}</h3>
      <p className="mt-1 text-xs text-white/40">{group.partner}</p>
      <p className="mt-4 text-sm leading-relaxed text-white/50">{group.description}</p>

      <ul className="mt-4 space-y-1.5">
        {group.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-xs text-white/55">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-mint" />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/45"
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
          <div key={item.label} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
            <p className="text-[10px] font-semibold tracking-wider text-white/35 uppercase">
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/55">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button href={group.projectLink} variant="secondary" className="!px-5 !py-2.5 !text-xs">
          查看项目详情
        </Button>
      </div>
    </article>
  );
}

function PinnedGroups() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      id="research-directions"
      ref={ref}
      className="relative scroll-mt-[72px] bg-deep-elevated"
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-wide flex h-full items-center py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="lg:py-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 uppercase">
                Research Directions
              </p>
              <h2 className="mt-3 section-title text-white">{researchGroupsSection.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50 md:text-base">
                {researchGroupsSection.subtitle}
              </p>
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
    return dist < 1 ? "oklch(0.62 0.18 235)" : "oklch(1 0 0 / 0.15)";
  });

  return <motion.div className="h-1.5 rounded-full" style={{ width, backgroundColor: bg }} />;
}

function StackedGroups() {
  return (
    <section id="research-directions" className="scroll-mt-[72px] bg-deep-elevated section-padding">
      <div className="container-wide">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 uppercase">
          Research Directions
        </p>
        <h2 className="mt-3 section-title text-white">{researchGroupsSection.title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
          {researchGroupsSection.subtitle}
        </p>
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
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduced || isMobile) return <StackedGroups />;
  return <PinnedGroups />;
}
