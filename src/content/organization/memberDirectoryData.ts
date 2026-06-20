export type MemberRole = "负责人" | "干事" | "科研成员" | "普通成员";

export interface DirectoryMember {
  id: string;
  name: string;
  role: MemberRole;
  group: string;
  tags: string[];
  description: string;
}

export const memberDirectorySection = {
  title: "部门干事与科研成员",
  initialShow: 8,
} as const;

export const filterDepartments = [
  "全部",
  "组织部",
  "宣传部",
  "科研部",
  "财务办公室",
  "抖音大模型训练方向",
  "大模型架构方向",
  "具身智能方向",
  "行业智能体方向",
] as const;

export const filterRoles: (MemberRole | "全部")[] = [
  "全部",
  "负责人",
  "干事",
  "科研成员",
  "普通成员",
];

export const memberDirectoryData: DirectoryMember[] = [
  { id: "md-01", name: "姓名占位 A01", role: "干事", group: "组织部", tags: ["活动策划", "考勤"], description: "协助活动排期与现场组织。" },
  { id: "md-02", name: "姓名占位 A02", role: "干事", group: "组织部", tags: ["招新", "成员服务"], description: "参与招新宣讲与成员答疑。" },
  { id: "md-03", name: "姓名占位 B01", role: "干事", group: "宣传部", tags: ["公众号", "文案"], description: "负责活动推文撰写与排版。" },
  { id: "md-04", name: "姓名占位 B02", role: "干事", group: "宣传部", tags: ["海报", "视觉"], description: "参与活动海报与视觉物料设计。" },
  { id: "md-05", name: "姓名占位 C01", role: "干事", group: "科研部", tags: ["学术交流", "项目协调"], description: "协助科研活动组织与资料整理。" },
  { id: "md-06", name: "姓名占位 D01", role: "干事", group: "财务办公室", tags: ["报销", "台账"], description: "协助经费报销与资产登记。" },
  { id: "md-07", name: "姓名占位 E01", role: "科研成员", group: "抖音大模型训练方向", tags: ["数据标注", "质量评测"], description: "参与抖音核心大模型训练与标注任务。" },
  { id: "md-08", name: "姓名占位 E02", role: "科研成员", group: "抖音大模型训练方向", tags: ["训练数据", "工程交付"], description: "负责训练数据构建与项目交付协作。" },
  { id: "md-09", name: "姓名占位 F01", role: "科研成员", group: "大模型架构方向", tags: ["架构设计", "训练实验"], description: "参与启元实验室大模型架构科研课题。" },
  { id: "md-10", name: "姓名占位 F02", role: "科研成员", group: "大模型架构方向", tags: ["论文撰写", "实验复现"], description: "负责科研实验复现与阶段性成果整理。" },
  { id: "md-11", name: "姓名占位 G01", role: "科研成员", group: "具身智能方向", tags: ["动作采集", "运动控制"], description: "参与人形机器人数据采集与动作调试。" },
  { id: "md-12", name: "姓名占位 G02", role: "科研成员", group: "具身智能方向", tags: ["校队备赛", "竞赛训练"], description: "参与兰大机器人校队选拔与竞赛备赛。" },
  { id: "md-13", name: "姓名占位 H01", role: "科研成员", group: "行业智能体方向", tags: ["文旅", "政务"], description: "参与文旅与政务场景智能体原型开发。" },
  { id: "md-14", name: "姓名占位 H02", role: "科研成员", group: "行业智能体方向", tags: ["医疗", "产品上线"], description: "参与医疗场景智能体联调与上线测试。" },
  { id: "md-15", name: "姓名占位 I01", role: "普通成员", group: "组织部", tags: ["活动参与"], description: "参与社团公开活动与基础学习。" },
  { id: "md-16", name: "姓名占位 I02", role: "普通成员", group: "科研部", tags: ["周训"], description: "通过周训课程系统学习 AI 基础。" },
  { id: "md-17", name: "姓名占位 I03", role: "普通成员", group: "大模型架构方向", tags: ["科研入门"], description: "正在学习大模型架构与训练基础知识。" },
  { id: "md-18", name: "姓名占位 I04", role: "普通成员", group: "具身智能方向", tags: ["兴趣了解"], description: "对机器人实践与校队选拔保持关注。" },
  { id: "md-19", name: "姓名占位 I05", role: "干事", group: "宣传部", tags: ["摄影", "报道"], description: "负责活动现场摄影与快讯整理。" },
  { id: "md-20", name: "姓名占位 I06", role: "科研成员", group: "行业智能体方向", tags: ["需求分析"], description: "参与行业智能体场景需求调研与方案设计。" },
];
