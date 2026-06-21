export const ROLE_FILTERS = [
  "全部",
  "指导老师",
  "社团主要负责人",
  "社团负责人",
  "部门负责人",
  "科研小组负责人",
  "部门干事",
] as const;

export const UNIT_FILTERS = [
  "全部",
  "信息科学与工程学院",
  "社团管理层",
  "组织部",
  "宣传部",
  "科研部",
  "财务办公室",
  "抖音大模型训练方向",
  "具身智能方向",
  "大模型架构方向",
  "行业智能体方向",
] as const;

export const PERSON_ROLES = ROLE_FILTERS.slice(1);
export type PersonRole = (typeof PERSON_ROLES)[number];

export const ALL_ROLE_FILTER = ROLE_FILTERS[0];
export const ALL_UNIT_FILTER = UNIT_FILTERS[0];

export interface Cohort {
  id: string;
  number: number;
  label: string;
  academicYear: string;
  isCurrent: boolean;
  summary: string;
  highlights: string[];
  coverImage?: string;
  coverCaption?: string;
}

export interface Person {
  slug: string;
  cohortId: string;
  name: string;
  role: PersonRole;
  unit: string;
  academicTitle?: string;
  college?: string;
  grade?: string;
  major?: string;
  focus: string;
  bio: string;
  tags: string[];
  email?: string;
  avatar: string;
}

export type RoleFilterValue = (typeof ROLE_FILTERS)[number];

export function isAllRoleFilter(role: string): role is typeof ALL_ROLE_FILTER {
  return role === ALL_ROLE_FILTER;
}

/** 指导老师展示顺序（第一届） */
export const ADVISOR_NAME_ORDER = ["杨裔", "李彩虹", "任超"] as const;

export function comparePeople(a: Person, b: Person): number {
  const roles = ROLE_FILTERS.filter((r): r is PersonRole => !isAllRoleFilter(r));
  const ra = roles.indexOf(a.role);
  const rb = roles.indexOf(b.role);
  if (ra !== rb) return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);

  if (a.role === "指导老师" && b.role === "指导老师") {
    const ia = ADVISOR_NAME_ORDER.indexOf(a.name as (typeof ADVISOR_NAME_ORDER)[number]);
    const ib = ADVISOR_NAME_ORDER.indexOf(b.name as (typeof ADVISOR_NAME_ORDER)[number]);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
  }

  return a.name.localeCompare(b.name, "zh-CN");
}

export function countPeopleByRole(people: Person[]): Record<string, number> {
  const roles = ROLE_FILTERS.filter((r): r is PersonRole => !isAllRoleFilter(r));
  const counts: Record<string, number> = Object.fromEntries(roles.map((r) => [r, 0]));
  for (const p of people) counts[p.role] = (counts[p.role] ?? 0) + 1;
  return counts;
}
