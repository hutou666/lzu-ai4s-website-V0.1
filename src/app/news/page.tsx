import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/ui/PageBanner";
import { news, newsCategories } from "@/content/news";
import { withNewsMedia } from "@/content/newsMedia";
import { NewsCoverImage } from "@/components/news/NewsCoverImage";
import { Badge } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "新闻动态",
};

export default function NewsPage() {
  const sorted = [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageBanner label="News" title="新闻动态" description="校企合作、活动动态、技术周训与项目进展" />

      <div className="section-padding bg-surface">
        <div className="container-wide">
          <div className="mb-10 flex flex-wrap gap-2">
            {newsCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs text-ink-muted"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((item) => {
              const media = withNewsMedia(item);
              return (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
              >
                <NewsCoverImage
                  src={media.resolvedCover}
                  alt={item.title}
                  placeholder={media.coverPlaceholder}
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="accent">{item.category}</Badge>
                    <time className="text-xs text-ink-muted">{item.date}</time>
                  </div>
                  <h2 className="text-base font-semibold text-ink group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink-muted line-clamp-3">{item.summary}</p>
                </div>
              </Link>
            );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
