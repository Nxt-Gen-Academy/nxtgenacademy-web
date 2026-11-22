"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Calendar,
  Layers,
  Users,
  Briefcase,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "./SignUpForm";
import { authClient } from "@/lib/auth-client";
import HeroLaptopPreview from "./HeroLaptopPreview";
import HeroFluidBackground from "./HeroFluidBackground";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";

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
    <section id="top" className="relative min-h-svh flex flex-col justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#000a20]">
      {/* ── Blue Fluid Animated Background ── */}
      <HeroFluidBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* ── Two-Column Layout ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Text & CTAs ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-xs font-semibold text-blue-200 tracking-wide mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span>AI • Business • Career Transformation</span>
            </div>

            {/* Main Headline */}
            <WordStaggerHeading
              as="h1"
              className="font-heading text-4xl sm:text-5xl lg:text-[3.3rem] xl:text-[3.75rem] font-bold tracking-tight text-white leading-[1.08]"
            >
              Don&apos;t Just Learn AI. <br />
              <span className="text-[#38bdf8] bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent">
                Build a Career With It.
              </span>
            </WordStaggerHeading>

            {/* Subheading */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-blue-100/80 leading-relaxed max-w-xl font-normal">
              Industry-led programs in AI Product Management, Business Analysis and Data Analytics with real projects, 1:1 mentorship and portfolio-first learning.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpenExplore}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-sm bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(27,91,214,0.5)] cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Programs</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white px-5 py-3.5 text-sm font-medium backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
              >
                <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center bg-white/10">
                  <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                </span>
                <span>Watch How It Works</span>
              </button>
            </div>

            {/* Bottom 4 Horizontal Feature Items */}
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

          </div>

          {/* ── RIGHT COLUMN: Animated 3D Laptop Preview & Floating Cards ── */}
          <div className="lg:col-span-6 w-full flex justify-center items-center mt-8 lg:mt-0 z-20">
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
