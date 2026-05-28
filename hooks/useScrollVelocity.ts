"use client";

import { useEffect, useState } from "react";

export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(1);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastY);
      const deltaTime = now - lastTime;

      if (deltaTime > 0) {
        const speed = deltaY / deltaTime;
        const multiplier = Math.min(2.5, Math.max(1, 1 + speed * 0.15));
        setVelocity(multiplier);
      }

      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return velocity;
}
