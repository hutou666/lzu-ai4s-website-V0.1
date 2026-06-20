"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { overviewData } from "@/content/overview";
import { getOverviewMilestones } from "@/content/overviewGalleryTimeline";
import { CountUp } from "@/components/ui/CountUp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { useScrollEffectsEnabled } from "@/hooks/useReducedMotion";
import {
  CARD_GAP,
  CARD_WIDTH,
  stripWidth,
  OverviewTimeline,
  TimelineGalleryCard,
  HistoryHeading,
} from "@/components/sections/overview/OverviewTimeline";

function useCardWidth() {
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH);

  useEffect(() => {
    const update = () => {
      const h = window.innerHeight;
      const reserved = 96 + 132 + 56 + 228 + 40;
      const maxByHeight = Math.floor((h - reserved) / 1.25);
      setCardWidth(Math.min(CARD_WIDTH, Math.max(184, maxByHeight)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cardWidth;
}

function usePanelTravel(count: number, cardWidth: number) {
  const [vw, setVw] = useState(1200);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const strip = stripWidth(count, cardWidth);
  const half = vw * 0.5;
  const panelW = strip + half + 48;
  const startX = 0;
  const endX = -(panelW - vw);
  return { startX, endX, panelW, half, vw };
}

function OverviewIntro({ visibility }: { visibility: MotionValue<"hidden" | "visible"> }) {
  const { membership, activityOverview, intro } = overviewData;

  const stats = [
    { value: membership.total, suffix: "人", label: "社团成员", desc: "覆盖全校多个学院" },
    { value: membership.undergrad.count, suffix: "人", label: "本科成员", desc: `${membership.undergrad.percent}%` },
    { value: membership.graduate.count, suffix: "人", label: "硕士及以上", desc: `${membership.graduate.percent}%` },
    { value: activityOverview.stats[0].value, suffix: "次", label: "本学年活动", desc: activityOverview.deadline },
    { value: 5000, suffix: "+", label: "累计参与", desc: "活动覆盖人次" },
  ];

  return (
    <motion.div className="w-full max-w-lg" style={{ visibility }}>
      <SectionLabel>Overview</SectionLabel>
      <h2 className="mt-3 section-title text-ink">社团概况</h2>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">{intro}</p>
      <div className="mt-8 grid grid-cols-2 gap-2.5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white p-3.5 text-center shadow-sm">
            <p className="text-xl font-semibold tabular-nums text-brand-700 md:text-2xl">
              <CountUp end={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-xs font-medium text-ink">{stat.label}</p>
            <p className="text-[10px] text-ink-muted">{stat.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ReducedGalleryCard({ src, caption, date }: { src: string; caption: string; date: string }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="relative aspect-[4/5] bg-surface-alt">
        {src ? (
          <Image src={src} alt={caption} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" unoptimized />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-muted">照片待补充</div>
        )}
      </div>
      <div className="border-t border-border/50 px-3 py-2.5">
        <p className="text-xs font-semibold tabular-nums text-brand-600">{date}</p>
        <p className="mt-1 text-xs text-ink-muted">{caption}</p>
      </div>
    </article>
  );
}

function ReducedOverview() {
  const { intro, membership, activityOverview } = overviewData;
  const items = useMemo(() => getOverviewMilestones(), []);

  const stats = [
    { value: membership.total, suffix: "人", label: "社团成员" },
    { value: membership.undergrad.count, suffix: "人", label: "本科成员" },
    { value: membership.graduate.count, suffix: "人", label: "硕士及以上" },
    { value: activityOverview.stats[0].value, suffix: "次", label: "本学年活动" },
  ];

  return (
    <section id="overview" className="section-padding relative overflow-hidden bg-gradient-to-b from-surface to-surface-alt">
      <SectionDecor variant="light" />
      <div className="container-wide space-y-10 sm:space-y-14">
        <div className="max-w-2xl">
          <SectionLabel>Overview</SectionLabel>
          <h2 className="mt-3 section-title text-ink">社团概况</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">{intro}</p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-white p-3 text-center shadow-sm">
                <p className="text-lg font-semibold tabular-nums text-brand-700 sm:text-xl">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[11px] font-medium text-ink sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <ReducedGalleryCard key={`${item.date}-${i}`} src={item.src} caption={item.caption} date={item.date} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClubOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef({ startX: 0, endX: -2000, panelW: 2000 });
  const scrollEffects = useScrollEffectsEnabled();
  const items = useMemo(() => getOverviewMilestones(), []);
  const count = items.length;
  const cardWidth = useCardWidth();
  const { startX, endX, panelW } = usePanelTravel(count, cardWidth);
  const stripW = stripWidth(count, cardWidth);

  useEffect(() => {
    travelRef.current = { startX, endX, panelW };
  }, [startX, endX, panelW]);

  const scrollHeightVh = 48 + Math.max(count, 1) * 34;

  const yearRange = useMemo(() => {
    if (items.length === 0) return "";
    const first = items[0].date.split(".")[0];
    const last = items[items.length - 1].date.split(".")[0];
    return first === last ? first : `${first}—${last.slice(2)}`;
  }, [items]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const introVisibility = useTransform(scrollYProgress, (p) => (p >= 0.98 ? "hidden" : "visible"));

  const panelX = useTransform(scrollYProgress, (p) => {
    const { startX: sx, endX: ex } = travelRef.current;
    if (p <= 0) return sx;
    if (p >= 0.98) return ex;
    const t = p / 0.98;
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    return sx + (ex - sx) * eased;
  });

  if (!scrollEffects) return <ReducedOverview />;

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative isolate bg-gradient-to-b from-surface to-surface-alt"
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <SectionDecor variant="light" />

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-1/2 px-6 md:px-10 lg:px-14">
            <OverviewIntro visibility={introVisibility} />
          </div>
        </div>

        <motion.div
          className="absolute inset-y-0 z-20 flex items-stretch bg-gradient-to-br from-surface-alt via-surface to-surface-alt shadow-[-12px_0_40px_rgba(15,23,42,0.08)]"
          style={{
            left: "50%",
            width: panelW,
            x: panelX,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.48 0.17 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.48 0.17 265) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-y-5 px-8 pb-6 pt-[88px] md:gap-y-6 md:px-10 md:pb-8 md:pt-[96px]">
            <div className="shrink-0" style={{ width: stripW }}>
              <HistoryHeading progress={scrollYProgress} yearRange={yearRange} />
            </div>

            <div className="flex min-h-0 items-center">
              <div className="flex items-stretch" style={{ gap: CARD_GAP }}>
                {items.map((item, i) => (
                  <TimelineGalleryCard
                    key={`${item.date}-${i}`}
                    item={item}
                    index={i}
                    count={count}
                    progress={scrollYProgress}
                    cardWidth={cardWidth}
                  />
                ))}
              </div>
            </div>

            <div className="shrink-0" style={{ width: stripW }}>
              <OverviewTimeline items={items} progress={scrollYProgress} cardWidth={cardWidth} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
