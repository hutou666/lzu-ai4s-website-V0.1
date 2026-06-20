import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-deep text-white/60">
      <div className="section-padding container-wide">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 text-sm">{siteConfig.nameEn}</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">依托单位</p>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.affiliations.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">快速导航</p>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">联系方式</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li>公众号：{siteConfig.wechat}</li>
            </ul>
            <div className="mt-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-white/15 text-[10px] text-white/35">
              公众号二维码
              <br />
              待替换
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p>
            <a
              href="https://xxxy.lzu.edu.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white/80"
            >
              兰州大学 · 信息科学与工程学院
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
