import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CohortPeopleDirectory } from "@/components/organization/CohortPeopleDirectory";
import { CohortRosterHero } from "@/components/organization/CohortRosterHero";
import { cohorts, getCohortById, getPeopleByCohort } from "@/content/organization/peopleData";

interface PageProps {
  params: Promise<{ cohortId: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return cohorts.map((c) => ({ cohortId: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cohortId } = await params;
  const cohort = getCohortById(cohortId);
  if (!cohort) return { title: "届别未找到" };
  return {
    title: `${cohort.label} · 人员名单`,
    description: cohort.summary,
  };
}

export default async function CohortRosterPage({ params }: PageProps) {
  const { cohortId } = await params;
  const cohort = getCohortById(cohortId);
  if (!cohort) notFound();

  const people = getPeopleByCohort(cohortId);
  const memberCount = people.length;

  return (
    <>
      <CohortRosterHero cohort={cohort} memberCount={memberCount} />
      <CohortPeopleDirectory cohort={cohort} people={people} />
    </>
  );
}
