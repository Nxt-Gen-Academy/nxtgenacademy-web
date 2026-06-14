"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const qs = [
  {
    q: "What is NxtGen Academy?",
    a: [
      "NxtGen Academy is a modern, outcome-driven learning platform designed to help students, freshers, and working professionals build strong, industry-ready tech and business skills.",
      "We are not a traditional coaching center — we are a career transformation ecosystem that combines live training, personalized mentorship, real projects, and structured placement support so learners can confidently move into high-paying roles in AI, analytics, product management, and more.",
    ],
  },
  {
    q: "Who are we?",
    a: [
      "We are a team of experienced mentors, industry trainers, hiring experts, and learning architects who have worked with top companies, product-based teams, and real-world IT environments.",
      "Our approach is simple:\n✔ Teach the exact skills companies want\n✔ Provide consistent mentor guidance\n✔ Build job-ready portfolios\n✔ Prepare students for technical + HR interviews\n✔ Support them until they secure the right offer",
      "We believe education should be practical, personalized, and career-focused — not generic or overwhelming.",
    ],
  },
  {
    q: "How do I know which program is right for me?",
    a: [
      "Choosing a course depends on your background, learning speed, and long-term career goals.",
      "You don't need to guess — our senior counselors first understand your current skills, education, work history, and interests, then guide you with a personalized roadmap so you don't make the wrong investment.",
    ],
  },
  {
    q: "I am totally new to tech. Will I be able to understand your programs?",
    a: [
      "Yes. Every program begins from absolute basics and requires no prior coding or technical experience.",
      "Even students from B.Com, BA, hotel management, operations, sales, and BPO backgrounds successfully transition into tech roles because we teach step-by-step with real-time guidance.",
    ],
  },
  {
    q: "How practical are your classes? Are they just theory or real hands-on work?",
    a: [
      "Our classes focus 80% on practical work — real datasets, real projects, real tools, real case studies.",
      "We don't rely on slides or dry lectures. You learn exactly what companies expect in interviews and on the job.",
    ],
  },
  {
    q: "What kind of mentorship will I get?",
    a: [
      "Every learner gets exclusive mentor support, including 1-on-1 guidance, doubt-clearing sessions, weekly progress check-ins, resume and project reviews, and interview simulations.",
      "It's not a self-paced \"watch videos and manage on your own\" model — we stay with you throughout your journey.",
    ],
  },
  {
    q: "How do I know your training is actually job-oriented?",
    a: [
      "Our curriculum is designed with input from working professionals at top companies, updated regularly, and based on real interview trends, hiring patterns, and industry tools.",
      "We teach only what companies genuinely expect — nothing outdated or unnecessary.",
    ],
  },
  {
    q: "What makes NxtGen Academy different from other edtech platforms?",
    a: [
      "We don't offer generic videos. We offer real-time projects, practical tool mastery, continuous mentorship, portfolio building, complete placement support, and personalized skill tracking.",
      "This gives you the same environment top institutions provide, but in a more personal and outcome-driven format.",
    ],
  },
  {
    q: "How do your placements work?",
    a: [
      "Placement support includes ATS-compliant resume building, LinkedIn optimization, mock HR rounds, technical interview practice, portfolio and GitHub building, interview shortlisting, hiring partner access, and alumni referrals.",
      "This ensures you are not just \"informed\" but actually job-ready. Our graduates have been placed at companies with packages going up to 48 LPA.",
    ],
  },
  {
    q: "How long will it take for me to become job-ready?",
    a: [
      "It depends on your background and learning consistency. Freshers typically take 5–8 months, while working professionals may take slightly less since they already understand workflows.",
      "We give you a personalized timeline in your very first counseling call.",
    ],
  },
  {
    q: "Is the certificate globally recognised?",
    a: [
      "Yes. Our certificates are accepted by companies worldwide and aligned with industry-recognised standards, making them valuable for your resume and LinkedIn profile.",
    ],
  },
  {
    q: "What if I am working full-time? Can I still manage classes?",
    a: [
      "Absolutely. Our live classes are scheduled in flexible timings and recordings are provided.",
      "Even working professionals in night shifts or rotational shifts manage the program easily with mentor support.",
    ],
  },
  {
    q: "What if I miss classes or fall behind?",
    a: [
      "You get recorded sessions, mentor support, revision classes, and practice tasks.",
      "Even if you fall behind due to exams, family issues, or work pressure, we help you get back on track without stress.",
    ],
  },
  {
    q: "How do I trust the job support? Many edtech platforms promise but don't deliver.",
    a: [
      "We don't promise blindly — we set clear, realistic, step-by-step job milestones, track your progress, and only then push you into interviews.",
      "You're guided until you secure an opportunity, backed by our alumni network of 1,500+ placed students, 800+ hiring partners, and dedicated career experts.",
    ],
  },
  {
    q: "Do you help with communication skills too?",
    a: [
      "Yes. You get support for HR interview answering, communication polishing, project explanation, storytelling, and confidence building.",
      "Companies evaluate communication heavily — and we prepare you thoroughly.",
    ],
  },
  {
    q: "What if I come from a non-technical or career-break background?",
    a: [
      "No problem at all. Many of our top-performing students were non-tech graduates, homemakers, BPO employees, or had career gaps.",
      "We teach from the foundation and help you connect your past experience with your new tech skills.",
    ],
  },
  {
    q: "What salary can I expect after course completion?",
    a: [
      "Your salary depends on role, location, and your preparation consistency.",
      "Freshers usually get 3–6 LPA, while experienced professionals switching domains can achieve 30–60% salary growth within their first role. Our highest placed package has been 48 LPA.",
    ],
  },
  {
    q: "Will I get lifetime access to materials, notes, and recordings?",
    a: [
      "Yes, you get lifetime access to notes, recordings, resources, interview materials, and tools — so you can revise anytime, even after getting placed.",
    ],
  },
  {
    q: "What if I want to switch roles later? Do you support that too?",
    a: [
      "Yes. Even after completing the program, you can attend refresher sessions, ask doubts, and get guidance when preparing for your next job switch.",
    ],
  },
  {
    q: "Does your program really work for people who failed earlier in other institutes?",
    a: [
      "Yes — many of our successful students previously struggled with YouTube tutorials, recorded-only courses, other edtech platforms, and self-study attempts.",
      "We fix your fundamentals from scratch and then build your confidence step-by-step with real practice.",
    ],
  },
  {
    q: "Do I need a strong laptop or expensive setup?",
    a: [
      "No. A normal laptop with basic specifications is enough.",
      "We help you set up every tool, software, and environment during the first few sessions.",
    ],
  },
  {
    q: "Is there a job guarantee with NxtGen Academy?",
    a: [
      "Yes! NxtGen Academy offers a Legal Job Guarantee Program — a clear, written agreement that guarantees real placement opportunities upon successful completion of the program.",
      "This isn't just a verbal promise; it's a legally binding commitment. If you complete the curriculum, build your portfolio, and engage with the placement process, we guarantee you'll land a relevant role.",
    ],
  },
  {
    q: "Is there any age limit to learn or start a career in tech?",
    a: [
      "No. We have successful learners aged 18 to 43 — freshers, graduates, career-break professionals, single parents, and senior working professionals — all transitioning into strong tech roles.",
    ],
  },
];

