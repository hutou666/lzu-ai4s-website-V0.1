"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

export const CARD_WIDTH = 260;
export const CARD_GAP = 18;

export function stripWidth(count: number, cardWidth = CARD_WIDTH) {
  return count * cardWidth + Math.max(count - 1, 0) * CARD_GAP;
}

export interface GalleryTimelineItem {
  src: string;
  caption: string;
  date: string;
}

function cardRevealRange(index: number, count: number) {
  const seg = 0.98 / count;
  const start = index * seg;
  const peak = start + seg * 0.55;
  const end = start + seg * 0.95;
  return { start, peak, end };
}

export function HistoryHeading({
  progress,
  yearRange,
}: {
  progress: MotionValue<number>;
  yearRange: string;
}) {
  const opacity = useTransform(progress, (p) => {
    if (p < 0.04) return 0.35 + (p / 0.04) * 0.45;
    if (p < 0.14) return 0.8 + ((p - 0.04) / 0.1) * 0.2;
    return 1;
  });

  const y = useTransform(progress, (p) => {
    if (p < 0.14) return 20 * (1 - p / 0.14);
    return 0;
  });

  const lineWidth = useTransform(progress, (p) => {
    const t = Math.min(Math.max(p / 0.25, 0), 1);
    return `${t * 100}%`;
  });

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative border-b border-border/60 pb-5 md:pb-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-600">
            HISTORY
          </p>
          <h3 className="mt-2 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            发展历程
          </h3>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
            随滚动展开时间轴，浏览社团成长足迹。
          </p>
        </div>
        <p
          className="hidden shrink-0 text-right text-5xl font-semibold tabular-nums tracking-tight text-brand-600/15 md:block lg:text-6xl"
          aria-hidden
        >
          {yearRange}
        </p>
      </div>
      <div className="mt-6 h-0.5 w-full max-w-md overflow-hidden rounded-full bg-border/70">
        <motion.div
          className="h-full rounded-full bg-brand-600"
          style={{ width: lineWidth }}
        />
      </div>
    </motion.div>
  );
}

