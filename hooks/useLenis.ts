"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LENIS_EASE = (t: number) => 1 - Math.pow(1 - t, 4);
const DESKTOP_MQ = "(min-width: 900px)";

function useNativeScroll() {
  ScrollTrigger.scrollerProxy(document.documentElement, {});
  ScrollTrigger.defaults({ scroller: window });
  document.documentElement.classList.remove("lenis");
  ScrollTrigger.refresh();
}

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let instance: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let refreshTimer: number | undefined;
    let refreshTimer2: number | undefined;

    const teardownLenis = () => {
      if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
      if (refreshTimer2 !== undefined) window.clearTimeout(refreshTimer2);
      window.removeEventListener("load", refresh);

      if (instance) {
        instance.destroy();
        instance = null;
      }

      if (raf) {
        gsap.ticker.remove(raf);
        raf = null;
      }

      useNativeScroll();
      setLenis(null);
    };

    const refresh = () => ScrollTrigger.refresh();

    const setupLenis = () => {
      instance = new Lenis({
        duration: 1.6,
        easing: LENIS_EASE,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        infinite: false,
      });

      setLenis(instance);
      document.documentElement.classList.add("lenis");

      instance.on("scroll", ScrollTrigger.update);

      raf = (time: number) => {
        instance?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.defaults({ scroller: window });

      window.addEventListener("load", refresh);
      refreshTimer = window.setTimeout(refresh, 200);
      refreshTimer2 = window.setTimeout(refresh, 1000);
    };

    const applyMode = () => {
      const desktop = window.matchMedia(DESKTOP_MQ).matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (instance) {
        teardownLenis();
      }

      if (desktop && !reducedMotion) {
        setupLenis();
        return;
      }

      useNativeScroll();
      window.addEventListener("load", refresh);
      refreshTimer = window.setTimeout(refresh, 200);
    };

    applyMode();

    const mq = window.matchMedia(DESKTOP_MQ);
    const onMqChange = () => applyMode();
    mq.addEventListener("change", onMqChange);

    return () => {
      mq.removeEventListener("change", onMqChange);
      teardownLenis();
    };
  }, []);

  return lenis;
}
