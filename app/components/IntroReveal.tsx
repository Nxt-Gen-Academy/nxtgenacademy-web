"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WORD1 = "NxtGen";
const WORD2 = "Academy";
const STAGGER = 45;
const CHAR_ANIM = 650;
const WORD2_OFFSET = WORD1.length * STAGGER + 120;
const ALL_IN = WORD2_OFFSET + (WORD2.length - 1) * STAGGER + CHAR_ANIM;
const HOLD = 450;
const TEXT_EXIT_DURATION = 850;
const BG_EXIT_DURATION = 750;

type Phase = "pending" | "reveal" | "hold" | "text-exit" | "bg-exit" | "done";

export default function IntroReveal() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("pending");

  useEffect(() => {
    // Only run intro reveal on the root homepage
    if (pathname !== "/") {
      setPhase("done");
      return;
    }

    // Skip on mobile devices / small viewports for instant load and to eliminate Mobile Safari hangs
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    if (isMobile) {
      try {
        sessionStorage.setItem("introPlayed", "true");
      } catch {}
      setPhase("done");
      return;
    }

    // Respect reduced motion — skip animation
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPhase("done");
        return;
      }
    } catch {}

    // Check if intro has already played in this browser session (safe for Safari Private Browsing)
    try {
      if (sessionStorage.getItem("introPlayed")) {
        setPhase("done");
        return;
      }
      sessionStorage.setItem("introPlayed", "true");
    } catch {
      // In Safari Private Browsing or restricted environments, proceed safely
    }

    const t0 = setTimeout(() => setPhase("reveal"), 60);
    const t1 = setTimeout(() => setPhase("hold"), 60 + ALL_IN);
    const t2 = setTimeout(() => setPhase("text-exit"), 60 + ALL_IN + HOLD);
    const t3 = setTimeout(() => setPhase("bg-exit"), 60 + ALL_IN + HOLD + TEXT_EXIT_DURATION);
    const t4 = setTimeout(() => {
      setPhase("done");
    }, 60 + ALL_IN + HOLD + TEXT_EXIT_DURATION + BG_EXIT_DURATION + 80);

    // Hard fail-safe timeout: unconditionally dismiss overlay even if timers are throttled by the OS/browser
    const safetyTimer = setTimeout(() => {
      setPhase("done");
    }, 3600);

    return () => {
      [t0, t1, t2, t3, t4, safetyTimer].forEach((t) => clearTimeout(t));
    };
  }, [pathname]);

  // Manage body scroll-lock declaratively based on animation phase
  useEffect(() => {
    if (phase !== "done" && phase !== "pending") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    };
  }, [phase]);

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

  // Unconditional fail-safe cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
      const hero = document.querySelector("#top > .relative");
      if (hero instanceof HTMLElement) {
        hero.style.removeProperty("opacity");
        hero.style.removeProperty("transform");
        hero.style.removeProperty("transition");
      }
    };
  }, []);

  if (phase === "done" || pathname !== "/") return null;

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

      {/* Brand Logo */}
      <div
        className={`intro-logo-wrapper ${animating && !textExiting ? "intro-logo-in" : ""} ${textExiting ? "intro-logo-out" : ""}`}
      >
        <Image
          src="/logo.png"
          alt="NxtGen Academy"
          width={180}
          height={180}
          priority
          className="intro-logo-img"
        />
      </div>

      {/* Two-line stacked text */}
      <div className="intro-text-wrapper text-primary">
        {/* Line 1: "NxtGen" — bold */}
        <div className="intro-text-line intro-text-line-1 text-primary">
          {WORD1.split("").map((char, i) => (
            <span key={i} className="intro-char-mask">
              <span
                className={`intro-char text-primary ${animating && !textExiting ? "intro-char-in" : ""} ${textExiting ? "intro-char-out" : ""}`}
                style={{ animationDelay: `${textExiting ? i * STAGGER : i * STAGGER}ms` }}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        {/* Line 2: "Academy" — lighter weight */}
        <div className="intro-text-line intro-text-line-2 text-primary">
          {WORD2.split("").map((char, i) => (
            <span key={i} className="intro-char-mask">
              <span
                className={`intro-char text-primary ${animating && !textExiting ? "intro-char-in" : ""} ${textExiting ? "intro-char-out" : ""}`}
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
      <div className={`intro-tagline text-primary ${animating ? "intro-tagline-in" : ""}`}>
        Engineering Tech Careers
      </div>
    </div>
  );
}
