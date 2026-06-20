"use client";

import Image from "next/image";
import type { Cohort } from "@/content/organization/peopleData";

const GRADIENTS = [
  "from-brand-700/90 via-brand-800/75 to-deep/90",
  "from-lzu-purple/80 via-brand-800/70 to-deep/90",
  "from-accent-sky/70 via-brand-700/80 to-deep/90",
];

interface CohortCoverProps {
  cohort: Pick<Cohort, "number" | "label" | "coverImage" | "coverCaption">;
  className?: string;
  priority?: boolean;
  overlay?: "light" | "strong";
}

export function CohortCover({
  cohort,
  className = "",
  priority = false,
  overlay = "strong",
}: CohortCoverProps) {
  const hasImage = Boolean(cohort.coverImage?.trim());
  const gradient = GRADIENTS[(cohort.number - 1) % GRADIENTS.length];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasImage ? (
        <Image
          src={cohort.coverImage!}
          alt={cohort.coverCaption ?? `${cohort.label}合影`}
          fill
          priority={priority}
          unoptimized
          className="object-cover"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-6xl font-bold tracking-tight text-white/15 md:text-7xl">
              {String(cohort.number).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm font-medium text-white/70">{cohort.label}</p>
            <p className="mt-1 text-xs text-white/40">{cohort.coverCaption ?? "合影待补充"}</p>
          </div>
        </div>
      )}
      <div
        className={`pointer-events-none absolute inset-0 ${
          overlay === "strong"
            ? "bg-gradient-to-t from-black/70 via-black/20 to-black/10"
            : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
        }`}
        aria-hidden
      />
    </div>
  );
}
