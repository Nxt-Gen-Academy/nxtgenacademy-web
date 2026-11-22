import Nav from "../components/Nav";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intellectual Property Notice | NxtGen Academy",
  description: "Intellectual property guidelines, trademark notices, and copyright protections for NxtGen Academy materials.",
};

export default function IntellectualPropertyPage() {
  return (
    <div className="bg-background text-foreground noise min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
        <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-heading font-medium leading-[1.05] mb-4 text-foreground tracking-tight">
          Intellectual Property Notice
        </h1>
        <p className="text-muted-foreground text-sm mb-12">
          Last updated: June 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed text-sm md:text-base">
          <p className="text-foreground font-medium">
            All original content, graphics, designs, photographs, videos, educational materials, project documentation, curriculum architectures, and software code on this website and in NxtGen Academy cohorts are protected by applicable intellectual property laws.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              1. Ownership of Materials
            </h2>
            <p>
              Unless otherwise indicated, all learning curriculum, cohort recordings, live session lectures, case study datasets, assessment rubrics, proprietary tools, and website branding belong exclusively to NxtGen Academy™ and its licensors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              2. Permitted Use for Learners
            </h2>
            <p>
              Enrolled students and alumni are granted a non-exclusive, non-transferable, revocable individual license to access learning materials strictly for personal educational and career advancement purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              3. Restrictions and Prohibitions
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Unauthorised copying, reproduction, distribution, scraping, or commercial use is prohibited without prior written permission, except as permitted by law.</li>
              <li>You may not resell, sublicense, publicly host, mirror, or repackage any course videos, presentations, or assignments.</li>
              <li>Automated extraction, training of commercial AI models on proprietary course transcripts, and reverse-engineering of platform assets are strictly prohibited.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              4. Trademarks
            </h2>
            <p>
              &ldquo;NxtGen Academy&rdquo;, the NxtGen Academy logo, &ldquo;Get Hired™&rdquo;, and associated marks are trademarks of NxtGen Academy. They may not be used in connection with any product or service not authorized by NxtGen Academy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              5. Reporting Infringement &amp; Permissions
            </h2>
            <p>
              To request licensing permissions or report suspected copyright/trademark infringement, please contact our legal team at{" "}
              <a href="mailto:info@nxtgenacademy.co.in" className="text-primary hover:underline font-medium">
                info@nxtgenacademy.co.in
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
