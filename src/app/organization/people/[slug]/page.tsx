import { notFound } from "next/navigation";
import { PersonPageContent } from "@/components/organization/PersonPageContent";
import {
  getCohortById,
  getPersonBySlug,
  peopleSlugs,
} from "@/content/organization/peopleData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return peopleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return { title: "人员未找到" };
  return {
    title: `${person.name} · ${person.role}`,
    description: person.bio,
  };
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const cohort = getCohortById(person.cohortId);

  return <PersonPageContent person={person} cohort={cohort} />;
}
