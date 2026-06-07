"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROJECTS = [
  { num: "01", name: "Ridermo Website", meta: "Motorcycle Showroom · 2024" },
  { num: "02", name: "Ridermo System", meta: "Internal Dashboard · 2024" },
  { num: "03", name: "Pryme", meta: "T-Shirt Brand · 2024" },
];

export function WorkSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-row", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#work", start: "top 70%" },
      });

      ScrollTrigger.create({
        trigger: "#work",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
        onEnter: () => document.body.classList.add("is-dark-section"),
        onLeaveBack: () => document.body.classList.remove("is-dark-section"),
      });

      ScrollTrigger.create({
        trigger: "#testimonials",
        start: "top 90%",
        end: "top 50%",
        scrub: true,
        onEnter: () => document.body.classList.remove("is-dark-section"),
        onLeaveBack: () => document.body.classList.add("is-dark-section"),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef}>
      <p className="section-label">Featured Work / 05</p>

      {PROJECTS.map((p) => (
        <Link key={p.num} href="#cta" onClick={(e) => { e.preventDefault(); scrollToSection("cta", lenis); }} className="work-row">
          <span className="work-num">/{p.num}</span>
          <span className="work-name">{p.name}</span>
          <span className="work-meta">{p.meta}</span>
        </Link>
      ))}

      <Link
        href="#cta"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("cta", lenis);
        }}
        className="work-more"
      >
        See more work →
      </Link>
    </section>
  );
}
