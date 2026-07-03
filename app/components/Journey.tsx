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
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="section-divider" />

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading
          eyebrow="Learning Journey"
          title="Your Career Transformation Roadmap"
          subtitle="A structured, step-by-step approach designed to take you from a learner to a hired professional."
        />

        <div className="mt-24 max-w-4xl mx-auto">
          <ol className="relative grid md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-8">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent drop-shadow-[0_0_8px_oklch(0.62_0.22_258/0.5)]" />

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

                  <div className="card-premium p-6 sm:p-8 rounded-2xl group relative overflow-hidden bg-white/[0.02] border-white/5 backdrop-blur-md">
                    {/* Spotlight gradient effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                    <div
                      className={`relative z-10 inline-flex items-center gap-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/30 rounded-md px-3 py-1.5 backdrop-blur-sm group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_oklch(0.58_0.20_255/0.25)] transition-all duration-300">
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h4 className="relative z-10 mt-6 font-display text-xl sm:text-2xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
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
  )

}
