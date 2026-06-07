"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.classList.add("has-custom-cursor");
    cursor.style.opacity = "1";

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const hide = () => {
      cursor.style.opacity = "0";
    };

    const show = () => {
      cursor.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.documentElement.removeEventListener("mouseenter", show);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div ref={cursorRef} className="custom-cursor" aria-hidden>
      <svg
        className="custom-cursor-pointer"
        width="24"
        height="28"
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1V15.8L5.1 12.1L8.4 19.8L10.6 18.7L7.3 11.2H13.2L1 1Z"
          fill="#0d99ff"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="custom-cursor-label">You</span>
    </div>,
    document.body
  );
}
