"use client";

import { useEffect, useState } from "react";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";

const SECTIONS = [
  { id: "hero", label: "01 · HERO" },
  { id: "clients", label: "02 · CLIENTS" },
  { id: "about", label: "03 · ABOUT" },
  { id: "process", label: "04 · PROCESS" },
  { id: "services", label: "05 · SERVICES" },
  { id: "work", label: "06 · WORK" },
  { id: "contact", label: "07 · CONTACT" },
];

export function SectionNav() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const lenis = useLenisInstance();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed left-7 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      aria-label="Section navigation"
    >
      <div className="relative flex flex-col items-center gap-5">
        <div
          className="absolute left-1/2 top-2 h-[calc(100%-16px)] w-px -translate-x-1/2 bg-[var(--divider)]"
          aria-hidden
        />
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id, lenis)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex items-center"
              aria-label={label}
            >
              <span
                className={`relative z-10 block h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? "scale-[1.4] bg-gold opacity-100 shadow-[0_0_12px_rgba(201,169,110,0.5)]"
                    : "bg-text-muted opacity-40 group-hover:scale-125 group-hover:opacity-100"
                }`}
              />
              <span
                className={`absolute left-5 whitespace-nowrap font-sans text-[11px] font-medium tracking-[0.12em] transition-all duration-500 ${
                  hovered === id
                    ? "translate-x-0 opacity-100 text-text-secondary"
                    : "-translate-x-1 opacity-0"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
