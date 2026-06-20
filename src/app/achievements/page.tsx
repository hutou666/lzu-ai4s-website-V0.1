import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { achievements, ongoingCompetitions } from "@/content/achievements";

export const metadata: Metadata = {
  title: "荣誉成果",
};

export default function AchievementsPage() {
  return (
    <>
      <PageBanner
        label="Achievements"
        title="荣誉成果"
        description="以赛促学、以赛促研 — 竞赛成果与持续参与的赛事"
      />

      <div className="section-padding bg-surface">
        <div className="container-wide">
          <h2 className="mb-8 text-xl font-semibold text-ink">荣誉墙</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((item) => (
              <div key={item.id} className="card-hover rounded-2xl border border-border bg-white p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
                    {item.team && (
                      <p className="mt-2 text-xs text-ink-muted">{item.team} · {item.date}</p>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full bg-lzu-purple/10 px-4 py-1.5 text-sm font-medium text-lzu-purple">
                    {item.level}
                  </span>
                </div>
                <div className="mt-6 flex aspect-[3/2] items-center justify-center rounded-xl border border-dashed border-border bg-surface-alt text-sm text-ink-muted">
                  获奖证书 / 项目海报 · 待上传
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-8 mt-16 text-xl font-semibold text-ink">参赛时间轴</h2>
          <div className="space-y-4">
            {ongoingCompetitions.map((comp, i) => (
              <div key={comp.name} className="card-hover flex gap-6 rounded-2xl border border-border bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-600 text-sm font-bold text-brand-600">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-ink">{comp.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{comp.desc}</p>
                  <p className="mt-2 text-xs font-medium text-brand-600">筹备 / 参与中</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
