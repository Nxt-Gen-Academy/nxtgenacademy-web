import SectionHeading from "./SectionHeading";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const people = [
  {
    n: "Rohit Sharma",
    f: "Sales Executive",
    t: "Business Analyst",
  },
  {
    n: "Neha Verma",
    f: "Fresher",
    t: "Data Analyst",
  },
  {
    n: "Aman Gupta",
    f: "Operations Executive",
    t: "Associate Product Manager",
  },
];

export default function Stories() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-transparent via-card/20 to-transparent">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Career Transition Stories"
          title="Real people. Real role transitions."
          subtitle="It doesn't matter where you start. With the right roadmap and mentorship, you can pivot into a high-growth tech career."
        />
        
        <div className="mt-20 grid md:grid-cols-3 gap-6 md:gap-8">
          {people.map((p, i) => (
            <ScrollReveal key={p.n} direction="up" delay={i * 150}>
              <article className="card-premium p-8 flex flex-col group h-full">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20 flex items-center justify-center font-heading font-medium text-foreground">
                    {p.n.charAt(0)}
                  </div>
                  <div className="font-heading font-medium text-xl text-foreground">{p.n}</div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border/50 flex-grow flex flex-col justify-center">
                  <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-border/60">
                    <div className="relative mb-6">
                      <div className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground border border-background" />
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-1">
                        From
                      </div>
                      <div className="text-base font-medium text-foreground/80">{p.f}</div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_oklch(0.62_0.22_258/0.6)]" />
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-semibold mb-1 flex items-center gap-2">
                        To <ArrowRight className="h-3 w-3" />
                      </div>
                      <div className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">{p.t}</div>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
