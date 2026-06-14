"use client";

import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  LineChart,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    tag: "01 / Flagship",
    title: "Business Analytics with Gen AI",
    duration: "6 Months",
    icon: <BarChart3 className="h-6 w-6" />,
    stack: [
      "Excel",
      "SQL",
      "Power BI",
      "Tableau",
      "ChatGPT for Analytics",
      "AI Automation",
      "Prompt Engineering",
      "KPI Dashboarding",
      "Business Insights",
    ],
    roles: [
      "Business Analyst",
      "MIS Analyst",
      "Reporting Analyst",
      "Product Analyst",
    ],
  },
  {
    tag: "02 / Advanced",
    title: "Data Analytics with Gen AI",
    duration: "8 Months",
    icon: <LineChart className="h-6 w-6" />,
    stack: [
      "Python",
      "SQL",
      "Power BI",
      "Pandas",
      "Machine Learning Basics",
      "Gen AI for Data Analysis",
      "AI Reporting",
      "Automation Workflows",
    ],
    roles: ["Data Analyst", "BI Analyst", "Junior Data Scientist"],
  },
  {
    tag: "03 / New",
    title: "AI Product Management",
    duration: "5 Months",
    icon: <Boxes className="h-6 w-6" />,
    stack: [
      "Product Strategy",
      "Agile & Scrum",
      "AI Product Lifecycle",
      "Roadmapping",
      "User Research",
      "AI Product Metrics",
      "ChatGPT & AI Tools",
      "MVP Building",
    ],
    roles: [
      "Associate Product Manager",
      "Product Analyst",
      "AI Product Coordinator",
    ],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-32 px-4 relative">
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Programs" 
          title="Our Flagship Programs" 
          subtitle="Master high-demand skills with our comprehensive, industry-aligned curriculums designed for the modern AI era."
        />
        
        <div className="mt-20 grid lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((p, i) => (
            <ScrollReveal key={p.title} direction="up" delay={i * 150}>
              <Card
                className="card-premium h-full group"
              >
                {/* Top subtle gradient border effect */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-8 flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      <span>{p.tag}</span>
                      <span className="text-accent font-semibold">{p.duration}</span>
                    </div>
                    
                    <div className="mt-8 h-14 w-14 rounded-2xl bg-primary/10 text-primary grid place-items-center border border-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                      {p.icon}
                    </div>
                    
                    <h3 className="mt-6 font-heading text-2xl font-medium leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {p.title}
                    </h3>

                    <div className="mt-8">
                      <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-4 font-semibold">
                        {"You'll learn"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-3 py-1.5 rounded-lg bg-background/80 text-foreground border border-border/80 shadow-sm group-hover:border-primary/20 transition-colors"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border/50">
                      <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-4 font-semibold">
                        Career roles
                      </p>
                      <ul className="space-y-2.5 text-sm">
                        {p.roles.map((r) => (
                          <li key={r} className="flex items-start gap-3 text-foreground/90 group-hover:text-foreground transition-colors">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-tight">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-signup-dialog"))}
                    className={`${buttonVariants({
                      variant: "outline",
                    })} mt-10 w-full h-auto py-3.5 justify-center text-sm font-medium border-border/80 bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary group/button cursor-pointer transition-all duration-300 rounded-xl shadow-sm`}
                  >
                    View curriculum
                    <ArrowUpRight className="h-4 w-4 ml-2 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform" />
                  </button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
