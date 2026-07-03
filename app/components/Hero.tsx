"use client";

import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Flame,
  Star,
  Building2,
  GraduationCap,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "./SignUpForm";
import { authClient } from "@/lib/auth-client";
import HeroParallaxCard from "./HeroParallaxCard";

const stats = [
  { label: "Companies Hiring", value: "800+", icon: Building2 },
  { label: "Students Placed", value: "1,500+", icon: GraduationCap },
  { label: "Highest Package", value: "48 LPA", icon: TrendingUp },
  { label: "Industry Experts", value: "1200+", icon: Users },
  { label: "Highest Salary Hike", value: "400%", icon: Sparkles },
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
      // Intro animation takes ~3.5s on first visit. We want 2.5s delay after it exits.
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

  return (
    <section id="top" className="relative pt-36 pb-24 px-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted={true}
        playsInline
        className="absolute inset-0 h-full w-full object-cover pointer-events-none z-0 opacity-75"
      >
        <source src="/hero_bg_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/85 z-0" />
      <div className="absolute inset-0 grid-pattern opacity-30 z-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Decorative Ambient Glows */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[120px] pointer-events-none mix-blend-screen" />

        {/* ── Two-Column Hero Layout ── */}
        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* ── LEFT COLUMN: Content ── */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono uppercase tracking-[0.15em] text-primary mb-6 backdrop-blur-md shadow-[0_0_20px_oklch(0.58_0.20_255/0.15)]">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-semibold text-primary/90">Learn what matters</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-headline font-heading leading-[1.08] font-extrabold tracking-[-0.02em] text-foreground">
              <span className="block">Build your career in</span>
              <span className="hero-accent-text block text-primary pb-2">AI &amp; Analytics</span>
            </h1>

            {/* Subheading */}
            <p className="hero-subheading mt-7 text-muted-foreground leading-[1.6] max-w-[480px]">
              Equip yourself with the tools, projects, and mentorship needed to land high-paying roles. Join our expert-led cohorts today.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              {session?.user ? (
                <a
                  href="/dashboard"
                  className="hero-btn-primary group relative overflow-hidden inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-semibold text-sm bg-primary text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_oklch(0.58_0.20_255/0.3)]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] group-hover:animate-shimmer-sweep" />
                  <span className="relative flex items-center">
                    Go to Dashboard <ArrowUpRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              ) : (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-signup-dialog"))}
                  className="hero-btn-primary group relative overflow-hidden inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-semibold text-sm bg-primary text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_oklch(0.58_0.20_255/0.3)] cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-[150%] group-hover:animate-shimmer-sweep" />
                  <span className="relative flex items-center">
                    Explore Cohorts <ArrowUpRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              )}
              <a
                href="#curriculum"
                className="hero-btn-ghost inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-semibold text-sm border border-border/60 bg-card/30 text-foreground backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/50"
              >
                View Curriculum
              </a>
            </div>

            {/* Stat Row */}
            <div className="hero-stat-row mt-12 flex flex-wrap justify-center lg:justify-start gap-y-6 gap-x-6 sm:gap-x-10 p-5 sm:px-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl max-w-fit mx-auto lg:mx-0">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center min-w-[130px] sm:min-w-[150px]">
                    <div className="flex items-center gap-3.5 w-full">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 text-primary grid place-items-center border border-primary/20 shrink-0 shadow-inner">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl sm:text-[26px] font-heading font-bold tracking-tight text-foreground leading-none">
                          {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-[13px] text-muted-foreground mt-1 sm:mt-1.5 leading-tight font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social proof line */}
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-3.5 w-3.5 text-amber-400"
                    fill={index < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="font-medium text-foreground/80">4.8/5</span>
              <span className="text-muted-foreground/60">from 1500+ reviews</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 3D Parallax Card ── */}
          <div className="hidden lg:block">
            <HeroParallaxCard />
          </div>
        </div>
      </div>

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
