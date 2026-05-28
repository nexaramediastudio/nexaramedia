"use client";

import { useEffect, useRef } from "react";
import { MarqueeTrack } from "@/components/ui/MarqueeTrack";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ROW1 =
  "· AI AUTOMATION · WEB DEVELOPMENT · BRANDING · DIGITAL EXPERIENCES · CREATIVE MEDIA ·";
const ROW2 =
  "· BUSINESS SYSTEMS · NEXARA MEDIA · PREMIUM CRAFT · MODERN SOLUTIONS · BUILT FOR BRANDS ·";

export function ServicesMarqueeSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach(() => {});
  }, []);

  return (
    <section ref={ref} className="!py-0 overflow-hidden bg-bg-primary" style={{ minHeight: 80 }}>
      <div className="border-y border-[var(--divider)] py-4">
        <MarqueeTrack duration={40} direction="left">
          <span className="px-4 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-text-muted">
            {ROW1}
          </span>
        </MarqueeTrack>
      </div>
      <div className="border-b border-[var(--divider)] py-4">
        <MarqueeTrack duration={40} direction="right">
          <span className="px-4 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
            {ROW2}
          </span>
        </MarqueeTrack>
      </div>
    </section>
  );
}
