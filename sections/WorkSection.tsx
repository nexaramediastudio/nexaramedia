"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const Galaxy = dynamic(() => import("@/components/ui/Galaxy"), {
  ssr: false,
  loading: () => null,
});

const PROJECTS = [
  {
    num: "01",
    name: "Ridermo Website",
    type: "Web",
    meta: "Motorcycle Showroom · 2024",
    bars: [88, 62, 74],
  },
  {
    num: "02",
    name: "Ridermo System",
    type: "Product",
    meta: "Internal Dashboard · 2024",
    bars: [70, 90, 55],
  },
  {
    num: "03",
    name: "Pryme",
    type: "Brand",
    meta: "T-Shirt Brand · 2024",
    bars: [60, 78, 66],
  },
];

export function WorkSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#work", start: "top 70%", toggleActions: "play none none none" },
      });

      ScrollTrigger.create({
        trigger: "#work",
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => document.body.classList.add("is-dark-section"),
        onLeave: () => document.body.classList.remove("is-dark-section"),
        onLeaveBack: () => document.body.classList.remove("is-dark-section"),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goCta = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection("cta", lenis);
  };

  return (
    <section id="work" ref={sectionRef} className="work-section">
      <div className="work-section-bg" aria-hidden>
        <Galaxy
          starSpeed={0.5}
          density={1}
          hueShift={140}
          speed={1}
          glowIntensity={0.3}
          saturation={0}
          mouseRepulsion
          repulsionStrength={2}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          transparent
        />
      </div>

      <div className="work-section-inner">
        <SectionHead number="04" kicker="selected projects" title="Featured work" dark />

        <div className="work-grid">
          {PROJECTS.map((p, i) => (
            <Link
              key={p.num}
              href="#cta"
              onClick={goCta}
              className={`work-card ${i === 0 ? "work-card--feature" : ""}`}
            >
              <div className="work-card-preview" aria-hidden>
                {p.bars.map((w, j) => (
                  <span key={j} className="work-preview-bar" style={{ width: `${w}%` }} />
                ))}
              </div>

              <div className="work-card-body">
                <div className="work-card-top">
                  <span className="work-card-num">/{p.num}</span>
                  <span className="work-card-type">{p.type}</span>
                </div>
                <h3 className="work-card-name">{p.name}</h3>
                <p className="work-card-meta">{p.meta}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="work-more-wrap">
          <Link href="#cta" onClick={goCta} className="work-more">
            See more work →
          </Link>
        </div>
      </div>
    </section>
  );
}
