"use client";

import { useMemo, useState } from "react";
import { orgOverview, getOrgNodeById, type OrgNode } from "@/content/organization/orgData";
import { researchDirections } from "@/content/researchDirections";
import { OrgBand, OrgSectionHeading } from "@/components/organization/OrgBand";
import { FadeIn } from "@/components/ui/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type NodeTier = "root" | "leader" | "dept" | "group";

interface ChartNode {
  id: string;
  label: string;
  cx: number;
  cy: number;
  tier: NodeTier;
}

const NODE_SIZE: Record<NodeTier, { w: number; h: number; fontSize: number }> = {
  root: { w: 168, h: 40, fontSize: 12 },
  leader: { w: 148, h: 40, fontSize: 12 },
  dept: { w: 118, h: 38, fontSize: 11 },
  group: { w: 108, h: 36, fontSize: 10 },
};

const CHART_NODES: ChartNode[] = [
  { id: "main-leader", label: "社团主要负责人", cx: 480, cy: 44, tier: "root" },
  { id: "leader", label: "社团负责人", cx: 480, cy: 118, tier: "leader" },
  { id: "organization", label: "组织部", cx: 140, cy: 228, tier: "dept" },
  { id: "media", label: "宣传部", cx: 300, cy: 228, tier: "dept" },
  { id: "research", label: "科研部", cx: 480, cy: 228, tier: "dept" },
  { id: "finance", label: "财务办公室", cx: 660, cy: 228, tier: "dept" },
  { id: "douyin-llm", label: researchDirections[0].shortName, cx: 300, cy: 368, tier: "group" },
  { id: "embodied-ai", label: researchDirections[1].shortName, cx: 420, cy: 368, tier: "group" },
  { id: "llm-architecture", label: researchDirections[2].shortName, cx: 540, cy: 368, tier: "group" },
  { id: "industry-agent", label: researchDirections[3].shortName, cx: 660, cy: 368, tier: "group" },
];

const EDGES: [string, string][] = [
  ["main-leader", "leader"],
  ["leader", "organization"],
  ["leader", "media"],
  ["leader", "research"],
  ["leader", "finance"],
  ["research", "douyin-llm"],
  ["research", "embodied-ai"],
  ["research", "llm-architecture"],
  ["research", "industry-agent"],
];

function getNode(id: string) {
  return CHART_NODES.find((n) => n.id === id)!;
}

function edgePoints(fromId: string, toId: string) {
  const a = getNode(fromId);
  const b = getNode(toId);
  const ah = NODE_SIZE[a.tier].h / 2;
  const bh = NODE_SIZE[b.tier].h / 2;
  return { x1: a.cx, y1: a.cy + ah, x2: b.cx, y2: b.cy - bh };
}

function NodeDetail({ node }: { node: OrgNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-7 lg:sticky lg:top-24">
      <p className="text-xs font-semibold tracking-[0.15em] text-brand-600 uppercase">
        {node.subtitle}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-ink">{node.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{node.description}</p>
      {node.responsibilities && (
        <ul className="mt-4 space-y-2">
          {node.responsibilities.map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm text-ink-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
              {r}
            </li>
          ))}
        </ul>
      )}
      {node.leaderPlaceholder && (
        <p className="mt-5 text-xs text-ink-muted">
          负责人：<span className="text-ink">{node.leaderPlaceholder}</span>
        </p>
      )}
    </div>
  );
}

