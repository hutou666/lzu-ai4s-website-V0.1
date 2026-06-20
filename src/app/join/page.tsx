import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { JoinPageContent } from "@/components/join/JoinPageContent";
import { joinPage } from "@/content/join";

export const metadata: Metadata = {
  title: "加入我们",
};

export default function JoinPage() {
  return (
    <>
      <PageBanner
        label={joinPage.banner.label}
        title={joinPage.banner.title}
        description={joinPage.banner.description}
      />
      <JoinPageContent />
    </>
  );
}
