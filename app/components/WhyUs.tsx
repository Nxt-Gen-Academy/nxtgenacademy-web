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
      className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-transparent via-card/20 to-transparent"
    >
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Why NxtGen"
          title="Why students choose NxtGen Academy"
          subtitle="We bridge the gap between academic knowledge and industry expectations, transforming you into a top-tier candidate."
        />
        
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Subtle connecting lines */}
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none rounded-3xl" />
          
          {items.map((it, i) => (
            <ScrollReveal key={it.t} direction="up" delay={i * 100}>
              <Card
                className="card-premium h-full group"
              >
                <CardContent className="p-7">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center border border-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500">
                      {it.icon}
                    </div>
                    <span className="font-mono text-4xl font-bold text-foreground/5 group-hover:text-foreground/10 transition-colors pointer-events-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-medium text-foreground group-hover:text-primary transition-colors">
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
