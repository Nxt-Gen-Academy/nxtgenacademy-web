"use client";

import Image from "next/image";
import { Laptop, Layers, Users, Briefcase, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";

const pillars = [
  { label: "Live Programs", icon: Laptop },
  { label: "Real Projects", icon: Layers },
  { label: "1:1 Mentorship", icon: Users },
  { label: "Placement Support", icon: Briefcase },
];

export default function FinalCTA() {
  const handleOpenSignup = () => {
    window.dispatchEvent(new CustomEvent("open-signup-dialog"));
  };

  return (
    <section id="cta" className="py-10 sm:py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 shadow-xl text-left w-full min-h-[410px] sm:min-h-[390px] md:min-h-0 md:aspect-[2170/725]">
            {/* Background Image: Fits aspect ratio with smooth responsive positioning */}
            <Image
              src="/final_cta.jpg"
              alt="Career Transformation with AI + Business + Technology"
              fill
              priority
              className="object-cover object-[65%_center] sm:object-center pointer-events-none select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1152px"
            />

            {/* Subtle soft gradient overlay on mobile for enhanced legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent pointer-events-none md:hidden" />

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full p-5 sm:p-7 md:p-9 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 lg:gap-8 max-w-full md:max-w-[72%] lg:max-w-[70%]">
                
                {/* Left: Brand Logo, Apply Now Primary Button & Divider */}
                <div className="flex items-center gap-4 lg:gap-6 shrink-0">
                  <div className="flex flex-col items-start gap-2.5 sm:gap-3 w-[150px] sm:w-[165px] md:w-[175px] lg:w-[200px] shrink-0">
                    <Image
                      src="/logo_banner_transparent.png"
                      alt="NxtGen Academy"
                      width={250}
                      height={60}
                      priority
                      className="w-full h-auto object-contain"
                    />
                    
                    {/* Primary Apply Now Button below Logo */}
                    <button
                      type="button"
                      onClick={handleOpenSignup}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-colors duration-200 hover:bg-primary/90 cursor-pointer active:scale-[0.98]"
                    >
                      <span>Apply Now</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="hidden md:block w-px h-24 lg:h-32 bg-border shrink-0" />
                </div>

                {/* Center: Headlines, Tagline, and Pillars */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  {/* Headings */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-foreground tracking-tight">
                      Career Transformation with
                    </p>
                    <WordStaggerHeading
                      as="h2"
                      className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-primary tracking-tight leading-tight"
                    >
                      AI + Business + Technology
                    </WordStaggerHeading>
                    <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-[11px] sm:text-xs md:text-sm font-bold text-foreground pt-0.5">
                      <span>Learn</span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary stroke-[3]" />
                      <span>Build</span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary stroke-[3]" />
                      <span>Practice</span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary stroke-[3]" />
                      <span>Get Hired™</span>
                    </div>
                  </div>

                  {/* 4 Feature Pillars: 2x2 frosted glass pills on mobile, 4-col divided row on desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0 sm:divide-x sm:divide-border pt-3 sm:pt-4 lg:pt-5 mt-2 sm:mt-3 lg:mt-4 max-w-xl">
                    {pillars.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.label}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-card/75 backdrop-blur-xs border border-border/70 shadow-xs sm:bg-transparent sm:border-0 sm:shadow-none sm:backdrop-blur-none sm:flex-col sm:justify-center sm:text-center ${
                            idx === 0 ? "sm:pr-3" : "sm:px-3"
                          }`}
                        >
                          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-primary sm:text-foreground stroke-[2] sm:stroke-[1.75] shrink-0" />
                          <span className="text-[11px] sm:text-[10px] md:text-xs font-semibold text-foreground sm:mt-1 whitespace-nowrap">
                            {p.label}
                          </span>
                        </div>
                      );
                    })}
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
