"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Target, 
  TrendingUp, 
  User, 
  ChevronDown, 
  Check, 
  Zap,
  Rocket
} from "lucide-react";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";
import ScrollReveal from "@/app/components/ScrollReveal";

const CURRENT_ROLES = [
  "Business Analyst",
  "Software Engineer",
  "Data Analyst / Excel Pro",
  "Product / Project Coordinator",
  "Operations / Marketing / Non-Tech",
  "Student / College Graduate",
];

const TARGET_GOALS = [
  {
    id: "ai-ba",
    label: "AI Business Analyst",
    program: "Business Analytics with Gen AI",
    duration: "6 Months",
    hike: "+55% – 85%",
    impact: "Bridge Business Strategy with AI Automation",
    skills: [
      "AI Prompt Engineering",
      "Process Automation",
      "SQL & Advanced Excel",
      "Power BI & Tableau",
      "KPI Intelligence",
      "Business Case Modeling"
    ],
    projects: [
      { name: "BankMate AI", tag: "Fintech Risk Automation" },
      { name: "RetailPulse BI", tag: "Customer Retention Hub" },
      { name: "Workflow AI Agent", tag: "No-Code Process Optimizer" }
    ],
    outcomes: ["AI Business Analyst", "Product Analyst", "BI Specialist", "Business Systems Analyst"],
  },
  {
    id: "ai-pm",
    label: "AI Product Manager",
    program: "AI Product Management",
    duration: "6 Months",
    hike: "+70% – 120%",
    impact: "Lead Next-Gen AI Products from Concept to Scale",
    skills: [
      "AI Product Strategy",
      "PRD Writing for LLMs",
      "AI Product Lifecycle",
      "User Research & Testing",
      "Roadmapping & Scrum",
      "AI APIs & Architecture"
    ],
    projects: [
      { name: "Nexora AI", tag: "Enterprise Support Platform" },
      { name: "HealthCopilot", tag: "Generative Diagnosis Assistant" },
      { name: "AI GTM Case Study", tag: "B2B Market Penetration PRD" }
    ],
    outcomes: ["AI Product Manager", "Associate PM", "Product Growth Lead", "Technical Product Manager"],
  },
  {
    id: "data-genai",
    label: "Data Analytics with Gen AI",
    program: "Data Analytics with Gen AI",
    duration: "6 Months",
    hike: "+60% – 95%",
    impact: "Extract Real-Time Insights & Train AI Data Agents",
    skills: [
      "Python for Data Science",
      "SQL Data Warehouses",
      "Pandas & NumPy",
      "Predictive Modeling",
      "Generative AI Analytics",
      "Automated Reporting"
    ],
    projects: [
      { name: "Customer Churn AI", tag: "Predictive ML Classifier" },
      { name: "E-Commerce Lakehouse", tag: "Multi-Source BI Dashboard" },
      { name: "GenAI Resume Parser", tag: "LLM Talent Matcher" }
    ],
    outcomes: ["Data Analyst", "Analytics Engineer", "BI Consultant", "Junior Data Scientist"],
  },
  {
    id: "ai-auto",
    label: "AI Automation Specialist",
    program: "AI Engineering & Automation Workflows",
    duration: "6 Months",
    hike: "+65% – 110%",
    impact: "Build Autonomous Workflow Pipelines & Agent Swarms",
    skills: [
      "Multi-Agent Systems",
      "Python Automation Scripts",
      "LLM API Integrations",
      "Vector Search & RAG",
      "n8n & Enterprise Webhooks",
      "Autonomous Agents"
    ],
    projects: [
      { name: "Enterprise Agent Swarm", tag: "Automated Ticket Resolution" },
      { name: "Financial Doc Extractor", tag: "Vision & OCR Intelligence" },
      { name: "CRM Lead Enricher", tag: "Automated Prospect Analysis" }
    ],
    outcomes: ["AI Automation Consultant", "Solutions Engineer", "Workflow Architect", "AI Integration Specialist"],
  },
];

const EXPERIENCE_LEVELS = [
  { id: "0-2", label: "0 – 2 Years", subtitle: "Early Career / Fresher", range: "₹6L – ₹14L CTC" },
  { id: "3-5", label: "3 – 5 Years", subtitle: "Mid Career Switch", range: "₹14L – ₹26L CTC" },
  { id: "5+", label: "5+ Years", subtitle: "Senior / Leadership", range: "₹24L – ₹48L+ CTC" },
];

