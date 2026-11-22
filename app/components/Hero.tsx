"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  Layers,
  Users,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "./SignUpForm";
import { authClient } from "@/lib/auth-client";
import HeroLaptopPreview from "./HeroLaptopPreview";
import HeroFluidBackground from "./HeroFluidBackground";
import ScrollReveal from "./ScrollReveal";

const pillars = [
  { label: "Live Cohorts", icon: Calendar },
  { label: "Real Projects", icon: Layers },
  { label: "1:1 Mentorship", icon: Users },
  { label: "Career Support", icon: Briefcase },
];

export default function Hero() {
  const { data: session } = authClient.useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // If returning from Google sign-in redirect with a pending enquiry, open dialog immediately
    if (typeof window !== "undefined" && localStorage.getItem("pending_enquiry_flag") === "true") {
      setIsDialogOpen(true);
    }

    const hasPoppedUp = sessionStorage.getItem("heroPopupPopped");
    let timer: NodeJS.Timeout;

    if (!hasPoppedUp) {
      sessionStorage.setItem("heroPopupPopped", "true");
      const isIntroSkipped = sessionStorage.getItem("introPlayed");
      const delay = isIntroSkipped ? 2500 : 6000;

      timer = setTimeout(() => {
        setIsDialogOpen(true);
      }, delay);
    }

    const handleOpen = () => setIsDialogOpen(true);
    window.addEventListener("open-signup-dialog", handleOpen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-signup-dialog", handleOpen);
    };
  }, []);

  const handleOpenExplore = () => {
    const el = document.getElementById("programs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <section id="top" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#000a20]">
      {/* ── Dynamic Glowing Blue Fluid Silk Waves Background ── */}
      <HeroFluidBackground />

      {/* ── Subtle Blackish Overlay (keeps text content and laptop crisp above via z-10/z-20) ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.52) 100%), rgba(0, 5, 18, 0.38)",
          boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.65)"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Text & CTAs ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Pill Eyebrow Badge */}
            <ScrollReveal direction="up" delay={50}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-xs font-semibold text-blue-200 tracking-wide mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Sparkles className="h-3.5 w-3.5 text-[#38bdf8]" />
                <span>AI • Business • Career Transformation</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-medium tracking-tight text-white leading-[1.08]">
                Don&apos;t Just Learn AI. <br />
                <span className="text-[#38bdf8] bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent font-medium block mt-1">
                  Build a Career With It.
                </span>
              </h1>
            </ScrollReveal>

            {/* Subheading */}
            <ScrollReveal direction="up" delay={150}>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-blue-100/80 leading-relaxed max-w-xl font-normal">
                Industry-led programs in AI Product Management, Business Analysis and Data Analytics with real projects, 1:1 mentorship and portfolio-first learning.
              </p>
            </ScrollReveal>

            {/* CTA Button */}
            <ScrollReveal direction="up" delay={200}>
              <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleOpenExplore}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-semibold text-sm bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(27,91,214,0.5)] cursor-pointer active:scale-[0.98]"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>

            {/* Bottom 4 Horizontal Feature Items */}
            <ScrollReveal direction="up" delay={250} className="w-full">
              <div className="mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-white/10 w-full flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs font-medium text-blue-100/85">
                {pillars.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#38bdf8] stroke-[2]" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

          </div>

          {/* ── RIGHT COLUMN: Animated 3D Laptop Preview & Floating Cards ── */}
          <div className="lg:col-span-6 w-full flex justify-center items-center mt-6 lg:mt-0 z-20">
            <HeroLaptopPreview />
          </div>

        </div>
      </div>

      {/* ── Enquiry / Booking Dialog ── */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl sm:max-w-2xl p-6 sm:p-7 rounded-3xl border border-border bg-card/95 backdrop-blur shadow-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute -top-10 right-6 h-24 w-24 rounded-full bg-primary/30 blur-3xl" />
            <DialogHeader>
              <DialogTitle className="text-center font-heading text-xl font-medium text-foreground">
                Book a Live Class, For Free!
              </DialogTitle>
            </DialogHeader>

            <SignUpForm idPrefix="modal-" />

            <p className="mt-4 text-[11px] text-muted-foreground text-center">
              By continuing, you agree to Terms &amp; Conditions for Signup
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
