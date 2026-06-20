export const ENGLISH_NAME = "AI for Science · Lanzhou University";

export const siteConfig = {
  name: "兰州大学AI探索者联盟",
  nameEn: ENGLISH_NAME,
  tagline: ENGLISH_NAME,
  subtitle: "连接学习、科研、竞赛与产业实践的人工智能学生科技共同体",
  description:
    "依托兰州大学信息科学与工程学院及重点实验室资源，社团面向全校学生开展人工智能通识教育、四大科研方向训练、机器人实践与产教融合活动，探索 AI for Science 的更多可能。",
  url: "https://ai-explorers.lzu.edu.cn",
  email: "hjiarui2025@lzu.edu",
  wechat: "LZU AI探索者联盟",
  address: "甘肃省兰州市榆中县夏官营镇兰州大学榆中校区致远楼601室",
  affiliations: [
    {
      label: "兰州大学信息科学与工程学院",
      href: "https://xxxy.lzu.edu.cn/",
    },
    {
      label: "甘肃省人工智能与算力技术重点实验室",
      href: "https://ailab.lzu.edu.cn/key-lab-ai.html",
    },
    {
      label: "旅游信息融合处理与数据权属保护文化和旅游部重点实验室",
      href: "https://ailab.lzu.edu.cn/key-lab-culture.html",
    },
  ],
  values: ["学习", "分享", "创新"],
  mission:
    "为在校学生和热爱科技创新的同学提供 AI 学习、交流、科研、竞赛与项目实践平台。",
  directions: [
    { title: "抖音大模型训练", desc: "字节跳动官方校企合作 · 训练标注与实习就业" },
    { title: "具身智能", desc: "优必选/宇树校企 · 机器人校队与国家级竞赛" },
    { title: "大模型架构", desc: "北京启元实验室 · 前沿架构与学术论文" },
    { title: "行业智能体", desc: "兰大重点实验室 · 政务医疗文旅场景落地" },
  ],
  nav: [
    { label: "首页", href: "/" },
    { label: "关于我们", href: "/about" },
    { label: "组织架构", href: "/organization" },
    { label: "品牌活动", href: "/activities" },
    { label: "科研方向", href: "/projects" },
    { label: "荣誉成果", href: "/achievements" },
    { label: "新闻动态", href: "/news" },
    { label: "通知公告", href: "/announcements" },
  ],
  footerNav: [
    { label: "关于我们", href: "/about" },
    { label: "组织架构", href: "/organization" },
    { label: "品牌活动", href: "/activities" },
    { label: "科研方向", href: "/projects" },
    { label: "荣誉成果", href: "/achievements" },
    { label: "新闻动态", href: "/news" },
    { label: "通知公告", href: "/announcements" },
    { label: "加入我们", href: "/join" },
  ],
  stats: [
    { value: 1056, suffix: "人", label: "社团成员", desc: "覆盖全校多个学院" },
    { value: 978, suffix: "人", label: "本科成员", desc: "本科阶段活跃骨干" },
    { value: 78, suffix: "人", label: "硕士及以上", desc: "研究生与博士生参与" },
    { value: 25, suffix: "次", label: "本学年活动", desc: "公开活动与专题训练" },
    { value: 5000, suffix: "+", label: "累计参与", desc: "活动与服务覆盖人次" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
