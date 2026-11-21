"use client";

import Image from "next/image";
import { Laptop, Layers, Users, Briefcase, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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
    <section id="cta" className="py-12 sm:py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div
            onClick={handleOpenSignup}
            className="relative rounded-3xl overflow-hidden border border-white/20 shadow-xl text-left group cursor-pointer w-full aspect-[2170/725] min-h-[380px] md:min-h-[400px] lg:min-h-0"
          >
            {/* Background Image: Fits 2170x725 aspect ratio perfectly without scaling on hover */}
            <Image
              src="/final_cta.jpg"
              alt="Career Transformation with AI + Business + Technology"
              fill
              priority
              className="object-cover object-center pointer-events-none select-none"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-col md:flex-row md:items-center gap-5 sm:gap-6 lg:gap-8 max-w-full md:max-w-[72%] lg:max-w-[70%]">
                
                {/* Left: Brand Logo, Apply Now Primary Button & Divider */}
                <div className="flex items-center gap-4 lg:gap-6 shrink-0">
                  <div className="flex flex-col items-center sm:items-start gap-3 w-[140px] sm:w-[160px] md:w-[170px] lg:w-[195px] shrink-0">
                    <Image
                      src="/logo_banner_tight.png"
                      alt="NxtGen Academy"
                      width={250}
                      height={120}
                      priority
                      className="w-full h-auto object-contain drop-shadow-sm"
                    />
                    
                    {/* Primary Apply Now Button below Logo */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSignup();
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="hidden md:block w-px h-24 lg:h-32 bg-slate-300/80 shrink-0" />
                </div>

                {/* Center: Headlines, Tagline, and Pillars */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  {/* Headings */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-[#00164e] tracking-tight">
                      Career Transformation with
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-primary tracking-tight leading-tight">
                      AI + Business + Technology
                    </h2>
                    <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm font-bold text-[#00164e] pt-0.5">
                      <span>Learn</span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary stroke-[3]" />
                      <span>Build</span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary stroke-[3]" />
                      <span>Practice</span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary stroke-[3]" />
                      <span>Get Hired™</span>
                    </div>
                  </div>

                  {/* 4 Feature Pillars */}
                  <div className="grid grid-cols-4 divide-x divide-slate-300/80 pt-3 sm:pt-4 lg:pt-5 mt-2 sm:mt-3 lg:mt-4 max-w-xl">
                    {pillars.map((p, idx) => {
                      const Icon = p.icon;
                      return (
                        <div
                          key={p.label}
                          className={`flex flex-col items-center text-center ${
                            idx === 0 ? "pr-2 sm:pr-3" : "px-2 sm:px-3"
                          }`}
                        >
                          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-[#2d304a] stroke-[1.75]" />
                          <span className="text-[8.5px] sm:text-[10px] md:text-xs font-semibold text-[#2d304a] mt-1 whitespace-nowrap">
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
