"use client";

import Link from "next/link";
import type { Cohort } from "@/content/organization/peopleData";
import { OrgBand } from "@/components/organization/OrgBand";
import { FadeIn } from "@/components/ui/FadeIn";

interface CohortRosterHeroProps {
  cohort: Cohort;
  memberCount: number;
}

export function CohortRosterHero({ cohort, memberCount }: CohortRosterHeroProps) {
  return (
    <OrgBand tone="dark" decor="hero" grid className="!pt-[88px] !pb-10 md:!pb-12">
      <FadeIn>
        <nav className="flex flex-wrap items-center gap-2 text-sm text-white/50">
          <Link href="/organization" className="transition-colors hover:text-white/80">
            组织架构
          </Link>
          <span aria-hidden>/</span>
          <Link href="/organization#archive" className="transition-colors hover:text-white/80">
            历届档案
          </Link>
          <span aria-hidden>/</span>
          <span className="text-white/80">{cohort.label}</span>
        </nav>
      </FadeIn>

      <FadeIn delay={0.06}>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {cohort.academicYear}
              </span>
              {cohort.isCurrent && (
                <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white">
                  当届
                </span>
              )}
            </div>
            <h1 className="mt-4 display-title text-white">{cohort.label} · 人员名单</h1>
          </div>
          <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
            共 <strong className="font-semibold text-white">{memberCount}</strong> 人
          </span>
        </div>
      </FadeIn>
    </OrgBand>
  );
}
