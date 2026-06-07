"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const WA_NUMBER = "94711137748";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-headline", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "#cta", start: "top 72%", toggleActions: "play none none none", once: true },
      });
      gsap.from(".cta-sub, .cta-buttons", {
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#cta", start: "top 68%", toggleActions: "play none none none", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" ref={sectionRef}>
      <h2 className="cta-headline">
        <span className="block">Let&apos;s build</span>
        <span className="block accent">something great.</span>
      </h2>

      <p className="cta-sub">Colombo, Sri Lanka · Replies within hours</p>

      <div className="cta-buttons">
        <Link
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Nexara! I'd like to start a project.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent"
        >
          Book a call
        </Link>
        <a href="mailto:nexaramediastudio@gmail.com" className="cta-email">
          nexaramediastudio@gmail.com
        </a>
      </div>

      <footer className="site-footer">
        © Nexara Media 2026 ·{" "}
        <a href="https://www.instagram.com/nexaramediastudio/" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        ·{" "}
        <a href="https://www.facebook.com/share/18gLjUTbY6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
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
