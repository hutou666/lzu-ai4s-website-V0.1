export function mergeSlotMedia<T extends Record<string, object>>(
  base: T,
  sources: Partial<Record<keyof T, string>>
): { [K in keyof T]: T[K] & { src?: string } } {
  return Object.fromEntries(
    Object.entries(base).map(([key, config]) => {
      const src = sources[key as keyof T];
      return [key, { ...(config as object), ...(src ? { src } : {}) }];
    })
  ) as { [K in keyof T]: T[K] & { src?: string } };
}
