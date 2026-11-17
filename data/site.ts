import { todo, type Content } from "@/lib/types";

/**
 * Everything personal that appears in more than one place lives here.
 * Edit this file to update your links, email, and resume everywhere at once.
 */
export const site = {
  name: "Bryant Clarke",
  firstName: "Bryant",
  role: "Computer Science Student",
  focus: ["Software Engineering", "Cybersecurity", "AI"],
  school: "North Carolina A&T State University",
  schoolShort: "NC A&T",
  classYear: "2029",
  hometown: "Charlotte, NC",
  campus: "Greensboro, NC",

  // Hero copy
  headline: "I build practical software",
  headlineSecond: "and learn how to keep it secure.",
  intro:
    "I'm a computer science student at NC A&T building full-stack apps in Python, Java, and JavaScript, with a growing focus on cybersecurity and AI.",
  seeking:
    "I'm currently seeking Summer 2027 opportunities in Software Engineering, Cybersecurity, and AI.",

  // Contact. Email + LinkedIn come from your resume.
  email: "abclarke3003@gmail.com",
  linkedin: "https://www.linkedin.com/in/bryant-clarke",
  github: "https://github.com/BinaryBry" as Content,

  // Drop a new PDF into /public with this name to update it everywhere.
  resume: "/Bryant-Clarke-Resume.pdf",

  // On Vercel this is your production address automatically (custom domain if you add one).
  // Set NEXT_PUBLIC_SITE_URL to override it.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  headshot: {
    src: "/images/bryant-clarke-headshot.jpg",
    alt: "Portrait of Bryant Clarke in a navy suit and gold tie",
  },
} as const;

export const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
