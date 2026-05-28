interface GoldDividerProps {
  width?: number;
  className?: string;
}

export function GoldDivider({ width = 120, className = "" }: GoldDividerProps) {
  return (
    <div
      className={`h-px bg-gold/50 origin-left ${className}`}
      style={{ width }}
    />
  );
}
