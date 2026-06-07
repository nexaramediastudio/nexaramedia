"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLenisInstance } from "./LenisProvider";

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis) return;

    const ctx = gsap.context(() => {
      // Hero → Services
      gsap.from("#services", {
        y: 60,
        opacity: 0,
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });

      // Services → VS
      gsap.from(".vs-window", {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: "#vs",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      // VS → Process
      gsap.from(".process-window", {
        x: 80,
        opacity: 0,
        scrollTrigger: {
          trigger: "#process",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      // Process → Work — cinematic light to dark
      gsap.to("body", {
        backgroundColor: "#1a1a1a",
        scrollTrigger: {
          trigger: "#work",
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      });

      // Work → Testimonials — dark to light
      gsap.to("body", {
        backgroundColor: "#f5f4f0",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [lenis]);

  return <>{children}</>;
}
