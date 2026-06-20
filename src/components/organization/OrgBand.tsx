"use client";

import { useId, type ReactNode } from "react";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { DarkGeoDecor } from "@/components/ui/DarkGeoDecor";

export type OrgBandTone = "dark" | "light";

function GridOverlay({ tone }: { tone: OrgBandTone }) {
  const id = useId();
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${
        tone === "dark" ? "text-white opacity-[0.035]" : "text-brand-600 opacity-[0.06]"
      }`}
      aria-hidden
    >
      <defs>
        <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const decorMap = {
  light: <SectionDecor variant="light" />,
  "light-alt": <SectionDecor variant="light-alt" />,
  dark: <SectionDecor variant="dark" />,
  "dark-deep": <SectionDecor variant="dark-deep" />,
  hero: <DarkGeoDecor variant="hero" />,
  minimal: <DarkGeoDecor variant="minimal" />,
} as const;

export function OrgBand({
  tone,
  decor = tone === "dark" ? "dark" : "light",
  grid = false,
  id,
  children,
  className = "",
}: {
  tone: OrgBandTone;
  decor?: keyof typeof decorMap;
  grid?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden section-padding scroll-mt-20 ${
        tone === "dark"
          ? "bg-deep"
          : "bg-gradient-to-b from-white to-surface-alt"
      } ${className}`}
    >
      {grid && <GridOverlay tone={tone} />}
      {decorMap[decor]}
      <div className="container-wide relative">{children}</div>
    </section>
  );
}

export function OrgSectionHeading({
  title,
  subtitle,
  label,
  tone,
  className = "",
}: {
  title: string;
  subtitle?: string;
  label?: string;
  tone: OrgBandTone;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${className}`}>
      {label && (
        <p
          className={`text-xs font-semibold tracking-[0.2em] uppercase ${
            dark ? "text-brand-400" : "text-brand-600"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`${label ? "mt-3" : ""} section-title text-balance ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            dark ? "text-white/50" : "text-ink-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
