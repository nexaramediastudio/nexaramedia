"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { MacWindow } from "@/components/ui/MacWindow";
import { SectionHead } from "@/components/ui/SectionHead";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

const THEM = {
  label: "Typical agency",
  points: [
    "Weeks of calls before anything gets designed.",
    "Senior sells it — junior team builds it.",
    "Retainer grows while output stays thin.",
    "Revision #6 and the deck still says WIP.",
    "Polished enough to approve. Too safe to remember.",
  ],
};

const US = {
  label: "Nexara",
  points: [
    "Founder on WhatsApp from the first message.",
    "Real screens in days — not next quarter.",
    "Fixed scope, fixed price, zero invoice shock.",
    "Less process theatre. More things live.",
    "Custom, sharp, built to stop the scroll.",
  ],
};

export function VSSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vs-section .section-head, .vs-window-wrap", {
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#vs",
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vs" ref={sectionRef} className="vs-section">
      <SectionHead
        number="05"
        kicker="the difference"
        title={
          <>
            Same brief.
            <br />
            <span className="section-title-accent">Different outcome.</span>
          </>
        }
        meta="side by side"
        titleClassName="section-title--statement"
      />

      <div className="vs-window-wrap">
        <MacWindow title="nexara-vs.fig" className="vs-window">
          <div className="vs-stage">
            <div className="vs-compare">
              <article className="vs-card vs-card-them">
                <p className="vs-card-label">{THEM.label}</p>
                <ul className="vs-list">
                  {THEM.points.map((point) => (
                    <li key={point} className="vs-list-item vs-list-no">
                      <X className="vs-list-icon" size={17} strokeWidth={2.25} aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <div className="vs-divider" aria-hidden>
                <span className="vs-divider-line" />
                <span className="vs-divider-badge">vs</span>
                <span className="vs-divider-line" />
              </div>

              <article className="vs-card vs-card-us">
                <p className="vs-card-label">{US.label}</p>
                <ul className="vs-list">
                  {US.points.map((point) => (
                    <li key={point} className="vs-list-item vs-list-yes">
                      <Check className="vs-list-icon" size={17} strokeWidth={2.5} aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="vs-footer">
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
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
