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
    <section id="curriculum" className="py-32 px-4 relative">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="Skills You'll Master"
          title="Analytics, AI, and product skills that make you job-ready."
          subtitle="A carefully curated stack of tools and methodologies actively used by top tech companies globally."
        />
        
        <div className="mt-20 grid lg:grid-cols-3 gap-6 md:gap-8">
          {stacks.map((s, idx) => (
            <ScrollReveal key={s.t} direction="up" delay={idx * 150}>
              <div
                className="card-premium p-8 h-full group"
              >
                <div className="flex items-center gap-4 mb-8 border-b border-border/50 pb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-sm font-bold border border-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    0{idx + 1}
                  </div>
                  <h4 className="font-heading text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">{s.t}</h4>
                </div>
                
                <ul className="space-y-4">
                  {s.items.map((i, itemIdx) => {
                    const Icon = iconMap[i];
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-background/80 transition-colors duration-300 border border-transparent hover:border-border/50"
                        style={{ transitionDelay: `${itemIdx * 30}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-card border border-border/80 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-primary/30 transition-all shadow-sm">
                            {Icon && <Icon className="w-4 h-4" />}
                          </div>
                          <span className="font-medium text-foreground/90">{i}</span>
                        </div>
                        <span className="inline-flex items-center justify-center h-6 px-2 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono text-[10px] uppercase tracking-widest">
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
