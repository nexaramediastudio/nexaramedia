"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MacWindow } from "@/components/ui/MacWindow";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STEPS = [
  {
    day: 1,
    label: "Brief Sent",
    color: "active-red",
    messages: [
      { from: "you", text: "Hey! Here's our brief. Super excited to get started.", time: "9:02 AM" },
      { from: "nexara", text: "Got it. Love the direction. Kicking off tomorrow morning. 🚀", time: "9:18 AM" },
    ],
  },
  {
    day: 2,
    label: "First Draft",
    color: "active-blue",
    messages: [
      { from: "nexara", text: "First draft is live. Check the link and let us know.", time: "2:41 PM" },
      { from: "you", text: "🔥🔥🔥 this is way better than expected", time: "3:05 PM" },
    ],
  },
  {
    day: 3,
    label: "Revisions",
    color: "active-orange",
    messages: [
      { from: "you", text: "Can we tweak the headline and swap that color?", time: "10:22 AM" },
      { from: "nexara", text: "Done. Already pushed. Refresh and take a look.", time: "10:47 AM" },
    ],
  },
  {
    day: 5,
    label: "Shipped 🎉",
    color: "active-green",
    messages: [
      { from: "nexara", text: "Shipped & live. Go get those customers. 🎉", time: "4:30 PM" },
      { from: "you", text: "NEXARA YOU LEGENDS", time: "4:33 PM" },
    ],
  },
];

const CAL_DAYS = Array.from({ length: 35 }, (_, i) => {
  const day = i - 2;
  if (day < 1 || day > 30) return null;
  return day;
});

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  const step = STEPS[activeStep];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const section = sectionRef.current;
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${STEPS.length * 200}`,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length)
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActiveStep(idx);
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getDayClass = (day: number) => {
    const milestone = STEPS.find((s) => s.day === day);
    if (!milestone) return "process-cal-day";
    const isCurrent = STEPS[activeStep].day === day;
    return `process-cal-day ${milestone.color} ${isCurrent ? "is-active" : "is-milestone"}`;
  };

  return (
    <section id="process" ref={sectionRef} className="section-pinned">
      <p className="section-label">Getting Started Is Easy / 04</p>

      <div ref={pinRef}>
        <MacWindow title="#nexara-x-yourbrand.app" className="process-window">
          <div className="process-split">
            <div className="process-calendar">
              <p className="process-cal-header">&lt; June 2025 &gt;</p>
              <div className="process-cal-days">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={`${d}-${i}`}>{d}</span>
                ))}
              </div>
              <div className="process-cal-grid">
                {CAL_DAYS.map((day, i) =>
                  day === null ? (
                    <span key={i} />
                  ) : (
                    <span key={i} className={getDayClass(day)}>
                      {day}
                    </span>
                  )
                )}
              </div>
              <p className="process-cal-label">{step.label}</p>
            </div>

            <div className="process-slack">
              <p className="process-slack-header">#nexara-x-yourbrand</p>
              <p className="process-slack-online">● 3 online</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {step.messages.map((msg, i) => (
                    <div key={i} className="process-msg">
                      <span
                        className={`process-msg-avatar ${msg.from === "nexara" ? "nexara" : ""}`}
                      >
                        {msg.from === "nexara" ? "N" : "Y"}
                      </span>
                      <div className="process-msg-body">
                        <div className="process-msg-meta">
                          <p className="process-msg-name">
                            {msg.from === "nexara" ? "NEXARA" : "YOU"}
                          </p>
                          <span className="process-msg-time">{msg.time}</span>
                        </div>
                        <p className="process-msg-text">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </MacWindow>

        <div className="process-mobile-steps">
          {STEPS.map((s, i) => (
            <button
              key={s.day}
              type="button"
              className={`process-step-btn ${activeStep === i ? "is-active" : ""}`}
              onClick={() => setActiveStep(i)}
            >
              Day {s.day} · {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
