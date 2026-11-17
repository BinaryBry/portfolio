/**
 * A piece of content that is either real text, or a TODO placeholder.
 *
 * TODOs are visible while you run the site locally (`npm run dev`) so you can
 * see what still needs filling in. On the deployed site they are hidden, and
 * any section that only contains TODOs is hidden too. Nothing invented ships.
 */
export type Todo = { todo: string };
export type Content = string | Todo;

export const todo = (prompt: string): Todo => ({ todo: prompt });

export type Accent = "pink" | "violet";

export interface ProjectLink {
  github?: Content;
  demo?: Content;
  demoLabel?: string;
}

export interface Challenge {
  challenge: Content;
  approach: Content;
}

export interface ArchitectureNote {
  title: string;
  body: string;
}

export interface SubProject {
  name: string;
  description: Content;
  concepts: string[];
  github?: Content;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Small label above the title, e.g. "Full-stack web app" */
  kicker: string;
  /** One line under the title */
  tagline: string;
  /** "active" = still being built, "built" = working version exists */
  stage: "active" | "built";
  stageLabel: string;
  featured?: boolean;
  accent: Accent;
  summary: string;
  problem: string;
  /** Heading for the `problem` section on the project page. Defaults to "The problem". */
  problemHeading?: string;
  contribution: Content;
  stack: string[];
  /** Things that work today */
  features: string[];
  /** Things that do not exist yet. Always shown separately and labeled "Planned". */
  planned?: string[];
  /** Development phases, in order. `current` marks where you are now. */
  roadmap?: { label: string; current?: boolean; done?: boolean }[];
  results: Content[];
  links: ProjectLink;
  /** Real screenshots or GIFs in /public/projects. Leave empty until you have them. */
  images: ProjectImage[];
  /** What a screenshot should show, displayed as a TODO until `images` has entries. */
  imageTodo?: string;
  /** Short facts shown in the "At a glance" panel on the project page */
  glance: { label: string; value: Content }[];
  architecture: ArchitectureNote[];
  challenges: Challenge[];
  learned: Content[];
  next?: string[];
  subprojects?: SubProject[];
}

export interface Skill {
  name: string;
  /** Project slugs (or other evidence like "Microsoft mentorship") where you actually used it */
  usedIn?: string[];
  /** true = still learning / foundations only */
  learning?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface ExperienceItem {
  org: string;
  role: Content;
  dates: Content;
  location?: string;
  kind: "tech" | "mentoring" | "work";
  summary?: string;
  points: Content[];
}
