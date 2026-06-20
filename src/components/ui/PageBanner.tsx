import { SectionLabel } from "./SectionLabel";

interface PageBannerProps {
  label: string;
  title: string;
  description?: string;
}

export function PageBanner({ label, title, description }: PageBannerProps) {
  return (
    <div className="relative overflow-hidden bg-deep pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-brand-500/10 blur-3xl" />
      </div>
      <div className="section-padding container-wide relative">
        <SectionLabel dark>{label}</SectionLabel>
        <h1 className="mt-4 display-title text-white">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
