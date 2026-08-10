import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

const accreditations = [
  { name: "DPIIT #startupindia", src: "/accreditations/dpiit.png" },
  { name: "nasscom", src: "/accreditations/nasscom.png" },
  { name: "AICTE", src: "/accreditations/aicte.png" },
  { name: "Ministry of Electronics", src: "/accreditations/meity.png" },
  { name: "IABAC", src: "/accreditations/iabac.png" },
  { name: "G20", src: "/accreditations/g20.webp" },
  { name: "Ministry of Education", src: "/accreditations/moe.png" },
  { name: "STPI", src: "/accreditations/stpi.png" },
  { name: "Sayuj", src: "/accreditations/sayuj.png" },
  { name: "National Internship Portal", src: "/accreditations/nip.png" },
];

export default function Accreditations() {
  return (
    <section id="accreditations" className="py-24 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeading
          eyebrow="Our Accreditations"
          title="Recognized By Industry Leaders"
          subtitle="Backed by the most prestigious organizations and government bodies in the technology and education sectors."
          align="center"
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {accreditations.map((item, idx) => (
            <ScrollReveal key={item.name} direction="up" delay={idx * 100}>
              <div
                className="group flex flex-col items-center justify-center h-28 sm:h-32 px-6 py-4 rounded-2xl bg-white/95 border border-white/10 shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:bg-white transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle inner shadow to give depth to the white card */}
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] pointer-events-none rounded-2xl" />
                
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={item.src} 
                    alt={item.name}
                    fill
                    className="object-contain filter opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
