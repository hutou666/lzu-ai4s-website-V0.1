import Link from "next/link";
import { type ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export function SectionHeader({ label, title, description, action }: SectionHeaderProps) {
  return (
    <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {label && <SectionLabel>{label}</SectionLabel>}
        <h2 className="mt-2 section-title text-ink">{title}</h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
        >
          {action.label}
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "muted";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "bg-brand-600/8 text-brand-700",
    accent: "bg-brand-600/10 text-brand-600",
    muted: "bg-surface-alt text-ink-muted",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
