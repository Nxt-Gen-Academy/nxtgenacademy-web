"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LiaLinkedin, LiaInstagram, LiaYoutube } from "react-icons/lia";

export default function Footer() {

  return (
    <footer className="w-full bg-background pt-4 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
      {/* Full-width Floating Solid Primary Footer Card sticking to sides with uniform margin */}
      <div className="w-full rounded-2xl sm:rounded-3xl bg-primary text-white border border-primary/20 shadow-xl relative p-8 sm:p-12 lg:p-16">
        
        {/* ── Top Centered Brand Logo ── */}
        <div className="flex flex-col items-center justify-center mb-12 sm:mb-16 border-b border-white/20 pb-10">
          <Link href="/" className="inline-flex items-center gap-3.5 group">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
              <Image
                src="/logo.png"
                alt="NxtGen Academy"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-white/80 transition-colors">
              NxtGen Academy
            </span>
          </Link>
        </div>

        {/* ── Main Footer Grid (Left Newsletter + Right Multi-Column Navigation) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-14 border-b border-white/20">
          
          {/* Left Column: Heading + Description + Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3">
                Better Together.
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-lg">
                A premium, outcome-driven learning ecosystem designed to engineer your transition into high-growth tech careers.
              </p>
            </div>

            {/* Social Links Icons */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/nxtgenacademy-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <LiaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/nxtgen.academy.ai?igsh=MThjb3NmdXB6YzNsaA=="
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-xs"
                aria-label="Instagram"
              >
                <LiaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@nxtgenacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all shadow-xs"
                aria-label="YouTube"
              >
                <LiaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Column Links */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            
            {/* Upper Links Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Column 1: Programs */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-4 font-semibold">
                  Programs
                </h4>
                <ul className="space-y-3 text-sm text-white">
                  <li>
                    <Link href="/#programs" className="hover:text-white/80 hover:underline transition-colors">
                      Business Analytics
                    </Link>
                  </li>
                  <li>
                    <Link href="/#programs" className="hover:text-white/80 hover:underline transition-colors">
                      Data Analytics
                    </Link>
                  </li>
                  <li>
                    <Link href="/#programs" className="hover:text-white/80 hover:underline transition-colors">
                      Product Management
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Company */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-4 font-semibold">
                  Company
                </h4>
                <ul className="space-y-3 text-sm text-white">
                  <li>
                    <Link href="/#why" className="hover:text-white/80 hover:underline transition-colors">
                      Why Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/#faculty" className="hover:text-white/80 hover:underline transition-colors">
                      Faculty
                    </Link>
                  </li>
                  <li>
                    <Link href="/#projects" className="hover:text-white/80 hover:underline transition-colors">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="/#alumni" className="hover:text-white/80 hover:underline transition-colors">
                      Alumni
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Social & Media */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-4 font-semibold">
                  Follow
                </h4>
                <ul className="space-y-3 text-sm text-white">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/nxtgenacademy-ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/80 hover:underline transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/nxtgen.academy.ai?igsh=MThjb3NmdXB6YzNsaA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/80 hover:underline transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@nxtgenacademy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/80 hover:underline transition-colors"
                    >
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Lower Links Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/20">
              
              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-3 font-semibold">
                  Contact
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white">
                  <li>
                    <a href="mailto:info@nxtgenacademy.co.in" className="hover:text-white/80 hover:underline transition-colors block break-all">
                      info@nxtgenacademy.co.in
                    </a>
                  </li>
                  <li>
                    <a href="tel:+919116205994" className="hover:text-white/80 hover:underline transition-colors block">
                      +91 91162 05994
                    </a>
                  </li>
                  <li className="text-xs text-white/90 leading-relaxed pt-1">
                    SAS Tower, Bay, Unit 309, Tower-A of Eleven, Medicity, Sector 38, Gurugram, Haryana 122001
                  </li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-3 font-semibold">
                  Legal
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white">
                  <li>
                    <Link href="/privacy" className="hover:text-white/80 hover:underline transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white/80 hover:underline transition-colors">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/intellectual-property" className="hover:text-white/80 hover:underline transition-colors">
                      Intellectual Property
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund" className="hover:text-white/80 hover:underline transition-colors">
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>

        {/* ── Bottom Section (Copyright + Legal Notice) ── */}
        <div className="pt-8 flex flex-col items-start gap-4">
          
          {/* Copyright */}
          <div className="text-xs sm:text-sm text-white/90 font-medium">
            © {new Date().getFullYear()} NxtGen Academy™ · All Rights Reserved.
          </div>

          {/* Bordered IP Disclaimer Box */}
          <div className="border border-white/25 rounded-xl p-3.5 max-w-xl bg-white/10">
            <p className="text-[10px] sm:text-[11px] leading-relaxed text-white/90">
              *All original website content, text, graphics, designs, and code are protected by applicable intellectual property and copyright laws. No part of this website may be reproduced without prior written permission.
            </p>
            <div className="mt-1 text-[11px] font-mono text-white">
              Website:{" "}
              <a
                href="https://www.nxtgenacademy.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline font-semibold hover:text-white/80"
              >
                www.nxtgenacademy.co.in
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