const INITIAL_VISIBLE = 6;

export default function FAQ() {
  const [showAll, setShowAll] = useState(false);

  const visibleQs = showAll ? qs : qs.slice(0, INITIAL_VISIBLE);

  return (
    <section id="faq" className="py-32 px-4 relative">
      <div className="section-divider" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          eyebrow="FAQ"
          title="We've answered the most common queries."
          subtitle="Everything you need to know about our programs, placement support, and learning experience — so you can get started with confidence."
        />

        <div className="mt-16 bg-card/20 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-10">
          <Accordion defaultValue={["item-0"]}>
            {visibleQs.map((it, i) => (
              <ScrollReveal key={it.q} direction="up" delay={i * 50}>
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-border/50 last:border-0"
                >
                  <AccordionTrigger className="w-full flex items-center justify-between text-left py-6 font-heading text-lg sm:text-xl font-medium hover:text-primary transition-colors hover:no-underline group">
                    {it.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-8 space-y-4 pr-6">
                    {it.a.map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-line font-medium">
                        {paragraph}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>

        <ScrollReveal direction="up" delay={200}>
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-background hover:bg-card px-8 py-3.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:shadow-[0_8px_30px_-10px_oklch(0.62_0.22_258/0.3)] transition-all duration-300 cursor-pointer"
            >
              {showAll ? "View Less FAQs" : "View All FAQs"}
              <ChevronDown
                className={`h-4 w-4 text-primary transition-transform duration-500 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
