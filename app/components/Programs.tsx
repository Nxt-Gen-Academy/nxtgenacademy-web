"use client";

import React from "react";
import { ArrowRight, BarChart3, Boxes, Database, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface ProgramItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
}

const programsData: ProgramItem[] = [
  {
    id: "ai-pm",
    title: "AI Product Management",
    description:
      "Build AI products, write PRDs, work on real product use-cases and launch your portfolio.",
    duration: "6 Months",
    icon: Boxes,
  },
  {
    id: "ai-ba",
    title: "AI Business Analyst",
    description:
      "Turn business problems into AI-driven solutions using analysis, process and data.",
    duration: "6 Months",
    icon: BarChart3,
  },
  {
    id: "ai-da",
    title: "AI Data Analyst",
    description:
      "Work with real data, build insights, dashboards and solve business use-cases.",
    duration: "6 Months",
    icon: Database,
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
      className="py-16 sm:py-24 relative overflow-hidden bg-background"
    >
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-1/2 left-[-8%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] -z-10 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-[-8%] w-[500px] h-[500px] bg-sky-500/8 rounded-full blur-[140px] -z-10 pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Split Layout: Left Info + Right 3-Cards Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Eyebrow + Heading + Subtitle ── */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <ScrollReveal direction="up" delay={50}>
              {/* Pill Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary tracking-wide mb-5 shadow-xs backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Our Programs</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-foreground leading-[1.12]">
                Explore Our <br />
                Career Programs
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm sm:max-w-md">
                Practical, industry-focused programs to help you transition, upskill and grow in the AI era.
              </p>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN: 3 Horizontal Program Cards with Site-wide card-hover-primary ── */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {programsData.map((prog, idx) => {
              const Icon = prog.icon;

              return (
                <ScrollReveal key={prog.id} direction="up" delay={100 * (idx + 1)}>
                  <div
                    onClick={() => handleOpenProgram(prog.title)}
                    className="card-hover-primary group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] cursor-pointer bg-card text-foreground border border-border/80 shadow-xs"
                  >
                    {/* Top Row: Icon & Circular Arrow Button */}
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="card-icon w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs transition-colors duration-200">
                          <Icon className="h-6 w-6 stroke-[1.8]" />
                        </div>

                        {/* Top-Right Circular Action Arrow */}
                        <div className="card-arrow w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary shadow-xs transition-all duration-200 group-hover:scale-105">
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      {/* Program Title */}
                      <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-tight mb-2.5 text-foreground transition-colors duration-200">
                        {prog.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground transition-colors duration-200">
                        {prog.description}
                      </p>
                    </div>

                    {/* Bottom Metadata Pill */}
                    <div className="pt-6 mt-auto">
                      <span className="card-badge inline-block text-[11px] font-mono font-medium px-3 py-1 rounded-full border border-border/70 bg-muted/70 text-muted-foreground transition-colors duration-200">
                        {prog.duration} • Live Cohort
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
