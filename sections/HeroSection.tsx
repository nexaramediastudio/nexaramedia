"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

export function HeroSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow, .hero-intro, .hero-buttons", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(".hero-word", {
        y: 40,
        opacity: 0,
        stagger: 0.09,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from(".hero-footer", {
        y: 10,
        opacity: 0,
        duration: 0.55,
        delay: 0.55,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            Nexara <span aria-hidden>•</span> Design + Dev Studio
          </p>

          <h1 className="hero-headline">
            <span className="hero-headline-line hero-word">REMEMBERED</span>
            <span className="hero-headline-line hero-word">
              <span className="accent">PREFERRED</span>
            </span>
          </h1>

          <div className="hero-intro">
            <p className="hero-tagline">
              We don&apos;t do forgettable <span aria-hidden>+</span>
            </p>
            <div className="hero-subtitle-select">
              <span className="hero-select-handle hero-select-handle--tl" aria-hidden />
              <span className="hero-select-handle hero-select-handle--tr" aria-hidden />
              <span className="hero-select-handle hero-select-handle--bl" aria-hidden />
              <span className="hero-select-handle hero-select-handle--br" aria-hidden />
              <p className="hero-subtitle">
                <span className="hero-subtitle-line">Most brands you can scroll right past.</span>
                <span className="hero-subtitle-line">The ones we build do this to your eyes.</span>
              </p>
            </div>
          </div>

          <div className="hero-buttons">
            <Link
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("cta", lenis);
              }}
              className="hero-btn hero-btn--primary"
            >
              Start a project
              <ArrowRight size={17} strokeWidth={2.25} aria-hidden />
            </Link>
            <Link
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("work", lenis);
              }}
              className="hero-btn hero-btn--secondary"
            >
              See our work
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-footer">
        <div className="hero-corner hero-corner--bl">
          <p>Based in Colombo</p>
          <p>Working worldwide</p>
        </div>
        <div className="hero-corner hero-corner--br">
          <p>Open for projects</p>
          <p>Reply within 48 hours</p>
        </div>
      </div>
    </section>
  );
}
