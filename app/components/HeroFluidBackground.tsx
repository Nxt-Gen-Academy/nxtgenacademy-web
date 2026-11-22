"use client";

import { motion } from "motion/react";

export default function HeroFluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020817]">
      {/* ── Deep Base Fluid Gradient ── */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 70% 30%, #0a2560 0%, #03102e 45%, #010717 100%)"
        }}
      />

      {/* ── Large Soft Ambient Fluid Glows ── */}
      {/* 1. Behind the Laptop (Top Right) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.65, 0.75, 0.65] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -top-20 right-0 w-[650px] lg:w-[850px] h-[650px] lg:h-[850px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27, 91, 214, 0.45) 0%, rgba(2, 45, 130, 0.25) 50%, transparent 70%)"
        }}
      />

      {/* 2. Cyan Fluid Accent Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.12, 1],
          x: [0, -15, 0],
          y: [0, 15, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 right-[10%] w-[450px] lg:w-[600px] h-[450px] lg:h-[600px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.30) 0%, rgba(27, 91, 214, 0.15) 55%, transparent 75%)"
        }}
      />

      {/* 3. Left Ambient Depth Glow */}
      <div 
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full blur-[130px] opacity-35 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14, 60, 160, 0.35) 0%, transparent 70%)"
        }}
      />

      {/* ── Organic Flowing Fluid Silk Ribbons (SVG Waves) ── */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden opacity-75">
        <svg 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover min-w-[1100px]"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Primary Fluid Flow Gradient */}
            <linearGradient id="fluidFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0033a0" stopOpacity="0.05" />
              <stop offset="40%" stopColor="#1b5bd6" stopOpacity="0.35" />
              <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#010e28" stopOpacity="0.0" />
            </linearGradient>

            {/* Sweeping Ribbon Accent */}
            <linearGradient id="fluidFlow2" x1="100%" y1="20%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#1b5bd6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#03153b" stopOpacity="0.0" />
            </linearGradient>

            <filter id="fluidSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="35" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Ambient Fluid Wave */}
          <path
            d="M 650 -100 C 950 180, 1380 280, 1480 850 L 1480 900 L 500 900 C 680 650, 520 320, 650 -100 Z"
            fill="url(#fluidFlow1)"
            filter="url(#fluidSoftGlow)"
          />

          {/* Sweeping Right Fluid Ribbon */}
          <motion.path
            d="M 780 0 C 1100 220, 1320 440, 1440 900 C 1220 860, 980 720, 840 520 C 720 350, 690 160, 780 0 Z"
            fill="url(#fluidFlow2)"
            animate={{
              d: [
                "M 780 0 C 1100 220, 1320 440, 1440 900 C 1220 860, 980 720, 840 520 C 720 350, 690 160, 780 0 Z",
                "M 790 -30 C 1080 250, 1350 420, 1440 910 C 1240 840, 960 740, 850 490 C 740 330, 670 180, 790 -30 Z",
                "M 780 0 C 1100 220, 1320 440, 1440 900 C 1220 860, 980 720, 840 520 C 720 350, 690 160, 780 0 Z",
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Delicate Stroke Ribbon Highlight */}
          <motion.path
            d="M 740 -40 Q 1060 300, 1260 520 T 1440 890"
            stroke="url(#fluidFlow2)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 12px rgba(56, 189, 248, 0.45))" }}
            animate={{
              d: [
                "M 740 -40 Q 1060 300, 1260 520 T 1440 890",
                "M 760 -20 Q 1080 280, 1240 540 T 1440 870",
                "M 740 -40 Q 1060 300, 1260 520 T 1440 890",
              ]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* ── Refined Subtle Grid Pattern (Matches Site's Grid Accent) ── */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* ── Seamless Bottom Transition into Light Mode Page ── */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
    </div>
  );
}
