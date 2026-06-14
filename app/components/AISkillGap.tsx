"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

interface DataPoint {
  year: number;
  avgSal: string;
  perfSal: string;
  yVal: number;
}

const tabData: Record<string, DataPoint[]> = {
  "AI Product Management": [
    { year: 2026, avgSal: "₹10L", perfSal: "₹15L", yVal: 400 },
    { year: 2028, avgSal: "₹12L", perfSal: "₹35L", yVal: 266 },
    { year: 2030, avgSal: "₹14L", perfSal: "₹48L", yVal: 180 },
    { year: 2032, avgSal: "₹17L", perfSal: "₹63L", yVal: 80 },
    { year: 2035, avgSal: "₹20L", perfSal: "₹72L", yVal: 20 },
  ],
  "Business Analyst": [
    { year: 2026, avgSal: "₹6L", perfSal: "₹12L", yVal: 420 },
    { year: 2028, avgSal: "₹8L", perfSal: "₹28L", yVal: 313 },
    { year: 2030, avgSal: "₹10L", perfSal: "₹38L", yVal: 246 },
    { year: 2032, avgSal: "₹12L", perfSal: "₹50L", yVal: 166 },
    { year: 2035, avgSal: "₹15L", perfSal: "₹62L", yVal: 86 },
  ],
  "AI Data Science": [
    { year: 2026, avgSal: "₹12L", perfSal: "₹18L", yVal: 380 },
    { year: 2028, avgSal: "₹15L", perfSal: "₹40L", yVal: 233 },
    { year: 2030, avgSal: "₹18L", perfSal: "₹55L", yVal: 133 },
    { year: 2032, avgSal: "₹22L", perfSal: "₹70L", yVal: 33 },
    { year: 2035, avgSal: "₹26L", perfSal: "₹82L", yVal: 0 },
  ],
  "Data Analyst": [
    { year: 2026, avgSal: "₹8L", perfSal: "₹14L", yVal: 406 },
    { year: 2028, avgSal: "₹10L", perfSal: "₹32L", yVal: 286 },
    { year: 2030, avgSal: "₹12L", perfSal: "₹45L", yVal: 200 },
    { year: 2032, avgSal: "₹15L", perfSal: "₹60L", yVal: 100 },
    { year: 2035, avgSal: "₹18L", perfSal: "₹75L", yVal: 0 },
  ],
  "Advanced Generative AI": [
    { year: 2026, avgSal: "₹14L", perfSal: "₹20L", yVal: 366 },
    { year: 2028, avgSal: "₹18L", perfSal: "₹45L", yVal: 200 },
    { year: 2030, avgSal: "₹22L", perfSal: "₹62L", yVal: 86 },
    { year: 2032, avgSal: "₹27L", perfSal: "₹75L", yVal: 0 },
    { year: 2035, avgSal: "₹32L", perfSal: "₹88L", yVal: -20 },
  ],
};

const tabs = Object.keys(tabData);

