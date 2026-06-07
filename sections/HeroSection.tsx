"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

export function HeroSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        y: 48,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".hero-subtitle", { y: 24, opacity: 0, duration: 0.7, delay: 0.55 });
      gsap.from(".hero-buttons", { y: 20, opacity: 0, duration: 0.6, delay: 0.75 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <h1 className="hero-headline">
        <span className="hero-word block">BRANDS THAT</span>
        <span className="hero-word block accent">CANNOT</span>
        <span className="hero-word block">BE IGNORED.</span>
      </h1>

      <p className="hero-subtitle">Premium creative for brands that mean business.</p>

      <div className="hero-buttons">
        <Link
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("work", lenis);
          }}
          className="btn-primary-dark"
        >
          See our work
        </Link>
        <Link
          href="#cta"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("cta", lenis);
          }}
          className="btn-outline-dark"
        >
          Start a project
        </Link>
      </div>
    </section>
  );
}
