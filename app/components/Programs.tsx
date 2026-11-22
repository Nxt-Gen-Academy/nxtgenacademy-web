"use client";

import React from "react";
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

      <div className="section-divider" />

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
          {programsData.map((prog, idx) => (
            <ScrollReveal key={prog.id} direction="up" delay={150 * (idx + 1)}>
              <div
                onClick={() => handleOpenProgram(prog.title)}
                className="card-hover-primary group relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between min-h-[310px] cursor-pointer bg-card text-foreground border border-border/80 shadow-sm"
              >
                {/* Top: Icon & Duration Badge */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="card-icon w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs transition-colors duration-200">
                      {prog.icon}
                    </div>
                    <span className="card-badge text-xs font-mono font-medium px-3.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/60 transition-colors duration-200">
                      {prog.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl font-medium tracking-tight mb-3 text-foreground transition-colors duration-200">
                    {prog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground transition-colors duration-200">
                    {prog.description}
                  </p>
                </div>

                {/* Bottom: Action Arrow */}
                <div className="card-divider pt-8 flex items-center justify-between border-t border-border/60 transition-colors duration-200 mt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors duration-200">
                    View Details
                  </span>

                  <div className="card-arrow w-11 h-11 rounded-full flex items-center justify-center shadow-xs bg-primary/10 text-primary transition-colors duration-200">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
