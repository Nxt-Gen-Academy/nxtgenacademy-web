"use client";

import React, { useState } from "react";
import { ArrowRight, BarChart3, Boxes, Database, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";

interface ProgramItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
}

const programsData: ProgramItem[] = [
  {
    id: "ai-pm",
    title: "AI Product Management",
    description:
      "Build AI products, write PRDs and solve real business problems.",
    duration: "6 Months",
    icon: <Boxes className="h-6 w-6" />,
  },
  {
    id: "ai-ba",
    title: "AI Business Analyst",
    description:
      "Turn business problems into AI-driven solutions using analysis and data.",
    duration: "6 Months",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    id: "ai-da",
    title: "AI Data Analyst",
    description:
      "Work with real data, build insights and dashboards to drive business decisions.",
    duration: "6 Months",
    icon: <Database className="h-6 w-6" />,
  },
];

export default function Programs() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleOpenProgram = (programTitle: string) => {
    window.dispatchEvent(
      new CustomEvent("open-signup-dialog", { detail: { program: programTitle } }),
    );
  };

  return (
    <section
      id="programs"
      className="py-16 md:py-24 relative overflow-hidden bg-background"
    >
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[25%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Eyebrow Badge */}
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary tracking-wide mb-5 shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Our Programs</span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <WordStaggerHeading
            as="h2"
            className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-foreground leading-[1.12]"
          >
            Career Programs for the{" "}
            <span className="text-primary">AI Era</span>
          </WordStaggerHeading>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={200}>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Industry-focused, project-based programs to build real career outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* ── 3 Program Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programsData.map((prog, idx) => {
            const isHovered = hoveredId === prog.id;

            return (
              <ScrollReveal key={prog.id} direction="up" delay={150 * (idx + 1)}>
                <div
                  onClick={() => handleOpenProgram(prog.title)}
                  onMouseEnter={() => setHoveredId(prog.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between min-h-[310px] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 border ${
                    isHovered
                      ? "bg-gradient-to-br from-[#1b5bd6] via-[#1651c6] to-[#0f3d99] text-white shadow-2xl shadow-primary/30 border-blue-400/30"
                      : "bg-card text-foreground border-border/80 hover:border-blue-400/30 shadow-sm hover:shadow-2xl hover:shadow-primary/30 hover:bg-gradient-to-br hover:from-[#1b5bd6] hover:via-[#1651c6] hover:to-[#0f3d99]"
                  }`}
                >
                  {/* Top: Icon & Duration Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                          isHovered
                            ? "bg-white/20 text-white border border-white/25 backdrop-blur-md scale-110"
                            : "bg-primary/10 text-primary border border-primary/20 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/25 group-hover:backdrop-blur-md group-hover:scale-110"
                        }`}
                      >
                        {prog.icon}
                      </div>
                      <span
                        className={`text-xs font-mono font-medium px-3.5 py-1 rounded-full transition-all duration-300 ${
                          isHovered
                            ? "bg-white/20 text-white border border-white/15"
                            : "bg-muted text-muted-foreground border border-border/60 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/15"
                        }`}
                      >
                        {prog.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-heading text-2xl font-medium tracking-tight mb-3 transition-colors duration-300 ${
                        isHovered
                          ? "text-white"
                          : "text-foreground group-hover:text-white"
                      }`}
                    >
                      {prog.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                        isHovered
                          ? "text-blue-50/90"
                          : "text-muted-foreground group-hover:text-blue-50/90"
                      }`}
                    >
                      {prog.description}
                    </p>
                  </div>

                  {/* Bottom: Action Arrow */}
                  <div
                    className={`pt-8 flex items-center justify-between border-t transition-colors duration-300 mt-6 ${
                      isHovered
                        ? "border-white/20"
                        : "border-border/60 group-hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                        isHovered
                          ? "text-white"
                          : "text-muted-foreground group-hover:text-white"
                      }`}
                    >
                      View Details
                    </span>

                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isHovered
                          ? "bg-white text-primary scale-110 shadow-md"
                          : "bg-primary/10 text-primary group-hover:bg-white group-hover:text-primary group-hover:scale-110 group-hover:shadow-md"
                      }`}
                    >
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
