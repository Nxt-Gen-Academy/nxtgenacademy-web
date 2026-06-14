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
    p: "45,000",
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
    p: "70,000",
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
    p: "95,000",
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
    <section id="pricing" className="py-32 px-4 relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10">
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
                className={`relative rounded-3xl p-8 flex flex-col justify-between border border-border/50 gap-0 overflow-visible h-full transition-all duration-300 hover:-translate-y-1 ${
                  pl.featured 
                    ? "bg-card/80 ring-1 ring-primary/30 z-10" 
                    : "bg-card/40 backdrop-blur-sm"
                }`}
              >
                {/* Featured glowing background */}
                {pl.featured && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl pointer-events-none" />
                    <div className="absolute -top-px inset-x-10 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
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
                    
                    <div className="w-full h-px bg-border/60 my-8" />
                    
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
                    className={`${buttonVariants({
                      variant: pl.featured ? "default" : "outline",
                      size: "lg",
                    })} w-full rounded-xl h-auto py-4 font-semibold text-base transition-all duration-300 group ${
                      pl.featured
                        ? ""
                        : "bg-background/50 hover:bg-card border-border/80"
                    }`}
                  >
                    Enroll Now <ArrowUpRight className="h-5 w-5 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
