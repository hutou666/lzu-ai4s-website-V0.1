import Image from "next/image";
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

function hueForRole(role: PersonRole) {
  const idx = ROLE_ORDER.indexOf(role);
  return PALETTES[idx >= 0 ? idx : 0];
}

function getInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0);
}

interface PersonProfileImageProps {
  name: string;
  role: PersonRole;
  avatar?: string;
  className?: string;
}

export function PersonProfileImage({ name, role, avatar, className = "" }: PersonProfileImageProps) {
  const palette = hueForRole(role);
  const hasCustomAvatar = Boolean(avatar && avatar.trim());

  if (!hasCustomAvatar) {
    return (
      <div
        className={`flex aspect-[3/4] w-full max-w-[280px] items-center justify-center rounded-2xl border border-border/80 text-5xl font-semibold ${className}`}
        style={{ backgroundColor: palette.bg, color: palette.text }}
        aria-hidden
      >
        {getInitial(name)}
      </div>
    );
  }

  return (
    <div className={`flex justify-center lg:justify-start ${className}`}>
      <div className="relative h-[min(420px,48vh)] w-full max-w-[280px] overflow-hidden rounded-2xl border border-border/80 bg-[linear-gradient(145deg,oklch(0.97_0.008_265),oklch(0.995_0_265))] p-1.5 shadow-md">
        <Image
          src={avatar!}
          alt={name}
          fill
          unoptimized
          className="object-contain"
          sizes="(max-width: 768px) 80vw, 320px"
          priority
        />
      </div>
    </div>
  );
}
