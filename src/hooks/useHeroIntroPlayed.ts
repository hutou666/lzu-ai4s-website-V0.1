"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ENABLE_HERO_INTRO,
  HERO_INTRO_STORAGE_KEY,
  REPLAY_INTRO_IN_DEV,
  type HeroIntroPhase,
} from "@/components/hero/heroIntroConfig";

export function useHeroIntroPlayed() {
  const [phase, setPhase] = useState<HeroIntroPhase>("idle");
  const [isReady, setIsReady] = useState(false);
  const [usedIntroLayout, setUsedIntroLayout] = useState(false);

  useEffect(() => {
    if (!ENABLE_HERO_INTRO) {
      setPhase("done");
      setIsReady(true);
      return;
    }

    try {
      const played = localStorage.getItem(HERO_INTRO_STORAGE_KEY);
      const replayInDev =
        process.env.NODE_ENV === "development" && REPLAY_INTRO_IN_DEV;

      if (played === "true" && !replayInDev) {
        setPhase("done");
      } else {
        setPhase("intro");
      }
    } catch {
      setPhase("done");
    }

    setIsReady(true);
  }, []);

  const markIntroPlayed = useCallback(() => {
    try {
      localStorage.setItem(HERO_INTRO_STORAGE_KEY, "true");
    } catch {
      // ignore storage failures
    }
    setPhase("done");
  }, []);

  const startHeroReveal = useCallback(() => {
    setUsedIntroLayout(true);
    setPhase((current) => (current === "intro" ? "revealing" : current));
  }, []);

  const skipIntro = useCallback(() => {
    markIntroPlayed();
  }, [markIntroPlayed]);

  return {
    phase,
    isReady,
    showIntroOverlay: phase === "intro",
    showHeroContent: isReady && phase !== "intro",
    useIntroSequence: phase === "revealing",
    usedIntroLayout,
    markIntroPlayed,
    startHeroReveal,
    skipIntro,
  };
}
