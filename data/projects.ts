import { todo, type Project } from "@/lib/types";

/**
 * YOUR PROJECTS
 * -------------
 * - Order here = order on the site. The project with `featured: true` gets the big slot.
 * - Anything wrapped in todo("...") is a placeholder: visible locally, hidden when deployed.
 *   Replace it with a real string when you have the answer.
 * - Lines marked VERIFY are written from your resume/brief. Read them and fix anything off.
 * - Screenshots: put files in /public/projects/<slug>/ and list them in `images`.
 *
 * The "challenges" and "learned" prompts double as interview prep. If you can answer
 * them here in two or three sentences, you can answer them out loud.
 */
export const projects: Project[] = [
  {
    slug: "careerpilot",
    name: "CareerPilot",
    kicker: "Full-stack web app · Data + AI",
    tagline: "Tracks every internship application and shows what's actually leading to interviews.",
    stage: "active",
    stageLabel: "In active development",
    featured: true,
    accent: "pink",
    summary:
      "CareerPilot logs each application (company, role, status, date applied, notes) and turns that history into a live dashboard of applications sent, interview rate, and offer rate. Later phases add AI resume feedback, tailored interview questions, and a pattern analyzer that compares outcomes across application types.",
    problem:
      "I kept applying to internships without knowing why some got responses and others didn't. A spreadsheet could hold the list, but it couldn't answer the real question: what's actually working? So I'm building a tool to find out.",
    contribution:
      "I'm designing and building it end to end: the data model, the Flask routes and CRUD workflow, the dashboard calculations, and the Bootstrap interface.",
    stack: ["Python", "Flask", "SQLite", "Flask-SQLAlchemy", "Jinja2", "Bootstrap"],
    features: [
      "Log applications with company, role, status, date applied, and notes",
      "Create, read, update, and delete records through Flask routes with validated form data",
      "Live dashboard: applications sent, interview rate, and offer rate",
      "Organize and filter applications by company, role, and status",
    ],
    planned: [
      "Resume analyzer: upload a PDF or DOCX, extract the text, and get AI feedback on strengths and gaps",
      "Interview coach: tailored interview questions generated from the role and job description",
      'Success Pattern Analyzer: compare outcomes across application types (e.g. Python- vs. Java-focused roles) to surface patterns like "your response rate is 5x higher for Python roles"',
      "LLM integration (OpenAI or Claude API) called from the Flask backend with structured prompts",
    ],
    roadmap: [
      { label: "Tracker + dashboard", current: true },
      { label: "Resume analyzer" },
      { label: "Interview coach" },
      { label: "Success Pattern Analyzer" },
    ],
    results: [
      "Built the tracker and dashboard first, before any AI, so every later feature has real application data to analyze.",
      todo(
        "Add one concrete result: how many of your own applications you track in it, a bug you fixed, or a pattern it showed you."
      ),
    ],
    links: {
      github: "https://github.com/BinaryBry/careerpilot",
      demo: undefined, // Add a deployed URL here if you host it (e.g. Render, Railway, PythonAnywhere)
    },
    images: [],
    imageTodo:
      "Add 2–3 real screenshots to /public/projects/careerpilot/ (dashboard, application list, add/edit form) and list them in `images`.",
    glance: [
      { label: "Role", value: "Solo developer" },
      { label: "Status", value: "Phase 1 of 4: tracker + dashboard" },
      { label: "AI layer", value: "Planned: OpenAI or Claude API" },
      { label: "Type", value: "Personal project" },
    ],
    architecture: [
      {
        title: "CRUD workflow",
        body: "Flask routes handle creating, reading, updating, and deleting applications. Form data is validated, then persisted through Flask-SQLAlchemy models, and Jinja2 renders the result with Bootstrap.",
      },
      {
        title: "Stats are computed, not AI-generated",
        body: "The dashboard and the Success Pattern Analyzer use SQL-style grouping and aggregation: counts and percentages by category. The LLM only turns those results into plain-English insights, so the numbers stay reliable and testable.",
      },
      {
        title: "A schema that grows in phases",
        body: "The data model starts with one Application table and expands to resumes, interview questions, and feedback as features are added, so it grows without a rewrite.",
      },
    ],
    challenges: [
      {
        challenge: todo(
          "A design decision you made, e.g. why the dashboard numbers are computed from the Application table instead of stored, or why the LLM never produces the stats."
        ),
        approach: todo("What did you consider, what did you pick, and why?"),
      },
      {
        challenge: todo(
          "A bug that took a while to find, e.g. interview or offer rate coming out wrong after an edit or delete."
        ),
        approach: todo("How did you track it down, and how do you make sure it doesn't come back?"),
      },
    ],
    learned: [
      todo("One thing you learned about Flask or Flask-SQLAlchemy that you didn't know before this project."),
      todo("One thing you learned about scoping a project, e.g. why you built the tracker before the AI."),
    ],
    next: [
      "Resume analyzer (phase 2)",
      "Unit tests for the dashboard calculations",
      "Deploy a public demo instance",
    ],
  },

  {
    slug: "deal-or-no-deal",
    name: "Deal or No Deal",
    kicker: "Java & JavaFX",
    tagline: "My high school senior project, rebuilt as a Java desktop game.",
    stage: "built",
    stageLabel: "Java · JavaFX",
    accent: "pink",
    summary:
      "Originally created as my high school senior project using Code.org, where I designed the interface and developed the game's mechanics from scratch. In 2026, I revisited the concept and developed an updated take on the original game using Java and JavaFX.",
    problemHeading: "The 2026 version",
    problem:
      "This version introduces a redesigned interface, interactive briefcases, randomized case values, and a dynamic banker offer system while applying object-oriented programming and event-driven development. This project highlights my growth as a developer, combining an original idea with the programming skills and technologies I've learned since high school.",
    contribution:
      "I created the original on Code.org (interface and game mechanics), then revisited the concept and developed the Java and JavaFX version in 2026.",
    stack: ["Java", "JavaFX", "Maven"],
    features: [
      "Interactive briefcases: pick your case, then open the rest",
      "Prize values shuffled into the 26 cases every game",
      "Live prize board that crosses off opened values",
      "Banker offers after each round based on the values still in play",
      "Keep-or-swap decision when two cases remain, plus a New Game reset",
    ],
    results: [],
    links: {
      github: "https://github.com/BinaryBry/deal-or-no-deal",
    },
    images: [],
    imageTodo:
      "Run the game and add screenshots of the case board and the banker's offer to /public/projects/deal-or-no-deal/.",
    glance: [
      { label: "Original", value: "High school senior project (Code.org)" },
      { label: "Rebuilt", value: "2026 in Java & JavaFX" },
      { label: "Focus", value: "Game state + event-driven UI" },
    ],
    architecture: [
      {
        title: "Shuffled values, one source of truth",
        body: "At the start of each game the 26 prize amounts are shuffled into the cases. The opened cases, your chosen case, and the current round live in the app's state, and the board, prize list, and labels all update from it.",
      },
      {
        title: "Round-based banker",
        body: "Rounds open 6, 5, 4, 3, 2, then 1 case at a time. Each offer starts from the average of the values still in play and multiplies it by a percentage that rises every round, so offers get closer to the expected value as the game goes on.",
      },
      {
        title: "Event-driven JavaFX",
        body: "Every briefcase and button is a JavaFX control with its own event handler. The game only advances in response to the player's clicks: choose, open, Deal, No Deal, keep, or swap.",
      },
    ],
    challenges: [
      {
        challenge: todo("What was different about building this in Java/JavaFX compared to the original on Code.org?"),
        approach: todo("What did you change or improve in the rebuild, and why?"),
      },
      {
        challenge: todo("How did you decide the banker's offer formula?"),
        approach: todo("What did you try, and how did you make the offers feel realistic?"),
      },
    ],
    learned: [
      todo("What revisiting your senior project showed you about how much you've grown as a developer."),
    ],
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
