"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import type { PersonRole } from "@/content/organization/people-types";
import { isAllRoleFilter, ROLE_FILTERS } from "@/content/organization/people-types";

const ROLE_ORDER = ROLE_FILTERS.filter((r): r is PersonRole => !isAllRoleFilter(r));

const PALETTES = [
  { bg: "oklch(0.55 0.17 265 / 0.14)", text: "oklch(0.42 0.17 265)" },
  { bg: "oklch(0.48 0.17 265 / 0.16)", text: "oklch(0.38 0.17 265)" },
  { bg: "oklch(0.62 0.15 235 / 0.14)", text: "oklch(0.45 0.15 235)" },
  { bg: "oklch(0.65 0.12 200 / 0.16)", text: "oklch(0.42 0.12 200)" },
  { bg: "oklch(0.78 0.1 175 / 0.18)", text: "oklch(0.42 0.1 175)" },
  { bg: "oklch(0.55 0.03 265 / 0.1)", text: "oklch(0.45 0.04 265)" },
];

type PhotoFit = "portrait" | "landscape" | "square";

function hueForRole(role: PersonRole) {
  const idx = ROLE_ORDER.indexOf(role);
  return PALETTES[idx >= 0 ? idx : 0];
}

function getInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0);
}

/** 竖版 / 正方形为主；横版保留兼容 */
function classifyPhotoFit(width: number, height: number): PhotoFit {
  if (!width || !height) return "portrait";
  const ratio = width / height;
  if (ratio > 1.12) return "landscape";
  if (ratio < 0.92) return "portrait";
  return "square";
}

const PHOTO_WELL =
  "overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(145deg,oklch(0.97_0.008_265),oklch(0.995_0_265))]";

const squareSizeMap = {
  sm: "h-14 w-14 text-lg rounded-xl",
  md: "h-20 w-20 text-2xl rounded-2xl",
  lg: "h-36 w-36 text-4xl rounded-2xl",
};

/** 名录缩略图：外层槽位固定，内框按竖版 / 正方形放大展示 */
const adaptiveInnerFrame: Record<PhotoFit, Record<"thumb" | "profile", string>> = {
  portrait: {
    thumb: "relative h-[5.5rem] w-[4.125rem]",
    profile: "relative h-[min(420px,48vh)] w-full max-w-[280px]",
  },
  square: {
    thumb: "relative h-[5.25rem] w-[5.25rem]",
    profile: "relative aspect-square w-full max-w-[320px]",
  },
  landscape: {
    thumb: "relative h-[3.85rem] w-[5.25rem]",
    profile: "relative h-[min(220px,28vh)] w-full max-w-[340px]",
  },
};

const placeholderFrame: Record<"thumb" | "profile", string> = {
  thumb:
    "flex h-[5.5rem] w-[4.125rem] shrink-0 items-center justify-center rounded-xl border border-border/80 text-xl font-semibold",
  profile:
    "flex aspect-[3/4] w-full max-w-[280px] items-center justify-center rounded-2xl border border-border/80 text-5xl font-semibold",
};

interface PersonAvatarProps {
  name: string;
  role: PersonRole;
  avatar?: string;
  size?: "sm" | "md" | "lg" | "thumb" | "profile";
  className?: string;
}

function applyFitFromImage(img: HTMLImageElement, setFit: (fit: PhotoFit) => void) {
  if (img.naturalWidth > 0 && img.naturalHeight > 0) {
    setFit(classifyPhotoFit(img.naturalWidth, img.naturalHeight));
  }
}

function AdaptivePhoto({
  name,
  avatar,
  slot,
  className = "",
}: {
  name: string;
  avatar: string;
  slot: "thumb" | "profile";
  className?: string;
}) {
  const [fit, setFit] = useState<PhotoFit>("portrait");

  useEffect(() => {
    setFit("portrait");
  }, [avatar]);

  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      applyFitFromImage(e.currentTarget, setFit);
    },
    []
  );

  const inner = adaptiveInnerFrame[fit][slot];
  const sizes = slot === "thumb" ? "88px" : "(max-width: 768px) 80vw, 320px";
  const wellPadding = slot === "thumb" ? "p-0.5" : "p-1.5";
  const wellRadius = slot === "profile" ? "rounded-2xl" : "rounded-xl";

  const image = (
    <Image
      src={avatar}
      alt={name}
      fill
      unoptimized
      className="object-contain"
      sizes={sizes}
      onLoad={onImageLoad}
    />
  );

  if (slot === "thumb") {
    return (
      <div
        className={`flex h-[5.75rem] w-[5.75rem] shrink-0 items-center justify-center ${className}`}
      >
        <div
          className={`${inner} ${PHOTO_WELL} ${wellPadding} ${wellRadius} shadow-sm transition-[width,height] duration-200`}
        >
          {image}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center lg:justify-start ${className}`}>
      <div
        className={`${inner} ${PHOTO_WELL} ${wellPadding} ${wellRadius} shadow-md transition-[width,height] duration-200`}
      >
        {image}
      </div>
    </div>
  );
}

export function PersonAvatar({
  name,
  role,
  avatar,
  size = "sm",
  className = "",
}: PersonAvatarProps) {
  const palette = hueForRole(role);
  const hasCustomAvatar = Boolean(avatar && avatar.trim());

  if (size === "thumb" || size === "profile") {
    if (hasCustomAvatar) {
      return <AdaptivePhoto name={name} avatar={avatar!} slot={size} className={className} />;
    }

    return (
      <div
        className={`${placeholderFrame[size]} ${size === "profile" ? "mx-auto lg:mx-0" : ""} ${className}`}
        style={{ backgroundColor: palette.bg, color: palette.text }}
        aria-hidden
      >
        {getInitial(name)}
      </div>
    );
  }

  const box = squareSizeMap[size];

  if (hasCustomAvatar) {
    return (
      <div className={`relative overflow-hidden border border-border bg-surface-alt ${box} ${className}`}>
        <Image src={avatar!} alt={name} fill unoptimized className="object-cover" sizes="96px" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center border border-border/80 font-semibold ${box} ${className}`}
      style={{ backgroundColor: palette.bg, color: palette.text }}
      aria-hidden
    >
      {getInitial(name)}
    </div>
  );
}
