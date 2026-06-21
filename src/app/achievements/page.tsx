import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/ui/PageBanner";
import {
  achievementStats,
  achievementTimeline,
  achievements,
  type Achievement,
} from "@/content/achievements";
import { achievementsGallery } from "@/content/media/achievements.generated";

export const metadata: Metadata = {
  title: "荣誉成果",
};

const typeLabel: Record<Achievement["type"], string> = {
  national: "国家计划",
  campus: "校级荣誉",
  competition: "竞赛获奖",
  media: "媒体报道",
};

const typeClassName: Record<Achievement["type"], string> = {
  national: "bg-brand-600 text-white",
  campus: "bg-lzu-purple/10 text-lzu-purple",
  competition: "bg-accent-sky/10 text-accent-sky",
  media: "bg-ink text-white",
};

function getAchievementImage(item: Achievement) {
  return achievementsGallery.find((image) => image.caption === item.imageCaption);
}

export default function AchievementsPage() {
  const honorItems = achievements.filter((item) => item.type !== "media");
  const mediaItems = achievements.filter((item) => item.type === "media");

  return (
    <>
      <PageBanner
        label="Achievements"
        title="荣誉成果"
        description="展示社团在科技社团建设、课程育人、竞赛实践、校园活动和媒体报道等方面取得的代表性成果。"
      />

      <main className="bg-surface">
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">
                  Honors Overview
                </p>
                <h2 className="mt-3 section-title text-ink">年度荣誉与成果概览</h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                  以下内容根据社团获奖证书、校内通知、授牌现场照片和官方报道整理，按成果类别呈现相关荣誉、
                  授予单位及佐证材料。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {achievementStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-white p-5">
                    <p className="text-3xl font-semibold text-brand-600">{stat.value}</p>
                    <p className="mt-2 text-sm font-semibold text-ink">{stat.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container-wide">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">
                Supporting Materials
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">成果材料</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                下列材料包括证书、通知、授牌现场和报道截图，用于对应查阅各项成果来源。
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {honorItems.map((item) => {
                const image = getAchievementImage(item);

                return (
                  <article
                    key={item.id}
                    className="card-hover flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    <div className="relative aspect-[16/10] border-b border-border bg-white">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={item.evidenceLabel}
                          fill
                          sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 45vw, 100vw"
                          className="object-contain p-3"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-ink-muted">
                          成果图片待同步
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeClassName[item.type]}`}>
                          {typeLabel[item.type]}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-muted">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold leading-snug text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium text-brand-600">{item.level}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{item.summary}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-border bg-white px-3 py-1 text-xs text-ink-muted"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-ink-muted">
                        <p>授予/发布单位：{item.issuer}</p>
                        <p className="mt-1">证据材料：{item.evidenceLabel}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {mediaItems.length > 0 && (
          <section className="bg-deep py-16 text-white md:py-24">
            <div className="container-wide">
              {mediaItems.map((item) => {
                const image = getAchievementImage(item);

                return (
                  <div key={item.id} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-accent-sky uppercase">
                        Official Media
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">{item.title}</h2>
                      <p className="mt-5 text-base leading-relaxed text-white/70">{item.summary}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-white/75"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                          <p className="text-sm text-white/45">发布时间</p>
                          <p className="mt-2 text-lg font-semibold">{item.date}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                          <p className="text-sm text-white/45">发布单位</p>
                          <p className="mt-2 text-lg font-semibold">{item.issuer}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={item.evidenceLabel}
                          fill
                          sizes="(min-width: 1024px) 48vw, 100vw"
                          className="object-contain p-3"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-ink-muted">
                          报道截图待同步
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container-wide">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">
                Timeline
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">年度成果脉络</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-5">
              {achievementTimeline.map((item, index) => (
                <div key={`${item.date}-${item.title}`} className="rounded-2xl border border-border bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold text-brand-600">{item.date}</p>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
