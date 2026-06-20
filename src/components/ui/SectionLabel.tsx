interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.2em] uppercase ${
        dark ? "text-brand-400" : "text-brand-600"
      }`}
    >
      {children}
    </p>
  );
}
