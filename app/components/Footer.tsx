import Image from "next/image";
import Link from "next/link";
import { LiaLinkedin, LiaInstagram, LiaYoutube } from "react-icons/lia";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="rounded-lg bg-transparent">
                <Image src="/logo.png" alt="logo" width={140} height={40} className="h-auto w-[140px]" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed font-medium">
              A premium, outcome-driven learning ecosystem designed to engineer your transition into high-growth tech careers.
            </p>
            
            <div className="mt-8 flex gap-4 relative z-20">
              <a href="https://www.linkedin.com/company/nxtgenacademy-ai/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-muted-foreground hover:bg-white/[0.08] hover:text-primary hover:border-white/20 transition-all shadow-sm">
                <LiaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/nxtgen.academy.ai?igsh=MThjb3NmdXB6YzNsaA==" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-muted-foreground hover:bg-white/[0.08] hover:text-primary hover:border-white/20 transition-all shadow-sm">
                <LiaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-muted-foreground hover:bg-white/[0.08] hover:text-primary hover:border-white/20 transition-all shadow-sm">
                <LiaYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-display font-medium text-foreground mb-6">Programs</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/#programs" className="text-muted-foreground hover:text-primary transition-colors">Business Analytics</Link></li>
              <li><Link href="/#programs" className="text-muted-foreground hover:text-primary transition-colors">Data Analytics</Link></li>
              <li><Link href="/#programs" className="text-muted-foreground hover:text-primary transition-colors">Product Management</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-display font-medium text-foreground mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/#why" className="text-muted-foreground hover:text-primary transition-colors">Why Us</Link></li>
              <li><Link href="/#faculty" className="text-muted-foreground hover:text-primary transition-colors">Faculty</Link></li>
              <li><Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/#alumni" className="text-muted-foreground hover:text-primary transition-colors">Alumni</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display font-medium text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="mailto:info@nxtgenacademy.co.in" className="text-muted-foreground hover:text-primary transition-colors block break-all">
                  info@nxtgenacademy.co.in
                </a>
              </li>
              <li>
                <a href="tel:+919116205994" className="text-muted-foreground hover:text-primary transition-colors block">
                  +91 91162 05994
                </a>
              </li>
              <li className="text-muted-foreground leading-relaxed">
                <span className="text-foreground block mb-1">Address:</span>
                SAS Tower, Bay (former, Unit No. 309, 3rd Floor, Tower-A of Eleven, Medicity, Support Area, Sector 38, Gurugram, Haryana 122001
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 bg-black/40 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">
            © {new Date().getFullYear()} NxtGen Academy. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-medium">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-primary transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
