"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const plans = [
  {
    n: "Starter Plan",
    p: "50,000",
    d: "Self-paced foundation + mentor calls.",
    f: [
      "Core curriculum access",
      "Recorded sessions",
      "2 mentor calls / month",
      "Community access",
      "Placement assistance",
    ],
  },
  {
    n: "Professional Plan",
    p: "80,000",
    d: "Live cohort with projects and reviews.",
    f: [
      "Everything in Starter",
      "Live cohort classes",
      "Industry projects",
      "Weekly mentor 1:1",
      "Portfolio reviews",
      "Placement assistance",
    ],
    featured: true,
  },
  {
    n: "Premium Placement Plan",
    p: "1,50,000",
    d: "Full placement support with dedicated guidance.",
    f: [
      "Everything in Professional",
      "Dedicated career coach",
      "Mock interviews (unlimited)",
      "Resume + LinkedIn rewrite",
      "Job referrals",
      "Placement assistance",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading 
          eyebrow="Pricing" 
          title="Flexible Learning Plans" 
          subtitle="Invest in your future with transparent pricing and programs tailored to your learning needs and career goals."
          align="center"
        />
        
        <div className="mt-20 grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((pl, idx) => (
            <ScrollReveal key={pl.n} direction="up" delay={idx * 150}>
              <Card
                className={`relative rounded-3xl p-8 flex flex-col justify-between gap-0 overflow-visible h-full transition-all duration-500 hover:-translate-y-1 group ${
                  pl.featured 
                    ? "bg-white/[0.04] border border-primary/30 z-10 shadow-[0_20px_40px_-15px_oklch(0.62_0.22_258/0.3)] backdrop-blur-lg" 
                    : "bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-white/20"
                }`}
              >
                {/* Spotlight gradient effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0" />
                
                {/* Featured glowing background */}
                {pl.featured && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl pointer-events-none z-0" />
                    <div className="absolute -top-px inset-x-10 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 blur-[1px]" />
                  </>
                )}
                
                {pl.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.2em] bg-primary text-primary-foreground px-4 py-1.5 rounded-full shadow-[0_0_15px_oklch(0.62_0.22_258/0.5)] font-bold whitespace-nowrap">
                    Most picked
                  </span>
                )}
                
                <div className="relative z-10">
                  <CardHeader className="p-0 gap-2">
                    <CardTitle className={`font-heading text-2xl font-medium ${pl.featured ? "text-primary" : "text-foreground"}`}>
                      {pl.n}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-muted-foreground leading-relaxed h-10">
                      {pl.d}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0 mt-8">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-5xl font-medium text-foreground tracking-tight">
                        ₹{pl.p}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                      EMI available · Scholarships open
                    </p>
                    
                    <div className="w-full h-px bg-white/10 my-8" />
                    
                    <ul className="space-y-4 text-sm">
                      {pl.f.map((x) => (
                        <li key={x} className="flex items-start gap-3 text-foreground/90 font-medium">
                          <CheckCircle2 className={`h-5 w-5 shrink-0 ${pl.featured ? "text-primary" : "text-accent"}`} />
                          <span className="leading-tight">{x}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
                
                <CardFooter className="p-0 mt-10 mb-2 border-0 bg-transparent rounded-none relative z-10">
                  <a
                    href="#cta"
                    className={`w-full h-auto py-4 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-300 ease-out group/btn cursor-pointer ${
                      pl.featured
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_oklch(0.62_0.22_258/0.3)] hover:shadow-[0_0_30px_oklch(0.62_0.22_258/0.5)] hover:-translate-y-0.5"
                        : "border border-border/60 bg-card/30 text-foreground backdrop-blur-sm hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/50"
                    }`}
                  >
                    Enroll Now <ArrowUpRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
