"use client";

import React, { useState } from "react";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";
import ScrollReveal from "@/app/components/ScrollReveal";
import { 
  GraduationCap, 
  BookOpen, 
  Code2, 
  Rocket, 
  TrendingUp, 
  Lightbulb, 
  Sparkles, 
  ChevronDown, 
  ArrowRight 
} from "lucide-react";

const CURRENT_ROLES = [
  "Business Analyst",
  "Software Developer",
  "QA / Test Engineer",
  "Data Analyst",
  "Project Manager",
  "Operations Executive",
  "Fresher / Student",
];

interface GoalData {
  prog: string;
  mo: number;
  skills: string;
  proj: string;
  out: string;
}

const GOALS: Record<string, GoalData> = {
  "AI Business Analyst": {
    prog: "AI Business Analyst",
    mo: 4,
    skills: "AI Tools, Requirement Analysis, Process Automation, Data Insights",
    proj: "BankMate AI, Nexora AI, Process Automation",
    out: "AI Business Analyst, Product Analyst, Business Systems Analyst",
  },
  "AI Product Manager": {
    prog: "AI Product Management",
    mo: 5,
    skills: "Product Strategy, LLM Capabilities, Prompt Design, Roadmapping, Metrics",
    proj: "AI Copilot PRD, Feature Prioritization Board, Launch Plan",
    out: "AI Product Manager, Associate PM, Product Owner",
  },
  "AI Engineer": {
    prog: "Applied AI Engineering",
    mo: 6,
    skills: "Python, LLM APIs, RAG, Agents, Deployment",
    proj: "RAG Chatbot, Agent Workflow, Model Evaluation Suite",
    out: "AI Engineer, ML Engineer, LLM Developer",
  },
  "Data / AI Analyst": {
    prog: "AI-Powered Data Analytics",
    mo: 4,
    skills: "SQL, Python, Dashboards, Generative AI for Analysis, Storytelling",
    proj: "Sales Insights Dashboard, Churn Predictor, Auto-Reporting Bot",
    out: "AI Data Analyst, Analytics Engineer, BI Specialist",
  },
  "AI QA Engineer": {
    prog: "AI Test Automation",
    mo: 3,
    skills: "Test Automation, AI Test Generation, LLM Evaluation, CI Pipelines",
    proj: "Self-healing Test Suite, LLM Eval Harness",
    out: "AI QA Engineer, SDET, Quality Automation Lead",
  },
};

const PAY: Record<string, [number, number][]> = {
  "AI Business Analyst": [[6, 10], [11, 17], [18, 27]],
  "AI Product Manager": [[8, 13], [14, 22], [24, 38]],
  "AI Engineer": [[9, 14], [16, 26], [26, 45]],
  "Data / AI Analyst": [[7, 11], [12, 19], [19, 30]],
  "AI QA Engineer": [[6, 10], [11, 17], [17, 26]],
};

const TODAY = [3.5, 7, 12];
const EXPERIENCE_NOTES = [
  "Start with fundamentals and build your first portfolio fast.",
  "Leverage your experience: focus on applied projects and tools.",
  "Fast-track track: leadership-ready projects and strategy focus.",
];
const MONTH_OFFSETS = [0, -1, -1];

