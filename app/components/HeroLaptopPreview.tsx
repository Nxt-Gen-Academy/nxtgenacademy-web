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
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check touch capability
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Ambient natural 3D levitation when not hovering
  useEffect(() => {
    let animId: number;
    const startTime = Date.now();

    const tick = () => {
      if (!isHovering && laptopRef.current && !isTouchDevice) {
        const elapsed = (Date.now() - startTime) / 1000;
        const floatY = Math.sin(elapsed * 1.4) * 6;
        const tiltX = Math.sin(elapsed * 0.9) * 1.5;
        const tiltY = Math.cos(elapsed * 0.7) * 1.8;

        laptopRef.current.style.transform = `perspective(1200px) rotateX(${4 + tiltX}deg) rotateY(${tiltY}deg) translateY(${floatY}px)`;

        if (card1Ref.current) {
          card1Ref.current.style.transform = `translate3d(${Math.sin(elapsed * 1.2) * 4}px, ${Math.cos(elapsed * 1.2) * 5}px, 35px)`;
        }
        if (card2Ref.current) {
          card2Ref.current.style.transform = `translate3d(${Math.cos(elapsed * 1.1) * 4}px, ${Math.sin(elapsed * 1.3) * 5}px, 25px)`;
        }
        if (card3Ref.current) {
          card3Ref.current.style.transform = `translate3d(${Math.sin(elapsed * 1.3) * -4}px, ${Math.cos(elapsed * 1.0) * 5}px, 30px)`;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovering, isTouchDevice]);

  // Mouse move 3D parallax handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !laptopRef.current || isTouchDevice) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Normalized offsets from -1 to 1
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));

        const maxTilt = 14; // degrees
        const tiltX = nx * maxTilt;
        const tiltY = -ny * (maxTilt * 0.75);

        // 3D Parallax tilt on laptop
        laptopRef.current!.style.transform = `perspective(1200px) rotateX(${tiltY + 4}deg) rotateY(${tiltX}deg) scale3d(1.01, 1.01, 1.01)`;

        // Floating card 1: Top-Left (Depth: 2.2)
        if (card1Ref.current) {
          const offsetX = nx * 22;
          const offsetY = ny * 18;
          card1Ref.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 45px)`;
        }

        // Floating card 2: Bottom-Left (Depth: 1.6)
        if (card2Ref.current) {
          const offsetX = nx * 16;
          const offsetY = ny * 14;
          card2Ref.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 30px)`;
        }

        // Floating card 3: Right (Depth: 2.0)
        if (card3Ref.current) {
          const offsetX = nx * 20;
          const offsetY = ny * 18;
          card3Ref.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 38px)`;
        }
      });
    },
    [isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (!laptopRef.current || isTouchDevice) return;

    cancelAnimationFrame(rafId.current);
    laptopRef.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    laptopRef.current.style.transform = "perspective(1200px) rotateX(4deg) rotateY(0deg) translateY(0px)";

    [card1Ref, card2Ref, card3Ref].forEach((ref) => {
      if (ref.current) {
        ref.current.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        ref.current.style.transform = "translate3d(0, 0, 0)";
      }
    });

    const resetTimer = setTimeout(() => {
      if (laptopRef.current) laptopRef.current.style.transition = "";
      [card1Ref, card2Ref, card3Ref].forEach((ref) => {
        if (ref.current) ref.current.style.transition = "";
      });
    }, 600);

    return () => clearTimeout(resetTimer);
  }, [isTouchDevice]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (laptopRef.current) laptopRef.current.style.transition = "";
    [card1Ref, card2Ref, card3Ref].forEach((ref) => {
      if (ref.current) ref.current.style.transition = "";
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isTouchDevice) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseLeave, isTouchDevice]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[640px] mx-auto select-none py-6 px-2 sm:px-4"
    >
      {/* Soft ambient back-glow under and behind the laptop */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-indigo-600/20 rounded-full blur-3xl opacity-75 pointer-events-none" />

      {/* ── Laptop Chassis & Screen Wrapper with 3D Parallax ── */}
      <div
        ref={laptopRef}
        className="relative z-10 will-change-transform"
        style={{ 
          transform: "perspective(1200px) rotateX(4deg) rotateY(0deg)",
          transformStyle: "preserve-3d" 
        }}
      >
        {/* Laptop Lid / Screen Bezel */}
        <div className="relative rounded-t-2xl sm:rounded-t-3xl border border-slate-700/80 bg-gradient-to-b from-[#161f33] via-[#0d1629] to-[#070d1d] p-2.5 sm:p-3.5 shadow-[0_30px_70px_-15px_rgba(0,14,45,0.9)]">
          
          {/* Top Camera Notch Dot */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
            <div className="w-1 h-1 rounded-full bg-blue-400/50" />
          </div>

          {/* Inner Screen Display */}
          <div className="relative rounded-xl overflow-hidden bg-[#03091e] border border-blue-500/30 shadow-inner flex flex-col aspect-[16/10.5] text-white">
            
            {/* Top Navigation Bar of NxtGen Academy AI Screen */}
            <div className="px-3.5 py-2.5 border-b border-blue-900/60 bg-[#061234]/95 flex items-center justify-between backdrop-blur-md">
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
              <div className="w-24 sm:w-28 border-r border-blue-950/80 bg-[#040b22]/75 p-2 flex flex-col gap-1 shrink-0">
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
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#07153a]/80 border border-blue-500/20 backdrop-blur-sm shadow-xs">
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
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#07153a]/80 border border-blue-500/20 backdrop-blur-sm shadow-xs">
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
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#07153a]/80 border border-blue-500/20 backdrop-blur-sm shadow-xs">
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
                    className="w-full h-full preserve-3d"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="nxtWaveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                        <stop offset="65%" stopColor="#1b5bd6" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#03153b" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="nxtGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Gradient Fill under wave */}
                    <path
                      d="M 0 60 Q 40 30, 80 50 T 160 40 T 230 20 T 300 35 L 300 80 L 0 80 Z"
                      fill="url(#nxtWaveGradient)"
                    />

                    {/* Glowing Stroke Path */}
                    <path
                      d="M 0 60 Q 40 30, 80 50 T 160 40 T 230 20 T 300 35"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#nxtGlow)"
                    />

                    {/* Glowing Accent Nodes */}
                    <circle cx="80" cy="50" r="3.5" fill="#38bdf8" className="animate-ping" style={{ transformOrigin: "80px 50px" }} />
                    <circle cx="80" cy="50" r="2.5" fill="#ffffff" />

                    <circle cx="230" cy="20" r="3.5" fill="#38bdf8" className="animate-ping" style={{ transformOrigin: "230px 20px" }} />
                    <circle cx="230" cy="20" r="2.5" fill="#ffffff" />
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

      {/* ── 3 Floating Glassmorphic Cards with Independent Parallax Depths ── */}

      {/* 1. Top-Left Floating Card: "Real AI Projects" */}
      <div
        ref={card1Ref}
        className="absolute -top-4 -left-3 sm:-top-5 sm:-left-6 z-30 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#08183d]/90 border border-blue-400/40 backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(0,102,255,0.45)] text-white hover:scale-105 transition-all duration-300 cursor-default will-change-transform"
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
        className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 z-30 flex items-center gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-[#08183d]/90 border border-blue-400/40 backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(0,102,255,0.45)] text-white hover:scale-105 transition-all duration-300 cursor-default will-change-transform"
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
        className="absolute top-1/3 -right-2 sm:-right-6 z-30 flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#08183d]/90 border border-blue-400/40 backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(0,102,255,0.45)] text-white hover:scale-105 transition-all duration-300 cursor-default will-change-transform"
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
