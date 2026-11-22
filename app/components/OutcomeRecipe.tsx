import Image from "next/image";
import SectionHeading from "./SectionHeading";
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
    <section id="recipe" className="py-16 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="section-divider" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading
          eyebrow="Welcome to the Outcome Powerhouse"
          title={<>Your Recipe for a <span className="text-primary font-medium">Next Gen Learner</span></>}
          subtitle="We don't just teach skills. We engineer your entire career transition path with a proven methodology."
        />
        
        <div className="mt-20 grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* Card 1: Referrals */}
          <ScrollReveal direction="up" delay={100}>
            <div className="card-hover-primary h-full group relative overflow-hidden rounded-3xl bg-card border border-border/80 shadow-sm p-7 md:p-8 cursor-pointer">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="card-badge inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-amber-500 backdrop-blur-md transition-colors duration-200">
                    Access 3000+ Companies
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground transition-colors duration-200">
                    Get Referrals
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed transition-colors duration-200">
                    Boost your job prospects with referrals from our vast network of
                    companies actively hiring our graduates.
                  </p>
                </div>
                <div className="card-divider rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 grid grid-cols-3 gap-3 place-items-center shadow-md transition-colors duration-200">
                  {referralLogos.map((logo, i) => (
                    <div
                      key={logo.alt}
                      className="logo-white-card w-full h-10 transition-colors"
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
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Company-Specific Prep */}
          <ScrollReveal direction="up" delay={200}>
            <div className="card-hover-primary h-full group relative overflow-hidden rounded-3xl bg-card border border-border/80 shadow-sm p-7 md:p-8 cursor-pointer">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="card-badge inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-sky-500 backdrop-blur-md transition-colors duration-200">
                    Tailored Interview Prep
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground transition-colors duration-200">
                    Company-Specific Prep
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed transition-colors duration-200">
                    Crack company-specific interviews with targeted question banks, system
                    design sessions, and domain mock panels.
                  </p>
                </div>
                <div className="card-divider rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 space-y-3 shadow-md transition-colors duration-200">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-border/50 pb-2 transition-colors duration-200">
                    <span className="text-muted-foreground">Topic</span>
                    <span className="text-foreground font-semibold">Target Firm</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-muted/40 p-2.5 rounded-lg border border-border/50 transition-colors duration-200">
                    <span className="text-foreground">AI PRD Design</span>
                    <span className="text-primary font-medium">Google</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-muted/40 p-2.5 rounded-lg border border-border/50 transition-colors duration-200">
                    <span className="text-foreground">SQL Optimization</span>
                    <span className="text-primary font-medium">Amazon</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: AI Portfolio */}
          <ScrollReveal direction="up" delay={300}>
            <div className="card-hover-primary h-full group relative overflow-hidden rounded-3xl bg-card border border-border/80 shadow-sm p-7 md:p-8 cursor-pointer">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="card-badge inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-primary backdrop-blur-md transition-colors duration-200">
                    Stand Out To Recruiters
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground transition-colors duration-200">
                    Build a Real AI Portfolio
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed transition-colors duration-200">
                    Build end-to-end, investor-grade products and analysis dashboards that
                    prove your problem-solving capabilities.
                  </p>
                </div>
                <div className="card-divider rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 shadow-md transition-colors duration-200">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/30 shadow-xs transition-colors duration-200" />
                    <div className="h-10 w-10 rounded-full bg-secondary border border-border/80 shadow-xs transition-colors duration-200" />
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-xs flex items-center justify-center transition-colors duration-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-card p-4 text-xs text-muted-foreground shadow-xs transition-colors duration-200">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-2 transition-colors duration-200">
                      <span className="font-medium text-foreground/80 transition-colors duration-200">Pair session</span>
                      <span className="text-primary font-medium flex items-center gap-1.5 transition-colors duration-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Live
                      </span>
                    </div>
                    <div className="font-mono text-[12px] text-foreground/90 bg-muted/60 p-2 rounded border border-border/50 transition-colors duration-200">
                      <span>const solution = optimize(arr);</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Career Support */}
          <ScrollReveal direction="up" delay={400}>
            <div className="card-hover-primary h-full group relative overflow-hidden rounded-3xl bg-card border border-border/80 shadow-sm p-7 md:p-8 cursor-pointer">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] w-full h-full items-center">
                <div>
                  <span className="card-badge inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-emerald-500 backdrop-blur-md transition-colors duration-200">
                    Lifetime Placement Assurance
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-foreground transition-colors duration-200">
                    Career Support
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed transition-colors duration-200">
                    Continue to receive job opportunities and interview support as a valued
                    alumnus of NxtGen Academy for life.
                  </p>
                </div>
                <div className="card-divider rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 space-y-3 shadow-md transition-colors duration-200">
                  <div className="rounded-xl bg-card border border-border/80 p-3.5 text-xs text-foreground shadow-sm transition-colors duration-200 cursor-default">
                    <div className="font-semibold text-sm transition-colors duration-200">Senior Data Scientist</div>
                    <div className="text-muted-foreground transition-colors duration-200 mt-0.5">
                      Microsoft · Full-time
                    </div>
                  </div>
                  <div className="rounded-xl bg-card border border-border/80 p-3.5 text-xs text-foreground shadow-sm transition-colors duration-200 cursor-default">
                    <div className="font-semibold text-sm transition-colors duration-200">Product Manager</div>
                    <div className="text-muted-foreground transition-colors duration-200 mt-0.5">
                      Razorpay · Full-time
                    </div>
                  </div>
                  <div className="rounded-xl bg-card border border-border/80 p-3.5 text-xs text-foreground shadow-sm transition-colors duration-200 cursor-default">
                    <div className="font-semibold text-sm transition-colors duration-200">AI Engineer</div>
                    <div className="text-muted-foreground transition-colors duration-200 mt-0.5">
                      Flipkart · Full-time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
