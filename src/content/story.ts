import { overviewData } from "./overview";
import { projects } from "./projects";

const { membership, gradeDistribution, majorDistribution, activityOverview } = overviewData;

export const storySlides = [
  {
    id: "members",
    label: "Members",
    title: "成员概况",
    description:
      "社团以本科生为主体，同时汇聚硕士与博士研究生，来自信息科学、数理、生化等多学科，形成「AI + X」交叉融合的学习与实践网络。",
    cta: { label: "查看组织架构", href: "/organization" },
    stats: [
      { value: String(membership.total), label: "社团成员", highlight: true },
      { value: `${membership.undergrad.percent}%`, label: "本科生占比" },
      { value: `${majorDistribution[0].percent}%`, label: "信息科学类" },
    ],
    membership,
    gradeDistribution: gradeDistribution.slice(0, 4),
    majorTop: majorDistribution.slice(0, 3),
  },
  {
    id: "activities",
    label: "Activities",
    title: "活动概况",
    description: activityOverview.summary,
    cta: { label: "查看全部活动", href: "/activities" },
    deadline: activityOverview.deadline,
    stats: [
      { value: `${activityOverview.stats[0].value}`, suffix: "次", label: "公开活动", highlight: true },
      { value: `${activityOverview.stats[1].value}`, suffix: "+", label: "参与人次", highlight: true },
      { value: `${activityOverview.stats[4].value}`, suffix: "%", label: "会员参与率" },
    ],
    byType: activityOverview.byType,
    audienceByGrade: activityOverview.audienceByGrade,
    highlights: activityOverview.highlights,
  },
  {
    id: "projects",
    label: "Directions",
    title: "科研方向概况",
    description:
      "围绕抖音大模型训练、具身智能、大模型架构与行业智能体四大方向，社团成员在校企合作与实验室课题中完成从学习到落地的完整实践。",
    cta: { label: "浏览科研方向", href: "/projects" },
    stats: [
      { value: String(projects.length), label: "核心方向", highlight: true },
      { value: "4", label: "校企/实验室合作" },
      { value: String(projects.filter((p) => p.status === "进行中").length), label: "进行中" },
    ],
    featured: projects,
  },
] as const;
