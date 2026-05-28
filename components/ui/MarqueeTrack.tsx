"use client";

import { useScrollVelocity } from "@/hooks/useScrollVelocity";

interface MarqueeTrackProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}

export function MarqueeTrack({
  children,
  direction = "left",
  duration = 35,
  className = "",
}: MarqueeTrackProps) {
  const velocity = useScrollVelocity();
  const adjustedDuration = duration / velocity;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${direction === "left" ? "animate-left" : "animate-right"}`}
        style={
          {
            "--marquee-duration": `${adjustedDuration}s`,
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center whitespace-nowrap">{children}</div>
        <div className="flex shrink-0 items-center whitespace-nowrap" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
