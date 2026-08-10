"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { TrendingUp, BadgeCheck, ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "@/app/components/ScrollReveal";

const TRACKS = [
  { id: "ba", name: "Business Analytics with Gen AI", range: "45–65%", hike: 0.55 },
  { id: "da", name: "Data Analytics with Gen AI", range: "60–90%", hike: 0.75 },
  { id: "pm", name: "AI Product Management", range: "70–120%", hike: 0.95 },
];

function fmtLPA(n: number) {
  if (!isFinite(n)) return "0";
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(1);
}

export default function ROICalculatorSection() {
  const [currentCTC, setCurrentCTC] = useState(6);
  const [trackId, setTrackId] = useState("da");
  const [stage, setStage] = useState<"idle" | "printing" | "done">("idle");
  const [displayVal, setDisplayVal] = useState(0);
  const uniqueId = useId();
  const rafRef = useRef<number | null>(null);

  const stampId = `NXG-8${uniqueId.replace(/[^0-9]/g, "") || "492"}`;

  const track = TRACKS.find((t) => t.id === trackId) || TRACKS[1];

  function computeHike(ctc: number, baseHike: number) {
    let h = baseHike;
    if (ctc < 6) h += 0.15;
    else if (ctc > 15) h -= 0.2;
    return Math.max(0.25, h);
  }

  const hike = computeHike(currentCTC, track.hike);
  const projectedRaw = currentCTC * (1 + hike);
  const capped = projectedRaw > 48;
  const projected = capped ? 48 : projectedRaw;
  const gain = projected - currentCTC;
  const todayStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function handleGenerate() {
    if (stage === "printing") return;
    setStage("printing");
    const start = performance.now();
    const duration = 900;
    const from = currentCTC;
    const to = projected;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // Cubic ease out
      setDisplayVal(from + (to - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayVal(to);
        setStage("done");
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function reset() {
    setStage("idle");
    setDisplayVal(0);
  }

  const handleOpenSignup = () => {
    window.dispatchEvent(new CustomEvent("open-signup-dialog"));
  };

  return (
    <section id="roi-calculator" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[155px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="section-divider mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Context / Marketing */}
          <div className="flex flex-col justify-center">
            <ScrollReveal direction="up" delay={100}>
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-accent mb-6">
                <span className="relative flex items-center justify-center">
                  <span className="h-px w-8 bg-accent/80" />
                  <span className="absolute right-0 h-1 w-1 rounded-full bg-accent" />
                </span>
                Career ROI Calculator
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <h2 className="font-heading text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.08] font-medium text-foreground tracking-tight">
                See what your next career move could be worth.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Explore the potential career growth and financial outcomes with NxtGen Academy programs. Enter your current CTC and select a track to compute your projected salary.
              </p>
            </ScrollReveal>

            {/* Micro Stats or Trust Bullet points */}
            <ScrollReveal direction="up" delay={400} className="mt-8 space-y-4 max-w-lg">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center border border-primary/20 shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">72% Average Salary Hike</h4>
                  <p className="text-xs text-muted-foreground mt-1">Our alumni report significant career jumps after mastering analytics and generative AI skills.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm">
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent grid place-items-center border border-accent/20 shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Highest Placement up to 48 LPA</h4>
                  <p className="text-xs text-muted-foreground mt-1">Access elite roles in AI Product Management, Business Analytics, and Data Science cohorts.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Calculator Widget */}
          <ScrollReveal direction="up" delay={300}>
            <div className="relative rounded-2xl border border-border/50 bg-card/45 backdrop-blur-md shadow-2xl p-6 sm:p-8 overflow-hidden glow-border">
              {/* Header inside widget */}
              <div className="flex justify-between items-center pb-6 border-b border-border/40">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                    CTC Statement No. {stampId}
                  </div>
                  <div className="text-xs font-mono text-accent mt-0.5 uppercase tracking-wide">
                    Issued: {todayStr}
                  </div>
                </div>
                <div className="hidden sm:block text-[10px] font-mono text-muted-foreground tracking-wider">
                  NxtGen Career Finance
                </div>
              </div>

              {/* Slider & Input for Current CTC */}
              <div className="py-6 border-b border-dashed border-border/30">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">
                    Current Annual CTC
                  </label>
                  <div className="flex items-center gap-2 bg-background/50 border border-border/50 rounded-lg px-3 py-1.5 focus-within:border-primary/60 transition-colors">
                    <span className="text-muted-foreground text-sm font-mono font-medium">₹</span>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={currentCTC}
                      onChange={(e) => {
                        const val = Math.max(1, Math.min(60, Number(e.target.value) || 0));
                        setCurrentCTC(val);
                        reset();
                      }}
                      className="w-12 text-center text-sm font-mono font-bold bg-transparent text-foreground outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-muted-foreground text-xs font-mono">LPA</span>
                  </div>
                </div>
                
                {/* Custom Styled Slider */}
                <div className="relative mt-5 mb-2 flex items-center">
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={currentCTC}
                    onChange={(e) => {
                      setCurrentCTC(Number(e.target.value));
                      reset();
                    }}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((currentCTC - 1) / 59) * 100}%, var(--color-muted) ${((currentCTC - 1) / 59) * 100}%, var(--color-muted) 100%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
                  <span>₹1 LPA</span>
                  <span>₹30 LPA</span>
                  <span>₹60 LPA</span>
                </div>
              </div>

              {/* Program Track Selector */}
              <div className="py-6 border-b border-dashed border-border/30">
                <label className="text-sm font-medium text-foreground block mb-3.5">
                  Select Program Track
                </label>
                <div className="grid gap-3">
                  {TRACKS.map((t) => {
                    const isSelected = trackId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTrackId(t.id);
                          reset();
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-primary/10 border-primary shadow-[0_0_12px_oklch(0.58_0.20_255/0.15)] text-foreground"
                            : "bg-white/[0.01] border-border/50 text-muted-foreground hover:border-border hover:bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-4 w-4 rounded-full border grid place-items-center transition-colors ${
                            isSelected ? "border-primary text-primary" : "border-muted-foreground/40"
                          }`}>
                            {isSelected && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                            {t.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-medium shrink-0 ml-3 text-accent/80">
                          {t.range} hike
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculate Action */}
              <div className="py-6">
                <button
                  onClick={handleGenerate}
                  disabled={stage === "printing"}
                  className="w-full relative overflow-hidden inline-flex items-center justify-center rounded-xl py-4 font-semibold text-sm bg-primary text-primary-foreground transition-all duration-300 hover:shadow-[0_8px_20px_oklch(0.58_0.20_255/0.25)] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {stage === "printing" ? (
                    <span className="flex items-center gap-2 tracking-wider font-mono">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      ANALYZING STATEMENT…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 tracking-wider font-mono uppercase">
                      Calculate My Projection <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>

              {/* Result State (Reveals dynamically) */}
              {stage !== "idle" && (
                <div className="mt-2 pt-6 border-t border-dashed border-border/40 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-4">
                    Projected Career Outcome
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 items-center mb-6">
                    {/* Numbers Grid */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Current CTC</div>
                        <div className="text-lg font-mono font-bold text-foreground">
                          ₹{fmtLPA(currentCTC)} LPA
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Projected CTC</div>
                        <div className="text-3xl font-mono font-extrabold text-accent leading-none">
                          ₹{fmtLPA(displayVal)}
                          {capped && stage === "done" ? "+" : ""} LPA
                        </div>
                      </div>
                    </div>

                    {/* Verified Stamp Badge */}
                    {stage === "done" && (
                      <div className="flex justify-center sm:justify-end animate-in zoom-in-75 duration-500">
                        <div className="relative flex items-center justify-center rounded-full border-2 border-amber-500/40 bg-amber-500/5 h-[90px] w-[90px] rotate-[-8deg] shadow-lg shadow-amber-500/5 select-none">
                          <div className="text-center">
                            <BadgeCheck className="h-4.5 w-4.5 text-amber-500 mx-auto mb-1 animate-pulse" />
                            <div className="text-amber-500 font-mono text-[7.5px] leading-tight font-bold tracking-wider">
                              NXTGEN
                              <br />
                              VERIFIED
                              <br />
                              PROJECTION
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Visual Comparison Progress Bars */}
                  <div className="space-y-3 mb-6 bg-background/30 p-4 rounded-xl border border-border/30">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-mono">
                        <span>Current annual scale</span>
                        <span>₹{fmtLPA(currentCTC)} LPA</span>
                      </div>
                      <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-muted-foreground/60 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (currentCTC / 48) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-primary font-mono mb-1.5">
                        <span>Projected annual scale</span>
                        <span className="font-bold">₹{fmtLPA(displayVal)} LPA</span>
                      </div>
                      <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (displayVal / 48) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {stage === "done" && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                        <TrendingUp className="h-3 w-3" />
                        +{Math.round(hike * 100)}% Hike
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        ≈ ₹{fmtLPA(gain)} LPA extra / year
                      </span>
                    </div>
                  )}

                  <p className="text-[10px] text-muted-foreground/70 leading-relaxed italic mb-6">
                    *Estimate is based on historical placed student data for the selected track. Actual outcomes vary depending on experience, performance, and market hiring conditions.
                  </p>

                  {/* Result State CTAs */}
                  {stage === "done" && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-border/40">
                      <button
                        onClick={handleOpenSignup}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-sm bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_15px_oklch(0.74_0.16_245/0.25)] transition-all cursor-pointer font-mono uppercase tracking-wide"
                      >
                        <Sparkles className="h-4 w-4" /> Book Mentor Session
                      </button>
                      <a
                        href="#curriculum"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-sm border border-border bg-card/20 text-foreground hover:bg-card/50 transition-all font-mono"
                      >
                        Explore Curriculum
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
