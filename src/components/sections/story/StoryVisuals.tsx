"use client";

import { storySlides } from "@/content/story";
import { DonutChart } from "@/components/overview/DonutChart";
import { BarChart } from "@/components/overview/BarChart";

const MINT = "oklch(0.78 0.12 175)";
const SKY = "oklch(0.65 0.15 265)";
const BLUE = "oklch(0.55 0.19 265)";
const DEEP = "oklch(0.48 0.17 265)";
const COLORS = [BLUE, SKY, MINT, DEEP, "oklch(0.62 0.18 235)", "oklch(0.70 0.14 200)"];

function ChartCard({
  title,
  children,
  className = "",
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-md ${
        compact ? "p-3 md:p-4" : "p-4 md:p-5"
      } ${className}`}
    >
      <p className={`font-medium tracking-wider text-white/50 uppercase ${compact ? "mb-2 text-[10px] sm:text-[11px] xl:text-xs" : "mb-3 text-[11px] sm:text-xs xl:text-sm"}`}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function MembersVisual() {
  const slide = storySlides[0];
  const { membership, gradeDistribution, majorTop } = slide;

  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-[1fr_auto]">
      <ChartCard title="学历结构" className="sm:row-span-2 flex flex-col justify-center">
        <DonutChart
          dark
          size="lg"
          centerValue={String(membership.total)}
          centerLabel="总人数"
          segments={[
            { percent: membership.undergrad.percent, color: BLUE, label: "本科" },
            { percent: membership.graduate.percent, color: MINT, label: "研究生" },
          ]}
        />
        <div className="mt-4 space-y-2">
          <LegendRow color={BLUE} label="本科生" value={`${membership.undergrad.count}人`} />
          <LegendRow color={MINT} label="研究生" value={`${membership.graduate.count}人`} />
        </div>
      </ChartCard>

      <ChartCard title="年级分布">
        <BarChart dark items={gradeDistribution.map((g) => ({ label: g.label, value: g.percent }))} />
      </ChartCard>

      <ChartCard title="学科 Top3">
        <div className="space-y-3">
          {majorTop.map((m, i) => (
            <div key={m.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-white/60">{m.label}</span>
                <span className="font-medium text-white">{m.percent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${m.percent}%`, background: [BLUE, SKY, MINT][i] }}
                />
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

export function ActivitiesVisual() {
  const slide = storySlides[1];
  const { byType, audienceByGrade, highlights } = slide;
  const flagshipItems = [...highlights]
    .sort((a, b) => b.participants - a.participants)
    .map((h) => ({ label: h.name, value: h.participants }));

  const maxParticipants = flagshipItems[0]?.value ?? 1;
  const minParticipants = flagshipItems[flagshipItems.length - 1]?.value ?? 0;

  return (
    <div className="flex flex-col gap-2.5 xl:gap-3">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <ChartCard title="参与者年级构成" compact>
          <BarChart dark compact items={audienceByGrade.map((g) => ({ label: g.label, value: g.percent }))} />
        </ChartCard>

        <ChartCard title="活动类型占比" compact>
          <div className="space-y-2">
            {byType.map((t, i) => (
              <div key={t.label}>
                <div className="mb-0.5 flex items-center justify-between gap-2 text-[10px] sm:text-xs xl:text-sm">
                  <span className="truncate text-white/60">{t.label}</span>
                  <span className="shrink-0 font-medium tabular-nums text-white">{t.percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${t.percent}%`, background: COLORS[i] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="旗舰活动参与规模" compact>
        <div className="grid gap-2 sm:grid-cols-2">
          {flagshipItems.map((item, i) => {
            const span =
              maxParticipants === minParticipants
                ? 100
                : 32 + ((item.value - minParticipants) / (maxParticipants - minParticipants)) * 68;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2"
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <span className="min-w-0 text-[10px] leading-snug text-white/60 line-clamp-2">
                    {item.label}
                  </span>
                  <span className="shrink-0 text-[10px] font-semibold tabular-nums text-white">
                    {item.value}+
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${span}%`, background: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>
    </div>
  );
}

export function ProjectsVisual() {
  const slide = storySlides[2];
  const { featured } = slide;

  const statusColor: Record<string, string> = {
    进行中: MINT,
    孵化中: SKY,
    已完成: BLUE,
  };

  return (
    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
      {featured.map((p) => (
        <div
          key={p.slug}
          className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: `${statusColor[p.status]}22`, color: statusColor[p.status] }}
            >
              {p.status}
            </span>
            <span className="text-[10px] text-white/35">{p.track}</span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-snug text-white">{p.title}</p>
          <p className="mt-1 text-[10px] text-brand-400">{p.partner}</p>
          <p className="mt-2 flex-1 text-[11px] leading-relaxed text-white/45 line-clamp-3">{p.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {p.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-md bg-white/8 px-2 py-0.5 text-[10px] text-white/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LegendRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="flex items-center gap-2 text-white/60">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
