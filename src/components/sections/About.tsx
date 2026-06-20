import { siteConfig } from "@/content/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        {showHeader && (
          <SectionHeader
            label="About"
            title="关于我们"
            description="学生组织 · 实验室资源 · 科研实践 · 企业合作"
          />
        )}

        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-ink">依托单位</h3>
                <ul className="mt-3 space-y-2">
                  {siteConfig.affiliations.map((item) => (
                    <li key={item.href} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-brand-700"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ink">社团理念</h3>
                <div className="mt-3 flex gap-3">
                  {siteConfig.values.map((v) => (
                    <span
                      key={v}
                      className="rounded-full bg-brand-600/8 px-4 py-2 text-sm font-medium text-brand-700"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ink">社团目标</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {siteConfig.mission}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-ink">方向定位</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {siteConfig.directions.map((d) => (
                    <div
                      key={d.title}
                      className="card-hover rounded-2xl border border-border bg-white p-4"
                    >
                      <p className="text-sm font-medium text-ink">{d.title}</p>
                      <p className="mt-1 text-xs text-ink-muted">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-border bg-surface-alt">
                <div className="text-center text-sm text-ink-muted">
                  <p className="font-medium">社团活动照片</p>
                  <p className="mt-1 text-xs">待替换真实活动图片</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
