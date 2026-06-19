"use client";

import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/ui/LiquidEther"), {
  ssr: false,
  loading: () => null,
});

export function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden>
      <div className="site-bg__base" />
      <LiquidEther
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        colors={["#ffffff", "#ffffff", "#ffffff"]}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        isBounce={false}
        resolution={0.5}
      />
    </div>
  );
}
