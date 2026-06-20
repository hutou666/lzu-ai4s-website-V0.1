"use client";

import Link from "next/link";
import { motion, type MotionValue, useTransform } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  highlight?: boolean;
}

interface StorySlideProps {
  label: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  stats: StatItem[];
  index: number;
  total: number;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  visual: React.ReactNode;
  extra?: React.ReactNode;
  visualClassName?: string;
}

export function StorySlide({
  label,
  title,
  description,
  cta,
  stats,
  index,
  total,
  opacity,
  y,
  visual,
  extra,
  visualClassName = "h-[min(58vh,460px)]",
}: StorySlideProps) {
  const visibility = useTransform(opacity, (o) => (o < 0.02 ? "hidden" : "visible"));
  const pointerEvents = useTransform(opacity, (o) => (o < 0.5 ? "none" : "auto"));
  const zIndex = useTransform(opacity, (o) => Math.round(o * 100));

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity, y, visibility, pointerEvents, zIndex }}
    >
      <div className="container-wide grid w-full items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 xl:gap-16">
        <div className="flex flex-col justify-center">
          <p className="story-label">{label}</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base xl:text-lg">{description}</p>
          {extra}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border backdrop-blur-sm ${
                  s.highlight
                    ? "col-span-1 border-accent-sky/30 bg-accent-sky/10 px-5 py-4 sm:min-w-[120px]"
                    : "border-white/10 bg-white/5 px-4 py-3.5"
                }`}
              >
                <p
                  className={`font-semibold tabular-nums text-white ${
                    s.highlight
                      ? "text-3xl leading-none sm:text-4xl md:text-5xl xl:text-6xl"
                      : "text-xl sm:text-2xl md:text-3xl xl:text-4xl"
                  }`}
                >
                  {s.value}
                  {s.suffix && (
                    <span className={s.highlight ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}>{s.suffix}</span>
                  )}
                </p>
                <p className={`mt-1.5 text-white/50 ${s.highlight ? "text-xs font-medium" : "text-[11px]"}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href={cta.href} className="story-cta group">
              <span>{cta.label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <p className="story-pagination mt-8">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div className={`min-h-0 w-full overflow-hidden ${visualClassName}`}>{visual}</div>
      </div>
    </motion.div>
  );
}

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-sm ${
        stat.highlight
          ? "border-accent-sky/30 bg-accent-sky/10 px-5 py-4"
          : "border-white/10 bg-white/5 px-4 py-3.5"
      }`}
    >
      <p
        className={`font-semibold tabular-nums text-white ${
          stat.highlight ? "text-4xl leading-none" : "text-2xl"
        }`}
      >
        {stat.value}
        {stat.suffix && <span className={stat.highlight ? "text-2xl" : "text-lg"}>{stat.suffix}</span>}
      </p>
      <p className={`mt-1.5 text-white/50 ${stat.highlight ? "text-xs font-medium" : "text-[11px]"}`}>
        {stat.label}
      </p>
    </div>
  );
}

export { StatCard, type StatItem };
