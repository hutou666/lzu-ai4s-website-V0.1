"use client";

import Link from "next/link";
import { departmentsData, departmentsSection } from "@/content/organization/departmentsData";
import { OrgBand, OrgSectionHeading } from "@/components/organization/OrgBand";
import { FadeIn } from "@/components/ui/FadeIn";

const symbolStyles = [
  "from-brand-600/30 to-brand-700/10",
  "from-accent-sky/25 to-transparent",
  "from-accent-mint/20 to-transparent",
  "from-lzu-purple/25 to-transparent",
];

export function OrgDepartments() {
  return (
    <OrgBand tone="dark" decor="dark" grid>
      <FadeIn>
        <OrgSectionHeading
          tone="dark"
          label="Departments"
          title={departmentsSection.title}
        />
      </FadeIn>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:gap-6">
        {departmentsData.map((dept, i) => {
          const Card = (
            <article className="glass-card-dark card-hover-dark group relative h-full overflow-hidden rounded-3xl p-7 md:p-8">
              <div
                className={`pointer-events-none absolute -top-6 -right-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${symbolStyles[i]} text-lg font-bold text-white/70`}
              >
                {dept.symbol}
              </div>
              <p className="text-xs font-semibold tracking-[0.15em] text-brand-400">
                {dept.enLabel}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{dept.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{dept.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {dept.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/45 transition-colors group-hover:border-white/15 group-hover:text-white/60"
                  >
                    {kw}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-white/8 pt-5 text-xs text-white/35">
                <p>
                  负责人：<span className="text-white/55">{dept.leaderPlaceholder}</span>
                </p>
                <p>
                  当前重点：<span className="text-white/55">{dept.currentFocusPlaceholder}</span>
                </p>
              </div>
              {dept.linkTo && (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400 transition-all group-hover:gap-2">
                  查看科研方向 <span aria-hidden>→</span>
                </span>
              )}
            </article>
          );

          return (
            <FadeIn key={dept.id} delay={0.08 + i * 0.08}>
              {dept.linkTo ? (
                <Link href={dept.linkTo} className="block">
                  {Card}
                </Link>
              ) : (
                Card
              )}
            </FadeIn>
          );
        })}
      </div>
    </OrgBand>
  );
}
