# 兰州大学 AI 探索者联盟官网 Logo 素材包

## 使用方式

根目录 `logos/` 下已按你给出的文件名生成，可直接放入前端项目的 `public/logos/`。

```ts
import { partnerLogos } from './logoData';
```

## 目录说明

- `logos/*.svg`：按前端所需文件名生成的网页可用 SVG。部分 SVG 内嵌 PNG，以便保持文件名不改代码。
- `logos/original-png/`：实际下载到的原始 PNG 文件。
- `logos/monochrome-white/`：适合深色背景 Logo 墙使用的白色单色版本。
- `logoData.ts`：前端 logo wall 可直接使用的数据结构。
- `manifest.json`：来源与状态说明。

## 重要说明

1. 字节跳动、中国移动、摩尔线程、优必选、宇树科技使用了公开可访问的 PNG 资源并嵌入 SVG。
2. 兰州大学信息科学与工程学院、北京启元实验室、南京秉蔚信息未能确认稳定公开的 SVG/透明 PNG 官方源，因此先提供文字字标占位版。正式上线前建议替换为官方 VI 或由合作方提供的原始文件。
3. Logo 可能涉及商标权。网页展示应仅用于准确标识合作/支持单位，避免暗示未经确认的官方背书或商业授权。
