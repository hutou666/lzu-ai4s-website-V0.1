import { newsMediaByDate } from "./media/news.generated";
import type { NewsItem } from "./news";

export type NewsWithMedia = NewsItem & {
  resolvedCover: string;
  coverPlaceholder: boolean;
  images: string[];
};

export function withNewsMedia(item: NewsItem): NewsWithMedia {
  const media = newsMediaByDate[item.date];
  const resolvedCover = media?.cover ?? item.cover;
  return {
    ...item,
    resolvedCover,
    coverPlaceholder: !media?.cover,
    images: media?.images ?? [],
  };
}
