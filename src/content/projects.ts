import { researchDirections } from "./researchDirections";

export interface Project {
  slug: string;
  title: string;
  track: string;
  partner: string;
  status: "进行中" | "孵化中" | "已完成";
  summary: string;
  tags: string[];
}

export const projects: Project[] = researchDirections.map((d) => ({
  slug: d.project.slug,
  title: d.project.title,
  track: d.name,
  partner: d.partner,
  status: d.project.status,
  summary: d.project.summary,
  tags: d.project.tags,
}));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
