"use client";

import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-24 px-4 pb-32 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl overflow-hidden bg-[#0A0A0E] border border-border/40 text-left group flex flex-col min-h-[400px]">

            {/* Background Image */}
            <Image
              src="/final_cta.jpg"
              alt="Start your journey"
              fill
              className="object-cover"
              priority
            />

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 p-10 sm:p-14 md:p-16 flex-1 flex flex-col justify-center max-w-3xl">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-medium text-white mb-6">
                Take First Step Towards Your AI Career Before It's Too Late
              </h2>

              <p className="text-sm md:text-base text-gray-200 mb-10 max-w-xl leading-relaxed font-medium">
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

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
