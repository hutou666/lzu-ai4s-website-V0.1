"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ROLE_FILTERS,
  UNIT_FILTERS,
  countPeopleByRole,
  isAllRoleFilter,
  ALL_UNIT_FILTER,
  type Cohort,
  type Person,
  type PersonRole,
  type RoleFilterValue,
} from "@/content/organization/people-types";
import { OrgBand } from "@/components/organization/OrgBand";
import { PersonAvatar } from "@/components/organization/PersonAvatar";
import { FadeIn } from "@/components/ui/FadeIn";

const ROLE_ORDER = ROLE_FILTERS.filter((r): r is PersonRole => !isAllRoleFilter(r));

interface CohortPeopleDirectoryProps {
  cohort: Cohort;
  people: Person[];
}

export function CohortPeopleDirectory({ cohort, people: cohortPeople }: CohortPeopleDirectoryProps) {
  const [roleFilter, setRoleFilter] = useState<RoleFilterValue>(ROLE_FILTERS[0]);
  const [unitFilter, setUnitFilter] = useState<string>(ALL_UNIT_FILTER);
  const [search, setSearch] = useState("");

  const roleCounts = useMemo(() => countPeopleByRole(cohortPeople), [cohortPeople]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cohortPeople.filter((p) => {
      const matchRole = isAllRoleFilter(roleFilter) || p.role === roleFilter;
      const matchUnit = unitFilter === ALL_UNIT_FILTER || p.unit === unitFilter;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.unit.toLowerCase().includes(q) ||
        p.focus.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchRole && matchUnit && matchSearch;
    });
  }, [cohortPeople, roleFilter, unitFilter, search]);

  const grouped = useMemo(() => {
    if (!isAllRoleFilter(roleFilter)) return null;
    return ROLE_ORDER.map((role) => ({
      role,
      people: filtered.filter((p) => p.role === role),
    })).filter((g) => g.people.length > 0);
  }, [filtered, roleFilter]);

  return (
    <OrgBand tone="light" decor="light-alt" className="!pt-8 !pb-24">
      <FadeIn delay={0.05}>
        <div className="mt-2 flex flex-wrap gap-2">
          {ROLE_ORDER.map((role) =>
            roleCounts[role] > 0 ? (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                  roleFilter === role
                    ? "border-brand-500/40 bg-brand-600/10 font-medium text-brand-800"
                    : "border-border bg-white text-ink-muted hover:border-brand-300/50"
                }`}
              >
                {role} <strong className="font-semibold">{roleCounts[role]}</strong>
              </button>
            ) : null
          )}
          <button
            type="button"
            onClick={() => setRoleFilter(ROLE_FILTERS[0])}
            className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
              isAllRoleFilter(roleFilter)
                ? "border-brand-500/40 bg-brand-600/10 font-medium text-brand-800"
                : "border-border bg-white text-ink-muted hover:border-brand-300/50"
            }`}
          >
            全部
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="sticky top-[72px] z-20 mt-6 rounded-2xl border border-border/80 bg-white/90 p-5 shadow-sm backdrop-blur-md md:p-6">
          <input
            type="search"
            placeholder="搜索姓名、单位或关键词…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-colors focus:border-brand-500/50 focus:bg-white"
          />

          <div className="mt-4">
            <p className="mb-2 text-[11px] font-medium tracking-wider text-ink-muted uppercase">按单位</p>
            <div className="flex flex-wrap gap-2">
              {UNIT_FILTERS.map((unit) => (
                <FilterChip
                  key={unit}
                  active={unitFilter === unit}
                  onClick={() => setUnitFilter(unit)}
                  label={unit}
                  small
                />
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink-muted">未找到匹配人员</p>
      ) : grouped ? (
        <div className="mt-12 space-y-12">
          {grouped.map((group, gi) => (
            <div key={group.role}>
              <FadeIn delay={0.04 + gi * 0.04}>
                <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold text-ink">
                  <span className="h-px flex-1 bg-border" />
                  <span>
                    {group.role}
                    <span className="ml-2 font-normal text-ink-muted">({group.people.length})</span>
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </h3>
              </FadeIn>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.people.map((person, i) => (
                  <FadeIn key={person.slug} delay={0.06 + (i % 6) * 0.03}>
                    <PersonCard person={person} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((person, i) => (
            <FadeIn key={person.slug} delay={0.04 + (i % 6) * 0.03}>
              <PersonCard person={person} />
            </FadeIn>
          ))}
        </div>
      )}

      <p className="mt-12 text-center text-xs text-ink-muted">
        {cohort.label} · {filtered.length} 人符合条件
      </p>
    </OrgBand>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <Link
      href={`/organization/people/${encodeURIComponent(person.slug)}`}
      className="card-hover group flex h-full gap-3.5 rounded-2xl border border-border bg-white p-3.5 transition-all hover:border-brand-300/50 sm:p-4"
    >
      <PersonAvatar name={person.name} role={person.role} avatar={person.avatar} size="thumb" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-ink group-hover:text-brand-700 sm:text-base">
            {person.name}
          </h3>
          {person.academicTitle && (
            <p className="truncate text-[11px] text-ink-muted sm:text-xs">{person.academicTitle}</p>
          )}
          <span className="mt-1.5 inline-flex max-w-full truncate rounded-full bg-brand-600/8 px-2 py-0.5 text-[10px] font-medium text-brand-800">
            {person.role}
          </span>
        </div>
        <p className="mt-2 truncate text-[11px] font-medium text-ink sm:text-xs">{person.unit}</p>
        <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-ink-muted sm:text-xs">
          {person.focus}
        </p>
        {person.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {person.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-alt px-1.5 py-0.5 text-[10px] text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  small = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border transition-colors ${
        small ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs"
      } ${
        active
          ? "border-brand-500/40 bg-brand-600/10 text-brand-800"
          : "border-border bg-surface-alt text-ink-muted hover:border-brand-300/50 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
