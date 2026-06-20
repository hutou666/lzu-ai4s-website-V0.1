"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import { storySlides } from "@/content/story";
import { useScrollEffectsEnabled } from "@/hooks/useReducedMotion";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { StorySlide, StatCard } from "./story/StorySlide";
import { MembersVisual, ActivitiesVisual, ProjectsVisual } from "./story/StoryVisuals";

const SLIDE_COUNT = storySlides.length;
const SEG = 1 / SLIDE_COUNT;

const visualHeights = [
  "h-[min(52vh,420px)] sm:h-[min(58vh,480px)] xl:h-[min(64vh,560px)]",
  "h-auto self-center",
  "h-[min(52vh,420px)] sm:h-[min(58vh,480px)] xl:h-[min(64vh,560px)]",
];

const visuals = [MembersVisual, ActivitiesVisual, ProjectsVisual] as const;

function useSlideMotion(scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"], index: number) {
  const center = (index + 0.5) * SEG;
  const halfWidth = SEG / 2;

  const opacity = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - center) / halfWidth;
    if (dist >= 1) return 0;
    return Math.cos((dist * Math.PI) / 2);
  });

  const y = useTransform(scrollYProgress, (p) => {
    const dist = Math.abs(p - center) / halfWidth;
    if (dist >= 1) return 0;
    const sign = p < center ? 1 : -1;
    return sign * dist * 56;
  });

  return { opacity, y };
}

function StoryProgressDot({ index, activeIndex }: { index: number; activeIndex: MotionValue<number> }) {
  const width = useTransform(activeIndex, (idx) => (idx === index ? 28 : 8));
  const backgroundColor = useTransform(activeIndex, (idx) =>
    idx === index ? "oklch(0.62 0.18 235)" : "oklch(1 0 0 / 0.2)"
  );

  return <motion.div className="h-1.5 rounded-full" style={{ width, backgroundColor }} />;
}

function StoryProgressDots({ activeIndex }: { activeIndex: MotionValue<number> }) {
  return (
    <div className="absolute bottom-8 right-5 z-[200] flex gap-2 md:right-8 lg:right-12" aria-hidden>
      <StoryProgressDot index={0} activeIndex={activeIndex} />
      <StoryProgressDot index={1} activeIndex={activeIndex} />
      <StoryProgressDot index={2} activeIndex={activeIndex} />
    </div>
  );
}

function ReducedStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-story">
      <SectionDecor variant="dark" />
      {storySlides.map((slide, i) => {
        const Visual = visuals[i];
        return (
          <div key={slide.id} className="flex min-h-0 items-center py-10 section-padding sm:min-h-screen sm:py-0">
            <div className="container-wide grid w-full items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 xl:gap-16">
              <div>
                <p className="story-label">{slide.label}</p>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base xl:text-lg">{slide.description}</p>
                {"deadline" in slide && slide.deadline && (
                  <p className="mt-2 text-xs text-white/35">数据截至 {slide.deadline}</p>
                )}
                <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                  {slide.stats.map((s) => (
                    <StatCard key={s.label} stat={s} />
                  ))}
                </div>
                <Link href={slide.cta.href} className="story-cta mt-8 inline-flex">
                  {slide.cta.label}
                </Link>
                <p className="story-pagination mt-8">
                  {String(i + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
                </p>
              </div>
              <div className={`min-h-0 overflow-hidden ${visualHeights[i]}`}>
                <Visual />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollEffects = useScrollEffectsEnabled();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const slide0 = useSlideMotion(scrollYProgress, 0);
  const slide1 = useSlideMotion(scrollYProgress, 1);
  const slide2 = useSlideMotion(scrollYProgress, 2);
  const motions = [slide0, slide1, slide2];

  const activeIndex = useTransform(scrollYProgress, (p): number => {
    if (p < SEG * 0.5) return 0;
    if (p < SEG * 1.5) return 1;
    return 2;
  });

  if (!scrollEffects) {
    return <ReducedStory />;
  }

  return (
    <section id="story" ref={containerRef} className="relative bg-story" style={{ height: `${SLIDE_COUNT * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <SectionDecor variant="dark" />

        <StoryProgressDots activeIndex={activeIndex} />

        {storySlides.map((slide, i) => {
          const { opacity, y } = motions[i];
          const Visual = visuals[i];
          return (
            <StorySlide
              key={slide.id}
              label={slide.label}
              title={slide.title}
              description={slide.description}
              cta={slide.cta}
              stats={[...slide.stats]}
              index={i}
              total={SLIDE_COUNT}
              opacity={opacity}
              y={y}
              visual={<Visual />}
              visualClassName={visualHeights[i]}
              extra={
                "deadline" in slide && slide.deadline ? (
                  <p className="mt-2 text-xs text-white/35">数据截至 {slide.deadline}</p>
                ) : undefined
              }
            />
          );
        })}
      </div>
    </section>
  );
}
