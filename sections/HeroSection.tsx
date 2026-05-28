"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitIntoChars } from "@/lib/splitChars";
import { EASE_OUT, EASE_SOFT } from "@/lib/animations";

const AVATAR_COLORS = ["#C9A96E", "#9A9590", "#0F3D2E", "#5A5652", "#B8965A"];

export function HeroSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top bar
      gsap.fromTo(
        "[data-hero-topbar]",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.7, ease: EASE_SOFT }
      );

      // Descriptor block
      gsap.fromTo(
        "[data-hero-desc]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: EASE_SOFT }
      );

      // Headline lines — character reveal
      document.querySelectorAll("[data-hero-line]").forEach((line, i) => {
        gsap.fromTo(
          line.querySelectorAll(".hero-char"),
          { opacity: 0, y: 60, rotateX: 12 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.012,
            delay: 0.3 + i * 0.16,
            ease: EASE_OUT,
            transformPerspective: 1400,
          }
        );
      });

      // Bottom bar
      gsap.fromTo(
        "[data-hero-bottom]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.85, ease: EASE_SOFT }
      );

      // Parallax out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (contentRef.current)
            gsap.set(contentRef.current, { y: -self.progress * 70 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderLine = (text: string, cls: string, key: string) => (
    <div data-hero-line={key} className={`hero-line ${cls}`}>
      {splitIntoChars(text).map((char, i) => (
        <span key={`${key}-${i}`} className="hero-char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative overflow-hidden bg-bg-primary"
    >
      <div className="grain-overlay" />

      <div ref={contentRef} className="hero-inner relative z-10">

        {/* ── Top bar ── */}
        <div data-hero-topbar className="hero-topbar opacity-0">
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Available for new projects
            </span>
          </div>
          <span className="font-sans text-[11px] font-light tracking-[0.12em] text-text-muted">
            Digital Studio &nbsp;·&nbsp; Est. 2025
          </span>
        </div>

        {/* ── Descriptor ── */}
        <div data-hero-desc className="hero-descriptor opacity-0">
          <p className="font-sans text-[14px] font-light leading-[1.7] text-text-secondary max-w-[260px]">
            We are a digital studio helping brands build what modern looks like.
          </p>
          <div className="hero-scroll-arrow" aria-hidden>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="8" y1="0" x2="8" y2="20" />
              <polyline points="3,15 8,21 13,15" />
            </svg>
          </div>
        </div>

        {/* ── Mega headline ── */}
        <h1 className="hero-headline font-display">
          {renderLine("Your new", "hero-line-1", "l1")}
          {renderLine("creative", "hero-line-2", "l2")}
          {renderLine("partner.", "hero-line-3 text-gold", "l3")}
        </h1>

        {/* ── Divider ── */}
        <div className="hero-divider" />

        {/* ── Bottom bar ── */}
        <div data-hero-bottom className="hero-bottom opacity-0">
          {/* Sub text */}
          <p className="font-sans text-[15px] font-light leading-[1.85] text-text-secondary max-w-[400px]">
            We build the systems, experiences, and identities
            that define what modern business looks like.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection("contact", lenis); }}
              data-cursor="link"
              className="hero-cta-primary"
            >
              Start a Project →
            </Link>
            <Link
              href="#work"
              onClick={(e) => { e.preventDefault(); scrollToSection("work", lenis); }}
              data-cursor="link"
              className="hero-cta-ghost group"
            >
              <span className="inline-block transition-transform duration-500 ease-soft group-hover:translate-x-1.5">
                View Our Work →
              </span>
            </Link>
          </div>

          {/* Social proof */}
          <div className="hero-proof">
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-[1.5px] border-bg-primary"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div>
              <span className="block text-xs tracking-widest text-gold">★★★★★</span>
              <span className="font-sans text-[11px] font-light text-text-muted">
                Trusted by 10+ brands
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
