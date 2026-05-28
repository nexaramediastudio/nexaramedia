"use client";

import { useEffect, useRef, useState } from "react";

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const state = useRef<"default" | "link" | "card">("default");

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='card']")) {
        state.current = "card";
      } else if (el.closest("a, button, [data-cursor='link']")) {
        state.current = "link";
      } else {
        state.current = "default";
      }
    };

    let rafId = 0;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1);

      const dotX = lerp(
        parseFloat(dotRef.current?.style.left || "0") || pos.current.x,
        target.current.x,
        0.35
      );
      const dotY = lerp(
        parseFloat(dotRef.current?.style.top || "0") || pos.current.y,
        target.current.y,
        0.35
      );

      const ring = ringRef.current;
      const dot = dotRef.current;
      const label = labelRef.current;

      if (ring && dot) {
        let size = 32;
        if (state.current === "link") size = 52;
        if (state.current === "card") size = 88;

        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.left = `${pos.current.x}px`;
        ring.style.top = `${pos.current.y}px`;
        ring.style.transform = "translate(-50%, -50%)";

        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        dot.style.transform = "translate(-50%, -50%)";
        dot.style.opacity = state.current === "link" ? "0" : "1";

        if (state.current === "card") {
          ring.style.borderColor = "var(--gold)";
          ring.style.background = "rgba(201, 169, 110, 0.06)";
          if (label) label.style.opacity = "1";
        } else {
          ring.style.borderColor =
            state.current === "link"
              ? "var(--gold)"
              : "rgba(201, 169, 110, 0.45)";
          ring.style.background = "transparent";
          if (label) label.style.opacity = "0";
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full border-[1.5px] transition-[width,height,background,border-color] duration-500"
        style={{ borderColor: "rgba(201, 169, 110, 0.45)" }}
      >
        <span
          ref={labelRef}
          className="font-sans text-[9px] font-medium tracking-[0.15em] text-gold opacity-0 transition-opacity duration-300"
        >
          VIEW
        </span>
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-1 w-1 rounded-full bg-gold mix-blend-difference"
      />
    </>
  );
}
