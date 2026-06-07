"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

export function HeroSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-bg-text", { opacity: 0, duration: 1.5, delay: 0.3 });
      gsap.from(".hero-word", {
        y: 40,
        opacity: 0,
        filter: "blur(4px)",
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.6, delay: 0.7 });
      gsap.from(".hero-buttons", { y: 20, opacity: 0, duration: 0.5, delay: 0.9 });
      gsap.from(".hero-float-card", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 1.1,
        ease: "elastic.out(1, 0.6)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const onDown = (e: MouseEvent | TouchEvent) => {
      dragging = true;
      const pt = "touches" in e ? e.touches[0] : e;
      startX = pt.clientX - offsetX;
      startY = pt.clientY - offsetY;
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const pt = "touches" in e ? e.touches[0] : e;
      offsetX = pt.clientX - startX;
      offsetY = pt.clientY - startY;
      gsap.set(card, { x: offsetX, y: offsetY });
    };

    const onUp = () => {
      dragging = false;
    };

    card.addEventListener("mousedown", onDown);
    card.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      card.removeEventListener("mousedown", onDown);
      card.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero-status">
        <span className="hero-status-dot" />
        Available for projects
      </div>

      <span className="hero-bg-text" aria-hidden>
        NEXARA
      </span>

      <h1 className="hero-headline">
        <span className="hero-word block">BRANDS THAT</span>
        <span className="hero-word block accent">CANNOT</span>
        <span className="hero-word block">BE IGNORED.</span>
      </h1>

      <p className="hero-subtitle">we don&apos;t do forgettable ✦</p>

      <div className="hero-buttons">
        <Link
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("work", lenis);
          }}
          className="btn-primary-dark"
        >
          See Our Work →
        </Link>
        <Link
          href="#cta"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("cta", lenis);
          }}
          className="btn-outline-dark"
        >
          Book a Call
        </Link>
      </div>

      <div
        ref={cardRef}
        className="hero-float-card"
        style={{ right: "8%", bottom: "18%" }}
      >
        <span className="hero-float-badge">10+ brands</span>
        <p className="hero-float-text">Trusted by growing brands across Sri Lanka</p>
      </div>
    </section>
  );
}
