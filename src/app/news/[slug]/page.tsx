import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news, getNewsBySlug } from "@/content/news";
import { withNewsMedia } from "@/content/newsMedia";
import { Badge } from "@/components/ui/SectionHeader";
import { PageBanner } from "@/components/ui/PageBanner";
import { NewsCoverImage } from "@/components/news/NewsCoverImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "新闻未找到" };
  return { title: item.title, description: item.summary };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const media = withNewsMedia(item);
  const paragraphs = (item.content ?? item.summary).split(/\n\n+/).filter(Boolean);
  const inlineImages = media.images.slice(1);

  return (
    <>
      <PageBanner label="News" title={item.title} description={item.date} />

      <div className="section-padding bg-surface">
        <article className="container-wide mx-auto max-w-3xl">
          <Link href="/news" className="text-sm text-brand-600 hover:text-brand-700">
            ← 返回新闻列表
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="accent">{item.category}</Badge>
            <time className="text-sm text-ink-muted">{item.date}</time>
          </div>

          <NewsCoverImage
            src={media.resolvedCover}
            alt={item.title}
            aspect="aspect-[21/9]"
            className="mb-8 mt-8 rounded-2xl border border-border"
            placeholder={media.coverPlaceholder}
            priority
          />

          <div className="space-y-5 text-base leading-relaxed text-ink-muted">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {inlineImages.length > 0 && (
            <div className="mt-10 grid gap-5">
              {inlineImages.map((src) => (
                <figure key={src} className="overflow-hidden rounded-2xl border border-border">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={src}
                      alt={`${item.title} 配图`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                </figure>
              ))}
            </div>
          )}
        </article>
      </div>
    </>
  );
}
