import { ENGLISH_NAME } from "./site";

export const overviewData = {
  intro:
    `兰州大学 AI 探索者联盟（${ENGLISH_NAME}）依托信息科学与工程学院及重点实验室资源，秉承「学习、分享、创新」理念，为在校学生和热爱科技创新的同学提供 AI 学习、交流、科研、竞赛与项目实践平台，探索人工智能与科学研究的交叉点。`,
  membership: {
    total: 1056,
    undergrad: { count: 978, percent: 92.6, label: "本科生" },
    graduate: { count: 78, percent: 7.4, label: "硕士及以上" },
    insights: [
      "社团以本科生为主体，覆盖大一至研究生多个培养阶段",
      "低年级侧重基础学习，高年级侧重项目与竞赛实践",
      "成员来自全校多个学院，体现跨学科参与特征",
    ],
  },
  gradeDistribution: [
    { label: "大一", percent: 28 },
    { label: "大二", percent: 26 },
    { label: "大三", percent: 20 },
    { label: "大四", percent: 18 },
    { label: "研究生及以上", percent: 8 },
  ],
  majorDistribution: [
    { label: "信息科学类", percent: 55 },
    { label: "数学统计类", percent: 16 },
    { label: "物理化学类", percent: 10 },
    { label: "生物医学类", percent: 9 },
    { label: "经济管理类", percent: 5 },
    { label: "其他", percent: 5 },
  ],
  majorInsight:
    "信息科学类专业同学是社团骨干力量，同时吸引数学、物理、化学、生物等多学科同学参与，体现「AI + X」交叉融合特色。",
  activityOverview: {
    deadline: "2026年6月",
    summary:
      "本学年社团围绕周训、讲座、竞赛与产教融合持续发力，活动密度与覆盖面稳步提升，形成「学—练—赛—用」闭环。",
    stats: [
      { value: 25, suffix: "次", label: "公开活动", desc: "本学年累计举办" },
      { value: 5000, suffix: "+", label: "参与人次", desc: "活动覆盖总量" },
      { value: 13, suffix: "期", label: "技术周训", desc: "每周固定开展" },
      { value: 8, suffix: "场", label: "学术讲座", desc: "前沿大讲堂系列" },
      { value: 92, suffix: "%", label: "会员参与率", desc: "活跃成员占比" },
      { value: 4, suffix: "类", label: "活动类型", desc: "培训/讲座/实践/团建" },
    ],
    byType: [
      { label: "专业技能培训", count: 13, percent: 52 },
      { label: "通识理论讲座", count: 7, percent: 28 },
      { label: "综合趣味活动", count: 3, percent: 12 },
      { label: "纳新团建活动", count: 2, percent: 8 },
    ],
    monthlyTrend: [
      { label: "2025-09", value: 2 },
      { label: "2025-10", value: 3 },
      { label: "2025-11", value: 4 },
      { label: "2025-12", value: 3 },
      { label: "2026-01", value: 2 },
      { label: "2026-02", value: 3 },
      { label: "2026-03", value: 5 },
      { label: "2026-04", value: 3 },
    ],
    audienceByGrade: [
      { label: "大一", percent: 32 },
      { label: "大二", percent: 28 },
      { label: "大三", percent: 22 },
      { label: "大四", percent: 12 },
      { label: "研究生", percent: 6 },
    ],
    highlights: [
      { name: "AI 技术启航周训", participants: 1000, type: "周训" },
      { name: "AI 前沿大讲堂", participants: 800, type: "讲座" },
      { name: "产教融合对接会", participants: 700, type: "校企" },
      { name: "智汇兰大展区展示", participants: 500, type: "展示" },
      { name: "抖音校企项目对接会", participants: 650, type: "AI 产教融合" },
      { name: "「智汇兰大·创享未来」科技展示活动", participants: 480, type: "科技展示" },
    ],
    sampleEvents: [
      { type: "专业技能培训", topic: "大模型微调与部署实战", date: "2026-03" },
      { type: "通识理论讲座", topic: "人工智能与文化旅游", date: "2026-02" },
      { type: "综合趣味活动", topic: "机器人互动体验日", date: "2026-03" },
      { type: "专业技能培训", topic: "智能体设计与多工具调用", date: "2026-03" },
      { type: "纳新团建活动", topic: "2026 春季招新宣讲会", date: "2026-03" },
    ],
  },
} as const;
