import { Hero } from "@/components/sections/Hero";
import { ClubOverview } from "@/components/sections/ClubOverview";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { NewsAnnouncementsHub } from "@/components/sections/NewsAnnouncementsHub";
import { PartnersSupport } from "@/components/sections/PartnersSupport";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClubOverview />
      <ScrollStory />
      <NewsAnnouncementsHub />
      <PartnersSupport />
      <JoinCTA />
    </>
  );
}
