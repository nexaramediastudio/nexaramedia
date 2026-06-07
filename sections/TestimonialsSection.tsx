"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TESTIMONIALS = [
  {
    quote:
      "Nexara completely transformed how we present Ridermo online. The website feels premium and the results have been unreal.",
    name: "Ridermo Team",
    company: "Ridermo Motorcycle Showroom",
    initials: "R",
  },
  {
    quote:
      "The management system they built for us saves hours every week. Clean, fast, and exactly what we needed.",
    name: "Ridermo Ops",
    company: "Ridermo",
    initials: "R",
  },
  {
    quote:
      "Our brand finally looks like what we always imagined. Nexara got it on the first try.",
    name: "Pryme Founder",
    company: "Pryme",
    initials: "P",
  },
];

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        x: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#testimonials", start: "top 70%" },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId: number;
    let paused = false;
    let pos = 0;

    const drift = () => {
      if (!paused && !isDragging.current) {
        pos += 0.3;
        if (pos >= track.scrollWidth / 2) pos = 0;
        track.scrollLeft = pos;
      }
      animId = requestAnimationFrame(drift);
    };
    animId = requestAnimationFrame(drift);

    track.addEventListener("mouseenter", () => { paused = true; });
    track.addEventListener("mouseleave", () => { paused = false; });

    const onDown = (e: PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      scrollLeft.current = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      track.scrollLeft = scrollLeft.current - (e.clientX - startX.current);
    };
    const onUp = () => { isDragging.current = false; };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section id="testimonials">
      <p className="section-label">Loved By Clients / 06</p>

      <div ref={trackRef} className="testimonials-track">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <article key={`${t.name}-${i}`} className="testimonial-card">
            <p className="testimonial-stars">★★★★★</p>
            <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="testimonial-divider" />
            <footer className="testimonial-author">
              <span className="testimonial-avatar">{t.initials}</span>
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-company">{t.company}</p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
