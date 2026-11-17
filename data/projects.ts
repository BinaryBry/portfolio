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
    slug: "code-warriors",
    name: "Code Warriors",
    kicker: "Java strategy simulation",
    tagline: "Autonomous agents with different strategies compete on a grid using rules alone.",
    stage: "built",
    stageLabel: "Java · OOP",
    accent: "violet",
    summary:
      "A grid-based simulation where autonomous agents compete for resources and avoid hazards. Each agent follows a different strategy: Aggressive, Defensive, or Resource Collector.",
    problem:
      "How do you get agents to make sensible decisions in a changing environment using clear, explainable rules, and structure the code so a new strategy can be added without rewriting the simulation?",
    contribution: todo(
      "Confirm: solo or team project? Which parts did you design and write (the agent hierarchy, the strategies, the game loop)?"
    ),
    stack: ["Java"],
    features: [
      "Three agent strategies: Aggressive, Defensive, and Resource Collector",
      "Rule-based decision-making evaluated against the current game state",
      "Resource management and hazard avoidance on a grid",
      "Inheritance and polymorphism so the simulation treats every agent the same way",
    ],
    results: [
      "Every decision is traceable to a rule. There's no machine learning, so you can explain exactly why an agent moved where it did.",
      todo("Add an observation from running it, e.g. which strategy tended to win and why you think that is."),
    ],
    links: {
      github: todo("Add the Code Warriors GitHub repo URL"),
    },
    images: [],
    imageTodo:
      "Add a screenshot or short GIF of the grid mid-game to /public/projects/code-warriors/.",
    glance: [
      { label: "Role", value: todo("Solo or team?") },
      { label: "Focus", value: "Software design + decision logic" },
      { label: "Approach", value: "Rule-based (no ML)" },
    ],
    // VERIFY: written from "inheritance and polymorphism" + three strategies. Adjust names to match your code.
    architecture: [
      {
        title: "One interface, many strategies",
        body: "A shared agent base type defines how an agent decides its next move. Each strategy (Aggressive, Defensive, Resource Collector) overrides that decision. The simulation loop asks every agent for a move without needing to know which kind it is.",
      },
      {
        title: "Decisions from game state",
        body: "Each turn an agent looks at the current state (nearby resources, hazards, other agents) and applies its rules to pick an action. Keeping that evaluation inside the agent keeps the game loop simple.",
      },
      {
        title: "Why it's extensible",
        body: "Adding a fourth strategy means writing one new subclass. The grid, the turn loop, and the other agents don't change.",
      },
    ],
    challenges: [
      {
        challenge: todo("What was hard about making an agent's rules work well, e.g. an agent getting stuck or oscillating between two cells?"),
        approach: todo("How did you change the rules or the evaluation to fix it?"),
      },
      {
        challenge: todo("A design question you had to settle, e.g. what belongs in the base class vs. each strategy."),
        approach: todo("What did you decide and why?"),
      },
    ],
    learned: [
      todo("What this project taught you about inheritance and polymorphism that a textbook example didn't."),
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

  {
    slug: "javafx-collection",
    name: "JavaFX Applications",
    kicker: "Java desktop collection",
    tagline: "Desktop apps built around event-driven programming and object-oriented design.",
    stage: "built",
    stageLabel: "Coursework",
    accent: "violet",
    summary:
      "A collection of Java desktop applications with JavaFX interfaces: a Tic-Tac-Toe game with a computer opponent, the TaskBuddy task manager, and a card game.",
    problem:
      "Desktop apps have to respond to whatever the user does next. These projects are practice in structuring Java code around events, keeping the UI separate from the logic, and designing classes that model the problem cleanly.",
    contribution: todo("Confirm which of these you built individually vs. in a group, and for which course."),
    stack: ["Java", "JavaFX"],
    features: [
      "Event-driven interfaces that respond to clicks and input",
      "Object-oriented design for game and task logic",
      "JavaFX layouts and controls",
    ],
    results: [],
    links: {},
    images: [],
    imageTodo: "Add a screenshot of each app to /public/projects/javafx-collection/.",
    glance: [
      { label: "Type", value: "Coursework" },
      { label: "Focus", value: "Event-driven programming + OOP" },
    ],
    subprojects: [
      {
        name: "Tic-Tac-Toe",
        description: "Play against a computer opponent.",
        concepts: ["Event handling", "Game state", "Computer opponent"],
        github: todo("Repo URL"),
      },
      {
        name: "TaskBuddy",
        description: "A task management application.",
        concepts: ["CRUD", "JavaFX controls", "OOP"],
        github: todo("Repo URL"),
      },
      {
        name: "Card Game",
        description: todo("One line: which card game, and what the player does."),
        concepts: ["Object modeling", "Event handling"],
        github: todo("Repo URL"),
      },
    ],
    architecture: [
      {
        title: "Event-driven structure",
        body: "In JavaFX the program doesn't run top to bottom; it waits. Handlers attached to buttons and controls update the model, and the view refreshes from it.",
      },
      {
        title: "Logic separate from UI",
        body: "Game rules and task data live in their own classes so they can be reasoned about and tested without the interface.",
      },
    ],
    challenges: [
      {
        challenge: todo("How does the Tic-Tac-Toe computer opponent choose its move?"),
        approach: todo("Explain the logic (e.g. win if possible, block if needed, otherwise ...)."),
      },
    ],
    learned: [
      todo("What changed in how you think about program flow once you started writing event-driven code."),
    ],
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
