import SectionHeading from "./SectionHeading";
import { SiPython, SiOpenai, SiGooglegemini, SiJira } from "react-icons/si";
import { FaDatabase, FaBrain, FaRobot, FaSync, FaChessKnight, FaUserCheck, FaFileExcel, FaChartBar, FaChartPie } from "react-icons/fa";
import { MdWidgets, MdGroups } from "react-icons/md";
import ScrollReveal from "./ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  "Excel": FaFileExcel,
  "SQL": FaDatabase,
  "Power BI": FaChartBar,
  "Tableau": FaChartPie,
  "Python": SiPython,
  "ChatGPT": SiOpenai,
  "Gemini": SiGooglegemini,
  "Prompt Engineering": FaBrain,
  "AI Automation": FaRobot,
  "No-Code AI Tools": MdWidgets,
  "Jira": SiJira,
  "Agile": FaSync,
  "Scrum": MdGroups,
  "Product Strategy": FaChessKnight,
  "User Research": FaUserCheck,
};

const stacks = [
  {
    t: "Analytics Stack",
    items: ["Excel", "SQL", "Power BI", "Tableau", "Python"],
  },
  {
    t: "AI Stack",
    items: [
      "ChatGPT",
      "Gemini",
      "Prompt Engineering",
      "AI Automation",
      "No-Code AI Tools",
    ],
  },
  {
    t: "Product Stack",
    items: ["Jira", "Agile", "Scrum", "Product Strategy", "User Research"],
  },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="py-16 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading
          eyebrow="Skills You'll Master"
          title="Analytics, AI, and product skills that make you job-ready."
          subtitle="A carefully curated stack of tools and methodologies actively used by top tech companies globally."
        />
        
        <div className="mt-20 grid lg:grid-cols-3 gap-6 md:gap-8">
          {stacks.map((s, idx) => (
            <ScrollReveal key={s.t} direction="up" delay={idx * 150}>
              <div
                className="card-premium p-8 h-full group relative overflow-hidden rounded-3xl bg-card border border-border/80 shadow-sm transition-all duration-200 ease-out hover:bg-primary hover:border-primary hover:shadow-xl hover:shadow-primary/25 cursor-pointer"
              >
                <div className="relative z-10 flex items-center gap-4 mb-8 border-b border-border/80 group-hover:border-white/20 transition-colors duration-200 pb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-sm font-bold border border-primary/20 shadow-xs transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/25">
                    0{idx + 1}
                  </div>
                  <h4 className="font-heading text-2xl font-medium text-foreground transition-colors duration-200 group-hover:text-white">{s.t}</h4>
                </div>
                
                <ul className="relative z-10 space-y-4">
                  {s.items.map((i, itemIdx) => {
                    const Icon = iconMap[i];
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl transition-colors duration-200 border border-transparent hover:bg-black/5 dark:hover:bg-white/5 group-hover:hover:bg-white/10"
                        style={{ transitionDelay: `${itemIdx * 30}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/25 shadow-xs">
                            {Icon && <Icon className="w-4 h-4" />}
                          </div>
                          <span className="font-medium text-foreground/90 transition-colors duration-200 group-hover:text-white">{i}</span>
                        </div>
                        <span className="inline-flex items-center justify-center h-6 px-2 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/25">
                          Included
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
