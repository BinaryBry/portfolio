# Bryant Clarke: Portfolio

Personal portfolio built with **Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide**.

- Home page: hero, featured project (with a working CareerPilot demo), other projects, about, skills, experience, contact
- A dedicated case-study page for every project at `/projects/[slug]`
- All content lives in `/data`, so you can update the site without touching components
- No backend, no database

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands:

```bash
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run typecheck  # TypeScript only
```

## 2. Deploy to Vercel (free)

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. No settings needed.
3. That's it. Link previews, `sitemap.xml`, and `robots.txt` automatically use your Vercel address
   (or your custom domain, once you add one). To force a specific URL, set `NEXT_PUBLIC_SITE_URL`.

---

## 3. How the TODO placeholders work

Anything I didn't know for certain is written as `todo("...")` in the data files.

| Where | What you see |
|---|---|
| `npm run dev` (your machine) | Dashed amber **TODO** notes, so you can see what's missing |
| Deployed site | TODOs are **hidden**, and sections that only contain TODOs disappear |

So the live site never shows placeholder text or anything made up. To preview TODOs on a deployed
build (e.g. a private preview), set `NEXT_PUBLIC_SHOW_TODOS=true`.

To fill one in, replace `todo("...")` with a plain string:

```ts
// before
contribution: todo("Confirm: solo or team project?"),
// after
contribution: "Solo project. I designed the agent hierarchy and wrote all three strategies.",
```

Lines marked `// VERIFY` were written from your resume and brief. Read them and fix anything that's off.

---

## 4. Editing content

| File | What's in it |
|---|---|
| `data/site.ts` | Name, headline, intro, email, LinkedIn, **GitHub**, resume path |
| `data/projects.ts` | Every project: problem, contribution, features, planned features, architecture, challenges, results, what you learned, links, screenshots |
| `data/skills.ts` | Skill groups, where each skill was used, and which ones you're still learning |
| `data/experience.ts` | Experience timeline, retail roles, education, honors, coursework |
| `data/about.ts` | About Me paragraphs, interests, and the photo caption |

**Add a project:** copy one of the objects in `data/projects.ts`, give it a new `slug`, and it gets a card on
the home page and its own page automatically. Set `featured: true` on the one that should get the big slot.

**Add screenshots:** put images in `public/projects/<slug>/`, then:

```ts
images: [
  { src: "/projects/careerpilot/dashboard.png", alt: "CareerPilot dashboard showing interview and offer rates" },
],
```

**Add an internship (the good part):** add an entry at the top of `experience` in `data/experience.ts`.
There's a template in the comment at the top of that file.

**Update your resume:** replace `public/Bryant-Clarke-Resume.pdf` with a new PDF of the same name.
Note: the current PDF includes your phone number. Since the site is public, consider removing it from
the web version.

**Change your photos:** replace `public/images/bryant-clarke-headshot.jpg` (4:5 ratio) and
`public/images/bryant-lenovo.jpg`.

---

## 5. Checklist before you share the link

- [ ] GitHub profile URL in `data/site.ts`
- [ ] GitHub repo URLs for CareerPilot, Code Warriors, and the JavaFX apps
- [ ] Code.org share link for Deal or No Deal
- [ ] 2–3 real CareerPilot screenshots
- [ ] Answer the **Challenges** and **What I learned** prompts for each project (great interview prep)
- [ ] Confirm solo/team for Code Warriors and the JavaFX apps
- [ ] Best Buy and New Balance role titles and dates
- [ ] Read the About section out loud and change anything that doesn't sound like you

---

## 6. Project structure

```
app/
  layout.tsx              fonts, SEO metadata, JSON-LD, nav + footer
  page.tsx                home page (composes the sections)
  projects/[slug]/page.tsx  case-study pages (statically generated)
  globals.css             Tailwind v4 theme: colors, fonts, utilities
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
components/
  layout/                 Navbar (scroll-spy, mobile menu), Footer
  sections/               Hero, Projects, About, Skills, Experience, Contact
  projects/               CareerPilotDemo, ProjectDetail, ProjectArt, ProjectLinks
  hero/AgentGrid.tsx      the animated grid behind the hero (a nod to Code Warriors)
  ui/                     Button, Reveal, SectionHeading, Tag, Todo, CopyEmail, Spotlight, MotionProvider
data/                     ← all your content
lib/                      types + helpers
public/                   photos, resume PDF
```

## 7. Design notes

- **Palette:** near-black `#0A0A0C`, off-white `#F3F1EC`, pink `#F2A7C8`, violet `#B7A6F7`. Defined once in `app/globals.css`.
- **Type:** Geist + Geist Mono via `next/font` (self-hosted, no layout shift).
- **Motion:** content fades up as it scrolls in, with a shared easing curve. Everything respects the visitor's
  "reduce motion" setting via `MotionConfig`.
- **Accessibility:** semantic landmarks, skip link, visible focus rings, labeled controls, alt text, and live
  region feedback on "copy email".
- **Honesty by design:** "Works today" and "Planned" are visually separate, the CareerPilot demo is labeled as
  sample data, and project illustrations are labeled as illustrations.
