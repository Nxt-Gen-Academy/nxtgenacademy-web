"use client";

import React from "react";
import { Landmark, Sparkles, LayoutGrid, ArrowRight, Bot } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  previewType: "banking" | "assistant" | "more";
}

const projectsData: ProjectItem[] = [
  {
    id: "bankmate",
    title: "BankMate AI",
    description: "AI for smarter banking and risk decisioning.",
    tag: "Fintech & Risk",
    icon: Landmark,
    previewType: "banking",
  },
  {
    id: "nexora",
    title: "Nexora AI",
    description: "An AI product for personalized user support.",
    tag: "GenAI & Agentic",
    icon: Bot,
    previewType: "assistant",
  },
  {
    id: "more-projects",
    title: "+ More Projects",
    description: "Product, analytics and automation use-cases across industries.",
    tag: "12+ Capstones",
    icon: LayoutGrid,
    previewType: "more",
  },
];

export default function Projects() {
  const handleOpenProject = (projectTitle: string) => {
    window.dispatchEvent(
      new CustomEvent("open-signup-dialog", { detail: { program: `Project: ${projectTitle}` } }),
    );
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 relative overflow-hidden bg-[#020b22] text-white border-y border-blue-950/60"
    >
      {/* ── Clean Blue Background with Technical Grid (No excessive gradients) ── */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
          backgroundSize: "44px 44px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Split Layout: Left Info + Right 3-Cards Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Eyebrow + Heading + Subtitle ── */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <ScrollReveal direction="up" delay={50}>
              {/* Pill Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-xs font-semibold text-[#38bdf8] tracking-wide mb-5">
                <Sparkles className="h-3.5 w-3.5 text-[#38bdf8]" />
                <span>Built at NxtGen</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-white leading-[1.12]">
                Build Real Projects. <br />
                Create Real Impact.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="mt-4 text-sm sm:text-base text-blue-200/75 leading-relaxed max-w-sm sm:max-w-md">
                Not just theory — work on end-to-end AI projects that solve real business problems.
              </p>
            </ScrollReveal>
          </div>

          {/* ── RIGHT COLUMN: 3 Horizontal Project Cards (No glow on hover) ── */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
            {projectsData.map((proj, idx) => {
              const Icon = proj.icon;

              return (
                <ScrollReveal key={proj.id} direction="up" delay={100 * (idx + 1)}>
                  <div
                    onClick={() => handleOpenProject(proj.title)}
                    className="group relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] cursor-pointer bg-[#051336] hover:bg-[#071842] border border-blue-500/25 hover:border-blue-400/40 transition-colors duration-200"
                  >
                    {/* Top: Header Icon & Mini UI Preview Box */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-[#38bdf8]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/20">
                          {proj.tag}
                        </span>
                      </div>

                      {/* Mini Realistic UI Screen Preview Mockup */}
                      <div className="w-full h-24 rounded-xl bg-[#03091e] border border-blue-500/20 p-2.5 mb-5 flex flex-col justify-between overflow-hidden relative group-hover:border-blue-400/35 transition-colors">
                        {proj.previewType === "banking" && (
                          <div className="h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-blue-300/80 uppercase">Credit Risk AI</span>
                              <span className="text-[9px] font-bold text-emerald-400">98.7% Accuracy</span>
                            </div>
                            <div className="flex items-center gap-1.5 my-auto">
                              <div className="h-7 flex-1 rounded bg-blue-950/60 p-1 flex flex-col justify-center border border-blue-500/15">
                                <span className="text-[8px] text-blue-300/60 leading-none">Default Risk</span>
                                <span className="text-[10px] font-bold text-white leading-none mt-0.5">0.18 Low</span>
                              </div>
                              <div className="h-7 flex-1 rounded bg-blue-950/60 p-1 flex flex-col justify-center border border-blue-500/15">
                                <span className="text-[8px] text-blue-300/60 leading-none">Decision</span>
                                <span className="text-[10px] font-bold text-emerald-400 leading-none mt-0.5">Approved</span>
                              </div>
                            </div>
                            <div className="h-1.5 w-full bg-blue-950 rounded-full overflow-hidden">
                              <div className="h-full w-4/5 bg-blue-500 rounded-full" />
                            </div>
                          </div>
                        )}

                        {proj.previewType === "assistant" && (
                          <div className="h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-cyan-300/80 uppercase">AI Copilot</span>
                              <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                              </span>
                            </div>
                            <div className="space-y-1 my-auto">
                              <div className="bg-blue-950/70 p-1 rounded text-[8px] text-blue-200 truncate border border-blue-500/15">
                                Query: &quot;Forecast Q3 churn drivers&quot;
                              </div>
                              <div className="bg-blue-900/40 p-1 rounded text-[8px] text-cyan-300 truncate border border-cyan-500/20">
                                AI: Identified 3 core attrition factors
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[8px] text-blue-400/80">
                              <span>Latency: 140ms</span>
                              <span>Model: GenAI 2.5</span>
                            </div>
                          </div>
                        )}

                        {proj.previewType === "more" && (
                          <div className="h-full flex flex-col justify-center items-center text-center p-2">
                            <div className="grid grid-cols-3 gap-1.5 w-full mb-1">
                              <div className="h-4 rounded bg-blue-900/30 border border-blue-500/15 flex items-center justify-center text-[7px] text-blue-300">Sales BI</div>
                              <div className="h-4 rounded bg-blue-900/30 border border-blue-500/15 flex items-center justify-center text-[7px] text-blue-300">Resume AI</div>
                              <div className="h-4 rounded bg-blue-900/30 border border-blue-500/15 flex items-center justify-center text-[7px] text-blue-300">Marketing</div>
                            </div>
                            <span className="text-[9px] font-mono text-cyan-300 mt-1 flex items-center gap-1">
                              <span>Browse all Capstones</span>
                              <ArrowRight className="h-2.5 w-2.5" />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="font-heading text-lg sm:text-xl font-medium tracking-tight text-white mb-1.5 group-hover:text-[#38bdf8] transition-colors">
                        {proj.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm leading-relaxed text-blue-200/75">
                        {proj.description}
                      </p>
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="pt-4 mt-auto flex items-center justify-between border-t border-blue-900/40">
                      <span className="text-[11px] font-medium text-blue-300/80 group-hover:text-white transition-colors">
                        {proj.id === "more-projects" ? "Explore Capstones" : "View Architecture"}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-[#01091d] transition-colors">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
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
