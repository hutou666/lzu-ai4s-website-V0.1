import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { activities, getActivityBySlug } from "@/content/activities";
import { Badge } from "@/components/ui/SectionHeader";
import { PageBanner } from "@/components/ui/PageBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) return { title: "活动未找到" };
  return { title: activity.title, description: activity.summary };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const content = activity.content;

  return (
    <>
      <PageBanner label="Events" title={activity.title} description={`${activity.date} · ${activity.participants}`} />

      <div className="section-padding bg-surface">
        <div className="container-wide mx-auto max-w-3xl">
          <Link href="/activities" className="text-sm text-brand-600 hover:text-brand-700">
            ← 返回活动列表
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            {activity.keywords.map((kw) => (
              <Badge key={kw} variant="accent">{kw}</Badge>
            ))}
          </div>

          <p className="mt-8 text-base leading-relaxed text-ink-muted">
            {content?.intro ?? activity.summary}
          </p>

          {content?.highlights && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">活动亮点</h2>
              <ul className="mt-4 space-y-2">
                {content.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content?.speakers && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">讲师介绍</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {content.speakers.map((s) => (
                  <div key={s.name} className="rounded-xl border border-border bg-white p-4">
                    <p className="font-medium text-ink">{s.name}</p>
                    <p className="text-sm text-ink-muted">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content?.gallery && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">现场照片</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {content.gallery.map((img) => (
                  <div
                    key={img.alt}
                    className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt text-xs text-ink-muted"
                  >
                    {img.alt}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-surface-alt p-5">
            <p className="text-sm font-medium text-ink">参与规模</p>
            <p className="mt-1 text-sm text-ink-muted">{activity.participants}</p>
          </div>

          {(content?.resources || content?.newsLinks) && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">相关资料</h2>
              <ul className="mt-4 space-y-2">
                {content.resources?.map((r) => (
                  <li key={r.label}>
                    <a href={r.href} className="text-sm text-brand-600 hover:underline">{r.label}</a>
                  </li>
                ))}
                {content.newsLinks?.map((r) => (
                  <li key={r.label}>
                    <a href={r.href} className="text-sm text-brand-600 hover:underline">{r.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
