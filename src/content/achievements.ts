export type AchievementType = "national" | "campus" | "competition" | "media";

export interface Achievement {
  id: string;
  title: string;
  date: string;
  level: string;
  type: AchievementType;
  issuer: string;
  imageCaption: string;
  summary: string;
  highlights: string[];
  evidenceLabel: string;
}

export const achievementStats = [
  { value: "9", label: "项成果条目", desc: "覆盖国家计划、校级荣誉、竞赛与媒体报道" },
  { value: "3", label: "项校级示范/表彰", desc: "十佳指导教师、青年夜校示范项目、社团运营奖" },
  { value: "4", label: "项竞赛获奖", desc: "含启元大赛全国第1名、桌面AI超算最具开发潜力奖等" },
] as const;

export const achievements: Achievement[] = [
  {
    id: "youth-tech-club-support-plan-2026",
    title: "成功申报 2026 年全国青少年科技社团支持计划",
    date: "2026年",
    level: "国家级社团支持计划",
    type: "national",
    issuer: "中国科协青少年科技中心",
    imageCaption: "01-全国青少年科技社团支持计划",
    summary:
      "社团成功申报“2026年全国青少年科技社团支持计划”，进入面向青少年科技社团高质量发展的支持体系。",
    highlights: ["全国青少年科技社团支持计划", "科技创新后备人才培养", "社团建设与科协资源联动"],
    evidenceLabel: "推荐函与现场授牌资料",
  },
  {
    id: "top-ten-student-club-advisor-2025-2026",
    title: "社团指导老师杨裔教授获评兰州大学十佳学生社团指导老师",
    date: "2025-2026年度",
    level: "校级十佳指导教师",
    type: "campus",
    issuer: "兰州大学",
    imageCaption: "02-兰州大学十佳学生社团指导教师",
    summary:
      "社团指导老师杨裔教授获评 2025-2026 年度“兰州大学十佳学生社团指导老师”，体现学校对社团指导与育人成效的认可。",
    highlights: ["十佳学生社团指导老师", "社团指导与育人工作", "AI for Science 社团建设"],
    evidenceLabel: "兰州大学十佳学生社团指导教师授牌现场",
  },
  {
    id: "youth-night-school-demonstration-2026",
    title: "专业周训实践课程获评青年夜校示范项目",
    date: "2026年",
    level: "示范项目，总体评分全校第一",
    type: "campus",
    issuer: "兰州大学学生会",
    imageCaption: "03-青年夜校示范项目",
    summary:
      "社团课程“人工智能应用入门与实战”获评兰州大学 2026 年“萃英五育·青春赋能”青年夜校示范项目，总分 94 分，类别为实用技能类。",
    highlights: ["人工智能应用入门与实战", "总分 94 分", "实用技能类"],
    evidenceLabel: "青年夜校活动通知与项目评审表",
  },
  {
    id: "club-culture-festival-operation-award-2026",
    title: "获评社团文化节“心动运营社团”奖项",
    date: "2026年6月14日",
    level: "心动运营官称号",
    type: "campus",
    issuer: "校团委学生社团管理中心",
    imageCaption: "04-社团文化节心动运营社团奖",
    summary:
      "在“热爱再出发，社团‘心’体验”兰州大学 2026 年社团文化艺术节中，社团在活动策划、执行、宣传等环节表现突出，获“心动运营社团”表彰。",
    highlights: ["活动策划", "执行组织", "宣传运营"],
    evidenceLabel: "社团文化艺术节荣誉证书",
  },
  {
    id: "education-it-innovation-northwest-first-prize-2025",
    title: "教育信息技术应用创新大赛西北赛区一等奖",
    date: "2025年",
    level: "西北赛区一等奖",
    type: "competition",
    issuer: "第二届教育信息技术应用创新大赛",
    imageCaption: "05-教育信息技术应用创新大赛西北赛区一等奖",
    summary:
      "在 2025 年第二届教育信息技术应用创新大赛“目标智能检测技术应用实践赛”赛项中，兰州大学参赛成员荣获西北赛区一等奖。",
    highlights: ["目标智能检测技术应用实践赛", "兰州大学参赛团队", "指导教师：陈志文"],
    evidenceLabel: "竞赛荣誉证书",
  },
  {
    id: "gigabyte-nvidia-desktop-ai-potential-award-2026",
    title: "技嘉 × 英伟达桌面AI超算竞赛获最具开发潜力奖",
    date: "2026年7月26日",
    level: "最具开发潜力奖",
    type: "competition",
    issuer: "技嘉 × 英伟达桌面AI超算竞赛",
    imageCaption: "07-2026技嘉X英伟达 桌面AI超算竞赛 最具开发潜力奖",
    summary:
      "甘肃省人工智能与算力技术重点实验室与社团组队赴京参赛，王明明、卢凯奇、胡家瑞完成作品「岐黄AI」，在11支队伍中脱颖而出，荣获最具开发潜力奖。",
    highlights: ["岐黄AI", "48小时线下集中开发", "实验室与社团联合组队"],
    evidenceLabel: "竞赛颁奖现场与奖品资料",
  },
  {
    id: "qiyuan-jiuchi-skill-national-first-2026",
    title: "启元人工智能大赛九齿SKILL开发赛道全国第1名",
    date: "2026年8月",
    level: "全国第1名",
    type: "competition",
    issuer: "2026春季启元人工智能大赛",
    imageCaption: "08-2026 启元人工智能大赛 九齿SKILL开发赛道 全国第1名",
    summary:
      "在2026春季启元人工智能大赛九齿SKILL开发赛道中，社团刘李宏同学获全国第1名，其余参赛同学全部进入决赛。",
    highlights: ["九齿SKILL开发赛道", "刘李宏全国第1名", "参赛同学全部进入决赛"],
    evidenceLabel: "启元人工智能大赛获奖名单",
  },
  {
    id: "baidu-miaoda-cup-potential-award-2026",
    title: "第二届百度“秒哒杯”人工智能通识应用大赛最具潜力奖",
    date: "2026年",
    level: "最具潜力奖",
    type: "competition",
    issuer: "第二届百度“秒哒杯”人工智能通识应用大赛",
    imageCaption: "09-2026 第二届百度秒哒杯人工智能通识应用大赛 最具潜力奖",
    summary:
      "社团成员武旭颖、米杰以作品「智随访：辅助生殖妊娠结局全周期随访统计分析系统」参加第二届百度“秒哒杯”人工智能通识应用大赛，荣获最具潜力奖。",
    highlights: ["智随访", "武旭颖、米杰", "人工智能通识应用"],
    evidenceLabel: "秒哒杯作品展示与获奖资料",
  },
  {
    id: "official-media-spicy-hotpot-report-2026",
    title: "兰州大学官方媒体深度报道社团科研实践",
    date: "2026年3月3日",
    level: "官方专题报道",
    type: "media",
    issuer: "兰州大学官方微信公众号",
    imageCaption: "06-官方媒体深度报道",
    summary:
      "兰州大学官方微信公众号发布《麻辣烫爆火背后，兰大团队在行动！》专题报道，介绍杨裔教授带领实验室与社团核心成员，运用大数据与人工智能技术开展天水麻辣烫文旅消费数据分析的实践。",
    highlights: ["大数据与人工智能技术", "文旅消费数据分析", "实验室与社团核心成员参与"],
    evidenceLabel: "兰州大学官方微信公众号专题报道",
  },
];

export const achievementTimeline = [
  { date: "2026年8月", title: "启元人工智能大赛", desc: "九齿SKILL开发赛道获全国第1名。" },
  { date: "2026年", title: "百度秒哒杯", desc: "「智随访」获第二届人工智能通识应用大赛最具潜力奖。" },
  { date: "2026年7月", title: "桌面AI超算竞赛", desc: "「岐黄AI」获技嘉×英伟达最具开发潜力奖。" },
  { date: "2026年6月", title: "社团文化艺术节表彰", desc: "获评“心动运营社团”奖项。" },
  { date: "2026年", title: "青年夜校示范项目", desc: "人工智能应用入门与实战课程获评示范项目。" },
  { date: "2026年", title: "全国青少年科技社团支持计划", desc: "社团成功申报国家级支持计划。" },
  { date: "2026年3月", title: "官方媒体专题报道", desc: "兰州大学官方公众号报道社团科研实践。" },
  { date: "2025年", title: "教育信息技术应用创新大赛", desc: "荣获西北赛区一等奖。" },
] as const;
