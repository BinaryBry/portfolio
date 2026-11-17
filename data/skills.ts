import type { SkillGroup } from "@/lib/types";

/**
 * `usedIn` = where you actually used it (shown next to the skill).
 * `learning: true` = foundations / currently learning (shown with an open dot).
 * Move a skill out of "learning" once you've used it in a project.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", usedIn: ["CareerPilot"] },
      { name: "Java", usedIn: ["Code Warriors", "Deal or No Deal", "JavaFX apps"] },
      { name: "JavaScript", usedIn: ["Deal or No Deal (original)"] },
      { name: "SQL", usedIn: ["CareerPilot"] },
      { name: "HTML / CSS", usedIn: ["CareerPilot"] },
      { name: "C++", learning: true },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Flask", usedIn: ["CareerPilot"] },
      { name: "Flask-SQLAlchemy", usedIn: ["CareerPilot"] },
      { name: "Jinja2", usedIn: ["CareerPilot"] },
      { name: "Bootstrap", usedIn: ["CareerPilot"] },
      { name: "JavaFX", usedIn: ["Deal or No Deal", "JavaFX apps"] },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub" },
      { name: "Linux", usedIn: ["Microsoft mentorship"] },
      { name: "Bash", usedIn: ["Microsoft mentorship"] },
      { name: "SQLite", usedIn: ["CareerPilot"] },
      { name: "VS Code" },
    ],
  },
  {
    title: "Security",
    skills: [
      { name: "Threat modeling", learning: true },
      { name: "Secure coding", learning: true },
      { name: "Linux hardening", learning: true },
      { name: "Incident response lifecycle", learning: true },
      { name: "MFA & password hygiene", learning: true },
    ],
  },
  {
    title: "Concepts",
    skills: [
      { name: "Object-oriented programming", usedIn: ["Code Warriors", "JavaFX apps"] },
      { name: "Event-driven programming", usedIn: ["JavaFX apps"] },
      { name: "Data structures & algorithms" },
      { name: "Full-stack web development", usedIn: ["CareerPilot"] },
    ],
  },
];
