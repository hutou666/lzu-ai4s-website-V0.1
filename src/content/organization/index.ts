import { departmentsData } from "./departmentsData";
import { researchGroupsData } from "./researchGroupsData";

export * from "./orgData";
export * from "./departmentsData";
export * from "./researchGroupsData";
export * from "./teamData";
export * from "./peopleData";

/** @deprecated 兼容旧组件，请优先使用 researchGroupsData */
export const researchTracks = researchGroupsData.map((g) => ({
  name: g.name,
  desc: g.summary,
  partner: g.partner,
  topics: [...g.keywords],
}));

/** @deprecated 兼容旧组件，请优先使用 departmentsData */
export const adminDepartments = departmentsData.map((d) => ({
  name: d.name,
  duties: [...d.keywords],
}));
