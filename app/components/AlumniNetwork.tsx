"use client";

import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import testimonials from "./nxtgen_testimonials.json";

export default function AlumniNetwork() {
  // We have exactly 10 unique testimonials.
  // Row 1 (moving left) uses first 5 testimonials, Row 2 (moving right) uses last 5 testimonials.
  const row1Items = testimonials.slice(0, 5);
  const row2Items = testimonials.slice(5, 10);

  const renderCard = (item: typeof testimonials[0], key: string) => (
    <div
      key={key}
      className="w-[300px] sm:w-[340px] flex-shrink-0 bg-card/40 backdrop-blur-sm rounded-lg md:rounded-xl p-6 border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-border hover:bg-card/60"
    >
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: item.rating }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-star fill-amber-400 text-amber-400"
            aria-hidden="true"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
        ))}
      </div>
      <p className="text-foreground/90 text-sm leading-relaxed mb-6 min-h-[80px]">
        “{item.quote}”
      </p>
      <div className="flex gap-3 pt-6 border-t border-border/50">
        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
          <img
            alt={item.name}
            loading="lazy"
            width="40"
            height="40"
            className="object-cover h-full w-full"
            src={item.image}
          />
        </div>
        <div className="">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-heading font-semibold text-foreground truncate">
              {item.name}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {item.role}, {item.company}
            </p>
          </div>
        </div>
      </div>
      <div className="self-start mt-3">
        <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded whitespace-nowrap">
          {item.tag}
        </span>
      </div>
    </div>
  );

  return (
    <section id="alumni" className="py-16 md:py-24 bg-background overflow-hidden relative">
      {/* Background Enhancements to match existing website design system */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="section-divider" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 mb-12">
        <SectionHeading
          eyebrow="Student Testimonials"
          title="What Our learners Say About NxtGen Academy"
          subtitle="Real stories from professionals who transformed their careers through our programs."
          align="center"
        />
      </div>

      {/* Row 1: Left moving marquee */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling track container (no container gaps, using half-width translation) */}
        <div className="flex animate-marquee-left hover:[animation-play-state:paused]">
          {/* Loop 1: First 5 cards (with right margin padding equal to standard card gaps) */}
          <div className="flex gap-6 flex-shrink-0 pr-6">
            {row1Items.map((item, idx) => renderCard(item, `row1-loop1-${idx}`))}
          </div>
          {/* Loop 2: Duplicate 5 cards to provide the seamless reset loop */}
          <div className="flex gap-6 flex-shrink-0 pr-6">
            {row1Items.map((item, idx) => renderCard(item, `row1-loop2-${idx}`))}
          </div>
        </div>
      </div>

      {/* Row 2: Right moving marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling track container (no container gaps, using half-width translation) */}
        <div className="flex animate-marquee-right hover:[animation-play-state:paused]">
          {/* Loop 1: First 5 cards */}
          <div className="flex gap-6 flex-shrink-0 pr-6">
            {row2Items.map((item, idx) => renderCard(item, `row2-loop1-${idx}`))}
          </div>
          {/* Loop 2: Duplicate 5 cards */}
          <div className="flex gap-6 flex-shrink-0 pr-6">
            {row2Items.map((item, idx) => renderCard(item, `row2-loop2-${idx}`))}
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <ScrollReveal direction="up" delay={100} duration={500}>
          <div className="bg-card/30 rounded-lg md:rounded-xl border border-border/50 py-8 px-6 backdrop-blur-sm shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border/50">
              <div className="text-center">
                <p className="font-heading font-semibold text-foreground text-3xl md:text-4xl mb-1">
                  <span>800+</span>
                </p>
                <p className="text-muted-foreground text-sm">Alumni Placed</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-semibold text-foreground text-3xl md:text-4xl mb-1">
                  <span>95%</span>
                </p>
                <p className="text-muted-foreground text-sm">Placement Rate</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-semibold text-foreground text-3xl md:text-4xl mb-1">
                  <span>150+</span>
                </p>
                <p className="text-muted-foreground text-sm">Hiring Partners</p>
              </div>
              <div className="text-center">
                <p className="font-heading font-semibold text-foreground text-3xl md:text-4xl mb-1">
                  <span>72%</span>
                </p>
                <p className="text-muted-foreground text-sm">Avg. Salary Hike</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
