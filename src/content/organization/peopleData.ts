import defaults from "./people-defaults.json";
import type { Cohort, Person } from "./people-types";

export type { Cohort, Person, PersonRole, RoleFilterValue } from "./people-types";
export {
  ALL_ROLE_FILTER,
  ALL_UNIT_FILTER,
  PERSON_ROLES,
  ROLE_FILTERS as roleFilters,
  UNIT_FILTERS as unitFilters,
  countPeopleByRole,
  isAllRoleFilter,
} from "./people-types";

export const peopleSection = defaults.section;

export const cohorts = defaults.cohorts as Cohort[];

export const CURRENT_COHORT_ID = "gen-1";

export const allPeople = defaults.people as Person[];

export const peopleByCohort: Record<string, Person[]> = allPeople.reduce(
  (acc, person) => {
    if (!acc[person.cohortId]) acc[person.cohortId] = [];
    acc[person.cohortId].push(person);
    return acc;
  },
  {} as Record<string, Person[]>
);

export const peopleData = allPeople;

export function getCohortById(id: string): Cohort | undefined {
  return cohorts.find((c) => c.id === id);
}

export function getCurrentCohort(): Cohort {
  return cohorts.find((c) => c.isCurrent) ?? cohorts[0];
}

export function getPeopleByCohort(cohortId: string): Person[] {
  return peopleByCohort[cohortId] ?? [];
}

export function getPersonBySlug(slug: string): Person | undefined {
  const decoded = normalizeRouteSlug(slug);
  return allPeople.find((p) => p.slug === decoded || p.slug === slug);
}

export function normalizeRouteSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export const peopleSlugs = allPeople.map((p) => p.slug);
