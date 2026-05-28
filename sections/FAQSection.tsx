"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/gsap";

const FAQS = [
  {
    q: "What exactly does Nexara Media do?",
    a: "We're a full-spectrum digital studio. That means we handle everything from AI automation and business systems to branding, web development, creative media, and digital experiences. Think of us as the team that builds the complete picture — not just one piece of it.",
  },
  {
    q: "Who do you work with?",
    a: "Established brands, serious operators, and high-growth businesses that are ready to invest in quality. We're not the right fit for everyone — and we're upfront about that from the start.",
  },
  {
    q: "How does a project typically begin?",
    a: "With a conversation. Book a free discovery call, tell us about your brand and goals, and we'll tell you honestly whether and how we can help. No pressure, no pitch deck.",
  },
  {
    q: "How long does a project take?",
    a: "It depends entirely on the scope. A branding project might take 3–4 weeks. A full web build with custom systems could take 2–3 months. We'll give you a clear timeline before we begin — and we keep to it.",
  },
  {
    q: "Do you work with clients globally?",
    a: "Yes. We work with clients across Asia, Europe, the Middle East, and beyond. Time zones have never been a problem.",
  },
  {
    q: "Can you handle just one part of our project?",
    a: "Absolutely. Some clients come to us for branding only. Others for development only. We adapt to what you actually need.",
  },
  {
    q: "What makes Nexara different from other agencies?",
    a: "We treat every project like it's our own brand on the line. The work is done in-house, not outsourced. And we don't take on more than we can do well at any given time.",
  },
  {
    q: "How do we get started?",
    a: 'Hit the "Start a Project" button anywhere on this page. Or email us directly. We respond within 24 hours, always.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq-item]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faqs" ref={sectionRef} className="bg-bg-primary">
      <SectionLabel number="06" title="THE DETAILS" className="mb-12" />

      <div className="mx-auto max-w-[900px]">
        <h2
          className="font-display font-light leading-[1.1] text-text-primary"
          style={{ fontSize: "var(--text-display)" }}
        >
          <span className="block">The part where</span>
          <span className="block">we over-explain.</span>
        </h2>
        <p className="mt-6 font-sans text-base font-light text-text-secondary">
          Everything you want to know before we start.
        </p>

        <div className="mt-16">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                data-faq-item
                className="border-b border-[var(--divider)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  data-cursor="link"
                >
                  <span className="font-sans text-base font-normal text-text-primary">
                    {faq.q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    strokeWidth={1}
                  />
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="pb-6 font-sans text-[15px] font-light leading-[1.8] text-text-secondary">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
