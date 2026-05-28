"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, FileText, Wrench, Rocket } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/gsap";
import { EASE_SOFT } from "@/lib/animations";

const STEPS = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Connect",
    body: "Book a free 30-minute discovery call. Tell us about your brand, your goals, and what you need. We'll tell you exactly how we can help.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Brief",
    body: "Share your project brief with us. No templates, no forms. Just a conversation about what you want to build.",
  },
  {
    num: "03",
    icon: Wrench,
    title: "Build",
    body: "We get to work. You'll receive updates, previews, and can request revisions at any step. We don't disappear.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Launch",
    body: "We deliver. On time, polished, and ready to perform. The relationship doesn't end at launch — we're here after.",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-process-card]",
        { opacity: 0, y: 56, rotateX: 10, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: EASE_SOFT,
          transformPerspective: 1200,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="bg-bg-primary">
      <SectionLabel number="02" title="PROCESS" className="mb-12" />

      <div className="mx-auto max-w-[1400px]">
        <h2
          className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text-primary"
          style={{ fontSize: "var(--text-display)" }}
        >
          <span className="block">Getting started</span>
          <span className="block">is simple.</span>
        </h2>
        <p className="mt-8 max-w-xl font-sans text-[17px] font-light leading-[1.8] text-text-secondary">
          Our process is built for teams who want quality without the
          back-and-forth.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.num}
                data-process-card
                className="soft-card p-8 transition-transform duration-500 hover:-translate-y-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="font-display text-sm font-light text-text-muted">
                  {step.num}
                </span>
                <Icon className="mt-6 text-gold" size={28} strokeWidth={1} />
                <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.02em] text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-4 font-sans text-sm font-light leading-[1.75] text-text-secondary">
                  {step.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
