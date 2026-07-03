"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
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
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Placement Stories"
            title="Nxt Gen Voices That Inspire Us"
            subtitle="Early feedback from active learners experiencing the value of our hands-on training and expert mentorship."
          />
          
          <ScrollReveal direction="up" delay={200}>
            <div className="flex items-center gap-3 shrink-0 mb-2">
              <button
                type="button"
                onClick={() => handleScroll(-1)}
                className="h-12 w-12 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 text-foreground flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
                aria-label="Scroll testimonials left"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll(1)}
                className="h-12 w-12 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 text-foreground flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
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
              return (
                <Card
                  key={`${person.name}-${index}`}
                  className="min-w-[300px] max-w-[300px] sm:min-w-[340px] sm:max-w-[340px] snap-start rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden gap-0 hover:border-white/20 hover:-translate-y-1 transition-[border-color,transform] duration-300 group py-0 translate-z-0 relative"
                >
                  {/* Spotlight gradient effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0" />
                  
                  <CardContent className="p-0 flex flex-col justify-between h-full relative z-10">
                    <div>
                      <div className="relative h-64 overflow-hidden border-b border-white/5 bg-white/[0.02]">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 pointer-events-none" />
                      </div>
                      
                      <div className="px-6 pb-6 pt-6 relative z-20">
                        <div className="font-heading font-medium text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {person.name}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground line-clamp-1 mt-1">
                          {person.role}
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 border-b border-white/5 pb-4">
                          <div className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-md px-2 py-1 text-[10px] font-mono uppercase tracking-[0.1em] text-foreground/80 truncate max-w-[150px]">
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
