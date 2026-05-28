"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TESTIMONIALS = [
  {
    name: "James Harrington",
    role: "CEO",
    company: "Vertex Analytics",
    quote:
      "They didn't just build a website. They understood our brand at a depth we hadn't experienced before. The result changed how clients perceive us entirely.",
  },
  {
    name: "Priya Mendez",
    role: "Founder",
    company: "Aura Wellness",
    quote:
      "Working with Nexara felt different from day one. They asked the right questions, challenged us when needed, and delivered something that genuinely exceeded our expectations.",
  },
  {
    name: "David Okafor",
    role: "Head of Product",
    company: "Pulse AI",
    quote:
      "The dashboard they built became the centerpiece of our product demo. Investors noticed. Clients noticed. The quality of the work speaks for itself.",
  },
  {
    name: "Sofia Chen",
    role: "Creative Director",
    company: "Forma Studio",
    quote:
      "I've worked with a lot of agencies. Nexara is one of the very few that actually cares about craft. Not just about finishing the job — about getting it genuinely right.",
  },
];

const DURATION = 5500;

const variants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback(
    (next: number) => {
      const clamped = (next + TESTIMONIALS.length) % TESTIMONIALS.length;
      setDir(clamped > active ? 1 : -1);
      setActive(clamped);
    },
    [active]
  );

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDir(1);
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, DURATION);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

  const handleNav = (next: number) => {
    go(next);
    resetTimer();
  };

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-section bg-bg-primary relative overflow-hidden"
    >
      {/* Large decorative quote mark */}
      <span
        className="testimonials-quote-bg pointer-events-none select-none"
        aria-hidden
      >
        &ldquo;
      </span>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <SectionLabel number="05" title="KIND WORDS" className="mb-6" />
            <h2 className="font-display font-light leading-[0.95] tracking-[-0.03em] text-text-primary testimonials-heading">
              What they say.
            </h2>
          </div>

          <p className="hidden font-sans text-[13px] font-light text-text-muted md:block">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(TESTIMONIALS.length).padStart(2, "0")}
          </p>
        </div>

        {/* Quote stage */}
        <div className="testimonials-stage">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
              className="testimonials-quote-block"
            >
              {/* Stars */}
              <p className="mb-8 tracking-[0.2em] text-gold text-sm">
                ★★★★★
              </p>

              {/* Quote text */}
              <blockquote className="testimonials-quote-text font-display font-light leading-[1.25] tracking-[-0.02em] text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <footer className="mt-10 flex items-center gap-5">
                <div className="testimonials-avatar">
                  <span className="font-display text-lg font-medium text-gold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-[15px] font-medium text-text-primary">
                    {t.name}
                  </p>
                  <p className="font-sans text-[13px] font-light text-text-muted mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation row */}
        <div className="mt-14 flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleNav(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="testimonials-dot"
                data-active={i === active ? "true" : "false"}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav(active - 1)}
              aria-label="Previous"
              className="testimonials-arrow"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12.5 15L7.5 10L12.5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleNav(active + 1)}
              aria-label="Next"
              className="testimonials-arrow"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7.5 15L12.5 10L7.5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px w-full bg-[var(--divider)] overflow-hidden rounded-full">
          <motion.div
            key={active}
            className="h-full bg-gold rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: DURATION / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
