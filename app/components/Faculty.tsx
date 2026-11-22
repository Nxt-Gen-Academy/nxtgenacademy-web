"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const facultyMembers = [
  {
    name: "Aditya Verma",
    role: "Product Manager",
    image: "/mentors/aditya_verma.jpg",
    company: "Razorpay",
    companyLogo: "/logos/barclays.svg",
  },
  {
    name: "Vishal Sharma",
    role: "Group Product Manager",
    image: "/mentors/vishal_sharma.jpg",
    company: "Zepto",
    companyLogo: "/logos/zepto.svg",
  },
  {
    name: "Rahul Jaiswal",
    role: "SDE III",
    image: "/mentors/rahul_jaisawal.jpg",
    company: "BOSCH",
    companyLogo: "/logos/ducat.svg",
  },
  {
    name: "Rohit Sen",
    role: "Principle Product Manager",
    image: "/mentors/rohit_sen.jpg",
    company: "Adobe",
    companyLogo: "/logos/microsoft.svg",
  },
];

// Repeat so one loop is wider than typical viewports; two identical groups
// then translate exactly -50% with no track gap, so the reset is seamless.
const facultyLoop = [...facultyMembers, ...facultyMembers, ...facultyMembers];

function FacultyCard({ member }: { member: (typeof facultyMembers)[number] }) {
  return (
    <div className="card-hover-primary flex-[0_0_300px] w-[300px] bg-card border border-border/80 rounded-[20px] overflow-hidden flex flex-col cursor-pointer group">
      <div className="w-full h-[240px] overflow-hidden relative">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>
      <div className="p-[25px] relative flex flex-col grow">
        <p className="text-[0.75rem] text-primary uppercase tracking-widest font-semibold mb-1 transition-colors duration-200">
          {member.role}
        </p>
        <h4 className="text-foreground text-[1.3rem] font-bold m-0 mb-2 font-display transition-colors duration-200">
          {member.name}
        </h4>
        <p className="text-muted-foreground text-[0.95rem] font-medium mb-4 transition-colors duration-200">
          {member.company}
        </p>
      </div>
    </div>
  );
}

export default function Faculty() {
  return (
    <section
      id="faculty"
      className="py-16 relative overflow-hidden bg-background"
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

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
            animation: scrollInfinite 40s linear infinite;
        }
        .infinite-carousel-track:hover {
            animation-play-state: paused;
        }
        @keyframes scrollInfinite {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-[100%] mx-auto relative z-10 px-0">
        <div className="text-center mb-12 flex flex-col items-center">
          <SectionHeading
            eyebrow="Introducing the Faculty"
            title={<>Learn From The Best. <span className="text-primary font-medium">Get Hired by the Best.</span></>}
            subtitle="Get mentored directly by active practitioners working at top Multi-National companies."
          />
        </div>

        {/* Carousel Container */}
        <ScrollReveal direction="fade" delay={200}>
          <div className="infinite-carousel-wrapper mt-8 sm:mt-16 relative">
            <div className="infinite-carousel-track">
              <div className="flex shrink-0 gap-[30px] pr-[30px]">
                {facultyLoop.map((member, i) => (
                  <FacultyCard key={`group1-${i}`} member={member} />
                ))}
              </div>
              <div className="flex shrink-0 gap-[30px] pr-[30px]" aria-hidden="true">
                {facultyLoop.map((member, i) => (
                  <FacultyCard key={`group2-${i}`} member={member} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
