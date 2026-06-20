import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "兰州大学 AI 探索者联盟——依托信息科学与工程学院及省部级重点实验室，面向全校开展人工智能学习、科研与实践。",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
