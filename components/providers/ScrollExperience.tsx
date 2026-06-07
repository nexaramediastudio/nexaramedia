"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLenisInstance } from "./LenisProvider";

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis) return;

    const ctx = gsap.context(() => {
      // HERO → SERVICES
      gsap.to("#hero", {
        scale: 0.96,
        opacity: 0,
        filter: "blur(4px)",
        ease: "none",
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });

      gsap.from("#services", {
        y: 60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });

      // SERVICES → VS
      gsap.to(".services-window", {
        x: "-100vw",
        opacity: 0,
        ease: "power3.in",
        scrollTrigger: {
          trigger: "#vs",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      gsap.from(".vs-window", {
        y: -60,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#vs",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      // VS → PROCESS
      gsap.from(".process-window", {
        x: 80,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#process",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      // PROCESS → WORK
      gsap.to("body", {
        backgroundColor: "#1a1a1a",
        ease: "none",
        scrollTrigger: {
          trigger: "#work",
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      });

      // WORK → TESTIMONIALS
      gsap.to("body", {
        backgroundColor: "#f5f4f0",
        ease: "none",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      });

      // TESTIMONIALS → CTA — cards clear out
      gsap.to(".testimonial-card", {
        x: -40,
        opacity: 0,
        stagger: 0.06,
        ease: "power3.in",
        scrollTrigger: {
          trigger: "#cta",
          start: "top 85%",
          end: "top 55%",
          scrub: true,
        },
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [lenis]);

  return <>{children}</>;
}
