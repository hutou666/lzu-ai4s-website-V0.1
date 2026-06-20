import type { Metadata } from "next";
import { OrgHero } from "@/components/organization/OrgHero";
import { OrgChart } from "@/components/organization/OrgChart";
import { OrgDepartments } from "@/components/organization/OrgDepartments";
import { OrgArchive } from "@/components/organization/OrgArchive";
import { OrgCTA } from "@/components/organization/OrgCTA";
import {
  cohorts,
  getPeopleByCohort,
  peopleSection,
} from "@/content/organization/peopleData";

export const metadata: Metadata = {
  title: "组织架构",
  description:
    "兰州大学 AI 探索者联盟组织架构——双轨运行机制、四部协同与历届档案。",
};

export default function OrganizationPage() {
  const memberCountsById = Object.fromEntries(
    cohorts.map((c) => [c.id, getPeopleByCohort(c.id).length])
  );

  return (
    <>
      <OrgHero />
      <OrgChart />
      <OrgDepartments />
      <OrgArchive
        cohorts={cohorts}
        memberCountsById={memberCountsById}
        peopleSection={peopleSection}
      />
      <OrgCTA />
    </>
  );
}
