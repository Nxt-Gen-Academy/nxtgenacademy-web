import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function RefundPage() {
  return (
    <div className="bg-background text-foreground noise min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
        <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-heading font-medium leading-[1.05] mb-4 text-foreground tracking-tight">
          Refund Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-12">
          Last updated: June 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed text-sm md:text-base">
          <p className="text-foreground font-medium">
            At NxtGen Academy, we strive to provide high-quality training and support.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Registration Fee
            </h2>
            <p>
              Registration fees are non-refundable once enrollment is confirmed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Course Fee Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refund requests made within 7 days of enrollment and before accessing course content may be considered.</li>
              <li>Once classes have started, course materials have been accessed, or recordings have been provided, no refund will be issued.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              EMI Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>EMI commitments remain applicable according to the agreed payment schedule.</li>
              <li>Failure to attend classes does not qualify for a refund or EMI cancellation.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Cancellation by NxtGen Academy
            </h2>
            <p>
              If a course is canceled by NxtGen Academy and no alternative batch is offered, eligible students will receive a refund.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Processing Time
            </h2>
            <p>
              Approved refunds will be processed within 7–14 business days through the original payment method.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-heading font-medium text-foreground border-b border-border/50 pb-2 tracking-tight">
              Contact
            </h2>
            <p>
              For refund-related queries, email{" "}
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
