"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "./SignUpForm";
import { authClient } from "@/lib/auth-client";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";
import ScrollReveal from "./ScrollReveal";

const partnerLogos = [
  { name: "Amazon", src: "/logos/amazon.svg", width: 75 },
  { name: "Microsoft", src: "/logos/microsoft.svg", width: 90 },
  { name: "Deloitte", src: "/logos/deloitte.svg", width: 80 },
  { name: "Goldman Sachs", src: "/logos/goldmansachs.svg", width: 95 },
  { name: "Flipkart", src: "/logos/flipkart.svg", width: 80 },
  { name: "Zepto", src: "/logos/zepto.svg", width: 70 },
  { name: "IBM", src: "/logos/ibm.svg", width: 60 },
  { name: "Accenture", src: "/logos/accenture.svg", width: 80 },
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
    <section id="top" className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070b14]">
      {/* ── Photographic Editorial Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_editorial_bg.jpg"
          alt="NxtGen Academy - AI & Business Skills Career Platform"
          fill
          priority
          className="object-cover object-[72%_center] md:object-[65%_center] lg:object-center select-none pointer-events-none"
          sizes="100vw"
        />

        {/* Soft Left-to-Right Editorial Vignette Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 md:from-black/80 md:via-black/45 md:to-transparent pointer-events-none" />

        {/* Subtle Top & Bottom Gradient Shadows */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <div className="max-w-2xl text-left">
          
          {/* Rating / Review Pill Badge */}
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/25 bg-black/40 backdrop-blur-md text-xs font-medium text-white shadow-sm mb-6">
              <span className="flex items-center text-amber-400 text-xs tracking-tight">
                ★★★★★
              </span>
              <span className="font-semibold text-white">4.9/5 Rating</span>
              <span className="text-white/40">•</span>
              <span className="text-white/90">1,500+ Placed Alumni</span>
            </div>
          </ScrollReveal>

          {/* Main Editorial Headline */}
          <WordStaggerHeading
            as="h1"
            className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-medium tracking-tight text-white leading-[1.08]"
          >
            Don&apos;t Just Learn AI. <br />
            <span className="text-[#38bdf8] bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent font-medium">
              Build a Career With It.
            </span>
          </WordStaggerHeading>

          {/* Subheading Description */}
          <ScrollReveal direction="up" delay={150}>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl font-normal drop-shadow-xs">
              Industry-led programs in AI Product Management, Business Analysis and Data Analytics with real projects, 1:1 mentorship and portfolio-first learning.
            </p>
          </ScrollReveal>

          {/* CTA Action Buttons */}
          <ScrollReveal direction="up" delay={200}>
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpenExplore}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-semibold text-sm bg-primary text-white shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Programs</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 text-sm font-medium backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]"
              >
                <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center bg-white/10">
                  <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                </span>
                <span>Watch How It Works</span>
              </button>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* ── Bottom Section: Trusted by Hiring Partners + Logos Strip ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 pb-2">
        <ScrollReveal direction="up" delay={250}>
          <div className="border-t border-white/15 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div className="text-xs sm:text-sm text-white/80 font-medium tracking-wide shrink-0">
              Trusted by 800+ hiring partners across top tech companies
            </div>

            <div className="flex items-center flex-wrap gap-6 sm:gap-8 opacity-80 hover:opacity-100 transition-opacity">
              {partnerLogos.map((l) => (
                <div key={l.name} className="flex items-center justify-center">
                  <Image
                    src={l.src}
                    alt={l.name}
                    width={l.width}
                    height={24}
                    className="h-5 sm:h-5.5 w-auto object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
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
