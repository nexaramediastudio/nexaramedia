"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLenisInstance } from "./LenisProvider";

// Sections that manage their own complex GSAP — skip global effects on these
const SELF_MANAGED = ["hero", "services"];

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis) return;

    const ctx = gsap.context(() => {

      // ── 1. CINEMATIC SECTION ENTRANCE ───────────────────────────
      // Sections slide up into view — y only, no opacity on the container
      // so child element opacity animations don't conflict.
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        if (SELF_MANAGED.includes(section.id)) return;

        gsap.fromTo(
          section,
          { y: 56 },
          {
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // ── 2. HEADING PARALLAX ─────────────────────────────────────
      // h2 and display headings drift upward slower than scroll speed,
      // creating the illusion of depth between text and background.
      gsap.utils.toArray<HTMLElement>("section h2").forEach((heading) => {
        const section = heading.closest<HTMLElement>("section");
        if (!section || SELF_MANAGED.includes(section.id ?? "")) return;

        gsap.fromTo(
          heading,
          { y: 0 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          }
        );
      });

      // ── 3. CARD / SOFT-CARD PARALLAX ───────────────────────────
      // Cards float up slightly slower than the page — gives depth.
      gsap.utils.toArray<HTMLElement>(".soft-card").forEach((card, i) => {
        const section = card.closest<HTMLElement>("section");
        if (!section || SELF_MANAGED.includes(section.id ?? "")) return;

        gsap.fromTo(
          card,
          { y: 0 },
          {
            y: i % 2 === 0 ? -30 : -20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      });

      // ── 4. DATA-REVEAL — staggered line/element reveals ────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // ── 5. SECTION LABEL REVEALS ───────────────────────────────
      // The small "01 · ABOUT" labels wipe in from left.
      gsap.utils.toArray<HTMLElement>(".section-label").forEach((label) => {
        gsap.fromTo(
          label,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: label,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // ── 6. HORIZONTAL DIVIDER LINE REVEALS ─────────────────────
      // Thin <hr> / border lines draw across with scaleX.
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // ── 7. PROCESS / FAQ STEP STAGGER ──────────────────────────
      // Any group of [data-stagger-child] elements inside a container
      // animates in one-by-one as the block enters.
      document
        .querySelectorAll<HTMLElement>("[data-stagger-parent]")
        .forEach((parent) => {
          const children = parent.querySelectorAll<HTMLElement>(
            "[data-stagger-child]"
          );
          if (!children.length) return;

          gsap.fromTo(
            children,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        });

      // ── 8. FLOATING ELEMENTS (ambient) ─────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -1 : 1) * 14,
          duration: 3.8 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // ── 9. STAT COUNTERS ────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.getAttribute("data-count")) || 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });

    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [lenis]);

  return <>{children}</>;
}
