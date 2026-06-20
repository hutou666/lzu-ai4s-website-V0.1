"use client";

import { motion } from "framer-motion";
import { orgData } from "@/content/organization/orgData";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NODES = [
  { id: "leader", label: "社团负责人", x: 200, y: 60, r: 28 },
  { id: "organization", label: "组织部", x: 60, y: 160, r: 22 },
  { id: "media", label: "宣传部", x: 140, y: 160, r: 22 },
  { id: "research", label: "科研部", x: 260, y: 160, r: 22 },
  { id: "finance", label: "财务办公室", x: 340, y: 160, r: 22 },
  { id: "douyin-llm", label: "抖音大模型", x: 180, y: 260, r: 18 },
  { id: "llm-architecture", label: "大模型架构", x: 240, y: 260, r: 18 },
  { id: "embodied-ai", label: "具身智能", x: 300, y: 260, r: 18 },
  { id: "industry-agent", label: "行业智能体", x: 360, y: 260, r: 18 },
] as const;

const EDGES: [string, string][] = [
  ["leader", "organization"],
  ["leader", "media"],
  ["leader", "research"],
  ["leader", "finance"],
  ["research", "douyin-llm"],
  ["research", "llm-architecture"],
  ["research", "embodied-ai"],
  ["research", "industry-agent"],
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function OrgNetworkVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-full" aria-hidden>
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-[2rem] border border-white/8 bg-white/[0.03] backdrop-blur-sm"
      >
        <svg viewBox="0 0 400 320" className="h-full w-full p-6">
          {EDGES.map(([from, to], i) => {
            const a = getNode(from);
            const b = getNode(to);
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="oklch(0.48 0.17 265)"
                strokeWidth="1.5"
                strokeOpacity="0.35"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.06 }}
              />
            );
          })}
          {NODES.map((node, i) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill="oklch(0.38 0.14 265)"
                fillOpacity={node.id === "leader" ? 0.5 : 0.25}
                stroke="oklch(0.55 0.19 265)"
                strokeWidth="1.5"
                strokeOpacity="0.5"
                initial={reduced ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              />
              <text
                x={node.x}
                y={node.y + node.r + 14}
                textAnchor="middle"
                fill="white"
                fillOpacity="0.55"
                fontSize="9"
                fontFamily="PingFang SC, Microsoft YaHei, sans-serif"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
        <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/40">
          {orgData.departments.length} 部门 · {orgData.researchGroups.length} 科研组
        </div>
      </motion.div>
    </div>
  );
}
