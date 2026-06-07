"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLenisInstance } from "./LenisProvider";

const SCRUB = 1.4;

function resetServicesVisuals() {
  gsap.set("#services .services-pin", { opacity: 1, clearProps: "filter" });
  gsap.set(".services-pin .section-head", { clearProps: "y,opacity" });
  gsap.set(".services-window", { opacity: 1, x: 0, scale: 1, clearProps: "filter" });
}

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#services",
        start: "top bottom",
        end: "bottom top",
        onEnter: resetServicesVisuals,
        onEnterBack: resetServicesVisuals,
      });

      gsap.to("#hero", {
        scale: 0.97,
        opacity: 0,
        filter: "blur(3px)",
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top 90%",
          end: "top 35%",
          scrub: SCRUB,
          onLeaveBack: () => gsap.set("#hero", { clearProps: "opacity,filter,scale" }),
        },
      });

      gsap.fromTo(
        "#about .section-head",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 88%",
            end: "top 55%",
            scrub: SCRUB,
            onLeaveBack: () => gsap.set("#about .section-head", { clearProps: "y,opacity" }),
          },
        }
      );

      gsap.fromTo(
        ".about-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 88%",
            end: "top 45%",
            scrub: SCRUB,
            onLeaveBack: () => gsap.set(".about-card", { clearProps: "y,opacity" }),
          },
        }
      );

      gsap.fromTo(
        ".vs-window",
        { y: -32 },
        {
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#vs",
            start: "top 90%",
            end: "top 50%",
            scrub: SCRUB,
            onLeaveBack: () => gsap.set(".vs-window", { clearProps: "y" }),
          },
        }
      );

      gsap.fromTo(
        ".process-window",
        { x: 48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#process",
            start: "top 90%",
            end: "top 48%",
            scrub: SCRUB,
            onLeaveBack: () => gsap.set(".process-window", { clearProps: "x,opacity" }),
          },
        }
      );

      gsap.to("body", {
        backgroundColor: "#1a1a1a",
        ease: "none",
        scrollTrigger: {
          trigger: "#work",
          start: "top 92%",
          end: "top 38%",
          scrub: SCRUB,
        },
      });

      gsap.to("body", {
        backgroundColor: "#f5f4f0",
        ease: "none",
        scrollTrigger: {
          trigger: "#vs",
          start: "top 92%",
          end: "top 58%",
          scrub: SCRUB,
        },
      });
    });

    const refresh = () => {
      ScrollTrigger.refresh();
      resetServicesVisuals();
    };

    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [lenis]);

  return <>{children}</>;
}
