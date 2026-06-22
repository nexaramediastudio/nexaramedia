"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SCRUB = 1.4;

function resetServicesVisuals() {
  gsap.set("#services .services-pin", { opacity: 1, clearProps: "filter" });
  gsap.set(".services-pin .section-head", { clearProps: "y,opacity" });
  gsap.set(".services-window", { opacity: 1, x: 0, scale: 1, clearProps: "filter" });
}

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        ScrollTrigger.create({
          trigger: "#services",
          start: "top bottom",
          end: "bottom top",
          onEnter: resetServicesVisuals,
          onEnterBack: resetServicesVisuals,
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
      });

      mm.add("(max-width: 899px)", () => {
        gsap.set("body", { clearProps: "filter" });
        gsap.set("#hero", { clearProps: "opacity,filter,scale" });
      });
    });

    const refresh = () => {
      ScrollTrigger.refresh();
      resetServicesVisuals();
    };

    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", refresh);
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
      window.clearTimeout(t);
      document.body.classList.remove("is-dark-section");
      ctx.revert();
    };
  }, []);

  return <>{children}</>;
}
