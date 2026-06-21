import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground noise min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
        <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-heading font-medium leading-[1.05] mb-4 text-foreground tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-12">
          Last updated: June 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed text-sm md:text-base">
          <p className="text-foreground font-medium">
            At NxtGen Academy, we respect your privacy and are committed to protecting your personal information.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Educational background</li>
              <li>Professional details</li>
              <li>Payment information (processed securely through payment partners)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              How We Use Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide educational services</li>
              <li>Process enrollments and payments</li>
              <li>Send course updates and notifications</li>
              <li>Offer career and placement support</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your information from unauthorized access, misuse, or disclosure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Information Sharing
            </h2>
            <p>We do not sell or rent personal information to third parties. Information may be shared only:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With authorized service providers</li>
              <li>When required by law</li>
              <li>For placement assistance purposes with your consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Cookies
            </h2>
            <p>
              Our website may use cookies to improve user experience and website performance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Your Rights
            </h2>
            <p>
              You may request access, correction, or deletion of your personal information by contacting us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Contact
            </h2>
            <p>
              For privacy-related inquiries, email{" "}
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
