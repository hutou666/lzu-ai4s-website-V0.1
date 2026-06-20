import Link from "next/link";
import type { Cohort, Person } from "@/content/organization/people-types";
import { PersonProfileImage } from "@/components/organization/PersonProfileImage";
import { Button } from "@/components/ui/Button";

interface PersonPageContentProps {
  person: Person;
  cohort?: Cohort;
}

export function PersonPageContent({ person, cohort }: PersonPageContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-surface-alt pt-[88px] pb-20">
      <div className="container-wide">
        <Link
          href={`/organization/cohorts/${person.cohortId}`}
          className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <span aria-hidden>←</span> 返回{cohort?.label ?? "届别"}名录
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-start lg:gap-12">
          <aside className="lg:sticky lg:top-28">
            <PersonProfileImage
              name={person.name}
              role={person.role}
              avatar={person.avatar}
              className="lg:mx-0"
            />
            <div className="mt-6 text-center lg:text-left">
              <h1 className="text-2xl font-semibold text-ink md:text-3xl">{person.name}</h1>
              {person.academicTitle && (
                <p className="mt-1 text-sm text-ink-muted">{person.academicTitle}</p>
              )}
              <p className="mt-2 text-sm font-medium text-brand-700">{person.role}</p>
              <p className="mt-1 text-sm text-ink-muted">{person.unit}</p>
              {cohort && (
                <span className="mt-4 inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs text-ink-muted">
                  {cohort.label} · {cohort.academicYear}
                  {cohort.isCurrent && " · 当届"}
                </span>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="mt-4 block text-xs text-ink-muted transition-colors hover:text-brand-700"
                >
                  {person.email}
                </a>
              )}
            </div>
          </aside>

          <div className="rounded-3xl border border-border bg-white p-7 shadow-sm md:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              {person.college && <InfoItem label="学院" value={person.college} />}
              {person.grade && <InfoItem label="年级" value={person.grade} />}
              {person.major && <InfoItem label="专业" value={person.major} />}
              <InfoItem label="主要负责" value={person.focus} className="sm:col-span-2" />
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <h2 className="text-sm font-semibold text-ink">个人简介</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">{person.bio}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {person.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface-alt px-3 py-1 text-xs text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/organization/cohorts/${person.cohortId}`} variant="ghost">
                浏览更多成员
              </Button>
              <Button href="/join" variant="primary">
                加入我们
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium tracking-wider text-ink-muted uppercase">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}
