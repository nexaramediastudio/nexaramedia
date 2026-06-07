"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MacWindow } from "@/components/ui/MacWindow";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

const EXCHANGES = [
  {
    client: "How soon can we start?",
    left: "We'll need to schedule a discovery call to align stakeholders and define scope first…",
    right: "Tomorrow. Brief us today.",
  },
  {
    client: "What will it cost?",
    left: "We'll prepare a detailed proposal after our initial alignment sessions…",
    right: "Fixed price. No surprises. Ever.",
  },
  {
    client: "Who do I work with?",
    left: "Your dedicated project manager will coordinate with our team…",
    right: "Me. The founder. Directly.",
  },
];

export function VSSection() {
  const lenis = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vs-exchange", {
        y: 16,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#vs", start: "top 65%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vs" ref={sectionRef}>
      <p className="section-label">Why Choose Us / 03</p>
      <p className="vs-subtitle">the-difference.app</p>

      <MacWindow title="the-difference.app" className="vs-window">
        <div className="vs-window-inner">
          <div className="vs-headers">
            <div className="vs-col-header">
              <span className="vs-avatar-gray" />
              <span className="vs-agency-name-muted">other-agency</span>
            </div>
            <div className="vs-col-header">
              <span className="vs-avatar-n">N</span>
              <span>nexara</span>
            </div>
          </div>

          {EXCHANGES.map((ex) => (
            <div key={ex.client} className="vs-exchange">
              <p className="vs-client-msg">{ex.client}</p>
              <div className="vs-bubbles">
                <div className="vs-bubble-left">{ex.left}</div>
                <div className="vs-bubble-right">{ex.right}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="vs-status-bar">
          <span>⏳ other-agency · still drafting proposal</span>
          <span>✅ nexara · already shipped</span>
        </div>
      </MacWindow>

      <p className="vs-tagline">
        Same client. Same brief.{" "}
        <span className="accent">Wildly different story.</span>
      </p>

      <div className="vs-cta-wrap">
        <Link
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("work", lenis);
          }}
          className="vs-see-work"
        >
          see the work →
        </Link>
      </div>
    </section>
  );
}
