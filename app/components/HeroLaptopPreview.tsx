"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { 
  Layers, 
  Target, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  LayoutDashboard, 
  FolderKanban, 
  LineChart, 
  Users2, 
  Bot,
  CheckCircle2
} from "lucide-react";

export default function HeroLaptopPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const isMoving = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check touch capability
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Butter-smooth 60/120fps mousemove parallax with RAF debouncing
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !laptopRef.current || isTouchDevice) return;

      if (!isMoving.current) {
        isMoving.current = true;
        rafId.current = requestAnimationFrame(() => {
          if (!containerRef.current || !laptopRef.current) {
            isMoving.current = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          // Normalized offsets [-1, 1]
          const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
          const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

          const maxTilt = 12; // degrees
          const tiltX = nx * maxTilt;
          const tiltY = -ny * (maxTilt * 0.7);

          // Apply hardware-accelerated 3D transforms
          laptopRef.current.style.transform = `perspective(1200px) rotateX(${tiltY + 4}deg) rotateY(${tiltX}deg) scale3d(1.01, 1.01, 1.01)`;

          if (card1Ref.current) {
            card1Ref.current.style.transform = `translate3d(${nx * 18}px, ${ny * 14}px, 40px)`;
          }
          if (card2Ref.current) {
            card2Ref.current.style.transform = `translate3d(${nx * 14}px, ${ny * 10}px, 28px)`;
          }
          if (card3Ref.current) {
            card3Ref.current.style.transform = `translate3d(${nx * 16}px, ${ny * 14}px, 34px)`;
          }

          isMoving.current = false;
        });
      }
    },
    [isTouchDevice]
  );

  const handleMouseEnter = () => {
    setIsHovering(true);
    // Smooth transition into interactive position
    if (laptopRef.current) {
      laptopRef.current.style.transition = "transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)";
    }
    [card1Ref, card2Ref, card3Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.style.transition = "transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)";
      }
    });
  };

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cancelAnimationFrame(rafId.current);
    isMoving.current = false;

    // Smoothly animate back to neutral rest position
    if (laptopRef.current) {
      laptopRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      laptopRef.current.style.transform = "";
    }

    [card1Ref, card2Ref, card3Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        ref.current.style.transform = "";
      }
    });

    const timer = setTimeout(() => {
      if (laptopRef.current) laptopRef.current.style.transition = "";
      [card1Ref, card2Ref, card3Ref].forEach((ref) => {
        if (ref.current) ref.current.style.transition = "";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isTouchDevice) return;

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseLeave, isTouchDevice]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[640px] mx-auto select-none py-6 px-2 sm:px-4"
    >
      {/* Hardware-accelerated CSS Keyframes for zero-CPU ambient floating */}
      <style jsx global>{`
        @keyframes heroLaptopFloat {
          0%, 100% {
            transform: perspective(1200px) rotateX(4deg) rotateY(0deg) translateY(0px);
          }
          50% {
            transform: perspective(1200px) rotateX(5.5deg) rotateY(1.5deg) translateY(-8px);
          }
        }
        @keyframes heroCard1Float {
          0%, 100% {
            transform: translate3d(0px, 0px, 40px);
          }
          50% {
            transform: translate3d(3px, -6px, 40px);
          }
        }
        @keyframes heroCard2Float {
          0%, 100% {
            transform: translate3d(0px, 0px, 28px);
          }
          50% {
            transform: translate3d(-3px, 5px, 28px);
          }
        }
        @keyframes heroCard3Float {
          0%, 100% {
            transform: translate3d(0px, 0px, 34px);
          }
          50% {
            transform: translate3d(4px, -5px, 34px);
          }
        }
        .anim-laptop-levitate {
          animation: heroLaptopFloat 6s ease-in-out infinite;
        }
        .anim-card-1 {
          animation: heroCard1Float 5.2s ease-in-out infinite;
        }
        .anim-card-2 {
          animation: heroCard2Float 6.4s ease-in-out infinite;
        }
        .anim-card-3 {
          animation: heroCard3Float 5.8s ease-in-out infinite;
        }
      `}</style>

      {/* Soft ambient back-glow under and behind the laptop */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-indigo-600/15 rounded-full blur-3xl opacity-75 pointer-events-none" />

      {/* ── Laptop Chassis & Screen Wrapper with 3D Parallax ── */}
      <div
        ref={laptopRef}
        className={`relative z-10 will-change-transform ${!isHovering ? "anim-laptop-levitate" : ""}`}
        style={{ 
          transform: "perspective(1200px) rotateX(4deg) rotateY(0deg)",
          transformStyle: "preserve-3d" 
        }}
      >
        {/* Laptop Lid / Screen Bezel */}
        <div className="relative rounded-t-2xl sm:rounded-t-3xl border border-slate-700/80 bg-gradient-to-b from-[#161f33] via-[#0d1629] to-[#070d1d] p-2.5 sm:p-3.5 shadow-[0_25px_60px_-15px_rgba(0,14,45,0.9)]">
          
          {/* Top Camera Notch Dot */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
            <div className="w-1 h-1 rounded-full bg-blue-400/50" />
          </div>

          {/* Inner Screen Display */}
          <div className="relative rounded-xl overflow-hidden bg-[#03091e] border border-blue-500/30 shadow-inner flex flex-col aspect-[16/10.5] text-white">
            
            {/* Top Navigation Bar of NxtGen Academy AI Screen */}
            <div className="px-3.5 py-2.5 border-b border-blue-900/60 bg-[#061234]/95 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#1b5bd6] to-blue-700 flex items-center justify-center p-0.5 shadow-xs">
                  <Image
                    src="/logo.png"
                    alt="NxtGen"
                    width={18}
                    height={18}
                    className="rounded object-contain"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-white">
                    NxtGen Academy AI
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30 font-medium">
                    PRO
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-300">
                  Live Cohort Active
                </span>
              </div>
            </div>

            {/* Main Application Container */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Sidebar */}
              <div className="w-24 sm:w-28 border-r border-blue-950/80 bg-[#040b22]/90 p-2 flex flex-col gap-1 shrink-0">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-600/30 text-blue-300 font-semibold text-[10px] border border-blue-500/30">
                  <LayoutDashboard className="h-3 w-3 shrink-0" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-400 hover:text-white text-[10px] transition-colors">
                  <FolderKanban className="h-3 w-3 shrink-0" />
                  <span>Real Projects</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-400 hover:text-white text-[10px] transition-colors">
                  <LineChart className="h-3 w-3 shrink-0" />
                  <span>Skill Matrix</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-400 hover:text-white text-[10px] transition-colors">
                  <Users2 className="h-3 w-3 shrink-0" />
                  <span>Mentorship</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-slate-400 hover:text-white text-[10px] transition-colors">
                  <Bot className="h-3 w-3 shrink-0 text-cyan-400" />
                  <span>AI Copilot</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#040d28] via-[#02081c] to-[#010617]">
                
                {/* Screen Header Title */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-white tracking-tight">
                      AI-Powered Career &amp; Learning Intelligence
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-blue-200/70">
                      Portfolio Milestone Tracking • Real-Time AI Review
                    </p>
                  </div>
                </div>

                {/* 3 Metric KPI Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* KPI 1 */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#07153a]/90 border border-blue-500/20 shadow-xs">
                    <span className="text-[8px] sm:text-[9px] text-blue-200/70 block uppercase tracking-wider font-medium truncate">
                      Skill Mastery
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-heading font-bold text-xs sm:text-sm text-emerald-400">
                        94.8%
                      </span>
                      <TrendingUp className="h-3 w-3 text-emerald-400 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#07153a]/90 border border-blue-500/20 shadow-xs">
                    <span className="text-[8px] sm:text-[9px] text-blue-200/70 block uppercase tracking-wider font-medium truncate">
                      Real Projects
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-heading font-bold text-xs sm:text-sm text-white">
                        12 / 12
                      </span>
                      <CheckCircle2 className="h-3 w-3 text-blue-400 stroke-[2]" />
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#07153a]/90 border border-blue-500/20 shadow-xs">
                    <span className="text-[8px] sm:text-[9px] text-blue-200/70 block uppercase tracking-wider font-medium truncate">
                      Placement Score
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-heading font-bold text-xs sm:text-sm text-emerald-400">
                        98.2%
                      </span>
                      <Sparkles className="h-3 w-3 text-emerald-400 stroke-[2]" />
                    </div>
                  </div>
                </div>

                {/* Glowing Wave Learning Trajectory Chart */}
                <div className="relative mt-2 sm:mt-2.5 flex-1 min-h-[65px] sm:min-h-[80px] w-full rounded-lg bg-[#040f2e]/60 border border-blue-500/15 overflow-hidden p-2 flex flex-col justify-end">
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* SVG Wave Chart */}
                  <svg 
                    viewBox="0 0 300 80" 
                    fill="none" 
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="nxtWaveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="65%" stopColor="#1b5bd6" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#03153b" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Fill under wave */}
                    <path
                      d="M 0 60 Q 40 30, 80 50 T 160 40 T 230 20 T 300 35 L 300 80 L 0 80 Z"
                      fill="url(#nxtWaveGradient)"
                    />

                    {/* Subtle outer glow path */}
                    <path
                      d="M 0 60 Q 40 30, 80 50 T 160 40 T 230 20 T 300 35"
                      stroke="#38bdf8"
                      strokeWidth="5"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />

                    {/* Main sharp stroke path */}
                    <path
                      d="M 0 60 Q 40 30, 80 50 T 160 40 T 230 20 T 300 35"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Accent Nodes with CSS pulse (0 paint thrashing) */}
                    <circle cx="80" cy="50" r="3" fill="#38bdf8" className="animate-pulse" />
                    <circle cx="80" cy="50" r="1.8" fill="#ffffff" />

                    <circle cx="230" cy="20" r="3" fill="#38bdf8" className="animate-pulse" />
                    <circle cx="230" cy="20" r="1.8" fill="#ffffff" />
                  </svg>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base / Keyboard Deck in Perspective */}
        <div className="relative -mt-1 mx-auto w-[106%] -left-[3%] h-4 sm:h-5 rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-[#2d3748] via-[#1a202c] to-[#0a0f1d] border-t border-slate-500/50 shadow-[0_15px_30px_rgba(0,10,35,0.9)] flex items-start justify-center">
          <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-slate-900 rounded-b-md mx-auto border-x border-b border-slate-600/40" />
        </div>
      </div>

      {/* ── 3 Floating Cards with Independent Floating Animations ── */}

      {/* 1. Top-Left Floating Card: "Real AI Projects" */}
      <div
        ref={card1Ref}
        className={`absolute -top-4 -left-3 sm:-top-5 sm:-left-6 z-30 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#08183d]/95 border border-blue-400/40 shadow-[0_10px_30px_rgba(0,14,45,0.7)] text-white hover:scale-105 transition-all duration-300 cursor-default will-change-transform ${!isHovering ? "anim-card-1" : ""}`}
      >
        <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/40 flex items-center justify-center text-[#38bdf8] shrink-0">
          <Layers className="h-4 w-4" />
        </div>
        <span className="font-heading font-semibold text-xs sm:text-sm text-white tracking-tight whitespace-nowrap">
          Real AI Projects
        </span>
      </div>

      {/* 2. Bottom-Left Floating Card: "Work on Industry Use-Cases" */}
      <div
        ref={card2Ref}
        className={`absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 z-30 flex items-center gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-[#08183d]/95 border border-blue-400/40 shadow-[0_10px_30px_rgba(0,14,45,0.7)] text-white hover:scale-105 transition-all duration-300 cursor-default will-change-transform ${!isHovering ? "anim-card-2" : ""}`}
      >
        <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/40 flex items-center justify-center text-[#38bdf8] shrink-0">
          <Target className="h-4 w-4" />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] text-blue-200/80 font-medium">Work on</span>
          <span className="font-heading font-semibold text-xs sm:text-xs text-white tracking-tight whitespace-nowrap">
            Industry Use-Cases
          </span>
        </div>
      </div>

      {/* 3. Right Floating Card: "Build Your Portfolio" */}
      <div
        ref={card3Ref}
        className={`absolute top-1/3 -right-2 sm:-right-6 z-30 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#08183d]/95 border border-blue-400/40 shadow-[0_10px_30px_rgba(0,14,45,0.7)] text-white hover:scale-105 transition-all duration-300 cursor-default will-change-transform ${!isHovering ? "anim-card-3" : ""}`}
      >
        <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/40 flex items-center justify-center text-[#38bdf8] shrink-0">
          <Briefcase className="h-4 w-4" />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] text-blue-200/80 font-medium">Build Your</span>
          <span className="font-heading font-semibold text-xs sm:text-xs text-white tracking-tight whitespace-nowrap">
            Portfolio
          </span>
        </div>
      </div>
    </div>
  );
}
