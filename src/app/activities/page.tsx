import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/ui/PageBanner";
import { activities } from "@/content/activities";

export const metadata: Metadata = {
  title: "品牌活动",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageBanner
        label="Events"
        title="品牌活动"
        description="讲座、周训、展区展示与产教融合等品牌活动一览"
      />

      <div className="section-padding bg-surface">
        <div className="container-wide">
          <div className="space-y-6">
            {activities.map((activity, i) => (
              <Link
                key={activity.slug}
                href={`/activities/${activity.slug}`}
                className="card-hover group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 md:flex-row md:items-center md:p-8"
              >
                <span className="text-3xl font-semibold text-brand-500/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {activity.keywords.slice(0, 3).map((kw) => (
                      <span key={kw} className="rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-600">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-ink group-hover:text-brand-600 transition-colors">
                    {activity.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">{activity.date}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{activity.summary}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-brand-600">查看详情 →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
