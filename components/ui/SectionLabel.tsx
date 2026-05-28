interface SectionLabelProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionLabel({ number, title, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-text-muted ${className}`}
    >
      {number} · {title}
    </p>
  );
}
