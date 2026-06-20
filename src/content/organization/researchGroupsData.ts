import {
  researchDirections,
  researchDirectionsSection,
  type ResearchDirection,
} from "../researchDirections";

export interface ResearchGroup {
  id: string;
  name: string;
  partner: string;
  enLabel: string;
  shortName: string;
  description: string;
  summary: string;
  keywords: string[];
  benefits: string[];
  researchDirection: string;
  currentTasks: string;
  suitableMembers: string;
  leaderPlaceholder: string;
  projectLink: string;
}

export const researchGroupsSection = researchDirectionsSection;

export const researchGroupsData: ResearchGroup[] = researchDirections.map((d) => ({
  id: d.id,
  name: d.name,
  partner: d.partner,
  enLabel: d.enLabel,
  shortName: d.shortName,
  description: d.description,
  summary: d.summary,
  keywords: d.keywords,
  benefits: d.benefits,
  researchDirection: d.researchFocus,
  currentTasks: d.currentTasks,
  suitableMembers: d.suitableMembers,
  leaderPlaceholder: d.leaderPlaceholder,
  projectLink: `/projects#${d.project.slug}`,
}));

export type { ResearchDirection };
