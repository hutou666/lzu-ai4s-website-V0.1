import { ENGLISH_NAME } from "@/content/site";

export type OrgNodeType = "root" | "leader" | "department" | "researchGroup";

export interface OrgNode {
  id: string;
  title: string;
  subtitle: string;
  type: OrgNodeType;
  parent?: string;
  description: string;
  responsibilities?: string[];
  leaderPlaceholder?: string;
}

export const orgHero = {
  label: `ORGANIZATION SYSTEM · ${ENGLISH_NAME}`,
  title: "组织架构",
  headline: "让兴趣社团像科研组织一样高效运行",
  subtitle:
    "AI探索者联盟构建了「负责人统筹 + 四部协同 + 科研小组推进 + 普通成员参与」的组织机制，形成行政运行、科研训练、活动执行、品牌传播和经费管理相互支撑的社团运行体系。",
  ctaPrimary: { label: "查看组织图", href: "#org-chart" },
  ctaSecondary: { label: "浏览历届档案", href: "#archive" },
} as const;

export const orgOverview = {
  title: "一套双轨运行机制",
  subtitle: "行政管理保证社团稳定运转，四大科研方向推动校企项目、实验室课题与竞赛训练持续生长。",
} as const;

export const orgData = {
  mainLeader: {
    id: "main-leader",
    title: "社团主要负责人",
    subtitle: "战略统筹与对外代表",
    description:
      "负责社团整体发展方向、重大决策与对外合作代表，统筹学院、实验室与产业资源对接。",
    responsibilities: ["发展战略制定", "重大资源协调", "对外合作代表", "核心骨干培养"],
    leaderPlaceholder: "主要负责人占位",
  },
  leader: {
    id: "leader",
    title: "社团负责人",
    subtitle: "统筹社团发展、资源协调与项目推进",
    description:
      "负责社团日常运营管理、部门协调、项目优先级判断与成员成长路径设计，是组织运行的核心枢纽。",
    responsibilities: ["部门协调统筹", "项目优先级管理", "资源分配决策", "成员成长引导"],
    leaderPlaceholder: "负责人占位",
  },
  departments: [
    {
      id: "organization",
      name: "组织部",
      parent: "leader",
      description: "负责会员招新、骨干选拔、活动策划、活动管理、考勤检查和成员服务。",
    },
    {
      id: "media",
      name: "宣传部",
      parent: "leader",
      description: "负责品牌建设、活动宣传、公众号运营、海报设计、新闻稿撰写和成果展示。",
    },
    {
      id: "research",
      name: "科研部",
      parent: "leader",
      description: "统筹科研活动、实验室资源对接、项目孵化和学术交流。",
    },
    {
      id: "finance",
      name: "财务办公室",
      parent: "leader",
      description: "负责经费审批、报销制度、收支管理和资产登记。",
    },
  ],
  researchGroups: [
    { id: "douyin-llm", name: "抖音大模型训练方向", parent: "research" },
    { id: "llm-architecture", name: "大模型架构方向", parent: "research" },
    { id: "embodied-ai", name: "具身智能方向", parent: "research" },
    { id: "industry-agent", name: "行业智能体方向", parent: "research" },
  ],
} as const;

export const orgCta = {
  title: "加入一个真正持续生长的 AI 学生组织",
  body: "无论你希望参与活动组织、内容传播、科研训练、机器人实践，还是希望从零开始学习人工智能，都可以在 AI探索者联盟找到适合自己的位置。",
  buttons: [
    { label: "加入我们", href: "/join" },
    { label: "查看周训课程", href: "/activities" },
    { label: "了解科研方向", href: "/projects" },
  ],
} as const;

export function getOrgNodeById(id: string): OrgNode | undefined {
  const { mainLeader, leader, departments, researchGroups } = orgData;

  if (id === mainLeader.id) {
    return {
      id: mainLeader.id,
      title: mainLeader.title,
      subtitle: mainLeader.subtitle,
      type: "root",
      description: mainLeader.description,
      responsibilities: [...mainLeader.responsibilities],
      leaderPlaceholder: mainLeader.leaderPlaceholder,
    };
  }
  if (id === leader.id) {
    return {
      id: leader.id,
      title: leader.title,
      subtitle: leader.subtitle,
      type: "leader",
      parent: mainLeader.id,
      description: leader.description,
      responsibilities: [...leader.responsibilities],
      leaderPlaceholder: leader.leaderPlaceholder,
    };
  }

  const dept = departments.find((d) => d.id === id);
  if (dept) {
    return {
      id: dept.id,
      title: dept.name,
      subtitle: "职能部门",
      type: "department",
      parent: dept.parent,
      description: dept.description,
    };
  }

  const group = researchGroups.find((g) => g.id === id);
  if (group) {
    return {
      id: group.id,
      title: group.name,
      subtitle: "科研小组",
      type: "researchGroup",
      parent: group.parent,
      description: `隶属于科研部，负责${group.name}的技术训练与项目推进。`,
    };
  }

  return undefined;
}
