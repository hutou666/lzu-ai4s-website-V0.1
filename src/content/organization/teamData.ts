export type TeamTier = "mainLeader" | "leader" | "deptLeader" | "groupLeader";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: string;
  college: string;
  grade: string;
  major: string;
  focus: string;
  description: string;
  tags: string[];
  avatar: string;
  tier: TeamTier;
}

export const coreTeamSection = {
  title: "核心团队",
  subtitle: "组织由一批具有技术热情、组织能力和项目经验的学生骨干共同推动。",
  groups: [
    { key: "mainLeader" as const, label: "社团主要负责人" },
    { key: "leader" as const, label: "社团负责人" },
    { key: "deptLeader" as const, label: "部门负责人" },
    { key: "groupLeader" as const, label: "科研方向负责人" },
  ],
} as const;

const placeholderAvatar = "/assets/team/avatar-placeholder.svg";

export const teamData: TeamMember[] = [
  {
    id: "tm-01",
    name: "姓名占位 01",
    role: "社团主要负责人",
    group: "社团管理层",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "战略统筹与资源协调",
    description: "负责社团整体发展方向与重大决策，统筹学院、实验室与产业资源对接。",
    tags: ["战略统筹", "资源协调", "对外合作"],
    avatar: placeholderAvatar,
    tier: "mainLeader",
  },
  {
    id: "tm-02",
    name: "姓名占位 02",
    role: "社团负责人",
    group: "社团管理层",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "日常运营与项目推进",
    description: "负责社团日常运营管理、部门协调与成员成长路径设计。",
    tags: ["组织运营", "项目统筹", "成员培养"],
    avatar: placeholderAvatar,
    tier: "leader",
  },
  {
    id: "tm-03",
    name: "姓名占位 03",
    role: "组织部负责人",
    group: "组织部",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "招新与活动组织",
    description: "负责会员招新、活动策划与社团日常组织协调。",
    tags: ["组织协调", "活动策划", "成员管理"],
    avatar: placeholderAvatar,
    tier: "deptLeader",
  },
  {
    id: "tm-04",
    name: "姓名占位 04",
    role: "宣传部负责人",
    group: "宣传部",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "品牌传播与内容生产",
    description: "负责公众号运营、活动宣传与社团品牌形象建设。",
    tags: ["内容创作", "品牌传播", "视觉设计"],
    avatar: placeholderAvatar,
    tier: "deptLeader",
  },
  {
    id: "tm-05",
    name: "姓名占位 05",
    role: "科研部负责人",
    group: "科研部",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "科研训练与项目孵化",
    description: "统筹全社科研活动，对接实验室资源与竞赛训练。",
    tags: ["科研统筹", "项目孵化", "技术路线"],
    avatar: placeholderAvatar,
    tier: "deptLeader",
  },
  {
    id: "tm-06",
    name: "姓名占位 06",
    role: "财务办公室负责人",
    group: "财务办公室",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "经费管理与资产登记",
    description: "负责经费预算、报销审批与社团资产规范管理。",
    tags: ["财务管理", "规范流程", "资产登记"],
    avatar: placeholderAvatar,
    tier: "deptLeader",
  },
  {
    id: "tm-07",
    name: "姓名占位 07",
    role: "抖音大模型训练方向负责人",
    group: "抖音大模型训练方向",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "字节校企大模型训练",
    description: "带领方向小组参与抖音核心大模型训练与标注项目，统筹数据构建与交付质量。",
    tags: ["大模型训练", "数据标注", "校企项目"],
    avatar: placeholderAvatar,
    tier: "groupLeader",
  },
  {
    id: "tm-08",
    name: "姓名占位 08",
    role: "大模型架构方向负责人",
    group: "大模型架构方向",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "启元实验室科研训练",
    description: "负责大模型架构方向的科研路线推进，对接启元实验室核心课题与学术产出。",
    tags: ["模型架构", "科研训练", "学术论文"],
    avatar: placeholderAvatar,
    tier: "groupLeader",
  },
  {
    id: "tm-09",
    name: "姓名占位 09",
    role: "具身智能方向负责人",
    group: "具身智能方向",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "机器人校队与竞赛",
    description: "带领方向小组开展人形机器人训练与数据采集，负责校队选拔与竞赛备赛。",
    tags: ["具身智能", "甘肃移动", "宇树", "优必选"],
    avatar: placeholderAvatar,
    tier: "groupLeader",
  },
  {
    id: "tm-10",
    name: "姓名占位 10",
    role: "行业智能体方向负责人",
    group: "行业智能体方向",
    college: "信息科学与工程学院",
    grade: "202X级",
    major: "专业占位",
    focus: "行业场景智能体落地",
    description: "统筹政务、医疗、文旅等场景的智能体开发，推动项目从需求到上线完整交付。",
    tags: ["行业智能体", "场景落地", "产品实践"],
    avatar: placeholderAvatar,
    tier: "groupLeader",
  },
];

export function getTeamByTier(tier: TeamTier): TeamMember[] {
  return teamData.filter((m) => m.tier === tier);
}
