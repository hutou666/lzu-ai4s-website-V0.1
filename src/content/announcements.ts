export type AnnouncementCategory =
  | "社团通知"
  | "活动安排"
  | "教务提醒"
  | "公示公告"
  | "招新相关";

export interface Announcement {
  slug: string;
  title: string;
  date: string;
  category: AnnouncementCategory;
  summary: string;
  content?: string;
  pinned?: boolean;
  publisher?: string;
}

export const announcementCategories: AnnouncementCategory[] = [
  "社团通知",
  "活动安排",
  "教务提醒",
  "公示公告",
  "招新相关",
];

export const announcements: Announcement[] = [];

/** 在 announcements 中新增条目后，需恢复 src/app/announcements/[slug]/page.tsx 并重新 build */

export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  return announcements.find((a) => a.slug === slug);
}

export function getLatestAnnouncements(count = 6): Announcement[] {
  return [...announcements].sort(sortAnnouncements).slice(0, count);
}

export function sortAnnouncements(a: Announcement, b: Announcement): number {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}
