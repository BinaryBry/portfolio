import { site } from "@/data/site";
import { isFilled } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-[13px] text-subtle md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {year} {site.name} · {site.schoolShort} Computer Science
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-fg">
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
          >
            <LinkedInIcon className="size-3.5" /> LinkedIn
          </a>
          {isFilled(site.github) ? (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
            >
              <GitHubIcon className="size-3.5" /> GitHub
            </a>
          ) : null}
          <span className="hidden font-mono text-[11px] md:inline">Next.js · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
