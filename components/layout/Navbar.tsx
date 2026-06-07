"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "vs", label: "About" },
];

export function Navbar() {
  const lenis = useLenisInstance();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".site-nav",
      { opacity: 0, y: -12, xPercent: -50 },
      {
        opacity: 1,
        y: 0,
        xPercent: -50,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.8,
      }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(id, lenis);
  };

  return (
    <>
      <nav className="site-nav">
        <Link href="#hero" onClick={(e) => go(e, "hero")} className="site-nav-logo">
          Nexara
        </Link>

        <div className="site-nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => go(e, link.id)}
              className="site-nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="#cta" onClick={(e) => go(e, "cta")} className="site-nav-cta hidden sm:inline-flex">
          Start a Project
        </Link>

        <button
          type="button"
          className="site-nav-menu-btn md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-nav-overlay ${menuOpen ? "is-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => go(e, link.id)}
            className="mobile-nav-link"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#cta"
          onClick={(e) => go(e, "cta")}
          className="mobile-nav-link"
          style={{ color: "var(--color-accent)", border: "none", marginTop: 16 }}
        >
          Start a Project →
        </Link>
      </div>
    </>
  );
}
