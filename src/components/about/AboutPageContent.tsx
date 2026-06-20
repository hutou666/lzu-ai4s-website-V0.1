"use client";

import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";
import { aboutPage, aboutPageMedia } from "@/content/about";
import { AboutImageSlot } from "@/components/about/AboutImageSlot";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DarkGeoDecor } from "@/components/ui/DarkGeoDecor";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { AboutImageConfig } from "@/components/about/AboutImageSlot";

type BandTone = "dark" | "light";

function GridOverlay({ tone }: { tone: BandTone }) {
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

function AboutBand({
  tone,
  decor,
  grid = false,
  id,
  children,
  className = "",
}: {
  tone: BandTone;
  decor?: ReactNode;
  grid?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden section-padding scroll-mt-20 ${
        tone === "dark" ? "bg-deep" : "bg-gradient-to-b from-white to-surface-alt"
      } ${className}`}
    >
      {grid && <GridOverlay tone={tone} />}
      {decor}
      <div className="container-wide relative">{children}</div>
    </section>
  );
}

function Prose({ children, dark = true }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`space-y-4 text-base leading-[1.85] md:text-[17px] ${
        dark ? "text-white/58" : "text-ink-muted"
      }`}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
  dark = true,
  className = "",
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl mb-6 md:mb-8 ${className}`}>
      <h2 className={`section-title text-balance ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base leading-relaxed md:mt-4 ${
            dark ? "text-white/50" : "text-ink-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function TextWithImageBelow({
  title,
  subtitle,
  paragraphs,
  image,
  dark = true,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  paragraphs: readonly string[];
  image: AboutImageConfig;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <SectionHeading title={title} subtitle={subtitle} dark={dark} />
      <Prose dark={dark}>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 12)}>{p}</p>
        ))}
      </Prose>
      <AboutImageSlot image={image} dark={dark} className="mt-8 md:mt-10" />
    </FadeIn>
  );
}

function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-deep pt-[88px] pb-14 md:pb-16">
      <DarkGeoDecor variant="hero" />
      <GridOverlay tone="dark" />

      <div className="container-wide relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-400">
            {aboutPage.label}
          </p>
          <h1 className="mt-4 display-title text-white">{aboutPage.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">{aboutPage.lead}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {aboutPage.values.map((v) => (
              <span
                key={v}
                className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/70"
              >
                {v}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutIntro() {
  const intro = aboutPage.sections.find((s) => s.id === "intro")!;

  return (
    <AboutBand tone="light" decor={<SectionDecor variant="light" />} grid>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        <FadeIn>
          <SectionLabel>Introduction</SectionLabel>
          <SectionHeading title={intro.title} dark={false} className="mt-3 !mb-0" />
          <Prose dark={false}>
            {intro.paragraphs.map((p) => (
              <p key={p.slice(0, 12)}>{p}</p>
            ))}
          </Prose>
        </FadeIn>

        <FadeIn delay={0.08}>
          <AboutImageSlot
            image={aboutPageMedia.intro}
            className="lg:sticky lg:top-24"
          />
        </FadeIn>
      </div>
    </AboutBand>
  );
}

function AboutAffiliationPhilosophy() {
  const affiliation = aboutPage.sections.find((s) => s.id === "affiliation")!;
  const philosophy = aboutPage.sections.find((s) => s.id === "philosophy")!;

  return (
    <AboutBand tone="dark" decor={<SectionDecor variant="dark" />} grid>
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <TextWithImageBelow
          title={affiliation.title}
          paragraphs={affiliation.paragraphs}
          image={aboutPageMedia.affiliation}
          dark
        />
        <TextWithImageBelow
          title={philosophy.title}
          paragraphs={philosophy.paragraphs}
          image={aboutPageMedia.philosophy}
          dark
          delay={0.08}
        />
      </div>
    </AboutBand>
  );
}

function AboutDirections() {
  const directions = aboutPage.sections.find((s) => s.id === "directions")!;
  if (!("items" in directions)) return null;

  return (
    <AboutBand tone="light" decor={<SectionDecor variant="light-alt" />}>
      <FadeIn>
        <SectionLabel>Research</SectionLabel>
        <SectionHeading
          title={directions.title}
          subtitle={directions.intro}
          dark={false}
          className="mt-3"
        />
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2">
        {directions.items.map((item, i) => (
          <FadeIn key={item.title} delay={0.06 + i * 0.04}>
            <article className="h-full rounded-2xl border border-border bg-white p-6 md:p-7">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600/10 text-xs font-semibold text-brand-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {item.body}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </AboutBand>
  );
}

function AboutLabs() {
  return (
    <AboutBand
      id="labs"
      tone="dark"
      decor={<SectionDecor variant="dark-deep" />}
      grid
      className="!pb-20 md:!pb-28"
    >
      <FadeIn>
        <SectionLabel dark>Laboratories</SectionLabel>
        <SectionHeading
          title="重点实验室"
          subtitle="社团的科研训练与项目实践主要依托以下两个实验室，成员在参与周训与项目时将接触真实研究方向与数据场景。"
          className="mt-3"
        />
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {aboutPage.labs.map((lab, i) => (
          <FadeIn key={lab.id} delay={0.08 + i * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="text-xs font-medium text-brand-400">{lab.affiliation}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-white md:text-xl">
                  {lab.shortName}
                </h3>
                <Prose>
                  {lab.paragraphs.map((p) => (
                    <p key={p.slice(0, 16)}>{p}</p>
                  ))}
                </Prose>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {lab.areas.map((area) => (
                    <span
                      key={area}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/50"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <AboutImageSlot
                image={aboutPageMedia[lab.imageKey]}
                dark
                className="[&>div]:rounded-none [&>div]:border-0 [&>div]:border-t [&>div]:border-white/10"
              />
            </article>
          </FadeIn>
        ))}
      </div>
    </AboutBand>
  );
}

function AboutCta() {
  return (
    <AboutBand tone="light" decor={<SectionDecor variant="light-alt" />} className="!pb-24 md:!pb-28">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title text-ink">继续了解社团</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{aboutPage.cta.text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/organization" variant="dark">
              组织架构
            </Button>
            <Button href="/join" variant="primary">
              加入我们
            </Button>
            <Button href="/activities" variant="ghost">
              品牌活动
            </Button>
          </div>
        </div>
      </FadeIn>
    </AboutBand>
  );
}

export function AboutPageContent() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutAffiliationPhilosophy />
      <AboutDirections />
      <AboutLabs />
      <AboutCta />
    </>
  );
}
