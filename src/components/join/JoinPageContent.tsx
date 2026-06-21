"use client";

import Link from "next/link";
import Image from "next/image";
import { joinPage } from "@/content/join";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionDecor } from "@/components/ui/SectionDecor";
import { FadeIn } from "@/components/ui/FadeIn";

export function JoinPageContent() {
  return (
    <>
      <PathsIntro />
      <ClubSection />
      <ResearchSection />
      <PartnerSection />
    </>
  );
}

function PathsIntro() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-surface-alt section-padding">
      <SectionDecor variant="light" />
      <div className="container-wide relative">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Choose Your Path</SectionLabel>
            <h2 className="mt-3 section-title text-ink">选择你的加入方式</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              日常参与与科研训练分开入口：加入社团只需扫码进群；进入科研方向需提交在线报名。
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {joinPage.paths.map((path, i) => (
            <FadeIn key={path.id} delay={i * 0.08}>
              <Link
                href={path.href}
                className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-white p-6 md:p-7"
              >
                <span className="text-3xl font-semibold text-brand-500/35">{path.num}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{path.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{path.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-all group-hover:gap-2">
                  前往 <span aria-hidden>→</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClubSection() {
  const { club } = joinPage;

  return (
    <section id="club" className="scroll-mt-24 bg-surface section-padding">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <FadeIn>
            <SectionLabel>Club</SectionLabel>
            <h2 className="mt-3 section-title text-ink">{club.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">{club.subtitle}</p>

            <ol className="mt-8 space-y-4">
              {club.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-sm font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-ink-muted md:text-base">{step}</p>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-xl bg-surface-alt px-4 py-3 text-sm leading-relaxed text-ink-muted">
              {club.note}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mx-auto w-full max-w-[19rem] rounded-3xl border border-border bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] lg:mx-0">
              <div className="relative mx-auto aspect-square w-full max-w-[15rem] overflow-hidden rounded-2xl bg-white">
                <Image
                  src={club.qr.src}
                  alt={club.qr.alt}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-center text-sm font-medium text-ink">{club.qr.caption}</p>
              {"groupNumber" in club.qr && club.qr.groupNumber && (
                <p className="mt-1 text-center text-xs tabular-nums text-ink-muted">
                  群号：{club.qr.groupNumber}
                </p>
              )}
              <p className="mt-1 text-center text-xs text-ink-muted">QQ 扫码加入群聊</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ResearchSection() {
  const { research } = joinPage;

  return (
    <section id="research" className="relative scroll-mt-24 overflow-hidden bg-deep section-padding">
      <SectionDecor variant="dark" />
      <div className="container-wide relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <FadeIn>
            <SectionLabel dark>Research</SectionLabel>
            <h2 className="mt-3 section-title text-white">{research.title}</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">{research.subtitle}</p>
            <p className="mt-3 text-sm text-white/40">{research.formNote}</p>

            <div className="mt-8 space-y-3">
              {research.directions.map((d) => (
                <div
                  key={d.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm"
                >
                  <p className="text-sm font-medium text-white">{d.name}</p>
                  <p className="mt-0.5 text-[11px] text-brand-400">{d.partner}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{d.summary}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <ResearchApplicationPanel />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ResearchApplicationPanel() {
  const { research } = joinPage;
  const hasFormUrl = Boolean(research.applicationFormUrl);

  return (
    <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md md:p-8">
      <h3 className="text-lg font-semibold text-white">科研方向报名</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/45">
        报名通过腾讯问卷、飞书表单等第三方平台收集，无需在本站填写或提交个人信息。
      </p>

      <ul className="mt-6 space-y-3 text-sm text-white/55">
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-xs font-semibold text-brand-300">
            1
          </span>
          <span>点击下方按钮，在新页面打开在线报名表</span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-xs font-semibold text-brand-300">
            2
          </span>
          <span>如实填写基本信息、意向方向与可投入时间</span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600/20 text-xs font-semibold text-brand-300">
            3
          </span>
          <span>提交后等待科研部联系，一般 3–5 个工作日内回复</span>
        </li>
      </ul>

      {hasFormUrl ? (
        <a
          href={research.applicationFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-sky px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-sky/20 transition-all hover:bg-accent-sky/90 sm:w-auto"
        >
          {research.applicationFormLabel}
          <span aria-hidden>↗</span>
        </a>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-5">
          <p className="text-sm font-medium text-white/80">在线报名表链接待配置</p>
          <p className="mt-2 text-xs leading-relaxed text-white/45">
            请联系社团获取最新报名入口，或发送邮件至{" "}
            <a href={`mailto:${research.fallbackContact}`} className="text-brand-400 hover:text-brand-300">
              {research.fallbackContact}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

function PartnerSection() {
  const { partner } = joinPage;

  return (
    <section id="partner" className="scroll-mt-24 bg-gradient-to-b from-surface-alt to-white section-padding">
      <div className="container-wide">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Partner</SectionLabel>
            <h2 className="mt-3 section-title text-ink">{partner.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">{partner.subtitle}</p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
          {partner.contacts.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-white p-5 text-center">
                <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.value}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-10 w-full max-w-[15rem] rounded-3xl border border-border bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-white">
              <Image
                src={partner.wechatQr.src}
                alt={partner.wechatQr.alt}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-ink">{partner.wechatQr.caption}</p>
            <p className="mt-1 text-center text-xs text-ink-muted">微信扫码关注 {partner.contacts[1]?.value}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
