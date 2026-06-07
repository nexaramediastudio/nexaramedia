"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LENIS_EASE = (t: number) => 1 - Math.pow(1 - t, 4);

export function useLenis(): Lenis | null {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 2.2,
      easing: LENIS_EASE,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.55,
      touchMultiplier: 1,
      infinite: false,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis");

    instance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

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
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });
      instance.destroy();
      gsap.ticker.remove(raf);
      document.documentElement.classList.remove("lenis");
      setLenis(null);
    };
  }, []);

  return lenis;
}
