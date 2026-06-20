/**
 * 各页面照片素材配置。
 * 素材目录：素材/<sourceFolder>/
 * 发布后路径：public/assets/page-photos/<id>/
 * 生成文件：src/content/media/<outputFile>
 *
 * 命名约定：
 * - slots 模式：01.jpg、02.png … 按序号对应 slots 数组
 * - gallery 模式：按文件名 zh-CN 排序，与页面时间轴/列表索引一一对应
 */
export const PAGE_PHOTO_SETS = [
  {
    id: "home-overview",
    label: "首页 · 社团概况 / 发展历程",
    sourceFolder: "首页 社团概况 照片",
    mode: "gallery",
    outputFile: "home-overview.generated.ts",
    exportName: "homeOverviewGallery",
    galleryTypeName: "HomeOverviewGalleryItem",
    timelineFile: "src/content/overviewGalleryTimeline.ts",
  },
  {
    id: "about",
    label: "关于我们",
    sourceFolder: "关于我们 照片",
    mode: "slots",
    slots: ["intro", "affiliation", "philosophy", "labAi", "labCulture"],
    outputFile: "about.generated.ts",
    exportName: "aboutPhotoSrc",
  },
  {
    id: "organization",
    label: "组织架构 · 历届档案封面",
    sourceFolder: "组织架构 照片",
    mode: "slots",
    slots: ["gen-1"],
    outputFile: "organization.generated.ts",
    exportName: "organizationCohortCovers",
  },
  {
    id: "activities",
    label: "品牌活动",
    sourceFolder: "品牌活动 照片",
    mode: "gallery",
    outputFile: "activities.generated.ts",
    exportName: "activitiesGallery",
    galleryTypeName: "ActivitiesGalleryItem",
  },
  {
    id: "projects",
    label: "科研方向",
    sourceFolder: "科研方向 照片",
    mode: "gallery",
    outputFile: "projects.generated.ts",
    exportName: "projectsGallery",
    galleryTypeName: "ProjectsGalleryItem",
  },
  {
    id: "achievements",
    label: "荣誉成果",
    sourceFolder: "荣誉成果 照片",
    mode: "gallery",
    outputFile: "achievements.generated.ts",
    exportName: "achievementsGallery",
    galleryTypeName: "AchievementsGalleryItem",
  },
  {
    id: "join",
    label: "加入我们",
    sourceFolder: "加入我们 照片",
    mode: "gallery",
    outputFile: "join.generated.ts",
    exportName: "joinGallery",
    galleryTypeName: "JoinGalleryItem",
  },
];
