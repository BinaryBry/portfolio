import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { isFilled } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description = `${site.name} is a computer science student at ${site.school} building practical software with a focus on software engineering, cybersecurity, and AI. Seeking Summer 2027 internships.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Computer Science Student, Software Engineering & Cybersecurity`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    site.name,
    "software engineering intern",
    "cybersecurity intern",
    "computer science student",
    "NC A&T",
    "portfolio",
    "Summer 2027 internship",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name} | Software Engineering · Cybersecurity · AI`,
    description,
    url: "/",
    siteName: site.name,
    images: [{ url: site.headshot.src, width: 800, height: 1000, alt: site.headshot.alt }],
  },
  twitter: {
    card: "summary",
    title: site.name,
    description,
    images: [site.headshot.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  alumniOf: { "@type": "CollegeOrUniversity", name: site.school },
  url: site.url,
  sameAs: [site.linkedin, ...(isFilled(site.github) ? [site.github] : [])],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
