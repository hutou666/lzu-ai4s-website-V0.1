export interface Achievement {
  id: string;
  title: string;
  date: string;
  level: string;
  type: "award" | "ongoing";
  description: string;
  team?: string;
}

export const achievements: Achievement[] = [
  {
    id: "edu-it-innovation-2025",
    title: "第二届教育信息技术应用创新大赛",
    date: "2025年",
    level: "西北赛区一等奖",
    type: "award",
    description: "「目标智能检测技术应用实践赛」",
    team: "AI 探索者联盟代表队",
  },
];

export const ongoingCompetitions = [
  {
    name: "中国国际「互联网+」大学生创新创业大赛",
    desc: "创新创业与 AI 技术融合",
  },
  {
    name: "全国大学生机器人大赛 / 睿抗机器人开发者大赛",
    desc: "机器人设计与开发竞技",
  },
  {
    name: "秒哒 AI 开发者大赛",
    desc: "AI 应用开发与创意实现",
  },
  {
    name: "其他 AI 与机器人赛事",
    desc: "持续组织参与各类人工智能竞赛",
  },
];