export default function CareerTransitionPlanner() {
  const [currentRole, setCurrentRole] = useState(CURRENT_ROLES[0]);
  const [targetGoalId, setTargetGoalId] = useState(TARGET_GOALS[0].id);
  const [experienceId, setExperienceId] = useState(EXPERIENCE_LEVELS[0].id);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);

  const selectedGoal = useMemo(() => {
    return TARGET_GOALS.find((g) => g.id === targetGoalId) || TARGET_GOALS[0];
  }, [targetGoalId]);

  const selectedExp = useMemo(() => {
    return EXPERIENCE_LEVELS.find((e) => e.id === experienceId) || EXPERIENCE_LEVELS[0];
  }, [experienceId]);

  const handleOpenCounseling = () => {
    window.dispatchEvent(new CustomEvent("open-signup-dialog"));
  };

  return (
    <section id="planner" className="py-20 lg:py-28 relative overflow-hidden bg-background">
      {/* Background Lighting Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with Stepping Stones Journey */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary tracking-wide mb-6 shadow-xs backdrop-blur-md">
              <Compass className="h-3.5 w-3.5 text-primary" />
              <span>Career Transition Planner</span>
            </div>
          </ScrollReveal>

          <WordStaggerHeading
            as="h2"
            className="font-heading text-[clamp(2.1rem,4.5vw,3.6rem)] font-bold text-foreground tracking-tight leading-[1.08]"
          >
            Map Your Next{" "}
            <span className="text-primary bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Career in AI
            </span>
          </WordStaggerHeading>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
              Tell us where you are today, and get a personalized, data-backed roadmap with the right program, high-value skills, real projects, and career outcomes.
            </p>
          </ScrollReveal>

          {/* ── 3D Stepping Stones Roadmap Graphic ── */}
          <ScrollReveal direction="up" delay={300} className="mt-10 max-w-4xl mx-auto">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-sky-500/5 to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10 items-center text-center">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-background/80 border border-border/60 shadow-xs">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-2 shadow-xs">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">Step 01</span>
                  <span className="text-xs font-bold text-foreground mt-0.5 truncate max-w-full">Your Current Role</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-background/80 border border-border/60 shadow-xs">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-400/25 flex items-center justify-center text-primary mb-2 shadow-xs">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">Step 02</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">Learn</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-background/80 border border-border/60 shadow-xs">
                  <div className="h-9 w-9 rounded-lg bg-sky-500/10 border border-sky-400/25 flex items-center justify-center text-[#0284c7] mb-2 shadow-xs">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">Step 03</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">Build</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center p-3 rounded-xl bg-background/80 border border-border/60 shadow-xs">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-400/25 flex items-center justify-center text-indigo-600 mb-2 shadow-xs">
                    <Target className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">Step 04</span>
                  <span className="text-xs font-bold text-foreground mt-0.5">Practice</span>
                </div>

                {/* Step 5 - Peak Goal */}
                <div className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-primary to-blue-700 text-primary-foreground shadow-md border border-primary/40 relative">
                  <div className="h-9 w-9 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center text-white mb-2 shadow-xs">
                    <Rocket className="h-4 w-4 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-blue-100 tracking-wider font-bold">Outcome</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 whitespace-nowrap">Your Next AI Role</span>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Main Interactive Planner Card ── */}
        <ScrollReveal direction="up" delay={250}>
          <div className="bg-card rounded-3xl border border-border/80 shadow-xl overflow-hidden backdrop-blur-md">
            <div className="grid lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border/60">
              
              {/* ── LEFT PANEL: Form Inputs ── */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-card/50">
                <div className="space-y-7">
                  
                  {/* Field 1: Current Role */}
                  <div>
                    <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground tracking-wider uppercase font-mono mb-2.5">
                      <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">1</span>
                      Your Current Role
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsRoleDropdownOpen(!isRoleDropdownOpen);
                          setIsGoalDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/80 bg-background text-foreground text-sm font-medium hover:border-primary/50 transition-colors cursor-pointer text-left shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Briefcase className="h-4 w-4 text-primary shrink-0" />
                          <span className="truncate">{currentRole}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isRoleDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isRoleDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-border bg-card shadow-xl p-1.5 space-y-1 max-h-56 overflow-y-auto"
                          >
                            {CURRENT_ROLES.map((role) => (
                              <button
                                key={role}
                                type="button"
                                onClick={() => {
                                  setCurrentRole(role);
                                  setIsRoleDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                                  currentRole === role ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                                }`}
                              >
                                <span>{role}</span>
                                {currentRole === role && <Check className="h-3.5 w-3.5" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Field 2: Target Career Goal */}
                  <div>
                    <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground tracking-wider uppercase font-mono mb-2.5">
                      <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</span>
                      Your Career Goal
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsGoalDropdownOpen(!isGoalDropdownOpen);
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/80 bg-background text-foreground text-sm font-medium hover:border-primary/50 transition-colors cursor-pointer text-left shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Target className="h-4 w-4 text-primary shrink-0" />
                          <span className="truncate">{selectedGoal.label}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isGoalDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isGoalDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-border bg-card shadow-xl p-1.5 space-y-1"
                          >
                            {TARGET_GOALS.map((goal) => (
                              <button
                                key={goal.id}
                                type="button"
                                onClick={() => {
                                  setTargetGoalId(goal.id);
                                  setIsGoalDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                                  targetGoalId === goal.id ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                                }`}
                              >
                                <span>{goal.label}</span>
                                {targetGoalId === goal.id && <Check className="h-3.5 w-3.5" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Field 3: Experience Level */}
                  <div>
                    <label className="flex items-center gap-2.5 text-xs font-semibold text-foreground tracking-wider uppercase font-mono mb-2.5">
                      <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">3</span>
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => setExperienceId(exp.id)}
                          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            experienceId === exp.id
                              ? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]"
                              : "bg-background border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40"
                          }`}
                        >
                          <span>{exp.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Primary Action Button */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <button
                    type="button"
                    onClick={handleOpenCounseling}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3.5 px-6 font-semibold text-sm shadow-md shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Get My Full Career Roadmap</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center mt-2.5 font-medium">
                    100% Free · 1:1 Senior Mentor Guidance · Personalized Portfolio Plan
                  </p>
                </div>

              </div>

              {/* ── RIGHT PANEL: Dynamic Output Roadmap ── */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-card via-card to-primary/[0.03]">
                <div>
                  
                  {/* Top Result Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-[11px] font-semibold text-primary">
                      <Sparkles className="h-3 w-3" />
                      Your Personalized Roadmap
                    </span>

                    <span className="text-xs font-mono font-semibold text-muted-foreground">
                      Target Salary: <strong className="text-foreground">{selectedExp.range}</strong>
                    </span>
                  </div>

                  {/* Transition Heading */}
                  <div className="mb-6">
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-foreground leading-snug">
                      <span className="text-muted-foreground/80">{currentRole}</span>{" "}
                      <span className="text-primary font-black mx-1">→</span>{" "}
                      <span className="text-primary bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {selectedGoal.label}
                      </span>
                    </h3>

                    {/* Value Pill Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Avg Hike: {selectedGoal.hike}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                        <Zap className="h-3.5 w-3.5" />
                        {selectedGoal.impact}
                      </span>
                    </div>
                  </div>

                  {/* Step-by-Step Breakdown Timeline */}
                  <div className="space-y-5 pt-4 border-t border-border/50">
                    
                    {/* Item 1: Recommended Program */}
                    <div className="flex items-start gap-3.5">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                          Recommended Program
                        </div>
                        <div className="text-sm font-bold text-foreground mt-0.5 flex items-center gap-2">
                          <span>{selectedGoal.program}</span>
                          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-muted border border-border/70 text-muted-foreground">
                            {selectedGoal.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Skills You'll Build */}
                    <div className="flex items-start gap-3.5">
                      <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-blue-400/20">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">
                          Skills You&apos;ll Build
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedGoal.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[11px] px-2.5 py-1 rounded-md bg-muted/80 text-foreground font-medium border border-border/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Item 3: Portfolio Projects */}
                    <div className="flex items-start gap-3.5">
                      <div className="h-7 w-7 rounded-lg bg-sky-500/10 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5 border border-sky-400/20">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">
                          Portfolio Projects You Will Ship
                        </div>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {selectedGoal.projects.map((proj) => (
                            <div key={proj.name} className="p-2.5 rounded-lg bg-card border border-border/70 shadow-2xs">
                              <p className="text-xs font-bold text-foreground truncate">{proj.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate mt-0.5">{proj.tag}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Item 4: Career Outcomes */}
                    <div className="flex items-start gap-3.5">
                      <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                        <Rocket className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                          Target Career Roles
                        </div>
                        <p className="text-xs font-semibold text-foreground mt-0.5">
                          {selectedGoal.outcomes.join(" • ")}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Bottom Assurance Note */}
                <div className="mt-8 pt-5 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Includes 1:1 Mock Interviews &amp; Placement Support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Written Job Assurance Agreement</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
