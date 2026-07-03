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
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading
          eyebrow="Why NxtGen"
          title="Why students choose NxtGen Academy"
          subtitle="We bridge the gap between academic knowledge and industry expectations, transforming you into a top-tier candidate."
        />
        
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {items.map((it, i) => (
            <ScrollReveal key={it.t} direction="up" delay={i * 100}>
              <Card
                className="card-premium h-full group relative overflow-hidden"
              >
                {/* Spotlight gradient effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                
                <CardContent className="p-7 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center border border-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_20px_oklch(0.58_0.20_255/0.3)] transition-all duration-500">
                      {it.icon}
                    </div>
                    <span className="font-heading text-5xl font-black text-white/[0.03] group-hover:text-white/[0.08] transition-colors duration-500 pointer-events-none drop-shadow-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {it.t}
                  </h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium">
                    {it.d}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
