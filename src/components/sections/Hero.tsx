"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { getLatestNews } from "@/content/news";
import { Button } from "@/components/ui/Button";
import { AnimatedTextReveal } from "@/components/hero/AnimatedTextReveal";
import { HeroGeometry } from "@/components/hero/HeroGeometry";
import { HeroIntroOverlay } from "@/components/hero/HeroIntroOverlay";
import { EASE_OUT_EXPO } from "@/components/hero/heroIntroConfig";
import { useHeroIntroPlayed } from "@/hooks/useHeroIntroPlayed";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function Hero() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const latestNews = getLatestNews(1)[0];
  const {
    phase,
    isReady,
    showIntroOverlay,
    showHeroContent,
    useIntroSequence,
    usedIntroLayout,
    startHeroReveal,
    markIntroPlayed,
    skipIntro,
  } = useHeroIntroPlayed();

  const introStagger = useIntroSequence && !reduced;
  const defaultEnter = showHeroContent && !introStagger && !reduced;
  const geometryMode = phase === "done" ? "static" : "intro";
  const isIntroActive = phase === "intro" || phase === "revealing";

  return (
    <section className="relative min-h-screen overflow-hidden bg-deep pt-[72px]">
      <HeroGeometry
        mode={geometryMode}
        reduced={reduced}
        isMobile={isMobile}
        className="z-[8]"
      />

      {showHeroContent && (
        <div className="relative z-[12] container-wide flex min-h-[calc(100vh-72px)] flex-col justify-center py-16">
          {latestNews && (
            <motion.div
              className="hero-news-pill mb-10"
              initial={
                introStagger
                  ? { opacity: 0, x: -24 }
                  : defaultEnter
                    ? { opacity: 0, y: 16 }
                    : false
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                introStagger
                  ? { duration: 0.5, delay: 0.25, ease: EASE_OUT_EXPO }
                  : { duration: 0.6, delay: 0.1 }
              }
            >
              <Link
                href={`/news/${latestNews.slug}`}
                className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="shrink-0 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
                  {latestNews.category}
                </span>
                <span className="truncate">{latestNews.title}</span>
                <motion.span
                  className="shrink-0 text-white/40"
                  aria-hidden
                  animate={introStagger ? { x: [0, 3, 0] } : { x: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: introStagger ? 0.75 : 0,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          )}

          <div className="max-w-4xl">
            <motion.p
              className="hero-kicker mb-4 text-xs font-semibold tracking-[0.2em] text-brand-400 uppercase"
              initial={
                introStagger
                  ? { opacity: 0, y: 16 }
                  : defaultEnter
                    ? { opacity: 0, y: 32 }
                    : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                introStagger
                  ? { duration: 0.5, delay: 0.35, ease: EASE_OUT_EXPO }
                  : { duration: 0.8, ease: EASE_OUT_EXPO }
              }
            >
              {siteConfig.tagline}
            </motion.p>

            <h1 className="display-title text-white">
              {usedIntroLayout ? (
                <>
                  <AnimatedTextReveal
                    enabled={introStagger}
                    delay={0.45}
                    duration={0.75}
                    className="block"
                  >
                    探索人工智能
                  </AnimatedTextReveal>
                  <AnimatedTextReveal
                    enabled={introStagger}
                    delay={0.58}
                    duration={0.75}
                    className="block text-white/90"
                  >
                    与科学研究的交叉前沿
                  </AnimatedTextReveal>
                </>
              ) : (
                <>
                  探索人工智能
                  <br />
                  <span className="text-white/90">与科学研究的交叉前沿</span>
                </>
              )}
            </h1>

            <motion.p
              className="hero-subtitle mt-6 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl"
              initial={
                introStagger
                  ? { opacity: 0, y: 24 }
                  : defaultEnter
                    ? { opacity: 0, y: 32 }
                    : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={
                introStagger
                  ? { duration: 0.55, delay: 0.72, ease: EASE_OUT_EXPO }
                  : { duration: 0.8, ease: EASE_OUT_EXPO }
              }
            >
              {siteConfig.subtitle}。依托重点实验室资源，面向全校开展 AI 学习、科研训练与产教融合实践。
            </motion.p>

            <motion.div
              className="hero-buttons mt-10 flex flex-wrap gap-4"
              initial={false}
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: introStagger ? 0.12 : 0,
                    delayChildren: introStagger ? 0.82 : 0,
                  },
                },
              }}
            >
              <motion.div
                variants={
                  introStagger
                    ? {
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }
                    : undefined
                }
                initial={defaultEnter ? { opacity: 0, y: 32 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  introStagger
                    ? { duration: 0.5, ease: EASE_OUT_EXPO }
                    : { duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }
                }
              >
                <Button href="/about" variant="primary">
                  了解社团
                </Button>
              </motion.div>
              <motion.div
                variants={
                  introStagger
                    ? {
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }
                    : undefined
                }
                initial={defaultEnter ? { opacity: 0, y: 32 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  introStagger
                    ? { duration: 0.5, ease: EASE_OUT_EXPO }
                    : { duration: 0.8, delay: 0.25, ease: EASE_OUT_EXPO }
                }
              >
                <Button href="/activities" variant="secondary">
                  查看近期活动
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showIntroOverlay && isReady && (
          <HeroIntroOverlay
            isMobile={isMobile}
            onHeroRevealStart={startHeroReveal}
            onComplete={markIntroPlayed}
            onSkip={skipIntro}
          />
        )}
      </AnimatePresence>

      {/* intro 期间占位，避免布局跳动 */}
      {!showHeroContent && isIntroActive && (
        <div
          className="relative z-[12] container-wide min-h-[calc(100vh-72px)] py-16"
          aria-hidden
        />
      )}
    </section>
  );
}
