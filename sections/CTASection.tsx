"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const WA_NUMBER = "94711137748";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "#cta", start: "top 70%" },
      });
      tl.from(".cta-headline", {
        scale: 0.82,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
      })
        .from(
          ".cta-bubble",
          { x: 40, opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .from(".cta-buttons", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" ref={sectionRef}>
      <div className="cta-bubble">
        <span className="cta-bubble-avatar">N</span>
        <p className="cta-bubble-text">
          We actually reply. Usually within a couple of hours.
        </p>
      </div>

      <h2 className="cta-headline">
        <span className="block">LET&apos;S BUILD</span>
        <span className="block accent">SOMETHING.</span>
      </h2>

      <p className="cta-sub">Tell us what you&apos;re working on. · Colombo, Sri Lanka</p>

      <div className="cta-buttons">
        <Link
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Nexara! I'd like to book a discovery call.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
        >
          Book a discovery call
        </Link>
        <a href="mailto:nexaramediastudio@gmail.com" className="cta-email">
          nexaramediastudio@gmail.com
        </a>
      </div>

      <p className="cta-status">
        <span className="hero-status-dot" />
        2 online · replies in ~2 hrs
      </p>

      <footer className="site-footer">
        © Nexara Media 2026 ·{" "}
        <a
          href="https://www.instagram.com/nexaramediastudio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        ·{" "}
        <a
          href="https://www.facebook.com/share/18gLjUTbY6/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        ·{" "}
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </footer>
    </section>
  );
}
