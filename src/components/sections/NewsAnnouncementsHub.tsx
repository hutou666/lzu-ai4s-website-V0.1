"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getLatestNews, type NewsItem } from "@/content/news";
import { getLatestAnnouncements, type Announcement } from "@/content/announcements";
import { withNewsMedia } from "@/content/newsMedia";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function formatShortDate(date: string) {
  const [, month, day] = date.split("-");
  return { month, day };
}

function ColumnHeader({
  label,
  title,
  href,
  linkText,
}: {
  label: string;
  title: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3 sm:mb-5 sm:pb-4">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
          {label}
        </p>
        <h3 className="mt-1 text-base font-semibold text-ink sm:text-lg">{title}</h3>
      </div>
      <Button href={href} variant="ghost" showArrow className="shrink-0 px-4 py-2 text-sm">
        {linkText}
      </Button>
    </div>
  );
}

function FeaturedNewsCard({ item, priority }: { item: NewsItem; priority?: boolean }) {
  const media = withNewsMedia(item);

  return (
    <Link
      href={`/news/${item.slug}`}
      className="card-hover group block overflow-hidden rounded-2xl border border-border bg-white"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-alt sm:aspect-[2/1]">
        {media.coverPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
            封面图待替换
          </div>
        ) : (
          <Image
            src={media.resolvedCover}
            alt={item.title}
            fill
            priority={priority}
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-600/10 px-2.5 py-0.5 font-medium text-brand-600">
            {item.category}
          </span>
          <time className="text-ink-muted">{item.date}</time>
        </div>
        <h3 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand-600 sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
          阅读全文
          <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function CompactNewsRow({ item }: { item: NewsItem }) {
  const media = withNewsMedia(item);

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex gap-3 rounded-xl p-2 transition-colors hover:bg-white"
    >
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
        {media.coverPlaceholder ? (
          <div className="flex h-full items-center justify-center bg-surface-alt text-[10px] text-ink-muted">
            待配图
          </div>
        ) : (
          <Image
            src={media.resolvedCover}
            alt={item.title}
            fill
            unoptimized
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2 text-[11px]">
          <span className="font-medium text-brand-600">{item.category}</span>
          <time className="text-ink-muted">{item.date}</time>
        </div>
        <h4 className="line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand-600">
          {item.title}
        </h4>
      </div>
    </Link>
  );
}

function AnnouncementRow({ item }: { item: Announcement }) {
  const { month, day } = formatShortDate(item.date);

  return (
    <Link
      href={`/announcements/${item.slug}`}
      className="group flex gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white sm:gap-4 sm:px-3 sm:py-3"
    >
      <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-white text-center sm:h-12 sm:w-12">
        <span className="text-sm font-semibold leading-none tabular-nums text-ink sm:text-base">{day}</span>
        <span className="mt-0.5 text-[10px] font-medium text-ink-muted">{month}月</span>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px]">
          {item.pinned && (
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-700">
              置顶
            </span>
          )}
          <span className="rounded-full bg-brand-600/10 px-2 py-0.5 font-medium text-brand-600">
            {item.category}
          </span>
        </div>
        <h4 className="line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand-600">
          {item.title}
        </h4>
      </div>
    </Link>
  );
}

function AnnouncementsEmptyState() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-white/80 px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-alt text-ink-muted">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 8.5h12M6 12h8M6 15.5h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">暂无通知公告</p>
        <p className="mt-0.5 text-xs text-ink-muted">活动安排、教务提醒与公示将在此发布</p>
      </div>
      <Link
        href="/announcements"
        className="shrink-0 text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 sm:text-sm"
      >
        前往 →
      </Link>
    </div>
  );
}

export function NewsAnnouncementsHub() {
  const reduced = useReducedMotion();
  const latestNews = getLatestNews(2);
  const [featured, ...moreNews] = latestNews;
  const announcements = getLatestAnnouncements(4);

  const motionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
      };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="updates"
      className="relative scroll-mt-[72px] overflow-visible bg-gradient-to-b from-white to-surface-alt section-padding"
    >
      <SectionDecor variant="light-alt" />

      <div className="container-wide relative">
        <motion.div {...motionProps} transition={reduced ? undefined : { duration: 0.5, ease }}>
          <SectionLabel>Updates</SectionLabel>
          <h2 className="mt-3 section-title text-ink">资讯动态</h2>
          <p className="mt-3 max-w-2xl text-ink-muted">
            新闻报道与通知公告并列呈现，快速掌握社团活动、周训安排与重要提醒
          </p>
        </motion.div>

        <motion.div
          {...motionProps}
          transition={reduced ? undefined : { duration: 0.5, ease, delay: 0.08 }}
          className="mt-8 lg:mt-10"
        >
          <div className="rounded-3xl border border-border bg-white shadow-[0_8px_40px_rgba(15,23,42,0.05)]">
            <div className="grid items-start gap-0 lg:grid-cols-2 lg:divide-x lg:divide-border">
              <div className="p-4 sm:p-6 lg:p-7">
                <ColumnHeader label="News" title="新闻动态" href="/news" linkText="全部新闻" />

                {featured ? (
                  <FeaturedNewsCard item={featured} priority />
                ) : (
                  <p className="rounded-2xl border border-dashed border-border px-6 py-8 text-center text-sm text-ink-muted">
                    暂无新闻
                  </p>
                )}

                {moreNews.length > 0 && (
                  <div className="mt-3 space-y-0.5 rounded-2xl bg-surface-alt/70 p-2 sm:mt-4">
                    {moreNews.map((item) => (
                      <CompactNewsRow key={item.slug} item={item} />
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border bg-surface-alt/40 p-4 sm:p-6 lg:border-t-0 lg:p-7">
                <ColumnHeader
                  label="Notices"
                  title="通知公告"
                  href="/announcements"
                  linkText="全部公告"
                />

                {announcements.length === 0 ? (
                  <AnnouncementsEmptyState />
                ) : (
                  <div className="space-y-0.5 rounded-2xl bg-white/70 p-2">
                    {announcements.map((item) => (
                      <AnnouncementRow key={item.slug} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
