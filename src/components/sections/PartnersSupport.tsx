"use client";

import Image from "next/image";
import { partners, type Partner } from "@/content/partners";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionDecor } from "@/components/ui/SectionDecor";

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="partner-item group/item flex w-[9.75rem] shrink-0 flex-col items-center gap-3 sm:w-[10.75rem] md:w-[11.5rem]">
      <div className="flex h-[4.75rem] w-full items-center justify-center rounded-2xl border border-border/70 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:border-brand-300/40 group-hover/item:shadow-[0_12px_32px_rgba(37,99,235,0.08)] md:h-20 md:px-5">
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={partner.logoWidth ?? 168}
          height={partner.logoHeight ?? 52}
          unoptimized
          className="h-auto max-h-12 w-auto max-w-full object-contain opacity-90 transition-all duration-300 group-hover/item:max-h-[3.35rem] group-hover/item:opacity-100 md:max-h-14 md:group-hover/item:max-h-[3.75rem]"
        />
      </div>
      <p className="min-h-[2.5rem] w-full px-1 text-center text-[11px] leading-snug font-medium text-ink-muted transition-colors duration-300 group-hover/item:text-ink sm:text-xs md:min-h-[2.75rem]">
        {partner.name}
      </p>
    </article>
  );
}

interface MarqueeRowProps {
  items: Partner[];
  reverse?: boolean;
  duration?: number;
}

function MarqueeRow({ items, reverse = false, duration = 45 }: MarqueeRowProps) {
  const track = [...items, ...items];

  return (
    <div className="marquee-row group/row relative overflow-hidden py-1">
      <div
        className={`marquee-track flex w-max items-start gap-5 md:gap-7 ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((partner, i) => (
          <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

const rowA = partners.slice(0, 4);
const rowB = partners.slice(4);

export function PartnersSupport() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-gradient-to-b from-surface-alt via-white to-white section-padding"
    >
      <SectionDecor variant="light-alt" />

      <div className="container-wide relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Partners</SectionLabel>
          <h2 className="mt-3 section-title text-ink">合作与支持资源</h2>
          <p className="mt-3 text-sm text-ink-muted md:text-base">
            感谢以下单位与机构对社团发展的支持与协作
          </p>
        </div>

        <div className="relative mt-10 md:mt-12">
          {/* Desktop: single row */}
          <div className="marquee-pause relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
            <MarqueeRow items={partners} duration={55} />
          </div>

          {/* Mobile: two rows */}
          <div className="marquee-pause relative space-y-6 md:hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface-alt to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
            <MarqueeRow items={rowA} duration={42} />
            <MarqueeRow items={rowB} reverse duration={46} />
          </div>
        </div>
      </div>
    </section>
  );
}
