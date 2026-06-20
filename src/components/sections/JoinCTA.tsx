"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { Button } from "@/components/ui/Button";
import { TimedRevealSection } from "@/components/ui/TimedRevealSection";
import { RevealBlock } from "@/components/ui/RevealBlock";

const joinOptions = [
  {
    title: "加入社团",
    desc: "面向对 AI 感兴趣的本科生与研究生，参与周训、竞赛与项目实践。",
    href: "/join#club",
    num: "01",
  },
  {
    title: "加入科研方向",
    desc: "抖音大模型训练、具身智能、大模型架构、行业智能体四大方向的深度科研训练。",
    href: "/join#research",
    num: "02",
  },
  {
    title: "合作联系",
    desc: "欢迎校内教师、实验室、企业与兄弟社团开展合作交流。",
    href: "/join#partner",
    num: "03",
  },
];

export function JoinCTA() {
  const total = 1 + joinOptions.length + 1;

  return (
    <TimedRevealSection
      id="join"
      duration={3.8}
      className="bg-deep"
      decor={<SectionDecor variant="dark-deep" />}
    >
      {(progress) => (
        <div className="text-center">
          <RevealBlock progress={progress} index={0} total={total}>
            <SectionLabel dark>Join Us</SectionLabel>
            <h2 className="mt-3 section-title text-white">准备好加入了吗？</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/55 md:text-base">
              不限专业，欢迎有持续学习热情的同学加入。与我们一起探索 AI for Science 的更多可能。
            </p>
          </RevealBlock>

          <div className="mt-10 grid gap-5 text-left md:grid-cols-3 md:gap-6">
            {joinOptions.map((opt, i) => (
              <RevealBlock key={opt.title} progress={progress} index={i + 1} total={total}>
                <Link
                  href={opt.href}
                  className="card-hover group block h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
                >
                  <span className="text-3xl font-semibold text-brand-500/40">{opt.num}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{opt.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{opt.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400 transition-all group-hover:gap-2">
                    了解更多 <span aria-hidden>→</span>
                  </span>
                </Link>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock progress={progress} index={total - 1} total={total} className="mt-10">
            <Button href="/join" variant="primary">
              立即报名加入
            </Button>
          </RevealBlock>
        </div>
      )}
    </TimedRevealSection>
  );
}
