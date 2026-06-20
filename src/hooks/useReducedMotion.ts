"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const SIMPLE_MOTION_QUERIES = [
  "(prefers-reduced-motion: reduce)",
  "(max-width: 1023px)",
  "(pointer: coarse)",
] as const;

function getSimpleMotionSnapshot(): boolean {
  return SIMPLE_MOTION_QUERIES.some((query) => window.matchMedia(query).matches);
}

function subscribeSimpleMotion(onStoreChange: () => void): () => void {
  const media = SIMPLE_MOTION_QUERIES.map((query) => window.matchMedia(query));
  media.forEach((mq) => mq.addEventListener("change", onStoreChange));
  return () => media.forEach((mq) => mq.removeEventListener("change", onStoreChange));
}

/** 减少动效：系统偏好、窄屏、触控设备均走静态/简化布局 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeSimpleMotion, getSimpleMotionSnapshot, () => true);
}

/** 滚动驱动动效仅在桌面端、挂载后启用，避免 hydration 不一致与移动端内容被 opacity 锁住 */
export function useScrollEffectsEnabled(): boolean {
  const simple = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && !simple;
}
