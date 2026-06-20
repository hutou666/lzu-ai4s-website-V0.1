# 页面照片素材

将各页面的照片放入对应文件夹，运行 `npm run sync:photos` 同步到网站。

| 文件夹 | 页面 | 说明 |
|--------|------|------|
| `首页 社团概况 照片/` | 首页发展历程 | 按 `01`–`10` 序号，与时间轴节点一一对应 |
| `关于我们 照片/` | 关于我们 | 6 张：`01` 社团简介 → `06` 文旅重点实验室 |
| `组织架构 照片/` | 组织架构 · 历届档案 | `01` = 第一届（gen-1）合影；换届时加 `02` 并在配置中扩展 |
| `组织架构 照片/第一届/` | 第一届 · 成员照片 | 文件名与姓名一致，如 `胡家瑞.jpg`；运行 `npm run sync:people-photos` |
| `品牌活动 照片/` | 品牌活动 | 预留 |
| `科研方向 照片/` | 科研方向 | 预留 |
| `荣誉成果 照片/` | 荣誉成果 | 预留 |
| `新闻动态 照片/` | 新闻动态 | 按发布日期命名，见下方说明 |
| `加入我们 照片/` | 加入我们 | `qq-group-qr.png` = 社团 QQ 群二维码；运行 `npm run sync:join-qr` |

## 关于我们 · 6 个槽位顺序

1. `01` — 社团简介（右侧竖图）
2. `02` — 依托单位
3. `03` — 发展理念
4. `04` — 甘肃省人工智能与算力技术重点实验室
5. `05` — 文化和旅游部重点实验室

四大科研方向板块不设配图。

## 新闻动态 · 按日期配图

文件名与 `src/content/news.ts` 中的 `date` 字段一致：

- `2026-03-05.jpg` — 该条新闻的封面（列表 + 详情页头图）
- `2026-03-05-01.jpg`、`2026-03-05-02.jpg` — 可选正文插图（详情页文末展示）
- 或使用子文件夹 `2026-03-05/01.jpg`（01 为封面，02+ 为插图）

运行 `npm run sync:news-photos` 后输出到 `public/assets/news/`，并写入 `src/content/media/news.generated.ts`。脚本会提示缺少配图的新闻日期，以及素材中有但新闻里没有的日期。

## 命令

```bash
npm run sync:photos          # 同步全部页面
npm run sync:photos:about    # 仅同步关于我们
npm run sync:join-qr       # 同步社团 QQ 群二维码（dev 启动时也会自动执行）
node scripts/sync-page-photos.mjs organization  # 仅组织架构届别封面
node scripts/sync-page-photos.mjs home-overview  # 仅首页发展历程
npm run sync:people-photos                       # 同步届别成员照片（dev 启动时也会自动执行）
```

同步后图片输出到 `public/assets/page-photos/<页面id>/`，路径写入 `src/content/media/*.generated.ts`。
