export interface Activity {
  slug: string;
  title: string;
  date: string;
  keywords: string[];
  summary: string;
  participants: string;
  featured?: boolean;
  content?: {
    intro: string;
    highlights: string[];
    speakers?: { name: string; title: string }[];
    gallery?: { src: string; alt: string; placeholder?: boolean }[];
    resources?: { label: string; href: string }[];
    newsLinks?: { label: string; href: string }[];
  };
}

export const activities: Activity[] = [
  {
    slug: "zhihui-lzu-exhibition",
    title: "智汇兰大·创享未来 信息学院展区展示活动",
    date: "2026年3月26日",
    keywords: ["机器人展示", "AI应用", "校园科技节"],
    summary:
      "设置人工智能主题展区，展示宇树人形机器人、优必选悟空机器人、高性能计算显卡与服务器等 AI 产品。",
    participants: "现场参观体验师生超 500 人次",
    featured: true,
    content: {
      intro:
        "本次活动在信息学院展区集中呈现社团在机器人、算力与 AI 应用方向的实践成果，面向全校师生开放体验与交流。",
      highlights: [
        "宇树人形机器人现场互动演示",
        "优必选悟空机器人动作展示",
        "高性能计算显卡与服务器硬件科普",
        "社团科研项目与竞赛成果展板",
      ],
      gallery: [
        { src: "/assets/placeholders/activity-1.jpg", alt: "展区现场（待替换真实照片）", placeholder: true },
        { src: "/assets/placeholders/activity-2.jpg", alt: "机器人演示（待替换真实照片）", placeholder: true },
      ],
      newsLinks: [{ label: "活动报道（待接入）", href: "#" }],
    },
  },
  {
    slug: "ai-frontier-lectures",
    title: "AI 前沿大讲堂 系列学者讲座",
    date: "2025年11月 — 2026年1月 · 共 8 期",
    keywords: ["学术讲座", "大模型", "具身智能"],
    summary:
      "邀请校内外学者、教授、企业专家开展讲座，覆盖大模型微调、具身智能机器人、AI 跨专业应用等主题。",
    participants: "累计参与 800+ 人次",
    featured: true,
    content: {
      intro:
        "系列讲座面向全校开放，旨在连接学术前沿与工程实践，帮助学生建立系统的 AI 知识框架。",
      highlights: [
        "大模型微调与部署实践",
        "具身智能机器人技术前沿",
        "AI 跨学科应用案例分享",
        "产学研合作经验交流",
      ],
      speakers: [
        { name: "校内学者", title: "大模型架构与具身智能前沿" },
        { name: "企业专家", title: "产业应用与工程实践" },
      ],
      resources: [{ label: "讲座资料（待上传）", href: "#" }],
    },
  },
  {
    slug: "industry-education-douyin",
    title: "AI 产教融合 抖音校企项目对接会",
    date: "2026年3月 · 共 2 期",
    keywords: ["产教融合", "豆包大模型", "校企合作"],
    summary:
      "邀请字节跳动团队开展豆包大模型训练项目对接，交流技术需求、项目合作、人才培养与实习就业。",
    participants: "参与师生 700+ 人次",
    featured: true,
    content: {
      intro:
        "对接会聚焦大模型训练工程化能力培养，为社团成员提供真实产业场景下的项目实践机会。",
      highlights: [
        "豆包大模型训练项目需求解读",
        "校企联合培养方案交流",
        "实习就业渠道对接",
        "技术导师现场答疑",
      ],
    },
  },
  {
    slug: "ai-weekly-training",
    title: "AI 技术启航 社团周训",
    date: "2025年11月至今 · 每周一次 · 共 13 期",
    keywords: ["周训", "Python", "机器学习", "智能体"],
    summary:
      "涵盖 Python 基础、机器学习入门、大模型微调、智能体设计、AI 拓展应用等，形式包括理论讲解、实操练习与作业点评。",
    participants: "累计参与会员超 1000 人次",
    featured: true,
    content: {
      intro:
        "周训是社团核心培养体系，面向零基础至进阶成员，循序渐进构建 AI 技术能力。",
      highlights: [
        "Python 编程与数据处理基础",
        "机器学习经典算法入门",
        "大模型微调与 Prompt 工程",
        "智能体架构设计与实战",
      ],
      resources: [{ label: "周训课件（待上传）", href: "#" }],
    },
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export function getFeaturedActivities(): Activity[] {
  return activities.filter((a) => a.featured);
}
