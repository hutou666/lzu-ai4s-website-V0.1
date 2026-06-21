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

export const projectsPageBanner = {
  label: "Research",
  title: "科研方向",
  description:
    "科研部下设四大方向小组，对接字节跳动、甘肃移动（宇树/优必选技术支持）、启元实验室与兰大重点实验室，在真实校企项目中完成从学习到交付的成长跃迁。",
} as const;

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
