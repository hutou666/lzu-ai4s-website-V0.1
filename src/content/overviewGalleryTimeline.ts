import { overviewGallery } from "./overviewGallery";

/**
 * 社团发展历程时间节点（主数据）。
 * 照片按相同索引在 overviewGallery 中配对；无照片时显示占位。
 */
export interface GalleryTimelineEntry {
  date: string;
  caption: string;
}

export const overviewGalleryTimeline: GalleryTimelineEntry[] = [
  { date: "2025.04", caption: "社团正式成立" },
  { date: "2025.09", caption: "社团参加社团嘉年华，招收第一届成员" },
  { date: "2025.10", caption: "第一届成员见面会" },
  { date: "2025.10", caption: "社团招收第一届部门干事" },
  { date: "2025.11", caption: "社团邀请李廉教授作学术报告" },
  { date: "2025.12", caption: "社团与实验室联合举办冬至节团建活动" },
  { date: "2026.02", caption: "社团与抖音集团达成校企合作项目协议" },
  { date: "2026.03", caption: "社团受邀代表信息学院参加科技展活动" },
  { date: "2026.04", caption: "社团第一台人形机器人正式投入社团科研活动" },
  { date: "2026.06", caption: "社团与启元实验室达成合作协议" },
];

export interface OverviewMilestone {
  date: string;
  caption: string;
  src: string;
}

export function getOverviewMilestones(): OverviewMilestone[] {
  return overviewGalleryTimeline.map((entry, i) => ({
    date: entry.date,
    caption: entry.caption,
    src: overviewGallery[i]?.src ?? "",
  }));
}

/** @deprecated 使用 getOverviewMilestones */
export function mergeGalleryWithTimeline<T extends { src: string; caption: string }>(gallery: T[]) {
  return getOverviewMilestones().map((m, i) => ({
    ...gallery[i],
    ...m,
    caption: m.caption,
  }));
}