function TimelineNode({
  index,
  count,
  progress,
  date,
  caption,
  cardWidth = CARD_WIDTH,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  date: string;
  caption: string;
  cardWidth?: number;
}) {
  const { start, peak } = cardRevealRange(index, count);
  const isLast = index === count - 1;

  const dotScale = useTransform(progress, (p) => {
    if (p < start) return 0.85;
    if (p < peak) return 0.85 + ((p - start) / (peak - start)) * 0.2;
    return 1.1;
  });

  const labelOpacity = useTransform(progress, (p) => {
    if (p < start) return 0.25;
    if (p < peak) return 0.25 + ((p - start) / (peak - start)) * 0.75;
    return 1;
  });

  const ringOpacity = useTransform(progress, (p) => (p >= start && p < peak + 0.04 ? 1 : 0));

  const dotBg = useTransform(progress, (p) =>
    p >= start ? "oklch(0.48 0.17 265)" : "oklch(0.92 0.01 265)"
  );

  const [year, month] = date.includes(".") ? date.split(".") : [date, ""];

  return (
    <div
      className="relative shrink-0"
      style={{ width: cardWidth, marginRight: isLast ? 0 : CARD_GAP }}
    >
      <motion.div className="flex flex-col items-start" style={{ opacity: labelOpacity }}>
        <div className="relative flex h-12 w-full items-center justify-start pl-[7px]">
          <motion.div
            className="absolute -inset-1 rounded-full bg-brand-500/20"
            style={{ opacity: ringOpacity, scale: dotScale }}
            aria-hidden
          />
          <motion.div
            className="relative z-10 h-[18px] w-[18px] rounded-full ring-4 ring-white"
            style={{ scale: dotScale, backgroundColor: dotBg }}
          />
        </div>
        <div className="mt-4 w-full rounded-xl border border-border/60 bg-white px-4 py-3.5">
          <p className="flex items-baseline gap-0.5 tabular-nums">
            <span className="text-2xl font-semibold text-ink md:text-[1.65rem]">{year}</span>
            {month && (
              <span className="text-lg font-semibold text-brand-600 md:text-xl">.{month}</span>
            )}
          </p>
          <p className="mt-2 text-sm font-medium leading-snug text-ink md:text-base">{caption}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function OverviewTimeline({
  items,
  progress,
  cardWidth = CARD_WIDTH,
}: {
  items: GalleryTimelineItem[];
  progress: MotionValue<number>;
  cardWidth?: number;
}) {
  const count = items.length;
  const width = stripWidth(count, cardWidth);
  const firstYear = items[0]?.date.split(".")[0] ?? "";
  const lastYear = items[count - 1]?.date.split(".")[0] ?? "";

  const fillPct = useTransform(progress, (p) => {
    const t = Math.min(Math.max(p / 0.98, 0), 1);
    return `${t * 100}%`;
  });

  const glowOpacity = useTransform(progress, (p) => {
    const t = Math.min(p / 0.98, 1);
    return 0.15 + t * 0.3;
  });

  return (
    <div className="relative shrink-0 pt-2" style={{ width }}>
      <motion.div
        className="pointer-events-none absolute -top-4 left-1/4 h-16 w-48 rounded-full bg-brand-500/12 blur-2xl"
        style={{ opacity: glowOpacity }}
        aria-hidden
      />

      <div className="relative rounded-2xl border border-border/70 bg-white/80 px-6 py-7 backdrop-blur-sm md:px-8 md:py-8">
        <div className="flex items-center justify-between text-sm font-medium tabular-nums text-ink-muted">
          <span>{firstYear}</span>
          <span className="text-xs tracking-[0.12em] text-brand-600/80">GROWTH PATH</span>
          <span>{lastYear}</span>
        </div>

        <div className="relative mt-6 mb-1">
          <div className="relative h-2.5 overflow-hidden rounded-full bg-border/50">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-brand-600"
              style={{ width: fillPct }}
            />
          </div>
          <motion.div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white ring-[3px] ring-brand-600"
            style={{ left: fillPct, translateX: "-50%" }}
          />
        </div>

        <div className="mt-1 flex">
          {items.map((item, i) => (
            <TimelineNode
              key={`${item.date}-${i}`}
              index={i}
              count={count}
              progress={progress}
              date={item.date}
              caption={item.caption}
              cardWidth={cardWidth}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimelineGalleryCard({
  item,
  index,
  count,
  progress,
  cardWidth = CARD_WIDTH,
}: {
  item: GalleryTimelineItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
  cardWidth?: number;
}) {
  const { start, peak, end } = cardRevealRange(index, count);

  const opacity = useTransform(progress, (p) => {
    if (p < start) return 0.45;
    if (p < peak) return 0.45 + ((p - start) / (peak - start)) * 0.55;
    if (p < end) return 1;
    return 0.92;
  });

  const y = useTransform(progress, (p) => {
    if (p < start) return 12;
    if (p < peak) return 12 * (1 - (p - start) / (peak - start));
    return 0;
  });

  const borderColor = useTransform(progress, (p) =>
    p >= start && p < end + 0.02
      ? "oklch(0.48 0.17 265 / 0.5)"
      : "oklch(0.9 0.01 265 / 0.65)"
  );

  const isActive = useTransform(progress, (p) => p >= start && p < end + 0.02);
  const topBarOpacity = useTransform(isActive, (a) => (a ? 1 : 0));

  return (
    <motion.article
      className="relative shrink-0 overflow-hidden rounded-2xl border bg-white shadow-lg"
      style={{ width: cardWidth, opacity, y, borderColor }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-brand-600"
        style={{ opacity: topBarOpacity }}
        aria-hidden
      />
      <div className="relative aspect-[4/5] bg-surface-alt">
        {item.src ? (
          <Image
            src={item.src}
            alt={item.caption}
            fill
            className="object-cover"
            sizes="260px"
            unoptimized
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border bg-white text-ink-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" />
                <path d="M3 16l5-4 4 3 5-5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-xs text-ink-muted">照片待补充</p>
          </div>
        )}
      </div>
    </motion.article>
  );
}
