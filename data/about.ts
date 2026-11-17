/**
 * ABOUT ME
 * This is a first draft written from what you shared. Read it out loud;
 * if a sentence doesn't sound like you, change it. Your voice beats polish.
 */
export const about = {
  heading: "Discipline, curiosity, and a lot of reps.",
  paragraphs: [
    "I grew up in Charlotte and I'm studying computer science at North Carolina A&T. I like software that solves a problem I actually have. I kept applying to internships without knowing why some got responses and others didn't, so I'm building CareerPilot to find out.",
    "Security is where my curiosity goes deepest. A Microsoft cybersecurity mentorship showed me that a lot of security is steady, careful work: thinking through threats before they happen, hardening defaults, and writing down exactly what happened when something goes wrong.",
    "Boxing works the same way. You don't get better in the fight; you get better in the rounds nobody sees. You drill the basics until they're automatic, study what got through your guard, and adjust. That's how I try to write code: small rounds, honest feedback, fix what keeps landing.",
    "Outside of that I lift, run, read, and travel whenever I get the chance. Before college I helped beginners debug their first Python and Java programs at Code Ninjas, and explaining a bug to someone new is still the best test of whether I actually understand it.",
  ],
  interests: [
    { label: "Boxing", icon: "boxing" },
    { label: "Lifting", icon: "lifting" },
    { label: "Running", icon: "running" },
    { label: "Reading", icon: "reading" },
    { label: "Traveling", icon: "travel" },
    { label: "Community", icon: "community" },
  ],
  photo: {
    src: "/images/bryant-lenovo.jpg",
    alt: "Bryant Clarke sitting in front of a red Lenovo display wall, wearing an NC A&T sweater and holding a Department of Computer Science folder",
    // VERIFY: add the event name if you'd like, e.g. "NC A&T CS visit to Lenovo, 2026"
    caption: "Representing NC A&T Computer Science at Lenovo",
  },
} as const;
