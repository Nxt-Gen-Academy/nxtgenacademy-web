import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "./ScrollReveal";

const referralLogos = [
  { src: "/logos/google.png", alt: "Google" },
  { src: "/logos/amazon.svg", alt: "Amazon" },
  { src: "/logos/infosys.svg", alt: "Infosys" },
  { src: "/logos/deloitte.svg", alt: "Deloitte" },
  { src: "/logos/ey.svg", alt: "EY" },
  { src: "/logos/tcs.svg", alt: "TCS" },
];

export default function OutcomeRecipe() {
  return (
    <section id="recipe" className="py-32 px-4 relative">
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Welcome to the Outcome Powerhouse"
          title="Your Recipe for a Next Gen Learner"
          subtitle="We don't just teach skills. We engineer your entire career transition path with a proven methodology."
        />
        
        <div className="mt-20 grid gap-6 md:gap-8 lg:grid-cols-2">
          <ScrollReveal direction="up" delay={100}>
            <Card className="card-premium h-full group">
              <CardContent className="p-7 md:p-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-amber-300 shadow-sm transition-colors group-hover:bg-amber-500/20 group-hover:border-amber-400/50">
                    Access 3000+ Companies
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground">
                    Get Referrals
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                    Boost your job prospects with referrals from our vast network of
                    companies actively hiring our graduates.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/60 p-5 grid grid-cols-3 gap-3 place-items-center shadow-inner group-hover:border-primary/20 transition-colors">
                  {referralLogos.map((logo, i) => (
                    <div
                      key={logo.alt}
                      className="logo-white-card w-full h-10 transition-transform hover:scale-110"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={64}
                        height={24}
                        className="logo-white-card-img"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <Card className="card-premium h-full group">
              <CardContent className="p-7 md:p-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-sky-300 shadow-sm transition-colors group-hover:bg-sky-500/20 group-hover:border-sky-400/50">
                    Tailored Interview Prep
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground">
                    Company-Specific Prep
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                    Get ready for interviews with customized preparation for your
                    target companies based on actual recent interview experiences.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/60 p-5 shadow-inner group-hover:border-primary/20 transition-colors">
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono uppercase text-muted-foreground">
                    <div className="rounded-xl border border-dashed border-border/80 bg-card/40 p-2 text-center group-hover:border-primary/40 transition-colors">
                      May 29
                    </div>
                    <div className="rounded-xl border border-dashed border-border/80 bg-card/40 p-2 text-center group-hover:border-primary/40 transition-colors">
                      May 30
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl bg-amber-500/10 border border-amber-400/30 p-3.5 text-xs text-amber-200 shadow-sm transition-transform group-hover:translate-x-1">
                      Practice interview scheduled for Amazon
                    </div>
                    <div className="rounded-xl bg-primary/15 border border-primary/40 p-3.5 text-xs text-foreground shadow-sm transition-transform group-hover:translate-x-1 delay-75">
                      Round 1 interview scheduled for Amazon
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <Card className="card-premium h-full group">
              <CardContent className="p-7 md:p-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-violet-300 shadow-sm transition-colors group-hover:bg-violet-500/20 group-hover:border-violet-400/50">
                    Interactive Coding Sessions
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground">
                    Live Coding Practice
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                    Improve your skills with live coding exercises, pair programming, and real-time
                    feedback from senior engineers.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/60 p-5 shadow-inner group-hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/40 shadow-sm group-hover:scale-110 transition-transform" />
                    <div className="h-10 w-10 rounded-full bg-secondary border border-border/80 shadow-sm group-hover:scale-110 transition-transform delay-75" />
                    <div className="h-10 w-10 rounded-full bg-emerald-400/20 border border-emerald-400/40 shadow-sm group-hover:scale-110 transition-transform delay-150 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                  <div className="mt-5 rounded-xl border border-border/80 bg-card p-4 text-xs text-muted-foreground shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2">
                      <span className="font-medium text-foreground/80">Pair session</span>
                      <span className="text-primary font-medium flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Live
                      </span>
                    </div>
                    <div className="font-mono text-[12px] text-foreground/90 bg-background/50 p-2 rounded border border-border/30">
                      <span className="text-violet-400">const</span> solution = <span className="text-amber-300">optimize</span>(arr);
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <Card className="card-premium h-full group">
              <CardContent className="p-7 md:p-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-emerald-300 shadow-sm transition-colors group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50">
                    Lifetime Placement Assurance
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground">
                    Career Support
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                    Continue to receive job opportunities and interview support as a valued
                    alumnus of NxtGen Academy for life.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/60 p-5 space-y-3 shadow-inner group-hover:border-primary/20 transition-colors">
                  <div className="rounded-xl bg-card border border-border/80 p-3.5 text-xs text-foreground shadow-sm transition-transform group-hover:translate-x-1 hover:border-primary/40 cursor-default">
                    <div className="font-semibold text-sm">Senior Data Scientist</div>
                    <div className="text-muted-foreground mt-0.5">
                      Microsoft · Full-time
                    </div>
                  </div>
                  <div className="rounded-xl bg-card border border-border/80 p-3.5 text-xs text-foreground shadow-sm transition-transform group-hover:translate-x-1 delay-75 hover:border-primary/40 cursor-default">
                    <div className="font-semibold text-sm">Product Manager</div>
                    <div className="text-muted-foreground mt-0.5">
                      Razorpay · Full-time
                    </div>
                  </div>
                  <div className="rounded-xl bg-card border border-border/80 p-3.5 text-xs text-foreground shadow-sm transition-transform group-hover:translate-x-1 delay-150 hover:border-primary/40 cursor-default">
                    <div className="font-semibold text-sm">AI Engineer</div>
                    <div className="text-muted-foreground mt-0.5">
                      Flipkart · Full-time
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
