"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MacWindow } from "@/components/ui/MacWindow";
import { SectionHead } from "@/components/ui/SectionHead";
import { ServiceIcon, type ServiceIconId } from "@/components/ui/ServiceIcon";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { scrollToSection } from "@/lib/scrollTo";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    tabLabel: "Social",
    name: "Social Media Management",
    icon: "social" as ServiceIconId,
    desc: "Strategy, content, and community management that keeps your brand visible and growing every day.",
    scope: "Retainer",
    output: "Monthly calendar",
    deliverables: ["Content strategy", "Post design", "Community mgmt", "Analytics reports", "Trend monitoring"],
  },
  {
    num: "02",
    tabLabel: "Video",
    name: "Video Production",
    icon: "video" as ServiceIconId,
    desc: "From concept to final cut — brand films, social reels, and product videos that stop the scroll.",
    scope: "Project",
    output: "Final video assets",
    deliverables: ["Concept & script", "Filming / motion", "Editing & grade", "Social cuts", "Raw files"],
  },
  {
    num: "03",
    tabLabel: "Web",
    name: "Web Development",
    icon: "web" as ServiceIconId,
    desc: "Fast, beautiful websites and web apps built to convert visitors into customers.",
    scope: "Project",
    output: "Live website",
    deliverables: ["UI/UX design", "Development", "CMS setup", "SEO basics", "Launch support"],
  },
  {
    num: "04",
    tabLabel: "AI",
    name: "AI Automation",
    icon: "ai" as ServiceIconId,
    desc: "Custom AI workflows and automations that eliminate repetitive work and save your team hours.",
    scope: "Retainer / Project",
    output: "Automated systems",
    deliverables: ["Workflow audit", "AI integration", "Dashboard build", "Training", "Maintenance"],
  },
  {
    num: "05",
    tabLabel: "Brand",
    name: "Branding & Identity",
    icon: "brand" as ServiceIconId,
    desc: "Logo, visual language, and brand guidelines that make your business impossible to forget.",
    scope: "Project",
    output: "Brand kit",
    deliverables: ["Logo design", "Color & type", "Brand guidelines", "Collateral", "Social templates"],
  },
  {
    num: "06",
    tabLabel: "Ads",
    name: "Ad Campaigns",
    icon: "ads" as ServiceIconId,
    desc: "Paid social and search campaigns built for measurable ROI, not vanity metrics.",
    scope: "Retainer",
    output: "Campaign reports",
    deliverables: ["Audience research", "Ad creative", "Campaign setup", "A/B testing", "Monthly reports"],
  },
  {
    num: "07",
    tabLabel: "SEO",
    name: "SEO",
    icon: "seo" as ServiceIconId,
    desc: "Technical and content SEO that gets your brand found by the people actively searching for you.",
    scope: "Retainer",
    output: "Ranking growth",
    deliverables: ["Site audit", "Keyword strategy", "On-page SEO", "Content plan", "Monthly tracking"],
  },
];

const NAV_OFFSET = 64;
const SCROLL_PER_STEP = 200;

function serviceIndexFromProgress(progress: number) {
  return Math.min(
    SERVICES.length - 1,
    Math.round(progress * (SERVICES.length - 1))
  );
}

export function ServicesSection() {
  const lenis = useLenisInstance();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  const service = SERVICES[active];

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const container = mobileTabsRef.current;
    if (!container) return;
    const activeTab = container.querySelector(".services-layer-item.is-active");
    activeTab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const selectService = (index: number) => {
    setActive(index);
    activeRef.current = index;

    const trigger = pinTriggerRef.current;
    if (!trigger) return;

    const progress =
      SERVICES.length <= 1 ? 0 : index / (SERVICES.length - 1);
    const scrollPos = trigger.start + progress * (trigger.end - trigger.start);

    if (lenis) {
      lenis.scrollTo(scrollPos, { duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const pin = pinRef.current;
        if (!pin) return;

        const scrollDistance = 600 + (SERVICES.length - 1) * SCROLL_PER_STEP;

        pinTriggerRef.current = ScrollTrigger.create({
          trigger: pin,
          start: `top ${NAV_OFFSET}px`,
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = serviceIndexFromProgress(self.progress);
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        });
      });

      gsap.fromTo(
        ".services-window",
        { scale: 0.96, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#services",
            start: "top 96%",
            end: "top 52%",
            scrub: 2,
            onLeaveBack: () =>
              gsap.set(".services-window", { clearProps: "opacity,scale" }),
          },
        }
      );

      gsap.fromTo(
        ".services-pin .section-head",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#services",
            start: "top 96%",
            end: "top 58%",
            scrub: 2,
            onLeaveBack: () =>
              gsap.set(".services-pin .section-head", { clearProps: "y,opacity" }),
          },
        }
      );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      pinTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-pinned services-section">
      <div ref={pinRef} className="services-pin">
        <SectionHead number="03" kicker="what we do" title="Services" />

        <div className="services-window-wrap">
          <MacWindow title="nexara-services.fig" className="services-window">
            <div
              ref={mobileTabsRef}
              className="services-mobile-tabs"
              data-lenis-prevent
              role="tablist"
              aria-label="Services"
            >
              {SERVICES.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  className={`services-layer-item ${active === i ? "is-active" : ""}`}
                  onClick={() => selectService(i)}
                >
                  <span className="services-layer-icon">
                    <ServiceIcon id={s.icon} size={14} />
                  </span>
                  <span className="services-mobile-tab-label">{s.tabLabel}</span>
                </button>
              ))}
            </div>

            <div className="services-panels">
              <div className="services-layers">
                <div className="services-layers-list">
                  {SERVICES.map((s, i) => (
                    <button
                      key={s.num}
                      type="button"
                      className={`services-layer-item ${active === i ? "is-active" : ""}`}
                      onClick={() => selectService(i)}
                    >
                      <span className="services-layer-leading">
                        <span className="services-layer-icon">
                          <ServiceIcon id={s.icon} size={14} />
                        </span>
                        <span className="services-layer-name">{s.name}</span>
                      </span>
                      <span className="services-layer-num">{s.num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="services-canvas">
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  className="services-preview-card"
                >
                  <span className="handle handle-tl" aria-hidden />
                  <span className="handle handle-tr" aria-hidden />
                  <span className="handle handle-bl" aria-hidden />
                  <span className="handle handle-br" aria-hidden />
                  <div className="services-preview-icon">
                    <ServiceIcon id={service.icon} size={28} strokeWidth={1.75} />
                  </div>
                  <div className="services-preview-mock">
                    <span className="services-preview-mock-bar services-preview-mock-bar--accent" />
                    <span className="services-preview-mock-bar" />
                    <span className="services-preview-mock-bar services-preview-mock-bar--short" />
                  </div>
                  <p className="services-preview-label">{service.name}</p>
                </motion.div>
              </div>

              <div className="services-properties">
                <motion.div
                  key={service.num}
                  className="services-props-scroll"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="services-prop-head">
                    <div className="services-prop-icon">
                      <ServiceIcon id={service.icon} size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="services-prop-label">Overview</p>
                      <h3 className="services-prop-name">{service.name}</h3>
                    </div>
                  </div>
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
                  <ul className="services-deliverables-list">
                    {service.deliverables.map((d) => (
                      <li key={d} className="services-deliverable">
                        <Check size={14} strokeWidth={2.5} className="services-deliverable-icon" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>

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
              </div>
            </div>
          </MacWindow>
        </div>
      </div>
    </section>
  );
}
