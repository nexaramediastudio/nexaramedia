"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";

const NAV_LINKS = [
  { href: "#about",    id: "about",    label: "About" },
  { href: "#work",     id: "work",     label: "Work" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#contact",  id: "contact",  label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenisInstance();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id, lenis), 10);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          scrolled ? "border-[rgba(201,169,110,0.15)]" : "border-[var(--border)]"
        }`}
        style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(20px)" }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          {/* Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleNav(e, "hero")}
            className="font-sans text-sm font-medium tracking-[0.3em] text-text-primary"
            data-cursor="link"
          >
            NEXARA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.id)}
                className="font-sans text-[13px] font-light text-text-secondary transition-colors duration-300 hover:text-text-primary"
                data-cursor="link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            onClick={(e) => handleNav(e, "contact")}
            className="hidden border border-[var(--border-gold)] px-5 py-2 font-sans text-xs font-medium tracking-[0.12em] text-gold transition-all duration-300 hover:bg-[var(--gold-dim)] md:inline-flex"
            style={{ borderRadius: 4 }}
            data-cursor="link"
          >
            Start a Project
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="mobile-hamburger md:hidden"
          >
            <span className={`ham-line ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`ham-line ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`ham-line ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <nav className="mobile-menu-inner">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.id)}
              className="mobile-menu-link"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <span className="mobile-menu-num">0{i + 1}</span>
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={(e) => handleNav(e, "contact")}
            className="mobile-menu-cta"
            style={{ transitionDelay: menuOpen ? "280ms" : "0ms" }}
          >
            Start a Project →
          </Link>
        </nav>
      </div>
    </>
  );
}
