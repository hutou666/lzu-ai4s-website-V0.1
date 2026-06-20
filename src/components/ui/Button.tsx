import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-white text-ink hover:bg-white/90 shadow-lg shadow-black/10",
  secondary:
    "border border-white/25 bg-transparent text-white hover:bg-white/10",
  ghost:
    "border border-border bg-transparent text-ink hover:border-brand-500 hover:text-brand-600",
  dark:
    "bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}
