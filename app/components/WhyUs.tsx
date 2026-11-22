import {
  Sparkles,
  MonitorPlay,
  ClipboardList,
  Contact,
  FileText,
  MonitorSmartphone,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";

const items = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    t: "Legal Job Guarantee Program",
    d: "A clear, written agreement that guarantees real placement opportunities and supports your career growth completely.",
  },
  {
    icon: <MonitorPlay className="h-5 w-5" />,
    t: "Proven Results",
    d: "Thousands of students placed in tech roles through strong guidance, practical training, and industry-focused preparation.",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    t: "Job-Ready Curriculum",
    d: "Up-to-date curriculum designed with industry needs so students learn practical, job-ready skills quickly.",
  },
  {
    icon: <Contact className="h-5 w-5" />,
    t: "1:1 Mentor Support",
    d: "Learn directly from expert mentors employed at leading product-based companies who guide your progress every day.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    t: "Real-World Projects & Case Studies",
    d: "Create a professional portfolio using real-world projects that help you stand out to hiring recruiters.",
  },
  {
    icon: <MonitorSmartphone className="h-5 w-5" />,
    t: "Alliances with Product Companies",
    d: "Meaningful alliances with product companies to bridge skill development and real employment.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why"
      className="py-16 relative overflow-hidden bg-background"
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading
          eyebrow="Why NxtGen"
          title={<>Why Students Choose <span className="text-primary font-medium">NxtGen Academy</span></>}
          subtitle="We bridge the gap between academic knowledge and industry expectations, transforming you into a top-tier candidate."
        />
        
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {items.map((it, i) => (
            <ScrollReveal key={it.t} direction="up" delay={i * 100}>
              <div
                className="card-hover-primary h-full group relative overflow-hidden rounded-3xl bg-card border border-border/80 p-7 shadow-sm cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="card-icon h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center border border-primary/20 shadow-xs transition-colors duration-200">
                    {it.icon}
                  </div>
                  <span className="font-heading text-5xl font-black text-foreground/[0.05] transition-colors duration-200 pointer-events-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="font-heading text-lg font-semibold text-foreground transition-colors duration-200">
                  {it.t}
                </h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium transition-colors duration-200">
                  {it.d}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
