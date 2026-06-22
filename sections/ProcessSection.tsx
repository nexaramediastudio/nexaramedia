"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileImage, FileText } from "lucide-react";
import { useLenisInstance } from "@/components/providers/LenisProvider";
import { MacWindow } from "@/components/ui/MacWindow";
import { SectionHead } from "@/components/ui/SectionHead";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollTabStrip } from "@/lib/scrollTabStrip";

type ProcessMessage = {
  from: "you" | "nexara";
  text: string;
  time: string;
  file?: { name: string; kind: "fig" | "image" };
  reaction?: { emoji: string; count: number };
};

const STEPS: { label: string; messages: ProcessMessage[] }[] = [
  {
    label: "Subscribe",
    messages: [
      {
        from: "you",
        text: "Just grabbed the plan — excited to get started with you all.",
        time: "10:02",
      },
      {
        from: "nexara",
        text: "Welcome aboard! Send your first brief whenever you're ready.",
        time: "10:04",
      },
      {
        from: "nexara",
        text: "Kickoff call tomorrow at 10 works on our end.",
        time: "10:05",
      },
    ],
  },
  {
    label: "Request",
    messages: [
      {
        from: "you",
        text: "Here's the homepage brief — goals, refs, and copy direction inside.",
        time: "10:18",
        file: { name: "homepage-brief.fig", kind: "fig" },
      },
      {
        from: "nexara",
        text: "Brief locked in. First draft landing in 48 hours.",
        time: "10:22",
      },
    ],
  },
  {
    label: "Revise",
    messages: [
      {
        from: "nexara",
        text: "V1 is live on the preview link — take a look when you can.",
        time: "10:31",
        file: { name: "homepage-v1.png", kind: "image" },
      },
      {
        from: "you",
        text: "Love it. Can we make the hero a little bolder?",
        time: "Day 2",
      },
    ],
  },
  {
    label: "Shipped",
    messages: [
      {
        from: "nexara",
        text: "Shipped & live. Handover doc is in your inbox.",
        time: "4:28 PM",
      },
      {
        from: "you",
        text: "Just checked — this looks incredible. Thank you 🙌",
        time: "4:31 PM",
      },
      {
        from: "nexara",
        text: "Proud of this one. Go get those customers.",
        time: "4:33 PM",
      },
    ],
  },
];

const NAV_OFFSET = 64;
const SCROLL_VH_PER_STEP = 0.52;

function processIndexFromProgress(progress: number) {
  if (STEPS.length <= 1) return 0;
  const idx = Math.floor(progress * STEPS.length);
  return Math.min(STEPS.length - 1, Math.max(0, idx));
}

function processScrollDistance() {
  return (
    window.innerHeight * SCROLL_VH_PER_STEP * Math.max(1, STEPS.length - 1) +
    320
  );
}

export function ProcessSection() {
  const lenis = useLenisInstance();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  const step = STEPS[activeStep];

  useEffect(() => {
    activeRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [activeStep]);

  useEffect(() => {
    scrollTabStrip(stepsRef.current, ".process-step-tab.is-active");
  }, [activeStep]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const pin = pinRef.current;
        if (!pin) return;

        pinTriggerRef.current = ScrollTrigger.create({
          trigger: pin,
          start: `top ${NAV_OFFSET}px`,
          end: `+=${processScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = processIndexFromProgress(self.progress);
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActiveStep(idx);
            }
          },
        });
      });
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      pinTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const selectStep = (index: number) => {
    setActiveStep(index);
    activeRef.current = index;

    const trigger = pinTriggerRef.current;
    if (!trigger) return;

    const progress =
      STEPS.length <= 1 ? 0 : index / (STEPS.length - 1);
    const scrollPos = trigger.start + progress * (trigger.end - trigger.start);

    if (lenis) {
      lenis.scrollTo(scrollPos, {
        duration: 2.2,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  return (
    <section id="process" ref={sectionRef} className="section-pinned process-section">
      <div ref={pinRef} className="process-pin">
        <div className="process-topic">
          <SectionHead
            number="06"
            kicker="how it works"
            title="Getting started"
            meta="is easy"
          />
        </div>

        <div className="process-window-wrap">
          <MacWindow title="#nexara-x-yourbrand" className="process-window">
            <div className="process-slack">
              <div className="process-slack-top">
                <p className="process-slack-header">
                  <span className="process-slack-hash">#</span> nexara x your-brand
                </p>
                <div className="process-slack-presence">
                  <div className="process-slack-avatars" aria-hidden>
                    <span className="process-slack-avatar">Y</span>
                    <span className="process-slack-avatar process-slack-avatar--nexara">N</span>
                    <span className="process-slack-avatar process-slack-avatar--muted">+</span>
                  </div>
                  <p className="process-slack-online">
                    <span className="process-slack-online-dot" aria-hidden />
                    3 online
                  </p>
                </div>
              </div>

              <nav
                ref={stepsRef}
                className="process-steps"
                aria-label="Process steps"
                data-lenis-prevent-touch
              >
                {STEPS.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    role="tab"
                    aria-selected={activeStep === i}
                    className={`process-step-tab ${activeStep === i ? "is-active" : ""} ${i < activeStep ? "is-done" : ""}`}
                    onClick={() => selectStep(i)}
                    aria-current={activeStep === i ? "step" : undefined}
                  >
                    <span className="process-step-tab-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="process-step-tab-label">{s.label}</span>
                  </button>
                ))}
              </nav>

              <div ref={feedRef} className="process-slack-feed">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStep}
                    className="process-slack-messages"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {step.messages.map((msg, i) => {
                      const prev = step.messages[i - 1];
                      const grouped = prev?.from === msg.from;

                      return (
                        <div
                          key={`${activeStep}-${i}`}
                          className={`process-msg ${grouped ? "process-msg--grouped" : ""}`}
                        >
                          {grouped ? (
                            <span className="process-msg-spacer" aria-hidden />
                          ) : (
                            <span
                              className={`process-msg-avatar ${msg.from === "nexara" ? "nexara" : ""}`}
                            >
                              {msg.from === "nexara" ? "N" : "Y"}
                            </span>
                          )}
                          <div className="process-msg-body">
                            {!grouped && (
                              <div className="process-msg-meta">
                                <p className="process-msg-name">
                                  {msg.from === "nexara" ? "NEXARA" : "YOU"}
                                </p>
                                <span className="process-msg-time">{msg.time}</span>
                              </div>
                            )}
                            <p className="process-msg-text">{msg.text}</p>
                            {msg.file && (
                              <span className="process-msg-file">
                                {msg.file.kind === "fig" ? (
                                  <FileText size={14} strokeWidth={2} />
                                ) : (
                                  <FileImage size={14} strokeWidth={2} />
                                )}
                                {msg.file.name}
                              </span>
                            )}
                            {msg.reaction && (
                              <span className="process-msg-reaction">
                                {msg.reaction.emoji} {msg.reaction.count}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="process-slack-typing" aria-hidden>
                <span className="process-msg-avatar process-msg-avatar--typing">N</span>
                <span className="process-slack-typing-dots">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          </MacWindow>
        </div>
      </div>
    </section>
  );
}
