import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/ui/PageBanner";
import { ResearchDirectionsShowcase } from "@/components/research/ResearchDirectionsShowcase";
import { projects, projectsPageBanner } from "@/content/projects";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "科研方向",
  description: projectsPageBanner.description,
};

const statusColors: Record<string, string> = {
  进行中: "bg-accent-sky/15 text-accent-sky",
  孵化中: "bg-lzu-purple/15 text-brand-300",
  已完成: "bg-white/10 text-white/55",
};

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        label={projectsPageBanner.label}
        title={projectsPageBanner.title}
        description={projectsPageBanner.description}
      />

      <ResearchDirectionsShowcase />

      <section className="relative scroll-mt-24 overflow-hidden bg-deep section-padding">
        <SectionDecor variant="dark" />
        <div className="container-wide relative">
          <div className="mb-10 max-w-2xl">
            <SectionLabel dark>Project Index</SectionLabel>
            <h2 className="mt-3 section-title text-white">在研项目一览</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
              各科研方向对应的具体项目与进展状态，报名与对接请前往
              <Link href="/join#research" className="mx-1 text-brand-300 hover:text-white">
                加入页面
              </Link>
              。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                id={project.slug}
                className="card-hover-dark flex scroll-mt-24 flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/75">
                    {project.track}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-brand-300">{project.partner}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-xs text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
