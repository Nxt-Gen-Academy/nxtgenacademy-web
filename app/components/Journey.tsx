import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const steps = [
  "Career Counselling & Skill Assessment",
  "Core Foundation Training",
  "Hands-on Industry Projects",
  "Gen AI & Automation Modules",
  "Portfolio + Resume Building",
  "Mock Interviews & Placement Support",
];

export default function Journey() {
  return (
    <section className="py-32 px-4 relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Learning Journey"
          title="Your Career Transformation Roadmap"
          subtitle="A structured, step-by-step approach designed to take you from a learner to a hired professional."
        />
        
        <div className="mt-24 max-w-4xl mx-auto">
          <ol className="relative grid md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-8">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10" />
            
            {steps.map((s, i) => (
              <li
                key={s}
                className={`relative ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:mt-24"}`}
              >
                <ScrollReveal direction={i % 2 === 0 ? "right" : "left"} delay={i * 150}>
                  {/* Timeline connector dot (visible on desktop) */}
                  <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-4 border-background bg-primary items-center justify-center shadow-[0_0_10px_oklch(0.62_0.22_258/0.5)] z-10 ${i % 2 === 0 ? "-right-[10px]" : "-left-[10px]"}`}>
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>

                  <div className="card-premium p-6 sm:p-8 rounded-2xl group relative overflow-hidden">
                    
                    <div
                      className={`inline-flex items-center gap-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <span className="font-mono text-[11px] font-semibold text-primary/80 uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 rounded-md px-2.5 py-1 backdrop-blur-sm group-hover:bg-primary/20 transition-colors">
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    
                    <h4 className="mt-5 font-display text-xl sm:text-2xl font-medium leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {s}
                    </h4>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
