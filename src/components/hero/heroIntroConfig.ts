export const HERO_INTRO_STORAGE_KEY = "ai4sHeroIntroPlayed";

/** 是否启用首页 Hero 品牌前奏动画 */
export const ENABLE_HERO_INTRO = true;

/** 开发环境下每次刷新是否重播（忽略 localStorage） */
export const REPLAY_INTRO_IN_DEV = true;

export type HeroIntroPhase = "idle" | "intro" | "revealing" | "done";

/** 桌面端时间线（秒） */
export const DESKTOP_TIMELINE = {
  bgFade: 0,
  /** 几何图形开始依次入场 */
  geoStart: 0.15,
  geoStagger: 0.12,
  titleReveal: 0.3,
  titleHold: 1.1,
  titleExit: 1.6,
  heroReveal: 2.0,
  complete: 3.4,
} as const;

/** 移动端简化时间线（秒） */
export const MOBILE_TIMELINE = {
  bgFade: 0,
  geoStart: 0.12,
  geoStagger: 0.1,
  titleReveal: 0.25,
  titleHold: 0.9,
  titleExit: 1.3,
  heroReveal: 1.7,
  complete: 2.6,
} as const;

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
