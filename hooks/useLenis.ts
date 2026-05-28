"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // quartic ease-out — luxurious feel
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      infinite: false,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis");

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 200);
    const refreshTimer2 = window.setTimeout(refresh, 1000);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      window.clearTimeout(refreshTimer2);
      instance.destroy();
      gsap.ticker.remove(raf);
      document.documentElement.classList.remove("lenis");
      setLenis(null);
    };
  }, []);

  return lenis;
}
