"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { LiaLinkedin } from "react-icons/lia";
import testimonials from "./testimonials.json";
import ScrollReveal from "./ScrollReveal";

const ACCENTS = [
  "from-rose-500/20 via-fuchsia-500/10 to-transparent border-rose-500/20",
  "from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/20",
  "from-sky-500/20 via-cyan-500/10 to-transparent border-sky-500/20",
  "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/20",
  "from-indigo-500/20 via-violet-500/10 to-transparent border-indigo-500/20",
  "from-lime-500/20 via-emerald-500/10 to-transparent border-lime-500/20",
];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export default function AlumniNetwork() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    trackRef.current?.scrollBy({
      left: direction * 360,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="alumni"
      className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-transparent via-card/20 to-transparent"
    >
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Placement Stories"
            title="Learner Voices That Inspire Us"
            subtitle="Early feedback from active learners experiencing the value of our hands-on training and expert mentorship."
          />
          
          <ScrollReveal direction="up" delay={200}>
            <div className="flex items-center gap-3 shrink-0 mb-2">
              <button
                type="button"
                onClick={() => handleScroll(-1)}
                className="h-12 w-12 rounded-xl border border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 text-foreground flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
                aria-label="Scroll testimonials left"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll(1)}
                className="h-12 w-12 rounded-xl border border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 text-foreground flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
                aria-label="Scroll testimonials right"
              >
                <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="fade" delay={400}>
          <div
            ref={trackRef}
            className="mt-10 flex gap-6 overflow-x-auto pt-6 pb-8 scroll-smooth snap-x snap-mandatory hide-scrollbar"
          >
            {testimonials.map((person, index) => {
              const accentClass = ACCENTS[index % ACCENTS.length];
              const linkedinUrl = person.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(person.name)}`;
              return (
                <Card
                  key={`${person.name}-${index}`}
                  className="min-w-[300px] max-w-[300px] sm:min-w-[340px] sm:max-w-[340px] snap-start rounded-3xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-[0_20px_40px_-15px_oklch(0.04_0.015_250/0.4)] flex flex-col justify-between overflow-hidden gap-0 ring-1 ring-white/5 hover:border-primary hover:-translate-y-1 transition-[border-color,transform] duration-300 group py-0 translate-z-0"
                >
                  <CardContent className="p-0 flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-64 overflow-hidden border-b border-border/40 bg-muted/20">
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className={`h-full w-full grid place-items-center text-3xl font-heading font-medium text-foreground bg-gradient-to-br ${accentClass.split(' ')[0]} ${accentClass.split(' ')[1]} ${accentClass.split(' ')[2]}`}>
                            {getInitials(person.name)}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent z-10" />
                      </div>
                      
                      <div className="px-6 pb-2 pt-6 relative z-20">
                        <div className="font-heading font-medium text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {person.name}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground line-clamp-1 mt-1">
                          {person.role}
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 border-b border-border/40 pb-4">
                          <div className="inline-flex items-center rounded-md border border-border/50 bg-background/50 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.1em] text-foreground/80 truncate max-w-[150px]">
                            {person.course.replace(/ - testimonials| - DCS| – testimonials/i, "")}
                          </div>
                          <div className="flex gap-0.5 text-amber-400 text-sm shrink-0 drop-shadow-sm">
                            {Array.from({ length: person.rating || 5 }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                        </div>

                        <p className="mt-5 text-sm leading-relaxed text-foreground/80 line-clamp-4 min-h-[80px] italic">
                          "{person.message}"
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-4 mt-auto">
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${buttonVariants({
                          variant: "outline",
                        })} w-full rounded-xl px-4 py-4 h-auto text-sm font-medium border-border/80 bg-background/40 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                      >
                        <LiaLinkedin className="h-5 w-5 text-[#0A66C2] group-hover/btn:text-white transition-colors" />
                        Connect on LinkedIn
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
