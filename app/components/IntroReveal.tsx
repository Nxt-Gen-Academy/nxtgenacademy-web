"use client";

import { useState, useEffect } from "react";

const WORD1 = "NxtGen";
const WORD2 = "Academy";
const STAGGER = 45;
const CHAR_ANIM = 650;
const WORD2_OFFSET = WORD1.length * STAGGER + 120;
const TOTAL_CHARS = WORD1.length + WORD2.length;
const ALL_IN = WORD2_OFFSET + (WORD2.length - 1) * STAGGER + CHAR_ANIM;
const HOLD = 450;
const TEXT_EXIT_DURATION = 850;
const BG_EXIT_DURATION = 750;

type Phase = "pending" | "reveal" | "hold" | "text-exit" | "bg-exit" | "done";

export default function IntroReveal() {
  const [phase, setPhase] = useState<Phase>("pending");

  useEffect(() => {
    // Respect reduced motion — skip animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";

    const t0 = setTimeout(() => setPhase("reveal"), 60);
    const t1 = setTimeout(() => setPhase("hold"), 60 + ALL_IN);
    const t2 = setTimeout(() => setPhase("text-exit"), 60 + ALL_IN + HOLD);
    const t3 = setTimeout(() => setPhase("bg-exit"), 60 + ALL_IN + HOLD + TEXT_EXIT_DURATION);
    const t4 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 60 + ALL_IN + HOLD + TEXT_EXIT_DURATION + BG_EXIT_DURATION + 80);

    return () => {
      [t0, t1, t2, t3, t4].forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  /* Sync hero fade-in when background exit phase starts */
  useEffect(() => {
    if (phase !== "bg-exit") return;
    const hero = document.querySelector("#top > .relative");
    if (!(hero instanceof HTMLElement)) return;

    hero.style.opacity = "0";
    hero.style.transform = "translateY(24px)";
    requestAnimationFrame(() => {
      hero.style.transition =
        "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)";
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    });
  }, [phase]);

  /* Clean up hero inline styles after done */
  useEffect(() => {
    if (phase !== "done") return;
    const hero = document.querySelector("#top > .relative");
    if (hero instanceof HTMLElement) {
      hero.style.removeProperty("opacity");
      hero.style.removeProperty("transform");
      hero.style.removeProperty("transition");
    }
  }, [phase]);

  if (phase === "done") return null;

  const animating = phase === "reveal" || phase === "hold" || phase === "text-exit" || phase === "bg-exit";
  const textExiting = phase === "text-exit" || phase === "bg-exit";
  const bgExiting = phase === "bg-exit";

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay ${bgExiting ? "intro-overlay-exit" : ""}`}
    >
      {/* Accent glows */}
      <div className={`intro-glow intro-glow-1 ${bgExiting ? "intro-glow-exit" : ""}`} />
      <div className={`intro-glow intro-glow-2 ${bgExiting ? "intro-glow-exit" : ""}`} />

      {/* Two-line stacked text */}
      <div className="intro-text-wrapper">
        {/* Line 1: "NxtGen" — bold */}
        <div className="intro-text-line intro-text-line-1">
          {WORD1.split("").map((char, i) => (
            <span key={i} className="intro-char-mask">
              <span
                className={`intro-char ${animating && !textExiting ? "intro-char-in" : ""} ${textExiting ? "intro-char-out" : ""}`}
                style={{ animationDelay: `${textExiting ? i * STAGGER : i * STAGGER}ms` }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Line 2: "Academy" — lighter weight */}
        <div className="intro-text-line intro-text-line-2">
          {WORD2.split("").map((char, i) => (
            <span key={i} className="intro-char-mask">
              <span
                className={`intro-char ${animating && !textExiting ? "intro-char-in" : ""} ${textExiting ? "intro-char-out" : ""}`}
                style={{ animationDelay: `${textExiting ? (i * STAGGER) + 100 : WORD2_OFFSET + i * STAGGER}ms` }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className={`intro-line ${animating ? "intro-line-in" : ""}`} />

      {/* Subtle tagline */}
      <div className={`intro-tagline ${animating ? "intro-tagline-in" : ""}`}>
        Engineering Tech Careers
      </div>
    </div>
  );
}
