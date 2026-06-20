import type { Cohort } from "@/content/organization/peopleData";
import { organizationCohortCovers } from "@/content/media/organization.generated";

/** 将素材文件夹同步的届别封面合并进 cohort 数据（优先于 JSON 中的 coverImage） */
export function withCohortCover(cohort: Cohort): Cohort {
  const synced = organizationCohortCovers[cohort.id as keyof typeof organizationCohortCovers];
  if (!synced) return cohort;
  return { ...cohort, coverImage: synced };
}
