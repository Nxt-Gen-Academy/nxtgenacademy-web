import React from "react";
import ScrollReveal from "./ScrollReveal";
import { WordStaggerHeading } from "@/components/ui/WordStaggerHeading";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
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
        <div className={`flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-primary font-semibold ${align === "center" ? "justify-center" : ""}`}>
          <span className="relative flex items-center justify-center">
            <span className="h-px w-8 bg-primary/70" />
            <span className="absolute right-0 h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          {eyebrow}
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={200}>
        <WordStaggerHeading
          as="h2"
          className="mt-5 font-heading text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] font-medium text-foreground tracking-tight"
        >
          {title}
        </WordStaggerHeading>
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal direction="up" delay={300}>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
