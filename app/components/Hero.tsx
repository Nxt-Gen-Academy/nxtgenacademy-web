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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const stats = [
  { label: "Companies Hiring", value: "800+", icon: Building2 },
  { label: "Students Placed", value: "1,500+", icon: GraduationCap },
  { label: "Highest Package", value: "48 LPA", icon: TrendingUp },
  { label: "Industry Experts", value: "1200+", icon: Users },
  { label: "Highest Salary Hike", value: "400%", icon: Sparkles },
];

function SignUpForm({ idPrefix = "" }: { idPrefix?: string }) {
  return (
    <form className="mt-5 space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}name`} className="text-xs text-muted-foreground uppercase tracking-wider">Name</Label>
        <Input
          id={`${idPrefix}name`}
          type="text"
          placeholder="Enter Name"
          className="h-auto px-3 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}email`} className="text-xs text-muted-foreground uppercase tracking-wider">Email</Label>
        <Input
          id={`${idPrefix}email`}
          type="email"
          placeholder="Enter Email"
          className="h-auto px-3 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}phone`} className="text-xs text-muted-foreground uppercase tracking-wider">Phone Number</Label>
        <div className="flex items-center rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm focus-within:ring-2 focus-within:ring-primary/50 transition">
          <span className="text-muted-foreground">+91</span>
          <span className="mx-2 h-5 w-px bg-border" />
          <Input
            id={`${idPrefix}phone`}
            type="tel"
            placeholder="Enter Phone Number"
            className="h-auto p-0 border-0 bg-transparent rounded-none focus-visible:ring-0 focus-visible:border-transparent text-sm text-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">
          Your Course of Interest
        </div>
        <div className="grid gap-2 text-sm text-foreground">
          <Label className="flex items-center gap-2 font-normal cursor-pointer">
            <input type="radio" name={`${idPrefix}course`} defaultChecked />
            Business analytics with AI
          </Label>
          <Label className="flex items-center gap-2 font-normal cursor-pointer">
            <input type="radio" name={`${idPrefix}course`} />
            Data Analytics with AI
          </Label>
          <Label className="flex items-center gap-2 font-normal cursor-pointer">
            <input type="radio" name={`${idPrefix}course`} />
            AI Product Management
          </Label>
        </div>
      </div>

      <Label className="flex items-center gap-2 text-xs text-muted-foreground font-normal cursor-pointer">
        <input type="checkbox" defaultChecked />
        Send me updates on WhatsApp
      </Label>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl h-auto py-3 text-sm font-medium hover:shadow-[0_0_40px_oklch(0.62_0.22_258/0.5)] transition"
      >
        Send OTP
      </Button>
    </form>
  );
}

export default function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
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
              <a
                href="#pricing"
                className={`${buttonVariants({
                  size: "lg",
                })} rounded-xl px-6 py-3.5 h-auto font-medium hover:shadow-[0_0_40px_oklch(0.62_0.22_258/0.5)] transition duration-300`}
              >
                Explore Cohorts <ArrowUpRight className="h-4 w-4 ml-1.5" />
              </a>
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
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-5 w-full rounded-xl bg-card/60 hover:bg-card h-auto py-2.5 font-medium transition text-foreground"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-background shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M23.49 12.27c0-.86-.07-1.49-.22-2.14H12v4.03h6.81c-.14 1-.9 2.51-2.58 3.52l-.02.14 3.56 2.76.25.03c2.34-2.16 3.47-5.34 3.47-8.34z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.79-2.94c-1.01.7-2.37 1.2-4.16 1.2-3.17 0-5.85-2.08-6.81-4.96l-.13.01-3.69 2.85-.04.12C3.3 21.16 7.38 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.19 14.39a7.4 7.4 0 0 1-.38-2.39c0-.83.15-1.63.36-2.39l-.01-.16-3.74-2.9-.12.06A11.99 11.99 0 0 0 0 12c0 1.94.47 3.77 1.3 5.39l3.89-2.99z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c2.33 0 3.9 1 4.8 1.84l3.51-3.42C17.95 1 15.24 0 12 0 7.38 0 3.3 2.83 1.3 6.61l3.86 2.99c.96-2.88 3.64-4.85 6.84-4.85z"
                    fill="#EA4335"
                  />
                </svg>
              </span>
              Sign up with Google
            </Button>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              OR
              <span className="h-px flex-1 bg-border" />
            </div>

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
