"use client";

import { useEffect, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/gsap";
import { EASE_SOFT } from "@/lib/animations";

const STATS = [
  { value: 10, suffix: "+", label: "Brands worked with" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
  { value: 7, suffix: "", label: "Core services" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-line]",
        { opacity: 0, y: 40, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: EASE_SOFT,
          transformPerspective: 1200,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: EASE_SOFT,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      gsap.fromTo(
        "[data-about-body]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: EASE_SOFT,
          scrollTrigger: {
            trigger: "[data-about-body]",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      STATS.forEach((stat, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: EASE_SOFT,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-bg-secondary">
      <SectionLabel number="01" title="ABOUT" className="mb-12" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-20 lg:grid-cols-2">
        <div>
          <h2
            className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text-primary"
            style={{ fontSize: "var(--text-display)" }}
          >
            <span data-about-line className="block">
              We help brands
            </span>
            <span data-about-line className="block">
              establish what
            </span>
            <span data-about-line className="block">
              modern looks like.
            </span>
          </h2>
          <div
            ref={lineRef}
            className="mt-10 h-px w-[120px] origin-left bg-gold/50"
          />
        </div>

        <div>
          <p
            data-about-body
            className="font-sans text-[17px] font-light leading-[1.85] text-text-secondary"
          >
            We&apos;re a full-spectrum digital studio working with established
            brands and serious operators who want more than just a pretty
            website. We build the systems, identities, and experiences that give
            businesses a real competitive edge — and we care deeply about every
            detail.
          </p>

          <div className="my-12 h-px bg-[var(--divider)]" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <span
                  ref={(el) => {
                    statRefs.current[i] = el;
                  }}
                  className="font-display text-5xl font-light text-gold"
                >
                  0{stat.suffix}
                </span>
                <p className="mt-2 font-sans text-[11px] tracking-wide text-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
