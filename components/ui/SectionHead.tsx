import { ReactNode } from "react";

type SectionHeadProps = {
  number?: string;
  title: ReactNode;
  kicker?: string;
  meta?: string;
  dark?: boolean;
  className?: string;
  titleClassName?: string;
};

export function SectionHead({
  number,
  title,
  kicker,
  meta,
  dark = false,
  className = "",
  titleClassName = "",
}: SectionHeadProps) {
  const showMeta = Boolean(number || meta);

  return (
    <header
      className={`section-head ${dark ? "section-head--dark" : ""} ${className}`.trim()}
    >
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h2 className={`section-title ${titleClassName}`.trim()}>{title}</h2>
      {showMeta && (
        <p className="section-meta">
          {number}
          {meta ? (number ? ` · ${meta}` : meta) : ""}
        </p>
      )}
    </header>
  );
}
