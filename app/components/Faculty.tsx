"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const facultyMembers = [
  {
    name: "Aditya Verma",
    role: "Business analyst",
    image: "/faculty/gladden.png",
    company: "Barclays",
    companyLogo: "/logos/barclays.svg"
  },
  {
    name: "Vishal Sharma",
    role: "Data analyst",
    image: "/faculty/vishal.png",
    company: "Zepto",
    companyLogo: "/logos/zepto.svg"
  },
  {
    name: "Bhavesh Bansal",
    role: "Product manager",
    image: "/faculty/bhavesh.png",
    company: "Appbrew",
    companyLogo: "/logos/appbrew.svg"
  },
  {
    name: "Rahul Jaiswal",
    role: "Associate Product Manager",
    image: "/faculty/rahul.png",
    company: "DUCAT",
    companyLogo: "/logos/ducat.svg"
  },
  {
    name: "Rohit Sen",
    role: "Senior Software Engineer",
    image: "/faculty/rohit.png",
    company: "Microsoft",
    companyLogo: "/logos/microsoft.svg"
  }
];

export default function Faculty() {
  return (
    <section id="faculty" className="py-32 relative overflow-hidden bg-background">
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      
      <div className="section-divider" />

      <style>{`
        .infinite-carousel-wrapper {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 20px 0;
            mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        .infinite-carousel-track {
            display: flex;
            width: max-content;
            gap: 30px;
            animation: scrollInfinite 12s linear infinite;
        }
        .infinite-carousel-track:hover {
            animation-play-state: paused;
        }
        @keyframes scrollInfinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 15px)); }
        }
      `}</style>

      <div className="max-w-[100%] mx-auto relative z-10 px-0">
        <div className="text-center mb-12 flex flex-col items-center">
          <SectionHeading
            eyebrow="Introducing the Faculty"
            title="Learn From The Best. Get Hired from the Best."
            subtitle="Get mentored directly by active practitioners working at top Multi-National companies."
          />
        </div>

        {/* Carousel Container */}
        <ScrollReveal direction="fade" delay={200}>
          <div className="infinite-carousel-wrapper mt-8 sm:mt-16 relative">
            <div className="infinite-carousel-track">
              {/* Group 1 */}
              <div className="flex gap-[30px]">
                {facultyMembers.map((f, i) => (
                  <div key={`group1-${i}`} className="flex-[0_0_300px] w-[300px] bg-slate-900/70 border border-white/10 border-t-white/20 border-l-white/20 backdrop-blur-md rounded-[20px] overflow-hidden transition-all duration-400 ease-in-out flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-teal-400/40 group">
                    <div className="w-full h-[240px] overflow-hidden relative">
                      <Image 
                        src={f.image} 
                        alt={f.name} 
                        fill
                        className="object-cover transition-transform duration-500 ease group-hover:scale-105 blur-md"
                        sizes="300px"
                      />
                    </div>
                    <div className="p-[25px] relative flex flex-col grow">
                      <p className="text-[0.75rem] text-blue-500 uppercase tracking-widest font-semibold mb-1">{f.role}</p>
                      <h4 className="text-white text-[1.3rem] font-bold m-0 mb-2 font-display">{f.name}</h4>
                      <p className="text-slate-400 text-[0.95rem] font-medium mb-4">{f.company}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Group 2 (Clone for infinite scroll) */}
              <div className="flex gap-[30px]" aria-hidden="true">
                {facultyMembers.map((f, i) => (
                  <div key={`group2-${i}`} className="flex-[0_0_300px] w-[300px] bg-slate-900/70 border border-white/10 border-t-white/20 border-l-white/20 backdrop-blur-md rounded-[20px] overflow-hidden transition-all duration-400 ease-in-out flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-teal-400/40 group">
                    <div className="w-full h-[240px] overflow-hidden relative">
                      <Image 
                        src={f.image} 
                        alt={f.name} 
                        fill
                        className="object-cover transition-transform duration-500 ease group-hover:scale-105 blur-md"
                        sizes="300px"
                      />
                    </div>
                    <div className="p-[25px] relative flex flex-col grow">
                      <p className="text-[0.75rem] text-blue-500 uppercase tracking-widest font-semibold mb-1">{f.role}</p>
                      <h4 className="text-white text-[1.3rem] font-bold m-0 mb-2 font-display">{f.name}</h4>
                      <p className="text-slate-400 text-[0.95rem] font-medium mb-4">{f.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
