import type { Metadata } from "next";
import { ResearchDirectionsShowcase } from "@/components/research/ResearchDirectionsShowcase";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "科研方向",
};

const statusColors: Record<string, string> = {
  进行中: "bg-brand-600/10 text-brand-600",
  孵化中: "bg-lzu-purple/10 text-lzu-purple",
  已完成: "bg-surface-alt text-ink-muted",
};

export default function ProjectsPage() {
  return (
    <>
      <ResearchDirectionsShowcase />

      <div className="section-padding bg-surface">
        <div className="container-wide">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase">
              Project Index
            </p>
            <h2 className="mt-3 section-title text-ink">在研项目一览</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              各科研方向对应的具体项目与进展状态，报名与对接请前往加入页面。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                id={project.slug}
                className="card-hover flex scroll-mt-24 flex-col rounded-2xl border border-border bg-white p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="muted">{project.track}</Badge>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-brand-600">{project.partner}</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs text-ink-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
