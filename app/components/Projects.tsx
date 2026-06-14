import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const list = [
  { t: "Sales Dashboard", s: "Power BI", k: "Analytics", img: "/sales_dashboard.png" },
  { t: "AI Resume Analyzer", s: "Python + LLM", k: "Gen AI", img: "/ai_resume_analyzer.jpeg" },
  { t: "Customer Churn Prediction", s: "Python · ML", k: "Data Science", img: "/customer_churn_predictions.jpeg" },
  { t: "AI Product Case Study", s: "PM Stack", k: "Product", img: "/ai_product_case_study.jpeg" },
  { t: "E-commerce Analytics Dashboard", s: "SQL · Tableau", k: "Analytics", img: "/ecommer_analytics.jpeg" },
  { t: "AI Chatbot Workflow", s: "No-Code AI", k: "Automation", img: "/ai_chat_workflow.jpeg" },
  { t: "Marketing Performance Dashboard", s: "GA4 · BI", k: "Analytics", img: "/marketing_performance_dashboard.jpeg" },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-4 relative">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Real Industry Projects"
          title="Real industry projects. Real portfolio outcomes."
          subtitle="Stop doing generic tutorials. Build an investor-grade portfolio with real datasets and production-ready applications."
        />
        
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {list.map((p, i) => (
            <ScrollReveal key={p.t} direction="up" delay={i * 100}>
              <div
                className="group relative aspect-[4/5] rounded-3xl border border-border/50 bg-card overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_oklch(0.62_0.22_258/0.3)] ring-1 ring-white/5"
              >
                {/* Background image */}
                {p.img ? (
                  <Image
                    src={p.img}
                    alt={p.t}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 grid-pattern opacity-30" />
                )}

                {/* Premium Gradient overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 group-hover:from-black group-hover:via-black/60 transition-all duration-500" />

                {/* Subtle Glow effect on hover */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center rounded-full border border-border/80 bg-background/50 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/90 shadow-sm group-hover:bg-primary/20 group-hover:text-primary-foreground group-hover:border-primary/40 transition-colors">
                      {p.k}
                    </span>
                    <span className="font-mono text-sm font-bold text-white/30 group-hover:text-white/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-heading text-xl sm:text-2xl font-medium leading-tight text-white drop-shadow-md">
                      {p.t}
                    </h4>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-px w-4 bg-primary/80 transition-all duration-500 group-hover:w-8" />
                      <p className="text-sm font-medium text-white/70 tracking-wide">{p.s}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
