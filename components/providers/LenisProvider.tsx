"use client";

import { createContext, useContext, useEffect } from "react";
import type Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import { ScrollExperience } from "./ScrollExperience";

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance(): Lenis | null {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(t);
  }, [lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      <ScrollExperience>{children}</ScrollExperience>
    </LenisContext.Provider>
  );
}
