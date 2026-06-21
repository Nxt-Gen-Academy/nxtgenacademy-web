"use client";

import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

const allTestimonials = [
  {
    name: "Shreyanka Chatterjee",
    role: "Virtual Sales Officer at CavinKare",
    initials: "SC",
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600",
    text: "Data science has effectively tackled many real-world problems and is being increasingly adopted across industries to power more intelligent and better-informed decision-making. Excellent cohort!",
  },
  {
    name: "Sachit Bantwal Sathwik",
    role: "Business Analyst & AI Explorer",
    initials: "SS",
    color: "from-orange-500/10 to-red-500/10 text-orange-600",
    text: "My Journey in NxtGen Academy's Gen AI program has helped me learn many AI applications which are really useful for building projects and helps in various sectors and fields.",
  },
  {
    name: "Baba Afrid Shaik",
    role: "Site Engineer turned Data Scientist",
    initials: "BS",
    color: "from-green-500/10 to-emerald-500/10 text-emerald-600",
    text: "Each session brings a perfect blend of conceptual clarity and real-world application—from exploring data visualization and business insights to understanding how analytics drives decision-making.",
  },
  {
    name: "Zargham Ullah",
    role: "Data Science Alchemist",
    initials: "ZU",
    color: "from-purple-500/10 to-pink-500/10 text-purple-600",
    text: "Simplifying My Data Analytics Journey. Embarking on the path of data analytics can be daunting, but my experience transformed it into an enlightening and manageable endeavor. The real-world projects and mentorship provided me with practical insights!",
  },
  {
    name: "Kamayani Chaliki",
    role: "Skincare Formulator & AI Specialist",
    initials: "KC",
    color: "from-pink-500/10 to-rose-500/10 text-rose-600",
    text: "The structured learning approach, coupled with practical assignments and continuous mentor guidance, has truly helped me grow both technically and analytically. The cohort is outstanding!",
  },
  {
    name: "Devesh Kumar",
    role: "AI & ML Specialist | Aspiring AI PM",
    initials: "DK",
    color: "from-yellow-500/10 to-amber-500/10 text-amber-600",
    text: "As a Product Manager, problem-solving is the top skill. Subhasis Chandra carefully understood my points with patience and then asked me simple questions to define the problem. High-value mentorship!",
  },
  {
    name: "Srikant Pandey",
    role: "Gen AI & AI Agents Developer",
    initials: "SP",
    color: "from-teal-500/10 to-cyan-500/10 text-cyan-600",
    text: "The program at NxtGen is one of the most structured and practical learning experiences I've had. From data visualization to real-life business problems, everything is taught in depth.",
  },
  {
    name: "Nikhil D.",
    role: "Data Analyst Cohort Graduate",
    initials: "ND",
    color: "from-indigo-500/10 to-purple-500/10 text-indigo-600",
    text: "Hands-on experience in analytics. I can now confidently analyze datasets, create dashboards, and draw meaningful insights. The mentors are fantastic and the vision of empowering learners truly shines through!",
  },
];

// Split testimonials into 3 columns
const column1 = [allTestimonials[0], allTestimonials[1], allTestimonials[4]];
const column2 = [allTestimonials[2], allTestimonials[5], allTestimonials[6]];
const column3 = [allTestimonials[3], allTestimonials[7], allTestimonials[1]];

export default function HearFromLearners() {
  const col1Items = [...column1, ...column1];
  const col2Items = [...column2, ...column2];
  const col3Items = [...column3, ...column3];

  const renderCard = (item: typeof allTestimonials[0], idx: number, colId: string) => (
    <Card
      key={`${colId}-${idx}`}
      className="w-full border border-slate-200/80 bg-white p-6 hover:border-indigo-500/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl group flex flex-col gap-4"
    >
      <CardContent className="p-0 flex flex-col gap-4">
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-xs tracking-wider shrink-0 border border-slate-100`}>
              {item.initials}
            </div>
            <div>
              <h4 className="font-heading font-medium text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                {item.role}
              </p>
            </div>
          </div>
        </div>

        {/* Card Content Text */}
        <p className="text-xs text-slate-700 leading-relaxed font-normal line-clamp-4 group-hover:text-slate-900 transition-colors">
          "{item.text}"
        </p>

        {/* Card Footer Rating */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
            ))}
          </div>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Verified Learner
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section
      id="learners"
      className="py-24 relative overflow-hidden bg-background"
    >
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="Success Stories"
          title="Transformative Alumni Stories"
          subtitle="Read firsthand accounts of how our graduates navigated the transition into high-growth AI and analytics roles."
          align="center"
        />

        {/* 3-Column Vertical Marquee Container */}
        <div className="relative mt-16 max-w-6xl mx-auto h-[600px] overflow-hidden rounded-3xl border border-border/40 bg-card/10 p-6 md:p-8">
          
          {/* Top/Bottom Fade Gradients matching page dark background */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            
            {/* Column 1 */}
            <div className="flex flex-col h-full overflow-hidden">
              <div className="marquee-vertical-track-1">
                {col1Items.map((item, idx) => renderCard(item, idx, "col1"))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="hidden md:flex flex-col h-full overflow-hidden">
              <div className="marquee-vertical-track-2">
                {col2Items.map((item, idx) => renderCard(item, idx, "col2"))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="hidden lg:flex flex-col h-full overflow-hidden">
              <div className="marquee-vertical-track-3">
                {col3Items.map((item, idx) => renderCard(item, idx, "col3"))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
