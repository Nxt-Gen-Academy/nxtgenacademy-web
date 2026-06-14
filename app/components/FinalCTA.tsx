"use client";

import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-24 px-4 pb-32 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl overflow-hidden bg-[#0A0A0E] border border-border/40 text-left group flex flex-col md:flex-row items-stretch min-h-[400px]">
            
            {/* Background subtler gradient for the dark area */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-10 p-10 sm:p-14 md:p-16 flex-1 flex flex-col justify-center">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-medium text-foreground mb-6 max-w-xl">
                Take First Step Towards Your AI Career Before It's Too Late
              </h2>
              
              <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium">
                Join 12,700+ professionals who've accelerated their careers through mentor-led, job-focused AI upskilling
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-signup-dialog"))}
                  className={`${buttonVariants({
                    size: "lg",
                  })} rounded-xl px-8 py-6 h-auto text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300 border-0 cursor-pointer w-full sm:w-auto`}
                >
                  Start Your AI Career Journey
                </button>
              </div>
            </div>

            {/* Right Content - Visuals */}
            <div className="relative flex-1 min-h-[300px] md:min-h-[400px] flex items-end justify-center overflow-hidden md:overflow-visible">

              {/* Avatars floating badge */}
              <div className="absolute top-1/3 left-0 md:-left-12 z-20 flex items-center bg-[#1A1A1A]/80 backdrop-blur-md rounded-full p-1.5 border border-white/10 shadow-xl">
                <div className="flex -space-x-3 ml-1">
                  {[
                    "/faculty/bhavesh.png",
                    "/faculty/gladden.png",
                    "/faculty/rahul.png",
                    "/faculty/rohit.png",
                    "/faculty/vishal.png"
                  ].map((src, idx) => (
                    <div key={idx} className="h-8 w-8 rounded-full border-2 border-[#1A1A1A] bg-secondary overflow-hidden">
                      <Image src={src} alt={`Student ${idx + 1}`} width={32} height={32} className="object-cover h-full w-full" />
                    </div>
                  ))}
                </div>
                <div className="px-3 py-1">
                  <span className="text-xs font-semibold text-white">1998+</span>
                </div>
              </div>

              {/* Person Image */}
              <div className="relative z-10 w-full h-full flex justify-center items-end mt-12 md:mt-0 mix-blend-lighten">
                <div className="relative w-[350px] h-[400px] md:w-[450px] md:h-[500px] md:translate-y-10">
                  <Image 
                    src="/footer_cta.jpg" 
                    alt="Professional" 
                    fill 
                    className="object-cover object-top [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]" 
                    priority
                  />
                </div>
              </div>
            </div>
            
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
