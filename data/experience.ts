import { todo, type ExperienceItem } from "@/lib/types";

/**
 * EXPERIENCE
 * Order = order on the site. Put new internships, research, or certifications at the TOP.
 *
 * Template for your next role:
 * {
 *   org: "Company",
 *   role: "Software Engineering Intern",
 *   dates: "Summer 2027",
 *   location: "City, ST",
 *   kind: "tech",
 *   points: ["What you built, with a number if you have one."],
 * },
 */
export const experience: ExperienceItem[] = [
  {
    org: "Microsoft",
    role: "Cybersecurity Student, Mentorship Program",
    dates: "Summer 2025",
    location: "On-site",
    kind: "tech",
    points: [
      "Studied threat modeling, secure coding, and incident response fundamentals.",
      "Practiced Linux command-line hardening and wrote simple Bash and Python scripts for basic security tasks.",
      "Completed hands-on labs on password hygiene, multi-factor authentication, and vulnerability awareness.",
      "Learned the incident response lifecycle (detection, containment, recovery) and how to document security events.",
      "Shadowed a Microsoft mentor on-site for a full workday.",
    ],
  },
  {
    org: "Code Ninjas",
    role: "Coding Club Assistant",
    dates: "2023 – 2024",
    location: "Charlotte, NC",
    kind: "mentoring",
    points: [
      "Helped students with Python and Java projects, guiding them through debugging and problem-solving.",
      "Helped build a collaborative, engaging environment for young learners.",
    ],
  },
  {
    org: "After-School Coding Club",
    role: "Volunteer Mentor",
    dates: "2023 – 2024",
    location: "Charlotte, NC",
    kind: "mentoring",
    points: [
      "Helped beginners debug Python programs and understand variables, loops, and functions.",
      "Coached problem-solving strategies and a growth-mindset approach to learning.",
    ],
  },
  {
    org: "Best Buy",
    role: "Sales Associate",
    dates: "2026 – 2027",
    kind: "work",
    points: [],
  },
  {
    org: "New Balance",
    role: "Sales Associate",
    dates: "2026 – 2027",
    kind: "work",
    points: [],
  },
];

/** One honest line about what retail work demonstrates. Edit freely. */
export const retailSummary =
  "Customer-facing retail work: explaining products to people with very different levels of experience, working as part of a team on busy shifts, and solving problems on the spot.";

export const education = {
  school: "North Carolina A&T State University",
  location: "Greensboro, NC",
  degree: "B.S. in Computer Science",
  status: "Expected 2029",
  honors: ["National Technology Honor Society, Member"],
  // VERIFY course details. Add more as you take them.
  coursework: ["COMP 163: Python", "COMP 167: Java, OOP & JavaFX"],
};
