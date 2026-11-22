"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  Sparkles, 
  ArrowUpRight, 
  Play, 
  TrendingUp 
} from "lucide-react";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";
import ScrollReveal from "./ScrollReveal";

interface Milestone {
  year: number;
  x: number;
  y: number;
  label: string;
  salary: string;
  multiplier: string;
}

const MILESTONES: Milestone[] = [
  { year: 2026, x: 50, y: 155, label: "Foundation & AI Workflows", salary: "₹12L - ₹15L", multiplier: "1.5X" },
  { year: 2028, x: 220, y: 125, label: "AI Automation & Analytics", salary: "₹24L - ₹28L", multiplier: "2.3X" },
  { year: 2030, x: 395, y: 95, label: "Strategic AI Implementation", salary: "₹38L - ₹45L", multiplier: "3.0X" },
  { year: 2032, x: 570, y: 65, label: "Enterprise AI Architecture", salary: "₹52L - ₹60L", multiplier: "3.5X" },
  { year: 2035, x: 745, y: 25, label: "Executive AI Leadership", salary: "₹75L+ CTC", multiplier: "4.0X" },
];

export default function AISkillGap() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Smooth cubic-bezier curve matching the reference illustration
  const curvePath = "M 50,155 C 130,145 165,132 220,125 C 285,116 335,102 395,95 C 465,86 515,72 570,65 C 630,56 685,35 745,25";
  const areaPath = `${curvePath} L 745,195 L 50,195 Z`;

  const handleOpenExplore = () => {
    const el = document.getElementById("programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.dispatchEvent(new CustomEvent("open-signup-dialog"));
    }
  };

  const handleOpenVideo = () => {
    window.dispatchEvent(new CustomEvent("open-signup-dialog"));
  };

  return (
    <section id="skill-gap" className="py-20 lg:py-28 relative overflow-hidden bg-background">
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] -z-10 pointer-events-none" />

      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          
          {/* Eyebrow Badge */}
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary tracking-wide mb-6 shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>AI Skills for Modern Professionals</span>
            </div>
          </ScrollReveal>

          {/* Headline with Swoop Underline on Accelerating */}
          <WordStaggerHeading
            as="h2"
            className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-foreground leading-[1.08]"
          >
            The AI Skills Curve is <br />
            <span className="relative inline-block text-primary font-medium mt-1">
              Accelerating
              {/* Dynamic curved swoop underline */}
              <svg
                className="absolute -bottom-2.5 left-0 w-full h-3.5 text-primary/80 overflow-visible"
                viewBox="0 0 250 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10C75 2 185 2 246 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </WordStaggerHeading>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={200}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto font-normal">
              Traditional workflows are evolving fast. Build AI, analytics and automation skills to stay ahead and unlock higher career opportunities.
            </p>
          </ScrollReveal>

        </div>

        {/* ── Main Growth Curve Card ── */}
        <ScrollReveal direction="up" delay={300}>
          <div className="card-premium rounded-3xl p-6 sm:p-10 shadow-sm border border-border/80 bg-card/95 backdrop-blur-md relative overflow-hidden">
            
            {/* Top Row: Metric Header & Faster Growth Badge */}
            <div className="flex items-center justify-between gap-4 mb-6">
              
              {/* Left Label */}
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-lg sm:text-xl text-foreground leading-tight">
                    Career Growth
                  </h3>
                  <span className="text-xs text-muted-foreground font-normal">
                    (with AI Skills)
                  </span>
                </div>
              </div>

              {/* Right Floating Badge */}
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl shadow-md shadow-primary/25 text-right flex flex-col items-end">
                <span className="text-sm sm:text-base font-bold tracking-tight leading-none">
                  2–4X
                </span>
                <span className="text-[10px] font-semibold text-primary-foreground/90 uppercase tracking-wider mt-0.5">
                  Faster Growth
                </span>
              </div>

            </div>

            {/* SVG Curve Container */}
            <div className="relative pt-4 pb-2">
              
              {/* Floating Tooltip when node is hovered */}
              {hoveredIdx !== null && (
                <div 
                  className="absolute z-20 -top-6 transform -translate-x-1/2 pointer-events-none transition-all duration-200"
                  style={{
                    left: `${(MILESTONES[hoveredIdx].x / 800) * 100}%`
                  }}
                >
                  <div className="bg-popover text-popover-foreground border border-border shadow-lg rounded-xl px-3.5 py-1.5 text-xs text-center whitespace-nowrap">
                    <span className="font-semibold text-primary">{MILESTONES[hoveredIdx].year}</span>:{" "}
                    <span className="text-foreground">{MILESTONES[hoveredIdx].salary}</span>{" "}
                    <span className="text-muted-foreground font-mono">({MILESTONES[hoveredIdx].multiplier})</span>
                  </div>
                </div>
              )}

              <svg
                viewBox="0 0 800 200"
                className="w-full h-auto overflow-visible"
              >
                <defs>
                  {/* Soft area gradient */}
                  <linearGradient id="growthAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.32" />
                    <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Curve Glow */}
                  <filter id="curveGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="var(--color-primary)" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Shaded Area Under Curve */}
                <path
                  d={areaPath}
                  fill="url(#growthAreaGradient)"
                  className="transition-all duration-500 ease-out"
                />

                {/* Glowing Blue Curve */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#curveGlow)"
                  className="transition-all duration-500 ease-out"
                />

                {/* Milestone Nodes */}
                {MILESTONES.map((pt, idx) => {
                  const isLast = idx === MILESTONES.length - 1;
                  const isHovered = hoveredIdx === idx;

                  return (
                    <g key={pt.year} className="cursor-pointer">
                      {/* Pulse effect on 2035 node */}
                      {isLast && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill="var(--color-primary)"
                          className="animate-ping opacity-30"
                        />
                      )}

                      {/* Transparent Hover Target */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="20"
                        fill="transparent"
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                      />

                      {/* Outer White / Card Circle */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 8 : 6}
                        fill="var(--color-card)"
                        stroke="var(--color-primary)"
                        strokeWidth="3"
                        className="transition-all duration-200"
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                      />

                      {/* Center Point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 3.5 : 2.5}
                        fill="var(--color-primary)"
                        className="transition-all duration-200"
                        pointerEvents="none"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Timeline Years on X-Axis */}
              <div className="flex justify-between items-center w-full pt-3 px-1 text-xs font-mono font-medium text-muted-foreground select-none">
                {MILESTONES.map((pt, idx) => (
                  <span 
                    key={pt.year} 
                    className={`transition-colors cursor-pointer ${
                      hoveredIdx === idx ? "text-primary font-bold" : "hover:text-foreground"
                    }`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {pt.year}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* ── Action Buttons matching Image ── */}
        <ScrollReveal direction="up" delay={400}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
            {/* Primary Action Button */}
            <button
              onClick={handleOpenExplore}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium text-sm sm:text-base bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-primary/40 cursor-pointer active:scale-[0.98]"
            >
              <span>Explore Our Programs</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Secondary Action Button */}
            <button
              onClick={handleOpenVideo}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border/80 hover:border-primary/40 bg-card hover:bg-muted text-foreground px-6 py-3.5 text-sm sm:text-base font-medium shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
            >
              <span className="w-5 h-5 rounded-full border border-border flex items-center justify-center bg-primary/10 text-primary">
                <Play className="w-2.5 h-2.5 fill-primary text-primary ml-0.5" />
              </span>
              <span>How It Works</span>
            </button>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
