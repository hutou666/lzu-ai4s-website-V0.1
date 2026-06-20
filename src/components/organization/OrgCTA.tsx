"use client";

import { orgCta } from "@/content/organization/orgData";
import { OrgBand } from "@/components/organization/OrgBand";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function OrgCTA() {
  return (
    <OrgBand tone="dark" decor="minimal" grid className="!pb-28 md:!pb-32">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title text-white">{orgCta.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/50 md:text-lg">{orgCta.body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {orgCta.buttons.map((btn, i) => (
              <Button
                key={btn.href}
                href={btn.href}
                variant={i === 0 ? "primary" : "secondary"}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </FadeIn>
    </OrgBand>
  );
}
