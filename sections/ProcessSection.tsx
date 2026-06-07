"use client";

import { useEffect, useRef, useState } from "react";
import { MacWindow } from "@/components/ui/MacWindow";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STEPS = [
  {
    day: 1,
    label: "Brief Sent",
    color: "active-red",
    messages: [
      { from: "you", text: "Hey! Here's our brief. Super excited to get started." },
      { from: "nexara", text: "Got it. Love the direction. Kicking off tomorrow morning. 🚀" },
    ],
  },
  {
    day: 2,
    label: "First Draft",
    color: "active-blue",
    messages: [
      { from: "nexara", text: "First draft is live. Check the link and let us know." },
      { from: "you", text: "🔥🔥🔥 this is way better than expected" },
    ],
  },
  {
    day: 3,
    label: "Revisions",
    color: "active-orange",
    messages: [
      { from: "you", text: "Can we tweak the headline and swap that color?" },
      { from: "nexara", text: "Done. Already pushed. Refresh and take a look." },
    ],
  },
  {
    day: 5,
    label: "Shipped 🎉",
    color: "active-green",
    messages: [
      { from: "nexara", text: "Shipped & live. Go get those customers. 🎉" },
      { from: "you", text: "NEXARA YOU LEGENDS" },
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
  const pinRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  const step = STEPS[activeStep];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const pin = pinRef.current;
        if (!pin) return;

        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: `+=${STEPS.length * 200}`,
          pin: true,
          pinSpacing: true,
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

      gsap.from(".process-window", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "#process", start: "top 80%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process">
      <p className="section-label">Getting Started Is Easy / 04</p>

      <div ref={pinRef}>
        <MacWindow title="#nexara-x-yourbrand.app" className="process-window">
          <div className="process-split">
            <div className="process-calendar">
              <p className="process-cal-header">&lt; June 2025 &gt;</p>
              <div className="process-cal-days">
                {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="process-cal-grid">
                {CAL_DAYS.map((day, i) => {
                  if (day === null) return <span key={i} />;
                  const stepMatch = STEPS.find((s) => s.day === day);
                  const isActive = stepMatch && STEPS[activeStep].day === day;
                  return (
                    <span
                      key={i}
                      className={`process-cal-day ${isActive && stepMatch ? `${stepMatch.color} is-active` : ""}`}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
              <p className="process-cal-label">{step.label}</p>
            </div>

            <div className="process-slack">
              <p className="process-slack-header">#nexara-x-yourbrand</p>
              <p className="process-slack-online">● 3 online</p>

              {step.messages.map((msg, i) => (
                <div key={i} className="process-msg">
                  <span
                    className={`process-msg-avatar ${msg.from === "nexara" ? "nexara" : ""}`}
                  >
                    {msg.from === "nexara" ? "N" : "Y"}
                  </span>
                  <div>
                    <p className="process-msg-name">
                      {msg.from === "nexara" ? "NEXARA" : "YOU"}
                    </p>
                    <p className="process-msg-text">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
