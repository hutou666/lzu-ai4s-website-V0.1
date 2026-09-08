# 兰州大学 AI 探索者联盟网站

这是[兰州大学 AI 探索者联盟](https://lzu-ai4s-website-v0-1.pages.dev/)的官网源码。社团依托信息科学与工程学院及重点实验室，面向全校学生开展人工智能学习、科研、竞赛与产教融合活动。

线上站点：[https://lzu-ai4s-website-v0-1.pages.dev/](https://lzu-ai4s-website-v0-1.pages.dev/)

当前页面包括首页、关于我们、组织架构、品牌活动、科研方向、荣誉成果、新闻动态、通知公告和加入我们。

## 本地运行

```bash
npm install
npm run dev
```

静态构建：

```bash
npm run build
npm run preview
```

技术栈为 Next.js（静态导出）和 Tailwind CSS，部署在 Cloudflare Pages。推送到 `main` 后会自动更新线上站点。
