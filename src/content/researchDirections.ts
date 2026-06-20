export interface ResearchDirection {
  id: string;
  name: string;
  partner: string;
  enLabel: string;
  shortName: string;
  description: string;
  summary: string;
  keywords: string[];
  benefits: string[];
  researchFocus: string;
  currentTasks: string;
  suitableMembers: string;
  leaderPlaceholder: string;
  project: {
    slug: string;
    title: string;
    status: "进行中" | "孵化中" | "已完成";
    summary: string;
    tags: string[];
  };
}

export const researchDirectionsSection = {
  title: "四大科研方向，连接校企与实验室",
  subtitle:
    "科研部下设四个方向小组，分别对接字节跳动、优必选/宇树、启元实验室与兰大重点实验室，让成员在真实项目中完成从学习到交付的成长跃迁。",
} as const;

export const researchDirections: ResearchDirection[] = [
  {
    id: "douyin-llm",
    name: "抖音大模型训练方向",
    partner: "字节跳动官方校企合作",
    enLabel: "Douyin LLM Training · ByteDance",
    shortName: "抖音大模型训练",
    description:
      "参与抖音核心大模型训练与标注项目，在真实产业任务中积累数据构建、质量评测与工程交付经验。社团提供系统培训与项目组队机制，帮助成员从课堂走向产线。",
    summary:
      "参与抖音核心大模型训练与标注，获得具有市场竞争力的兼职/全职薪资与字节官方实践证明。",
    keywords: ["大模型训练", "数据标注", "质量评测", "工程交付"],
    benefits: [
      "具有市场竞争力的兼职/全职薪资",
      "字节跳动官方实践证明",
      "优异者获集团实习面试资格",
      "突出者可获直接录用机会",
    ],
    researchFocus: "抖音核心大模型训练与标注工程",
    currentTasks: "训练数据构建、标注规范迭代、模型效果评测与项目交付",
    suitableMembers: "对大模型训练、数据处理与产业项目协作感兴趣，能坚持长期投入的同学",
    leaderPlaceholder: "抖音大模型训练方向负责人占位",
    project: {
      slug: "douyin-llm-training",
      title: "抖音核心大模型训练项目",
      status: "进行中",
      summary:
        "与字节跳动官方校企合作，参与抖音核心大模型的训练与标注任务，提供薪资回报、实践证明与实习/就业通道。",
      tags: ["字节跳动", "大模型训练", "产教融合", "校企合作"],
    },
  },
  {
    id: "embodied-ai",
    name: "具身智能方向",
    partner: "优必选 / 宇树校企合作",
    enLabel: "Embodied AI · UBTECH & Unitree",
    shortName: "具身智能",
    description:
      "围绕人形机器人开展训练、数据采集与动作执行等科研工作，在优必选与宇树等平台完成从感知到控制的完整实践链路。",
    summary:
      "开展人形机器人训练与数据采集，选拔优秀成员组建兰州大学机器人校队，征战全国机器人大赛。",
    keywords: ["人形机器人", "数据采集", "动作执行", "机器人竞赛"],
    benefits: [
      "优必选 / 宇树校企硬件与导师资源",
      "组建兰州大学机器人校队",
      "代表学校参加全国机器人大赛",
      "获奖成员可获保研加分与竞赛荣誉",
    ],
    researchFocus: "人形机器人训练、数据采集与动作执行",
    currentTasks: "机器人动作采集、运动控制调试、校队选拔与竞赛备赛",
    suitableMembers: "对机器人、硬件调试与竞赛实践有热情，愿意长期训练的同学",
    leaderPlaceholder: "具身智能方向负责人占位",
    project: {
      slug: "embodied-robot-team",
      title: "人形机器人训练与校队建设",
      status: "进行中",
      summary:
        "依托优必选与宇树校企合作平台，开展机器人训练与数据采集，并选拔成员组建兰大机器人校队参与国家级赛事。",
      tags: ["具身智能", "优必选", "宇树", "机器人竞赛"],
    },
  },
  {
    id: "llm-architecture",
    name: "大模型架构方向",
    partner: "北京启元实验室合作",
    enLabel: "LLM Architecture · Qiyuan Lab",
    shortName: "大模型架构",
    description:
      "与国内顶尖大模型实验室深度合作，接触最前沿的大模型架构设计与训练技术，在真实科研课题中理解模型原理与系统实现。",
    summary:
      "参与启元实验室核心科研项目，接触前沿架构设计与训练技术，有机会在高水平学术会议发表论文。",
    keywords: ["模型架构", "分布式训练", "前沿算法", "学术论文"],
    benefits: [
      "对接北京启元实验室核心课题",
      "接触前沿架构设计与训练技术",
      "参与高水平学术研究",
      "为保研、申博与就业积累硬核科研经历",
    ],
    researchFocus: "大模型架构设计与前沿训练技术",
    currentTasks: "架构方案调研、训练实验复现、科研文档撰写与阶段性汇报",
    suitableMembers: "编程基础扎实、有志于科研深造、能投入长期实验的同学",
    leaderPlaceholder: "大模型架构方向负责人占位",
    project: {
      slug: "qiyuan-llm-architecture",
      title: "启元实验室大模型架构研究",
      status: "进行中",
      summary:
        "与北京启元实验室合作，参与核心科研项目，深入大模型架构设计与训练技术，产出可发表的学术成果。",
      tags: ["启元实验室", "模型架构", "科研训练", "学术论文"],
    },
  },
  {
    id: "industry-agent",
    name: "行业智能体方向",
    partner: "兰大重点实验室合作",
    enLabel: "Industry Agents · LZU Key Labs",
    shortName: "行业智能体",
    description:
      "依托兰州大学重点实验室资源，面向政务、医疗、文旅等真实场景开发行业智能体，全程参与从需求分析到产品上线的完整流程。",
    summary:
      "面向政务、医疗、文旅等场景开发行业智能体，积累项目实战经验，产出求职作品集与知识产权。",
    keywords: ["政务智能体", "医疗智能体", "文旅智能体", "产品落地"],
    benefits: [
      "兰大重点实验室算力与数据资源",
      "真实行业场景需求对接",
      "需求—开发—上线全流程实践",
      "产出作品集与知识产权成果",
    ],
    researchFocus: "政务、医疗、文旅等行业智能体落地",
    currentTasks: "场景需求调研、智能体原型开发、联调测试与成果沉淀",
    suitableMembers: "关注 AI 行业应用、具备产品思维、愿意参与完整项目周期的同学",
    leaderPlaceholder: "行业智能体方向负责人占位",
    project: {
      slug: "industry-agent-lzu",
      title: "行业智能体场景落地项目",
      status: "进行中",
      summary:
        "依托兰大重点实验室，面向政务、医疗、文旅等场景开发可交付的行业智能体，形成作品集与知识产权。",
      tags: ["行业智能体", "场景落地", "兰大重点实验室", "产品实践"],
    },
  },
];

export function getResearchDirectionById(id: string): ResearchDirection | undefined {
  return researchDirections.find((d) => d.id === id);
}
