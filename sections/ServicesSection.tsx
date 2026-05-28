"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    name: "AI Automation",
    description:
      "Intelligent systems that work while you sleep. We build custom AI workflows, automation pipelines, and smart tools that eliminate repetitive work and give your team back their time.",
    items: [
      "Custom AI workflow design",
      "Business process automation",
      "AI-powered dashboards",
      "Chatbot & assistant integration",
      "Data pipeline automation",
    ],
  },
  {
    num: "02",
    name: "Business Systems",
    description:
      "Custom infrastructure built for scale. We design and develop the internal tools, dashboards, and operational systems that growing businesses actually need.",
    items: [
      "Custom internal dashboards",
      "CRM & operational systems",
      "Business intelligence tools",
      "Client portal development",
      "Workflow management systems",
    ],
  },
  {
    num: "03",
    name: "Web Development",
    description:
      "Experiences that convert and captivate. From marketing sites to complex web applications — built fast, built right, built to last.",
    items: [
      "Marketing websites",
      "Web application development",
      "E-commerce builds",
      "Landing page systems",
      "CMS & headless builds",
    ],
  },
  {
    num: "04",
    name: "Branding",
    description:
      "Identity systems built to be remembered. Logo, visual language, brand guidelines, and everything your brand needs to look like it belongs at the top.",
    items: [
      "Logo & identity design",
      "Brand guidelines",
      "Visual language systems",
      "Brand collateral",
      "Rebranding & refresh",
    ],
  },
  {
    num: "05",
    name: "Creative Media",
    description:
      "Visual storytelling at the highest level. Photography direction, video production, motion graphics, and content that actually stops the scroll.",
    items: [
      "Video production",
      "Motion graphics & animation",
      "Photography direction",
      "Social media content",
      "Brand storytelling",
    ],
  },
  {
    num: "06",
    name: "Digital Experiences",
    description:
      "Immersive interactions that define the brand. When a standard website is not enough — we build interactive experiences people remember.",
    items: [
      "Interactive web experiences",
      "Product configurators",
      "Immersive microsites",
      "3D & WebGL experiences",
      "Campaign landing experiences",
    ],
  },
  {
    num: "07",
    name: "Business Solutions",
    description:
      "Strategic thinking. Measurable results. We sit down with you, understand the business deeply, and figure out exactly what to build and why.",
    items: [
      "Digital strategy consulting",
      "Tech stack advisory",
      "Growth system design",
      "Competitor analysis",
      "Roadmap planning",
    ],
  },
];

function ServiceCard({
  service,
  showScrollHint,
}: {
  service: (typeof SERVICES)[0];
  showScrollHint: boolean;
}) {
  return (
    <div className="service-stack-card-inner">
      <header className="service-card-header">
        <span className="service-card-num font-display font-light text-gold">
          {service.num}
        </span>
        <h3 className="service-card-title font-display font-medium text-text-primary">
          {service.name}
        </h3>
      </header>

      <p className="service-card-desc font-sans font-light text-text-secondary">
        {service.description}
      </p>

      <ul className="service-card-list">
        {service.items.map((item, idx) => (
          <li
            key={item}
            className="font-sans font-light text-text-muted"
          >
            <span className="text-gold">
              /{String(idx + 1).padStart(2, "0")}
            </span>{" "}
            {item}
          </li>
        ))}
      </ul>

      {showScrollHint && (
        <div className="service-card-footer">
          <span className="service-scroll-pill">
            Scroll
            <ChevronDown size={14} strokeWidth={1.5} />
          </span>
        </div>
      )}
    </div>
  );
}

export function ServicesSection() {
  const lenis = useLenisInstance();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin = pinRef.current;
        if (!pin) return;

        const inner = pin.querySelector<HTMLElement>(".services-pin-inner");
        const scrollDistance =
          window.innerHeight * 0.45 * (SERVICES.length - 1);

        // Main pin + card switching
        const st = ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
          // Reset when re-entering from below
          onEnterBack: () => {
            if (inner) gsap.to(inner, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
          },
        });

        // Smooth exit: fade + lift content in the last ~18% of pin travel
        if (inner) {
          gsap.to(inner, {
            opacity: 0,
            y: -60,
            ease: "power2.in",
            scrollTrigger: {
              trigger: pin,
              start: () => `top+=${scrollDistance * 0.82} top`,
              end: () => `top+=${scrollDistance} top`,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }

        scrollTriggerRef.current = st;
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          st.kill();
          scrollTriggerRef.current = null;
          if (inner) gsap.set(inner, { clearProps: "opacity,y" });
        };
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-service-mobile]", sectionRef.current)
          .forEach((panel) => {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const jumpToService = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) {
      setActive(index);
      return;
    }
    const progress =
      SERVICES.length <= 1 ? 0 : index / (SERVICES.length - 1);
    const y = st.start + (st.end - st.start) * progress;
    if (lenis) {
      lenis.scrollTo(y, { duration: 1.2 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const current = SERVICES[active];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section bg-bg-secondary !py-0"
    >
      {/* Mobile intro (only shown on mobile) */}
      <div className="mx-auto max-w-[1180px] px-6 pt-16 pb-4 lg:hidden">
        <SectionLabel number="03" title="SERVICES" className="mb-6" />
        <h2 className="services-heading font-display font-light leading-[0.95] tracking-[-0.03em] text-text-primary">
          <span className="block">What we</span>
          <span className="block">build for you.</span>
        </h2>
      </div>

      {/* Desktop — full viewport pin */}
      <div ref={pinRef} className="services-pin-viewport hidden lg:block">
        <div className="services-pin-inner">

          {/* Left column: label + heading + number nav */}
          <div className="services-left-col">
            <SectionLabel number="03" title="SERVICES" className="mb-4" />
            <h2 className="services-heading font-display font-light tracking-[-0.03em] text-text-primary">
              <span className="block">What we</span>
              <span className="block">build for you.</span>
            </h2>
            <nav className="services-nav" aria-label="Service navigation">
              {SERVICES.map((service, i) => (
                <button
                  key={service.num}
                  type="button"
                  onClick={() => jumpToService(i)}
                  className={`services-nav-btn ${active === i ? "is-active" : ""}`}
                >
                  {service.num}
                </button>
              ))}
            </nav>
          </div>

          {/* Right column: stacked card */}
          <div className="services-card-wrap">
            <div className="service-stack-ghost service-stack-ghost-2" aria-hidden />
            <div className="service-stack-ghost service-stack-ghost-1" aria-hidden />
            <div className="service-stack-stage">
              <AnimatePresence mode="wait">
                <motion.article
                  key={current.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full"
                >
                  <ServiceCard
                    service={current}
                    showScrollHint={active < SERVICES.length - 1}
                  />
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-[1180px] space-y-0 border-t border-[var(--divider)] px-6 md:px-10 lg:hidden">
        {SERVICES.map((service) => (
          <article
            key={`m-${service.num}`}
            data-service-mobile
            className="border-b border-[var(--divider)] py-10"
          >
            <ServiceCard service={service} showScrollHint={false} />
          </article>
        ))}
      </div>
    </section>
  );
}
