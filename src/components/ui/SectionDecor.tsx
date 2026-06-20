"use client";

type DecorVariant = "light" | "light-alt" | "dark" | "dark-deep";

interface SectionDecorProps {
  variant?: DecorVariant;
}

export function SectionDecor({ variant = "light" }: SectionDecorProps) {
  if (variant === "light") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -right-20 h-[420px] w-[320px] rounded-[2.5rem] bg-gradient-to-bl from-brand-400/12 to-transparent" />
        <div className="absolute top-1/3 -left-16 h-48 w-48 rounded-full border border-brand-500/10 bg-brand-600/5" />
        <div className="absolute right-[12%] bottom-[15%] h-28 w-28 rotate-12 rounded-2xl bg-brand-700/6" />
        <svg className="absolute top-[20%] left-[8%] h-20 w-20 opacity-[0.07]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(0.48 0.17 265)" strokeWidth="10" strokeDasharray="60 180" />
        </svg>
      </div>
    );
  }

  if (variant === "light-alt") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/8 blur-2xl" />
        <div className="absolute top-[10%] right-[6%] h-36 w-36 rounded-3xl bg-gradient-to-br from-brand-600/8 to-accent-mint/6" />
        <div className="absolute bottom-[20%] right-[20%] h-16 w-16 rounded-full bg-brand-400/10" />
        <svg className="absolute right-[10%] top-[35%] h-24 w-24 opacity-[0.06]" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" rx="12" fill="none" stroke="oklch(0.55 0.19 265)" strokeWidth="8" transform="rotate(15 50 50)" />
        </svg>
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-600/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent-mint/8 blur-3xl" />
        <div className="absolute top-[15%] left-[5%] h-[200px] w-[140px] rounded-3xl bg-gradient-to-br from-brand-700/25 to-brand-600/10" />
        <div className="absolute right-[10%] top-[25%] h-[120px] w-[120px] rounded-2xl border border-white/6 bg-brand-500/8" />
        <div className="absolute right-[18%] bottom-[22%] h-20 w-20 rounded-full border border-accent-mint/20 bg-accent-mint/5" />
        <svg className="absolute left-[15%] bottom-[18%] h-16 w-16 opacity-25" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="oklch(0.78 0.12 175)" strokeWidth="6" />
        </svg>
      </div>
    );
  }

  // dark-deep
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="absolute -top-16 right-[20%] h-56 w-56 rounded-full bg-accent-sky/10 blur-2xl" />
      <div className="absolute top-[12%] -left-10 h-[260px] w-[180px] rounded-3xl bg-gradient-to-br from-brand-700/30 to-transparent" />
      <div className="absolute right-[8%] bottom-[28%] h-[100px] w-[100px] rounded-2xl bg-brand-500/15 backdrop-blur-sm" />
      <svg className="absolute top-[30%] right-[25%] h-20 w-20 opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(0.55 0.19 265)" strokeWidth="10" strokeDasharray="70 180" />
      </svg>
    </div>
  );
}