function MobileNodeList({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const tiers: { label?: string; nodes: ChartNode[] }[] = [
    { nodes: CHART_NODES.filter((n) => n.tier === "root" || n.tier === "leader") },
    { label: "行政管理轨", nodes: CHART_NODES.filter((n) => n.tier === "dept") },
    { label: "科研训练轨", nodes: CHART_NODES.filter((n) => n.tier === "group") },
  ];

  return (
    <div className="space-y-6 lg:hidden">
      {tiers.map((tier) => (
        <div key={tier.label ?? "top"}>
          {tier.label && (
            <p className="mb-3 text-xs font-semibold tracking-widest text-ink-muted uppercase">
              {tier.label}
            </p>
          )}
          <div className="grid gap-2">
            {tier.nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelect(node.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  selectedId === node.id
                    ? "border-brand-500/40 bg-brand-600/8 text-brand-800"
                    : "border-border bg-white text-ink-muted hover:border-brand-300/50"
                }`}
              >
                {node.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrgChart() {
  const reduced = useReducedMotion();
  const [selectedId, setSelectedId] = useState("leader");
  const [hoverId, setHoverId] = useState<string | null>(null);

  const selectedNode = useMemo(() => getOrgNodeById(selectedId), [selectedId]);
  const focusId = hoverId ?? selectedId;

  const isEdgeActive = (from: string, to: string) => from === focusId || to === focusId;

  return (
    <OrgBand id="org-chart" tone="light" decor="light-alt" grid>
      <FadeIn>
        <OrgSectionHeading
          tone="light"
          label="Dual-Track System"
          title={orgOverview.title}
          subtitle={orgOverview.subtitle}
          className="mx-auto text-center md:max-w-3xl"
        />
      </FadeIn>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-10">
        <FadeIn delay={0.08}>
          <div className="hidden lg:block">
            <div className="rounded-3xl border border-border bg-white p-3 shadow-sm md:p-4">
              <svg
                viewBox="0 0 960 420"
                className="h-auto w-full"
                role="img"
                aria-label="社团双轨组织图"
              >
                <defs>
                  <linearGradient id="org-track-admin-light" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.19 265 / 0.07)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.19 265 / 0)" />
                  </linearGradient>
                  <linearGradient id="org-track-research-light" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.18 235 / 0.09)" />
                    <stop offset="100%" stopColor="oklch(0.62 0.18 235 / 0)" />
                  </linearGradient>
                </defs>

                <rect x="24" y="168" width="912" height="88" rx="16" fill="url(#org-track-admin-light)" />
                <rect x="180" y="288" width="600" height="96" rx="16" fill="url(#org-track-research-light)" />

                <text x="48" y="186" fill="oklch(0.48 0.14 265)" fontSize="10" fontWeight="600" letterSpacing="0.12em">
                  行政管理轨
                </text>
                <text x="204" y="306" fill="oklch(0.5 0.14 235)" fontSize="10" fontWeight="600" letterSpacing="0.12em">
                  科研训练轨
                </text>

                {EDGES.map(([from, to]) => {
                  const { x1, y1, x2, y2 } = edgePoints(from, to);
                  const active = isEdgeActive(from, to);
                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={active ? "oklch(0.55 0.19 265)" : "oklch(0.55 0.19 265 / 0.28)"}
                      strokeWidth={active ? 2 : 1.25}
                      strokeLinecap="round"
                    />
                  );
                })}

                {CHART_NODES.map((node) => {
                  const { w, h, fontSize } = NODE_SIZE[node.tier];
                  const active = selectedId === node.id || hoverId === node.id;
                  const x = node.cx - w / 2;
                  const y = node.cy - h / 2;

                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedId(node.id)}
                      onMouseEnter={() => setHoverId(node.id)}
                      onMouseLeave={() => setHoverId(null)}
                      style={{ opacity: reduced ? 1 : undefined }}
                    >
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx={10}
                        fill={active ? "oklch(0.55 0.19 265 / 0.1)" : "oklch(0.99 0 0)"}
                        stroke={active ? "oklch(0.55 0.19 265)" : "oklch(0.88 0.02 265)"}
                        strokeWidth={active ? 1.5 : 1}
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 4}
                        textAnchor="middle"
                        fill={active ? "oklch(0.42 0.17 265)" : "oklch(0.32 0.03 265)"}
                        fontSize={fontSize}
                        fontWeight={node.tier === "root" || node.tier === "leader" ? 600 : 500}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="mt-4 text-center text-xs text-ink-muted">
              点击节点查看职责说明 · 悬停高亮关联路径
            </p>
          </div>

          <MobileNodeList selectedId={selectedId} onSelect={setSelectedId} />
        </FadeIn>

        {selectedNode && (
          <FadeIn delay={0.12}>
            <NodeDetail node={selectedNode} />
          </FadeIn>
        )}
      </div>
    </OrgBand>
  );
}
