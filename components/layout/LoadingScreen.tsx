"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "NexaraMedia";
const TYPE_MS = 75;
const SELECT_MS = 1350;
const REVEAL_MS = 1050;

type Phase = "typing" | "selecting" | "reveal" | "done";

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    document.body.classList.add("is-loading");
    return () => document.body.classList.remove("is-loading");
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayedText(FULL_TEXT);
      setPhase("selecting");
      return;
    }

    let index = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setDisplayedText(FULL_TEXT.slice(0, index));

      if (index >= FULL_TEXT.length) {
        window.clearInterval(typeTimer);
        setPhase("selecting");
      }
    }, TYPE_MS);

    return () => window.clearInterval(typeTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "selecting") return;

    const revealTimer = window.setTimeout(() => setPhase("reveal"), SELECT_MS);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.classList.remove("is-loading");
    }, SELECT_MS + REVEAL_MS);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`loading-screen loading-screen--${phase}`} aria-hidden={phase === "reveal"}>
      <div className="loading-screen__inner">
        <div className="loading-select">
          <div className="loading-select__content">
            <h1 className="loading-text">
              <span className="loading-text__word">
                <span className="loading-text__typed">{displayedText}</span>
                <span className="loading-text__ghost" aria-hidden>
                  {FULL_TEXT.slice(displayedText.length)}
                </span>
              </span>
            </h1>

            <div className="loading-select__frame" aria-hidden>
              <div className="loading-select__box" />
            </div>

            <span className="loading-select-handle loading-select-handle--tl" aria-hidden />
            <span className="loading-select-handle loading-select-handle--tr" aria-hidden />
            <span className="loading-select-handle loading-select-handle--bl" aria-hidden />
            <span className="loading-select-handle loading-select-handle--br" aria-hidden />
          </div>

          <div className="loading-select__bar" aria-hidden>
            <span className="loading-select__bar-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
