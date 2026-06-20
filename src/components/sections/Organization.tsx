import { adminDepartments, researchTracks } from "@/content/organization";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Organization({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        {showHeader && (
          <SectionHeader
            label="Organization"
            title="组织架构"
            description="四部管理 + 四向科研的双轨制运行体系"
          />
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="card-hover rounded-2xl border border-border bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-deep text-sm font-bold text-white">
                  管
                </div>
                <div>
                  <h3 className="font-semibold text-ink">管理运行系统</h3>
                  <p className="text-xs text-ink-muted">行政管理四部门</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {adminDepartments.map((dept) => (
                  <div key={dept.name} className="rounded-xl border border-border bg-surface p-4">
                    <h4 className="text-sm font-semibold text-ink">{dept.name}</h4>
                    <ul className="mt-2 space-y-1">
                      {dept.duties.map((duty) => (
                        <li key={duty} className="text-xs text-ink-muted">· {duty}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="card-hover rounded-2xl border border-border bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
                  研
                </div>
                <div>
                  <h3 className="font-semibold text-ink">科研成长系统</h3>
                  <p className="text-xs text-ink-muted">科研方向四板块</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {researchTracks.map((track) => (
                  <div key={track.name} className="rounded-xl border border-border bg-surface p-4">
                    <h4 className="text-sm font-semibold text-ink">{track.name}</h4>
                    {"partner" in track && track.partner && (
                      <p className="mt-0.5 text-[10px] text-brand-600">{track.partner}</p>
                    )}
                    <p className="mt-1 text-xs text-ink-muted">{track.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {track.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-brand-600/10 px-1.5 py-0.5 text-[10px] text-brand-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
