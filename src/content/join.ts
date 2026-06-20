import { siteConfig } from "./site";
import { researchDirections } from "./researchDirections";

export const joinPage = {
  banner: {
    label: "Join Us",
    title: "加入我们",
    description:
      "无论你是想先加入社团社群，还是希望进入科研方向深度实践，都可以在这里找到对应入口。",
  },

  paths: [
    {
      id: "club",
      num: "01",
      title: "加入社团",
      summary: "扫码进群，参与周训、讲座与公开活动",
      href: "#club",
    },
    {
      id: "research",
      num: "02",
      title: "加入科研方向",
      summary: "通过在线报名表申请进入四大科研方向项目训练",
      href: "#research",
    },
    {
      id: "partner",
      num: "03",
      title: "合作联系",
      summary: "教师、实验室、企业与兄弟社团合作",
      href: "#partner",
    },
  ],

  club: {
    title: "加入社团",
    subtitle: "扫描下方群二维码，即可加入社团交流群，获取招新、周训与活动通知。",
    steps: [
      "使用 QQ 扫描下方二维码",
      "按群公告完成昵称与学院备注",
      "关注群内活动通知，参与周训与公开活动",
    ],
    qr: {
      src: "/assets/join/group-qr.png",
      alt: "AI探索者联盟社团交流群二维码",
      caption: "AI探索者联盟交流群",
      groupNumber: "1047342432",
    },
    note: "加入社团不强制填写报名表。若你之后希望进入科研方向，可再提交科研报名。",
  },

  research: {
    title: "加入科研方向",
    subtitle:
      "科研方向面向愿意长期投入项目训练的同学。请通过在线报名表提交申请，科研部将根据方向需求与你联系安排。",
    directions: researchDirections.map((d) => ({
      id: d.id,
      name: d.name,
      partner: d.partner,
      summary: d.summary,
    })),
    /** 腾讯问卷 / 飞书表单 / 金数据等外链；也可通过环境变量 NEXT_PUBLIC_RESEARCH_FORM_URL 注入 */
    applicationFormUrl: process.env.NEXT_PUBLIC_RESEARCH_FORM_URL?.trim() || "https://www.wenjuan.com/s/aaeqquM",
    applicationFormLabel: "填写在线报名表",
    formNote: "报名表由第三方表单平台收集，提交后我们会在 3–5 个工作日内与你联系。",
    fallbackContact: siteConfig.email,
  },

  partner: {
    title: "合作联系",
    subtitle: "欢迎校内教师、实验室、企业与兄弟社团与我们建立合作。",
    contacts: [
      { label: "联系邮箱", value: siteConfig.email },
      { label: "微信公众号", value: siteConfig.wechat },
      { label: "办公地址", value: siteConfig.address },
    ],
  },
} as const;
