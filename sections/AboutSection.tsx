"use client";

import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";

const CAPABILITIES = ["Strategy", "Design", "Code", "Social", "Branding", "Video"];

const METRICS = [
  { value: "10+", label: "Brands shipped" },
  { value: "7", label: "Core services" },
  { value: "48h", label: "Avg. reply time" },
];

const STACK = ["Figma", "Next.js", "GSAP", "Webflow"];

export function AboutSection() {
  const lenis = useLenisInstance();

  return (
    <section id="about" className="about-section">
      <SectionHead
        number="02"
        kicker="who we are"
        title="About us"
        meta="Colombo, Sri Lanka"
      />

      <div className="about-bento">
        <article className="about-card about-card--statement">
          <p className="about-statement">
            We&apos;re a Colombo studio that makes good brands look{" "}
            <em className="about-statement-accent">inevitable</em>. Strategy,
            design, and code — plus the obsessive details most teams skip.
          </p>
          <div className="about-tags">
            {CAPABILITIES.slice(0, 5).map((tag) => (
              <span key={tag} className="about-tag">
                {tag}
              </span>
            ))}
          </div>
          <footer className="about-card-foot">
            <span>Made by humans, not templates</span>
            <span className="about-status">
              <span className="about-status-dot" aria-hidden />
              Available for projects
            </span>
          </footer>
        </article>

        <article className="about-card about-card--metrics">
          <header className="about-card-head about-card-head--light">
            <span>Metrics</span>
          </header>
          <ul className="about-metrics">
            {METRICS.map((m) => (
              <li key={m.label}>
                <span className="about-metric-value">{m.value}</span>
                <span className="about-metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="about-card about-card--capabilities">
          <header className="about-card-head">
            <span>Capabilities</span>
          </header>
          <div className="about-pills">
            {CAPABILITIES.map((cap) => (
              <span key={cap} className="about-pill">
                {cap}
              </span>
            ))}
          </div>
        </article>

        <article className="about-card about-card--studio">
          <Link
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("work", lenis);
            }}
            className="about-studio-link"
          >
            <span className="about-studio-play" aria-hidden>
              ▶
            </span>
            <span className="about-studio-title">Nexara</span>
            <span className="about-studio-sub">see the work</span>
          </Link>
        </article>

        <article className="about-card about-card--stack">
          <header className="about-card-head">
            <span>▶ Currently building in</span>
          </header>
          <p className="about-stack-title">Next.js &amp; Figma</p>
          <div className="about-tags about-tags--compact">
            {STACK.map((tool) => (
              <span key={tool} className="about-tag">
                {tool}
              </span>
            ))}
          </div>
        </article>

        <article className="about-card about-card--review">
          <header className="about-card-head">
            <span className="about-stars" aria-label="5 stars">
              ★★★★★
            </span>
            <span>review_01</span>
          </header>
          <blockquote className="about-quote">
            &ldquo;Nexara completely transformed how we present Ridermo online.
            Premium, fast, and exactly what we needed.&rdquo;
          </blockquote>
          <footer className="about-review-author">
            <span className="about-review-avatar">R</span>
            <span className="about-review-name">Ridermo Team · Client</span>
          </footer>
        </article>
      </div>
    </section>
  );
}
