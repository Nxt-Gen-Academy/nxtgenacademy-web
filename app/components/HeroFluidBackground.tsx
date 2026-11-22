"use client";

import { motion } from "motion/react";

export default function HeroFluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#000a20]">
      {/* ── Deep Base Fluid Midnight Blue Radial Gradient ── */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 110% 95% at 75% 30%, #0d2c70 0%, #051642 40%, #000a20 90%)"
        }}
      />

      {/* ── Large Soft Ambient Fluid Glows behind the Laptop ── */}
      {/* 1. Primary Royal Blue Glow bloom */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.75, 0.9, 0.75] 
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -top-10 right-0 w-[650px] lg:w-[900px] h-[650px] lg:h-[900px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27, 91, 214, 0.55) 0%, rgba(14, 55, 160, 0.3) 50%, transparent 70%)"
        }}
      />

      {/* 2. Electric Cyan Accent Light bloom */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, -20, 0],
          y: [0, 15, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[18%] right-[8%] w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.38) 0%, rgba(27, 91, 214, 0.2) 55%, transparent 75%)"
        }}
      />

      {/* 3. Deep Left Ambient Flare */}
      <div 
        className="absolute top-1/4 -left-28 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(20, 70, 180, 0.4) 0%, transparent 70%)"
        }}
      />

      {/* ── Organic Flowing Fluid Silk Ribbon Waves (SVG) ── */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden opacity-85">
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
              <stop offset="35%" stopColor="#1b5bd6" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#000a20" stopOpacity="0.0" />
            </linearGradient>

            {/* Sweeping Ribbon Accent */}
            <linearGradient id="fluidFlow2" x1="100%" y1="15%" x2="0%" y2="85%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#1b5bd6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#05143a" stopOpacity="0.0" />
            </linearGradient>

            {/* Bright Cyan Highlight Ribbon */}
            <linearGradient id="fluidHighlight" x1="100%" y1="20%" x2="20%" y2="80%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#1d4ed8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000a20" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Hardware-Accelerated Ambient Silk Wave Group (60/120fps GPU compositing) */}
          <motion.g
            animate={{
              scale: [1, 1.025, 1],
              x: [0, 10, 0],
              y: [0, -8, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "1100px 450px" }}
          >
            {/* Deep Ambient Wave Layer */}
            <path
              d="M 620 -100 C 920 180, 1380 260, 1480 850 L 1480 900 L 480 900 C 660 650, 490 320, 620 -100 Z"
              fill="url(#fluidFlow1)"
            />

            {/* Primary Silk Ribbon Wave */}
            <path
              d="M 760 0 C 1080 220, 1340 420, 1440 900 C 1220 860, 960 720, 820 520 C 700 350, 670 160, 760 0 Z"
              fill="url(#fluidFlow2)"
            />

            {/* Electric Edge Light Ribbon */}
            <path
              d="M 720 -40 Q 1040 300, 1260 520 T 1440 890"
              stroke="url(#fluidHighlight)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Second Subtle Cyan Ripple Accent */}
            <path
              d="M 850 100 Q 1120 400, 1380 650"
              stroke="url(#fluidFlow2)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>
      </div>

      {/* ── Refined Subtle Grid Overlay (Matches NxtGen Design System) ── */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px"
        }}
      />
    </div>
  );
}
