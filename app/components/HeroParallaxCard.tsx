"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  GraduationCap,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";

/* ───────── floating badge data (pulled from stats already on-site) ───────── */
const badges = [
  {
    icon: Star,
    value: "4.8/5",
    label: "Student Rating",
    color: "text-amber-400",
    position: "top-left" as const,
    depth: 1.6,
  },
  {
    icon: GraduationCap,
    value: "1,500+",
    label: "Students Placed",
    color: "text-emerald-400",
    position: "top-right" as const,
    depth: 1.3,
  },
  {
    icon: TrendingUp,
    value: "48 LPA",
    label: "Highest Package",
    color: "text-sky-400",
    position: "bottom-left" as const,
    depth: 1.5,
  },
  {
    icon: Shield,
    value: "800+",
    label: "Hiring Partners",
    color: "text-violet-400",
    position: "bottom-right" as const,
    depth: 1.2,
  },
  {
    icon: Users,
    value: "1200+",
    label: "Industry Experts",
    color: "text-rose-400",
    position: "mid-right" as const,
    depth: 1.4,
  },
];

/* ─────────────────── position map ─────────────────── */
const positionStyles: Record<string, string> = {
  "top-left": "top-[-18px] left-[-20px]",
  "top-right": "top-[40px] right-[-30px]",
  "bottom-left": "bottom-[-24px] left-[-26px]",
  "bottom-right": "bottom-[-28px] right-[-16px]",
  "mid-right": "top-[50%] right-[-40px] -translate-y-1/2",
};

/* idle floating delays per badge index */
const floatDelays = ["0s", "0.6s", "1.2s", "1.8s", "0.9s"];

export default function HeroParallaxCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* detect touch & reduced-motion on mount */
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── mousemove handler ── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !cardRef.current || isTouchDevice || prefersReducedMotion) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        /* normalised -1..1 */
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

        const maxTilt = 16; // degrees
        const tiltX = nx * maxTilt;
        const tiltY = -ny * maxTilt;

        /* Main card tilt */
        cardRef.current!.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

        /* Dynamic shadow that shifts opposite to tilt */
        const shadowX = -nx * 20;
        const shadowY = -ny * 20;
        cardRef.current!.style.boxShadow = `${shadowX}px ${shadowY}px 40px -12px rgba(0,0,0,0.5), 0 8px 32px -8px rgba(0,0,0,0.4)`;

        /* Badges: depth-multiplied offsets */
        badgeRefs.current.forEach((el, i) => {
          if (!el) return;
          const depth = badges[i].depth;
          const offsetX = nx * 12 * depth;
          const offsetY = ny * 12 * depth;
          el.style.transform = `translate(${offsetX}px, ${offsetY}px) translateZ(${depth * 20}px)`;
        });
      });
    },
    [isTouchDevice, prefersReducedMotion]
  );

  /* ── reset on mouse leave ── */
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 500ms ease-out";
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      cardRef.current.style.boxShadow = "0 20px 40px -12px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.3)";
    }
    badgeRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)";
      el.style.transform = "translate(0, 0) translateZ(0)";
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 200ms ease-out";
    }
    badgeRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)";
    });
  }, []);

  /* ── attach / detach ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isTouchDevice || prefersReducedMotion) return;

    container.addEventListener("mousemove", handleMouseMove as EventListener);
    container.addEventListener("mouseenter", handleMouseEnter as EventListener);
    container.addEventListener("mouseleave", handleMouseLeave as EventListener);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as EventListener);
      container.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      container.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, isTouchDevice, prefersReducedMotion]);

  const animationDisabled = isTouchDevice || prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] mx-auto"
      style={{
        perspective: animationDisabled ? "none" : "800px",
      }}
    >
      {/* ── Main Card ── */}
      <div
        ref={cardRef}
        className="hero-parallax-card relative rounded-3xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          willChange: animationDisabled ? "auto" : "transform",
          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Card background – dark gradient with brand tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.04_258)] via-[oklch(0.09_0.03_252)] to-[oklch(0.06_0.02_245)]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Subtle accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[oklch(0.78_0.18_245/0.08)] rounded-full blur-3xl" />

        {/* Card inner content */}
        <div className="relative z-10 p-8 sm:p-10 flex flex-col items-center min-h-[420px] justify-center gap-6">
          {/* Logo */}
          <div className="relative">
            <Image
              src="/logo.png"
              alt="NxtGen Academy"
              width={120}
              height={40}
              className="brightness-110"
            />
          </div>

          {/* LIVE badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-4 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="hero-live-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-emerald-300 font-medium">
              Live Cohorts
            </span>
          </div>

          {/* Tagline */}
          <p className="text-center text-sm text-muted-foreground/80 max-w-[260px] leading-relaxed">
            Engineering Tech Careers with Expert-Led Training
          </p>

          {/* Mini divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* Inline stats */}
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-xl font-heading font-semibold text-foreground">5K+</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Enrolled</div>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div>
              <div className="text-xl font-heading font-semibold text-foreground">400%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Avg. Hike</div>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div>
              <div className="text-xl font-heading font-semibold text-foreground">4.8</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Rating</div>
            </div>
          </div>
        </div>

        {/* Subtle border overlay */}
        <div className="absolute inset-0 rounded-3xl border border-white/[0.08] pointer-events-none" />
      </div>

      {/* ── Floating Badges ── */}
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.label}
            ref={(el) => { badgeRefs.current[i] = el; }}
            className={`absolute ${positionStyles[badge.position]} z-20 hero-floating-badge`}
            style={{
              transformStyle: "preserve-3d",
              willChange: animationDisabled ? "auto" : "transform",
              animationDelay: floatDelays[i],
              animationPlayState: isHovering ? "paused" : "running",
            }}
          >
            <div className="hero-glass-badge flex items-center gap-3 rounded-2xl px-4 py-3 min-w-[140px]">
              <div className={`shrink-0 ${badge.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground leading-none">
                  {badge.value}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-none whitespace-nowrap">
                  {badge.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
