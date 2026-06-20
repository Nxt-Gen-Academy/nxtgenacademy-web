"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Nav() {
  const { data: session } = authClient.useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section tracking
      const sections = ["programs", "why", "projects", "pricing", "faq"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#programs", label: "Programs" },
    { href: "#why", label: "Why Us" },
    { href: "#projects", label: "Projects" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? "pt-2" : "pt-4"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`transition-all duration-300 rounded-2xl px-5 py-3 flex items-center justify-between ${
            isScrolled 
              ? "glass shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-background/70" 
              : "bg-transparent"
          }`}>
            <a href="#top" className="flex items-center gap-2 group">
              <div className="rounded-lg grid place-items-center transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="logo" width={100} height={100} priority />
              </div>
            </a>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`nav-link-underline transition-colors hover:text-foreground ${
                    activeSection === link.href.substring(1) ? "text-foreground active" : ""
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              {session?.user && (
                <a
                  href="/dashboard"
                  className={`${buttonVariants({ variant: "outline" })} rounded-xl px-5 py-2.5 h-auto text-sm font-medium hover:bg-primary hover:text-primary-foreground border-border/80 transition-all hidden sm:flex`}
                >
                  Go to Dashboard
                </a>
              )}
              <a
                href="#cta"
                className={`${buttonVariants()} rounded-xl bg-foreground text-background px-5 py-2.5 h-auto text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_oklch(0.62_0.22_258/0.4)] transition-all group/button border-0 hidden sm:flex`}
              >
                Apply{" "}
                <ArrowUpRight className="h-4 w-4 ml-1 group-hover/button:rotate-45 transition-transform" />
              </a>
              
              <button 
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 md:hidden">
          <nav className="flex flex-col gap-6 text-lg font-medium">
            {session?.user && (
              <a 
                href="/dashboard" 
                className="border-b border-border/50 pb-4 text-primary font-semibold hover:text-primary-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Go to Dashboard
              </a>
            )}
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="border-b border-border/50 pb-4 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className={`${buttonVariants({ size: "lg" })} mt-4 w-full rounded-xl`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
