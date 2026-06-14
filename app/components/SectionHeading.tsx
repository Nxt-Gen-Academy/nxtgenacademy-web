import ScrollReveal from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <ScrollReveal direction="up" delay={100}>
        <div className={`flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-accent ${align === "center" ? "justify-center" : ""}`}>
          <span className="relative flex items-center justify-center">
            <span className="h-px w-8 bg-accent/80" />
            <span className="absolute right-0 h-1 w-1 rounded-full bg-accent" />
          </span>
          {eyebrow}
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={200}>
        <h2 className="mt-6 font-heading text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-medium text-foreground tracking-tight">
          {title}
        </h2>
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal direction="up" delay={300}>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
