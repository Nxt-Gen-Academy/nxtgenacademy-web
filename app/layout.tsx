import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const displayFont = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NxtGen Academy | Engineering Tech Careers",
  description: "Invest in your future with transparent pricing and outcome-driven programs tailored to your learning needs and career goals. Build an investor-grade portfolio.",
  metadataBase: new URL("https://nxtgenacademy.com"),
  openGraph: {
    title: "NxtGen Academy | Premium Tech Education",
    description: "Accelerate your career with our flagship programs in Analytics, AI, and Product Management.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NxtGen Academy",
    description: "Accelerate your career with our flagship programs in Analytics, AI, and Product Management.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
