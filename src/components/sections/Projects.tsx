import { ExternalLinkIcon, GithubIcon } from "@/components/icons"
import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"
import { cn } from "@/lib/utils"

export function Projects() {
  const { lang } = useLanguage()

  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          label={ui.sectionLabels.projects[lang]}
          title={ui.sections.projects[lang]}
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 2) * 0.08} className="h-full">
            <article
              className={cn(
                "group relative flex h-full flex-col gap-4 rounded-xl border bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon",
                project.featured
                  ? "border-neon/30 ring-1 ring-neon/10 hover:border-neon/60"
                  : "border-border hover:border-neon/50"
              )}
            >
            <div className="flex items-center justify-between">
              <span className="font-mono-tight text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {project.featured ? (
                <span className="rounded-full border border-neon/40 bg-neon-soft px-2 py-0.5 font-mono-tight text-[10px] uppercase tracking-wider text-neon">
                  {ui.projects.featured[lang]}
                </span>
              ) : null}
            </div>

            <h3 className="text-xl font-semibold tracking-tight">
              {project.name}
              {project.org ? (
                <span className="text-muted-foreground"> · {project.org}</span>
              ) : null}
            </h3>

            <p className="leading-relaxed text-muted-foreground text-pretty">
              {project.description[lang]}
            </p>

            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono-tight text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-1.5 pt-2 font-mono-tight text-sm text-foreground transition-colors hover:text-neon"
              >
                {ui.projects.viewSite[lang]}
                <ExternalLinkIcon className="size-3.5" />
              </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 text-center font-mono-tight text-sm text-muted-foreground">
          {profile.contact.note[lang]}
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href={profile.contact.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-md border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-neon hover:text-neon"
          >
            <GithubIcon className="size-5" />
            {ui.projects.viewOnGithub[lang]}
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
