import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

const row1 = [
  { name: "NTT Data", logo: "/logos/nttdata.svg" },
  { name: "Mphasis", logo: "/logos/mphasis.svg" },
  { name: "JPMorgan Chase", logo: "/logos/jpmorganchase.svg" },
  { name: "Infosys", logo: "/logos/infosys.svg" },
  { name: "Goldman Sachs", logo: "/logos/goldmansachs.svg" },
  { name: "Genpact", logo: "/logos/genpact.svg" },
  { name: "Ericsson", logo: "/logos/ericsson.svg" },
  { name: "Edelweiss", logo: "/logos/edelweiss.svg" },
  { name: "EY", logo: "/logos/ey.svg" },
  { name: "Dell", logo: "/logos/dell.svg" },
  { name: "Delhivery", logo: "/logos/delhivery.svg" },
  { name: "Deloitte", logo: "/logos/deloitte.svg" },
];

const row2 = [
  { name: "Wipro", logo: "/logos/wipro.svg" },
  { name: "Zepto", logo: "/logos/zepto.svg" },
  { name: "Thoughtworks", logo: "/logos/thoughtworks.png" },
  { name: "Zoho", logo: "/logos/zoho.svg" },
  { name: "Accenture", logo: "/logos/accenture.svg" },
  { name: "Delhivery", logo: "/logos/delhivery.svg" },
  { name: "Deloitte", logo: "/logos/deloitte.svg" },
  { name: "Dunzo", logo: "/logos/dunzo.svg" },
  { name: "Flipkart", logo: "/logos/flipkart.svg" },
  { name: "Freshworks", logo: "/logos/freshworks.svg" },
  { name: "Genpact", logo: "/logos/genpact.svg" },
  { name: "HCL", logo: "/logos/hcl.svg" },
];

const row3 = [
  { name: "Genpact", logo: "/logos/genpact.svg" },
  { name: "Edelweiss", logo: "/logos/edelweiss.svg" },
  { name: "Ericsson", logo: "/logos/ericsson.svg" },
  { name: "JPMorgan Chase", logo: "/logos/jpmorganchase.svg" },
  { name: "Goldman Sachs", logo: "/logos/goldmansachs.svg" },
  { name: "Infosys", logo: "/logos/infosys.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
  { name: "Nykaa", logo: "/logos/nykaa.svg" },
  { name: "Oppo", logo: "/logos/oppo.svg" },
  { name: "Optum", logo: "/logos/optum.svg" },
  { name: "Myntra", logo: "/logos/myntra.svg" },
  { name: "NTT Data", logo: "/logos/nttdata.svg" },
];

export default function Trust() {
  return (
    <section className="py-24 border-y border-border/40 relative overflow-hidden bg-background/40">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <ScrollReveal direction="up">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent text-center font-medium">
            Companies Our Skills Align With
          </p>
          <p className="mt-4 text-base text-muted-foreground text-center max-w-xl mx-auto">
            Curriculum aligned with modern AI-driven industry requirements for global tech leaders.
          </p>
        </ScrollReveal>
      </div>
      
      <div className="mt-14 space-y-5 w-full relative z-0">
        <ScrollReveal direction="fade" delay={200}>
          {/* Row 1: Left to Right */}
          <div className="logo-marquee w-full">
            <div className="logo-track-ltr">
              {[...row1, ...row1, ...row1].map((p, index) => (
                <div
                  key={`${p.name}-r1-${index}`}
                  className="logo-item flex items-center justify-center"
                >
                  <div className="logo-white-card">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      fill
                      className="logo-white-card-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="fade" delay={300}>
          {/* Row 2: Right to Left */}
          <div className="logo-marquee w-full">
            <div className="logo-track-rtl">
              {[...row2, ...row2, ...row2].map((p, index) => (
                <div
                  key={`${p.name}-r2-${index}`}
                  className="logo-item flex items-center justify-center"
                >
                  <div className="logo-white-card">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      fill
                      className="logo-white-card-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="fade" delay={400}>
          {/* Row 3: Left to Right */}
          <div className="logo-marquee w-full">
            <div className="logo-track-ltr">
              {[...row3, ...row3, ...row3].map((p, index) => (
                <div
                  key={`${p.name}-r3-${index}`}
                  className="logo-item flex items-center justify-center"
                >
                  <div className="logo-white-card">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      fill
                      className="logo-white-card-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 flex justify-center relative z-20">
        <ScrollReveal direction="up" delay={500}>
          <a
            href="#"
            className={`${buttonVariants({
              variant: "outline",
              size: "lg",
            })} rounded-xl px-7 py-3.5 h-auto font-medium hover:bg-card border-border/80 hover:border-primary/50 transition-all duration-300 group`}
          >
            See Placement Reports
            <ArrowUpRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
