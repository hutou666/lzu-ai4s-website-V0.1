export interface Department {
  id: string;
  name: string;
  enLabel: string;
  symbol: string;
  description: string;
  keywords: string[];
  leaderPlaceholder: string;
  currentFocusPlaceholder: string;
  linkTo?: string;
}

export const departmentsSection = {
  title: "四部协同，支撑社团日常运行",
} as const;

export const departmentsData: Department[] = [
  {
    id: "organization",
    name: "组织部",
    enLabel: "Organization",
    symbol: "组",
    description:
      "负责会员招新、骨干选拔、活动策划、活动管理、考勤检查和成员服务，是社团日常运行与活动落地的核心执行部门。",
    keywords: ["招新", "活动策划", "成员管理", "考勤服务"],
    leaderPlaceholder: "组织部负责人占位",
    currentFocusPlaceholder: "春季招新筹备与活动排期优化",
  },
  {
    id: "media",
    name: "宣传部",
    enLabel: "Media & Branding",
    symbol: "宣",
    description:
      "负责品牌建设、活动宣传、公众号运营、海报设计、新闻稿撰写、成果展示和对外传播，承担社团形象建设与内容生产任务。",
    keywords: ["公众号", "海报设计", "新闻报道", "品牌传播"],
    leaderPlaceholder: "宣传部负责人占位",
    currentFocusPlaceholder: "品牌视觉升级与活动专题报道",
  },
  {
    id: "research",
    name: "科研部",
    enLabel: "Research",
    symbol: "研",
    description:
      "统筹全社科研活动，对接实验室资源，组织学术交流、项目孵化、竞赛训练和技术路线推进，是社团专业化发展的核心部门。",
    keywords: ["科研训练", "项目孵化", "技术路线", "竞赛支撑"],
    leaderPlaceholder: "科研部负责人占位",
    currentFocusPlaceholder: "四大科研方向项目推进与校企/实验室资源对接",
    linkTo: "/projects#research-directions",
  },
  {
    id: "finance",
    name: "财务办公室",
    enLabel: "Finance Office",
    symbol: "财",
    description:
      "负责经费预算、审批、报销、收支管理和资产登记，保障社团资源使用规范、透明、可追溯。",
    keywords: ["预算", "报销", "收支管理", "资产登记"],
    leaderPlaceholder: "财务办公室负责人占位",
    currentFocusPlaceholder: "经费使用规范与资产台账更新",
  },
];
