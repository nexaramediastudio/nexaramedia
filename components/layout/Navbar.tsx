"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { MobileStatusBar } from "@/components/layout/MobileStatusBar";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
];

const HERO_EMAIL = "nexaramediastudio@gmail.com";
const NAV_SCRUB = 1.6;

export function Navbar() {
  const lenis = useLenisInstance();
  const navRailRef = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const rail = navRailRef.current;
    const hero = document.getElementById("hero");
    if (!rail || !hero) return;

    gsap.fromTo(
      rail,
      { opacity: 0, y: -12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      }
    );

    const tween = gsap.fromTo(
      rail,
      { y: 0, opacity: 1 },
      {
        y: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top+=80",
          scrub: NAV_SCRUB,
          onUpdate: (self) => {
            rail.style.pointerEvents = self.progress > 0.9 ? "none" : "auto";
            if (self.progress > 0.25 && menuOpenRef.current) {
              setMenuOpen(false);
            }
          },
        },
      }
    );

    const mm = gsap.matchMedia();
    mm.add("(max-width: 899px)", () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(rail, { clearProps: "y,opacity" });
      rail.style.pointerEvents = "auto";
    });

    return () => {
      mm.revert();
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [lenis]);

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
      <MobileStatusBar />

      <nav className="site-nav" aria-label="Main">
        <div ref={navRailRef} className="site-nav-rail">
          <div className="site-nav-side hero-pill site-nav-side--left">
            <span className="hero-meta-dot" aria-hidden />
            <span>Available for projects</span>
          </div>

          <div className="site-nav-inner">
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

            <Link href="#cta" onClick={(e) => go(e, "cta")} className="site-nav-cta hidden md:inline-flex">
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
          </div>

          <a href={`mailto:${HERO_EMAIL}`} className="site-nav-side hero-pill site-nav-side--right">
            <Mail size={14} strokeWidth={2.25} aria-hidden />
            <span className="site-nav-email">{HERO_EMAIL}</span>
          </a>
        </div>
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
