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
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignUpForm from "./SignUpForm";
import { authClient } from "@/lib/auth-client";

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

    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 4000); // Popup dialog after 4 seconds

    const handleOpen = () => setIsDialogOpen(true);
    window.addEventListener("open-signup-dialog", handleOpen);

    return () => {
      clearTimeout(timer);
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
        <div className="max-w-4xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-amber-400 mb-8">
              <Flame className="h-3.5 w-3.5" />
              Learn what matters
            </div>

            <h1 className="font-heading text-[clamp(2.6rem,7vw,6rem)] leading-[1.05] font-medium max-w-5xl text-foreground">
              Build your career in{" "}
              <span className="text-primary font-heading font-medium py-2">AI & Analytics</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Equip yourself with the tools, projects, and mentorship needed to land high-paying roles. Join our expert-led cohorts today.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {session?.user ? (
                <a
                  href="/dashboard"
                  className={`${buttonVariants({
                    size: "lg",
                  })} rounded-xl px-6 py-3.5 h-auto font-medium bg-primary text-primary-foreground hover:shadow-[0_0_40px_oklch(0.62_0.22_258/0.5)] transition duration-300`}
                >
                  Go to Dashboard <ArrowUpRight className="h-4 w-4 ml-1.5" />
                </a>
              ) : (
                <a
                  href="#pricing"
                  className={`${buttonVariants({
                    size: "lg",
                  })} rounded-xl px-6 py-3.5 h-auto font-medium hover:shadow-[0_0_40px_oklch(0.62_0.22_258/0.5)] transition duration-300`}
                >
                  Explore Cohorts <ArrowUpRight className="h-4 w-4 ml-1.5" />
                </a>
              )}
              <a
                href="#curriculum"
                className={`${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })} rounded-xl px-6 py-3.5 h-auto font-medium bg-card/40 hover:bg-card/80 transition duration-300`}
              >
                View Curriculum
              </a>
            </div>

            <div className="mt-6 flex flex-col items-start gap-y-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mt-6 mb-8">
                <Flame className="h-4 w-4 text-amber-400" />
                <span className="font-medium text-foreground">5K+</span>
                <span>Students Already Enrolled</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-foreground">
                  4.8/5
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 text-amber-400"
                      fill={index < 4 ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span>from 1500+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mt-24">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/25 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-card/45 hover:shadow-[0_12px_30px_-10px_oklch(0.62_0.22_258/0.2)] last:sm:col-span-2 last:lg:col-span-1"
              >
                <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-primary/5 blur-xl transition-all duration-500 group-hover:bg-primary/15 group-hover:scale-150" />
                
                <div className="flex items-start justify-between gap-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className="rounded-lg bg-primary/5 p-2 text-primary border border-primary/10 group-hover:bg-primary/15 group-hover:text-primary-foreground group-hover:border-primary/30 transition-all duration-300 shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-3xl md:text-4xl font-heading font-medium tracking-tight transition-all duration-300 group-hover:translate-x-1">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md p-6 sm:p-7 rounded-3xl border border-border bg-card/95 backdrop-blur shadow-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute -top-10 right-6 h-24 w-24 rounded-full bg-primary/30 blur-3xl" />
            <DialogHeader>
              <DialogTitle className="text-center font-heading text-xl font-medium text-foreground">
                Book a Live Class, For Free!
              </DialogTitle>
            </DialogHeader>

            <SignUpForm idPrefix="modal-" />

            <p className="mt-4 text-[11px] text-muted-foreground text-center">
              By continuing, you agree to Terms & Conditions for Signup
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
