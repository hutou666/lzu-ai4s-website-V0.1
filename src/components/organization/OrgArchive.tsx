"use client";

import Link from "next/link";
import { PERSON_ROLES, type Cohort } from "@/content/organization/people-types";
import { OrgBand, OrgSectionHeading } from "@/components/organization/OrgBand";
import { CohortCover } from "@/components/organization/CohortCover";
import { withCohortCover } from "@/lib/organization/cohortCovers";
import { FadeIn } from "@/components/ui/FadeIn";

const UPCOMING_COHORT = {
  label: "第二届",
  academicYear: "2026–2027 学年",
  teaser: "换届筹备中，新一届骨干团队即将亮相。",
};

export interface OrgArchiveProps {
  cohorts: Cohort[];
  memberCountsById: Record<string, number>;
  peopleSection: {
    title: string;
    subtitle: string;
    archiveSubtitle: string;
  };
}

export function OrgArchive({ cohorts, memberCountsById, peopleSection }: OrgArchiveProps) {
  const sorted = [...cohorts].sort((a, b) => b.number - a.number);

  return (
    <OrgBand id="archive" tone="light" decor="light" grid>
      <FadeIn>
        <OrgSectionHeading
          tone="light"
          label="Archive"
          title={peopleSection.title}
          subtitle={peopleSection.subtitle}
        />
      </FadeIn>

      <div className="relative mt-14">
        <div
          className="absolute top-0 bottom-0 left-6 hidden w-px bg-gradient-to-b from-brand-300/60 via-border to-transparent md:left-1/2 md:-ml-px md:block"
          aria-hidden
        />

        <div className="space-y-10 md:space-y-16">
          {sorted.map((cohort, i) => (
            <ArchiveCohortCard
              key={cohort.id}
              cohort={withCohortCover(cohort)}
              memberCount={memberCountsById[cohort.id] ?? 0}
              index={i}
              reversed={i % 2 === 1}
            />
          ))}

          <FadeIn delay={0.12 + sorted.length * 0.06}>
            <UpcomingCohortCard />
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.2}>
        <p className="mt-14 text-center text-xs leading-relaxed text-ink-muted">
          {peopleSection.archiveSubtitle}
        </p>
      </FadeIn>
    </OrgBand>
  );
}

function ArchiveCohortCard({
  cohort,
  memberCount,
  index,
  reversed,
}: {
  cohort: Cohort;
  memberCount: number;
  index: number;
  reversed: boolean;
}) {
  const href = `/organization/cohorts/${cohort.id}`;

  return (
    <FadeIn delay={0.06 + index * 0.08}>
      <Link
        href={href}
        className={`group relative block md:grid md:grid-cols-2 md:gap-10 md:items-center ${
          reversed ? "md:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="relative md:px-8">
          <div
            className={`absolute top-8 z-10 hidden h-3 w-3 rounded-full border-2 border-brand-500 bg-white shadow-sm md:block ${
              reversed ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
            }`}
            aria-hidden
          />

          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border shadow-lg transition-shadow group-hover:shadow-xl md:aspect-[4/3]">
            <CohortCover cohort={cohort} className="h-full w-full" overlay="light" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm backdrop-blur-sm">
                {cohort.label}
              </span>
              {cohort.isCurrent && (
                <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white shadow-sm">
                  当届
                </span>
              )}
            </div>
          </div>
        </div>

        <article className="mt-6 rounded-3xl border border-border bg-white p-7 shadow-sm transition-all group-hover:border-brand-300/40 group-hover:shadow-md md:mt-0 md:p-8">
          <p className="text-xs font-semibold tracking-[0.15em] text-brand-600 uppercase">
            {cohort.academicYear}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-ink group-hover:text-brand-800">
            {cohort.label}骨干团队
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{cohort.summary}</p>

          <ul className="mt-5 space-y-2">
            {cohort.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <span className="rounded-full border border-border bg-surface-alt px-3 py-1 text-[11px] text-ink-muted">
              名录 <strong className="font-semibold text-ink">{memberCount}</strong> 人
            </span>
            <span className="rounded-full border border-border bg-surface-alt px-3 py-1 text-[11px] text-ink-muted">
              {PERSON_ROLES.length} 类角色
            </span>
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-all group-hover:gap-2.5">
            查看人员名单
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </article>
      </Link>
    </FadeIn>
  );
}

function UpcomingCohortCard() {
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-10 md:items-center">
      <div className="relative md:order-2 md:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-dashed border-border bg-surface-alt/80 md:aspect-[4/3]">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-5xl font-bold text-ink/8">02</span>
            <p className="mt-3 text-sm font-medium text-ink-muted">{UPCOMING_COHORT.label}</p>
            <p className="mt-1 text-xs text-ink-muted/60">敬请期待</p>
          </div>
        </div>
      </div>

      <article className="mt-6 rounded-3xl border border-dashed border-border bg-white/60 p-7 md:order-1 md:mt-0 md:p-8">
        <p className="text-xs font-semibold tracking-[0.15em] text-ink-muted uppercase">
          {UPCOMING_COHORT.academicYear}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-ink-muted">{UPCOMING_COHORT.label}</h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted/80">{UPCOMING_COHORT.teaser}</p>
        <span className="mt-6 inline-flex rounded-full border border-dashed border-border px-4 py-1.5 text-xs text-ink-muted/70">
          档案待开启
        </span>
      </article>
    </div>
  );
}
