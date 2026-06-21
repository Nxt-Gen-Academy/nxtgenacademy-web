import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground noise min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
        <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-heading font-medium leading-[1.05] mb-4 text-foreground tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-muted-foreground text-sm mb-12">
          Last updated: June 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed text-sm md:text-base">
          <p className="text-foreground font-medium">
            Welcome to NxtGen Academy. By accessing our website, enrolling in our courses, or using our services, you agree to comply with these Terms and Conditions.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              1. Course Enrollment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enrollment is confirmed only after successful payment.</li>
              <li>NxtGen Academy reserves the right to modify course content, schedules, trainers, and delivery methods when necessary.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users must provide accurate information during registration.</li>
              <li>Sharing course materials, recordings, login credentials, or proprietary content without permission is strictly prohibited.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              3. Intellectual Property
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All course materials, videos, presentations, and website content are the intellectual property of NxtGen Academy.</li>
              <li>Unauthorized reproduction, distribution, or resale is prohibited.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              4. Certification
            </h2>
            <p>
              Certificates will be issued based on completion criteria defined for each program.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              5. Placement Assistance
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>NxtGen Academy provides placement assistance, career guidance, and interview preparation.</li>
              <li>Job placement is not guaranteed unless explicitly stated in a separate written agreement.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              6. Limitation of Liability
            </h2>
            <p>
              NxtGen Academy shall not be liable for indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              8. Contact Information
            </h2>
            <p>
              For any questions regarding these terms, contact us at{" "}
              <a href="mailto:info@nxtgenacademy.co.in" className="text-primary hover:underline transition-all">
                info@nxtgenacademy.co.in
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