export default function AISkillGap() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const points = tabData[activeTab];

  // Helper to construct cubic bezier path dynamically based on yVal coordinates
  const getPathD = (pts: DataPoint[]) => {
    const [p0, p1, p2, p3, p4] = pts;
    return `M 0,${p0.yVal} C 125,${p0.yVal} 125,${p1.yVal} 250,${p1.yVal} C 375,${p1.yVal} 375,${p2.yVal} 500,${p2.yVal} C 625,${p2.yVal} 625,${p3.yVal} 750,${p3.yVal} C 875,${p3.yVal} 875,${p4.yVal} 1000,${p4.yVal}`;
  };

  return (
    <section id="skill-gap" className="py-32 px-4 relative overflow-hidden bg-background">
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="AI Skills Curve"
          title="The AI Skills Curve is Accelerating"
          subtitle="Traditional workflows are rapidly evolving. Mastering AI, data analytics, and automation is the ultimate edge for modern professionals."
          align="center"
        />

        {/* Tab pills */}
        <ScrollReveal direction="up" delay={200}>
          <div className="flex flex-wrap justify-center gap-3 mt-12 mb-16 max-w-4xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setHoveredDot(null);
                }}
                className={`px-5 py-2.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-primary border-primary text-primary-foreground shadow-[0_4px_20px_oklch(0.62_0.22_258/0.25)]"
                    : "bg-transparent border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Chart Container */}
        <ScrollReveal direction="up" delay={300}>
          <div className="relative bg-card/40 rounded-[32px] border border-border/50 shadow-[0_0_100px_oklch(0.62_0.22_258/0.05)] overflow-hidden w-full max-w-[1100px] mx-auto p-8 lg:p-16 backdrop-blur-sm">
            <style>{`
              @keyframes draw-chart-line {
                  0% { stroke-dashoffset: 1500; }
                  40% { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: 0; }
              }
              @keyframes dot-appear {
                  0%, 15% { transform: scale(0); opacity: 0; }
                  25%, 100% { transform: scale(1); opacity: 1; }
              }
              @keyframes glow-pulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 0.7; }
              }
              .draw-path-blue {
                  stroke-dasharray: 1500;
                  stroke-dashoffset: 1500;
                  animation: draw-chart-line 6s ease-in-out infinite;
              }
              .chart-dot {
                  transform-origin: center;
                  animation: dot-appear 6s ease-out infinite;
                  transition: r 0.2s ease, fill 0.2s ease;
              }
              .chart-glow {
                  animation: glow-pulse 6s ease-in-out infinite;
              }
              .chart-path-transition {
                  transition: d 0.6s cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}</style>

            <div className="relative w-full aspect-[2/1] min-h-[320px]">
              {/* Legend */}
              <div className="absolute top-0 left-0 lg:left-10 flex flex-wrap gap-6 items-center text-[10px] lg:text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[2px] border-b-[2px] border-dashed border-muted-foreground/60"></div>
                  <span>Average Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[3px] bg-primary"></div>
                  <span className="text-foreground font-semibold">Performance Analytics (AI Upskilled)</span>
                </div>
              </div>

              {/* Grid Lines & Y-Axis Labels */}
              <div className="absolute top-[60px] bottom-8 left-[40px] lg:left-[50px] right-0 flex flex-col justify-between pointer-events-none">
                {["₹75L", "₹60L", "₹45L", "₹30L", "₹15L", "₹0L"].map((label, idx) => (
                  <div key={label} className="relative w-full border-t border-border/20 h-0">
                    <span className="absolute -top-3 -left-[38px] lg:-left-[48px] w-8 text-right text-[10px] lg:text-[11px] font-mono font-medium text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* X-Axis Timeline Labels */}
              <div className="absolute bottom-0 left-[35px] sm:left-[40px] lg:left-[50px] right-0 flex justify-between px-0 text-[10px] lg:text-[11px] font-mono font-medium text-muted-foreground transform translate-y-1/2 select-none pointer-events-none">
                <span className="-ml-2">2026</span>
                <span>2028</span>
                <span>2030</span>
                <span>2032</span>
                <span className="-mr-2">2035</span>
              </div>

              {/* Interactive Tooltip overlays */}
              {hoveredDot !== null && (
                <div
                  className="absolute z-30 bg-card border border-border rounded-xl p-3 px-4 shadow-xl pointer-events-none transition-all duration-300 -translate-x-1/2 -translate-y-full mb-3 flex flex-col gap-1 min-w-[150px] backdrop-blur-md"
                  style={{
                    left: `${hoveredDot * 25}%`,
                    top: `${(points[hoveredDot].yVal / 500) * 100}%`,
                    marginLeft: hoveredDot === 0 ? "40px" : hoveredDot === 4 ? "-40px" : "25px",
                    marginTop: "30px"
                  }}
                >
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    Year {points[hoveredDot].year}
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">Average:</span>
                    <span className="text-xs font-mono font-semibold text-foreground/80">
                      {points[hoveredDot].avgSal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-primary font-medium">AI Upskilled:</span>
                    <span className="text-xs font-mono font-bold text-primary">
                      {points[hoveredDot].perfSal}
                    </span>
                  </div>
                </div>
              )}

              {/* SVG Plotting */}
              <svg
                className="absolute top-[60px] bottom-8 left-[35px] sm:left-[40px] lg:left-[50px] right-2 sm:right-4 w-[calc(100%-45px)] sm:w-[calc(100%-55px)] h-[calc(100%-60px-32px)] overflow-visible"
                viewBox="0 0 1000 500"
                preserveAspectRatio="none"
              >
                {/* Glow Backdrop Path */}
                <path
                  d={getPathD(points)}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="12"
                  className="chart-glow blur-xl opacity-35 chart-path-transition"
                  strokeLinecap="round"
                />

                {/* Average linear growth line */}
                <path
                  d="M 0,433 L 250,416 L 500,400 L 750,383 L 1000,366"
                  fill="none"
                  stroke="var(--color-muted-foreground)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  className="opacity-40"
                />

                {/* Performance Analytics glowing line */}
                <path
                  d={getPathD(points)}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  className="draw-path-blue chart-path-transition"
                  strokeLinecap="round"
                />

                {/* Average line markers */}
                <circle cx="0" cy="433" r="3" fill="var(--color-card)" stroke="var(--color-muted-foreground)" strokeWidth="1.5" className="opacity-50" />
                <circle cx="250" cy="416" r="3" fill="var(--color-card)" stroke="var(--color-muted-foreground)" strokeWidth="1.5" className="opacity-50" />
                <circle cx="500" cy="400" r="3" fill="var(--color-card)" stroke="var(--color-muted-foreground)" strokeWidth="1.5" className="opacity-50" />
                <circle cx="750" cy="383" r="3" fill="var(--color-card)" stroke="var(--color-muted-foreground)" strokeWidth="1.5" className="opacity-50" />
                <circle cx="1000" cy="366" r="3" fill="var(--color-card)" stroke="var(--color-muted-foreground)" strokeWidth="1.5" className="opacity-50" />

                {/* Performance Interactive Circles (larger hover targets) */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    {/* Pulsing Outer circle */}
                    <circle
                      cx={idx * 250}
                      cy={p.yVal}
                      r="12"
                      fill="transparent"
                      className="cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHoveredDot(idx)}
                      onMouseLeave={() => setHoveredDot(null)}
                    />
                    
                    {/* Visual Dot */}
                    <circle
                      cx={idx * 250}
                      cy={p.yVal}
                      r={hoveredDot === idx ? "8" : "6"}
                      fill="var(--color-foreground)"
                      stroke="var(--color-primary)"
                      strokeWidth="3"
                      className="chart-dot cursor-pointer"
                      style={{ animationDelay: `${idx * 0.4}s` }}
                      onMouseEnter={() => setHoveredDot(idx)}
                      onMouseLeave={() => setHoveredDot(null)}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
