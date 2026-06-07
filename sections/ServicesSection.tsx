"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MacWindow } from "@/components/ui/MacWindow";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    name: "Social Media Management",
    icon: "□",
    desc: "Strategy, content, and community management that keeps your brand visible and growing every day.",
    scope: "Retainer",
    output: "Monthly calendar",
    deliverables: ["Content strategy", "Post design", "Community mgmt", "Analytics reports", "Trend monitoring"],
    preview: ["▬▬▬▬", "▬▬▬", "▬▬▬▬▬"],
  },
  {
    num: "02",
    name: "Video Production",
    icon: "<>",
    desc: "From concept to final cut — brand films, social reels, and product videos that stop the scroll.",
    scope: "Project",
    output: "Final video assets",
    deliverables: ["Concept & script", "Filming / motion", "Editing & grade", "Social cuts", "Raw files"],
    preview: ["▶ ▬▬▬", "▬▬▬▬▬", "▬▬"],
  },
  {
    num: "03",
    name: "Web Development",
    icon: "◇",
    desc: "Fast, beautiful websites and web apps built to convert visitors into customers.",
    scope: "Project",
    output: "Live website",
    deliverables: ["UI/UX design", "Development", "CMS setup", "SEO basics", "Launch support"],
    preview: ["▬▬ ▬", "▬▬▬▬▬", "▬▬ ▬▬"],
  },
  {
    num: "04",
    name: "AI Automation",
    icon: "□",
    desc: "Custom AI workflows and automations that eliminate repetitive work and save your team hours.",
    scope: "Retainer / Project",
    output: "Automated systems",
    deliverables: ["Workflow audit", "AI integration", "Dashboard build", "Training", "Maintenance"],
    preview: ["⚡ ▬▬", "▬▬▬", "▬▬ ⚡"],
  },
  {
    num: "05",
    name: "Branding & Identity",
    icon: "□",
    desc: "Logo, visual language, and brand guidelines that make your business impossible to forget.",
    scope: "Project",
    output: "Brand kit",
    deliverables: ["Logo design", "Color & type", "Brand guidelines", "Collateral", "Social templates"],
    preview: ["◆ ▬▬", "▬▬▬▬", "▬ ◆"],
  },
  {
    num: "06",
    name: "Ad Campaigns",
    icon: "□",
    desc: "Paid social and search campaigns built for measurable ROI, not vanity metrics.",
    scope: "Retainer",
    output: "Campaign reports",
    deliverables: ["Audience research", "Ad creative", "Campaign setup", "A/B testing", "Monthly reports"],
    preview: ["$ ▬▬", "▬▬▬▬", "▬▬ $"],
  },
  {
    num: "07",
    name: "SEO",
    icon: "□",
    desc: "Technical and content SEO that gets your brand found by the people actively searching for you.",
    scope: "Retainer",
    output: "Ranking growth",
    deliverables: ["Site audit", "Keyword strategy", "On-page SEO", "Content plan", "Monthly tracking"],
    preview: ["↑ ▬▬", "▬▬▬", "▬▬ ↑"],
  },
];

export function ServicesSection() {
  const lenis = useLenisInstance();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  const service = SERVICES[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const section = sectionRef.current;
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${600 + (SERVICES.length - 1) * 120}`,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              SERVICES.length - 1,
              Math.floor(self.progress * SERVICES.length)
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        });
      });

      gsap.from(".services-window", {
        scale: 0.88,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: "#services", start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-pinned">
      <p className="section-label">What We Do / 02</p>

      <div ref={pinRef} className="services-window-wrap">
        <span className="services-pill services-pill-tap">tap a layer</span>
        <span className="services-pill services-pill-selected">nexara · selected</span>

        <MacWindow title="nexara-services.fig" className="services-window">
          <div className="services-mobile-tabs">
            {SERVICES.map((s, i) => (
              <button
                key={s.num}
                type="button"
                className={`services-layer-item ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                {s.name.slice(0, 14)}…
              </button>
            ))}
          </div>

          <div className="services-panels">
            <div className="services-layers">
              <p className="services-layers-label">Layers</p>
              <input className="services-search" placeholder="Search layers…" readOnly />
              <p className="services-layers-label services-layers-page">▸ PAGE 1 · SERVICES</p>
              {SERVICES.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  className={`services-layer-item ${active === i ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span>
                    {s.icon} {s.name}
                  </span>
                  <span>{s.num}</span>
                </button>
              ))}
              <p className="services-add-layer">+ add layer</p>
            </div>

            <div className="services-canvas">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  className="services-preview-card"
                >
                  <span className="handle handle-tl" aria-hidden />
                  <span className="handle handle-tr" aria-hidden />
                  <span className="handle handle-bl" aria-hidden />
                  <span className="handle handle-br" aria-hidden />
                  {service.preview.map((line, i) => (
                    <div
                      key={i}
                      className="services-preview-bar"
                      style={{
                        height: i === 1 ? 12 : 8,
                        background: i === 0 ? "var(--color-accent)" : "#e8e8e8",
                        width: line.length > 6 ? "100%" : "70%",
                        opacity: 0.7 + i * 0.1,
                      }}
                    />
                  ))}
                  <p className="services-preview-label">{service.name}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="services-properties">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                >
                  <p className="services-prop-label">Properties</p>
                  <h3 className="services-prop-name">{service.name}</h3>
                  <p className="services-prop-desc">{service.desc}</p>

                  <div className="services-tag-row">
                    <div className="services-tag-box">
                      <p className="services-tag-label">Scope</p>
                      <p className="services-tag-value">{service.scope}</p>
                    </div>
                    <div className="services-tag-box">
                      <p className="services-tag-label">Output</p>
                      <p className="services-tag-value">{service.output}</p>
                    </div>
                  </div>

                  <p className="services-deliverables-label">Deliverables</p>
                  {service.deliverables.map((d, i) => (
                    <p key={d} className="services-deliverable">
                      /{String(i + 1).padStart(2, "0")} {d}
                    </p>
                  ))}

                  <Link
                    href="#cta"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("cta", lenis);
                    }}
                    className="services-start-btn"
                  >
                    Start a project
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
