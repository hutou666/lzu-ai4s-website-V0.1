import type { Metadata } from "next";
import Link from "next/link";
import {
  announcements,
  announcementCategories,
  sortAnnouncements,
} from "@/content/announcements";
import { PageBanner } from "@/components/ui/PageBanner";
import { Badge } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "通知公告",
  description: "兰州大学 AI 探索者联盟通知公告——社团通知、活动安排、教务提醒与公示信息",
};

export default function AnnouncementsPage() {
  const sorted = [...announcements].sort(sortAnnouncements);

  return (
    <>
      <PageBanner
        label="Notices"
        title="通知公告"
        description="社团通知、活动安排、教务提醒与公示信息，请及时查阅"
      />

      <div className="section-padding bg-surface">
        <div className="container-wide">
          <div className="mb-10 flex flex-wrap gap-2">
            {announcementCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs text-ink-muted"
              >
                {cat}
              </span>
            ))}
          </div>

          {sorted.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
              <p className="text-sm text-ink-muted">暂无通知公告，请稍后查看。</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {sorted.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/announcements/${item.slug}`}
                  className={`group flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-brand-600/[0.03] md:flex-row md:items-center md:justify-between md:gap-8 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {item.pinned && <Badge variant="accent">置顶</Badge>}
                      <Badge>{item.category}</Badge>
                      {item.publisher && (
                        <span className="text-xs text-ink-muted">{item.publisher}</span>
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-ink transition-colors group-hover:text-brand-700 md:text-lg">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-end md:gap-2">
                    <time className="text-sm tabular-nums text-ink-muted">{item.date}</time>
                    <span className="text-sm font-medium text-brand-600">查看详情 →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