export default function CareerTransitionPlanner() {
  const [currentRole, setCurrentRole] = useState<string>("Business Analyst");
  const [targetGoal, setTargetGoal] = useState<string>("AI Business Analyst");
  const [expIndex, setExpIndex] = useState<number>(0);
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRole || !targetGoal) {
      setErrorMessage("Select your current role and target role to continue.");
      return;
    }
    if (currentRole === targetGoal) {
      setErrorMessage("Pick a target role that differs from your current role.");
      return;
    }
    setErrorMessage("");
    setIsGenerated(true);
  };

  const handleExpChange = (idx: number) => {
    setExpIndex(idx);
  };

  const goalData = GOALS[targetGoal] || GOALS["AI Business Analyst"];
  const durationMonths = Math.max(2, goalData.mo + MONTH_OFFSETS[expIndex]);

  const payRanges = PAY[targetGoal] || PAY["AI Business Analyst"];
  const [lo, hi] = payRanges[expIndex];
  const td = TODAY[expIndex];
  const growthPercent = Math.round((((lo + hi) / 2 / td) - 1) * 100);
  const y3Low = Math.round(lo * 1.5);
  const y3High = Math.round(hi * 1.5);
  const maxPay = y3High;

  const todayWidth = Math.min(100, Math.round((td / maxPay) * 100));
  const year1Width = Math.min(100, Math.round((hi / maxPay) * 100));
  const year3Width = 100;

  const handleOpenConsultation = () => {
    window.dispatchEvent(new CustomEvent("open-signup-dialog", { detail: { program: goalData.prog } }));
  };

  return (
    <section id="planner" className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Background Lighting Accents */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="section-divider" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-xs font-semibold text-primary tracking-wide mb-5 shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Career Transition Planner</span>
            </div>
          </ScrollReveal>

          <WordStaggerHeading
            as="h2"
            className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-foreground leading-[1.12]"
          >
            Map Your Next{" "}
            <span className="text-primary">Career in AI</span>
          </WordStaggerHeading>

          <ScrollReveal direction="up" delay={150}>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
              Tell us where you are today, and get a personalized roadmap with the right program, skills, projects and career outcomes.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Planner Panel Card ── */}
        <ScrollReveal direction="up" delay={250}>
          <div className="card-premium rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/80 bg-card/95 shadow-xl shadow-primary/5 backdrop-blur-md">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Form Controls */}
              <form onSubmit={handleGenerate} className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  
                  {/* Step 1: Current Role */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-foreground mb-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      Your Current Role
                    </label>
                    <div className="relative">
                      <select
                        value={currentRole}
                        onChange={(e) => {
                          setCurrentRole(e.target.value);
                          setErrorMessage("");
                        }}
                        className="w-full appearance-none px-4 py-3.5 rounded-2xl border border-border/80 bg-background text-foreground text-sm font-medium shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer pr-10"
                        aria-label="Current role"
                      >
                        <option value="">Select your current role</option>
                        {CURRENT_ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 2: Target Goal */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-foreground mb-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      Your Career Goal
                    </label>
                    <div className="relative">
                      <select
                        value={targetGoal}
                        onChange={(e) => {
                          setTargetGoal(e.target.value);
                          setErrorMessage("");
                        }}
                        className="w-full appearance-none px-4 py-3.5 rounded-2xl border border-border/80 bg-background text-foreground text-sm font-medium shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer pr-10"
                        aria-label="Target role"
                      >
                        <option value="">Select your target role</option>
                        {Object.keys(GOALS).map((goal) => (
                          <option key={goal} value={goal}>
                            {goal}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 3: Experience Level */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-foreground mb-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                        3
                      </span>
                      Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {["0 – 2 Years", "3 – 5 Years", "5+ Years"].map((label, idx) => {
                        const isActive = expIndex === idx;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => handleExpChange(idx)}
                            aria-pressed={isActive}
                            className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-medium border transition-all text-center cursor-pointer ${
                              isActive
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-background text-muted-foreground border-border/80 hover:text-foreground hover:border-primary/40"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Submit CTA */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/95 hover:to-blue-700 text-white font-medium text-sm sm:text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>✨ Get My Personalized Roadmap</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {errorMessage && (
                    <div className="text-destructive text-xs sm:text-sm font-medium mt-3" role="alert">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </form>

              {/* Right Column: Dynamic Personalized Roadmap Display */}
              <div className="lg:col-span-7 bg-muted/40 dark:bg-card/60 border border-border/70 rounded-3xl p-6 sm:p-8 relative">
                
                {/* Roadmap Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Your Personalized Roadmap
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    Target: ₹{lo}L – ₹{hi}L CTC
                  </span>
                </div>

                {/* Role Transition Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-1">
                  {currentRole || "Select Role"}{" "}
                  <span className="text-primary font-medium">→ {targetGoal}</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                  📈 Higher Impact Roles &nbsp;|&nbsp; Better Earning Potential
                </p>

                {/* Roadmap Info Items */}
                <div className="space-y-4 border-t border-border/60 pt-4">
                  
                  {/* Recommended Program */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Recommended Program
                      </h4>
                      <p className="text-sm sm:text-base font-medium text-foreground">
                        {goalData.prog} <span className="text-primary font-semibold">({durationMonths} Months)</span>
                      </p>
                    </div>
                  </div>

                  {/* Skills You'll Build */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/20">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Skills You'll Build
                      </h4>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {goalData.skills}
                      </p>
                    </div>
                  </div>

                  {/* Portfolio Projects */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-400/20">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Portfolio Projects
                      </h4>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {goalData.proj}
                      </p>
                    </div>
                  </div>

                  {/* Career Outcome */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/20">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        Career Outcome
                      </h4>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {goalData.out}
                      </p>
                    </div>
                  </div>

                  {/* 💰 Package Growth Visualization */}
                  <div className="border-t border-border/60 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <h4 className="text-sm font-semibold text-foreground">
                          Package Growth
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        +{growthPercent}% on average
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {/* Today */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Today (typical)</span>
                          <span className="font-semibold text-foreground">₹{td} LPA</span>
                        </div>
                        <div className="h-2 rounded-full bg-border/60 overflow-hidden">
                          <div 
                            className="h-full bg-muted-foreground/40 rounded-full transition-all duration-500"
                            style={{ width: `${todayWidth}%` }}
                          />
                        </div>
                      </div>

                      {/* Year 1 */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>After the program (year 1)</span>
                          <span className="font-semibold text-primary">₹{lo} – ₹{hi} LPA</span>
                        </div>
                        <div className="h-2 rounded-full bg-border/60 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${year1Width}%` }}
                          />
                        </div>
                      </div>

                      {/* Year 3 */}
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>In 3 years with growth</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{y3Low} – ₹{y3High} LPA</span>
                        </div>
                        <div className="h-2 rounded-full bg-border/60 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${year3Width}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-normal mt-2.5 italic">
                      Indicative ranges in LPA for strong performers. Actual offers vary by company, city, skills and interview performance.
                    </p>
                  </div>

                  {/* Level Specific Guidance */}
                  <div className="flex items-start gap-3.5 border-t border-border/60 pt-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/20">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                        For your level
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/90 font-medium mt-0.5">
                        {EXPERIENCE_NOTES[expIndex]}
                      </p>
                    </div>
                  </div>

                  {/* 5-Step Pipeline Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-border/60 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-lg bg-background border border-border/80 text-foreground">
                      {currentRole || "Current Role"}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-background border border-border/80 text-foreground">
                      Learn
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-background border border-border/80 text-foreground">
                      Build
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-background border border-border/80 text-foreground">
                      Practice
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground font-semibold">
                      {targetGoal}
                    </span>
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
