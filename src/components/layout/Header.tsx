"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-deep/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/club-logo.jpg"
            alt="兰州大学AI探索者联盟"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
            priority
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">AI 探索者联盟</p>
            <p className="max-w-[12rem] text-[10px] leading-snug tracking-[0.04em] text-white/45">
              {siteConfig.nameEn}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="主导航">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-all hover:bg-white/90 sm:inline-flex"
          >
            加入我们
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative xl:hidden">
      <summary className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 text-white [&::-webkit-details-marker]:hidden">
        <span className="h-0.5 w-4 rounded-full bg-current" />
        <span className="h-0.5 w-4 rounded-full bg-current" />
        <span className="sr-only">打开菜单</span>
      </summary>
      <nav
        className="absolute top-12 right-0 z-[60] w-[min(100vw-2rem,18rem)] rounded-2xl border border-white/10 bg-deep-elevated p-3 shadow-2xl"
        aria-label="移动端导航"
      >
        {siteConfig.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm text-white/75 transition-colors hover:bg-white/8 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/join"
          className="mt-2 block rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-ink"
        >
          加入我们
        </Link>
      </nav>
    </details>
  );
}
