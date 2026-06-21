"use client";

import Image from "next/image";

export interface AboutImageConfig {
  id: string;
  label: string;
  alt: string;
  caption?: string;
  /** 放入 public 下的图片路径，如 /assets/about/hero.jpg */
  src?: string;
  aspect?: string;
}

interface AboutImageSlotProps {
  image: AboutImageConfig;
  dark?: boolean;
  className?: string;
  priority?: boolean;
}

export function AboutImageSlot({
  image,
  dark = false,
  className = "",
  priority = false,
}: AboutImageSlotProps) {
  const aspect = image.aspect ?? "aspect-[16/10]";

  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-2xl border ${
          dark ? "border-white/12 bg-white/[0.03]" : "border-border bg-surface-alt"
        } ${aspect}`}
      >
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            unoptimized
            className="object-cover"
          />
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${
              dark
                ? "bg-gradient-to-br from-white/[0.06] via-brand-900/20 to-white/[0.02]"
                : "bg-gradient-to-br from-brand-50/80 via-white to-surface-alt"
            }`}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                dark ? "bg-white/10 text-white/50" : "bg-white text-brand-600/70 shadow-sm"
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
                <path
                  d="M3 16l4.5-4.5 3 3L14 11l7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className={`text-sm font-medium ${dark ? "text-white/70" : "text-ink"}`}
            >
              {image.label}
            </p>
            <p className={`mt-1 text-xs ${dark ? "text-white/35" : "text-ink-muted"}`}>
              待补充照片
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}
