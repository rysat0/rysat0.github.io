import {
  Binary,
  Bot,
  Boxes,
  Cpu,
  HeartPulse,
  MessagesSquare,
  PhoneCall,
  SquareTerminal,
} from "lucide-react"

import { ExternalLinkIcon, GithubIcon } from "@/components/icons"
import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import {
  RadialOrbitalTimeline,
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"
import { useIsDesktop } from "@/lib/use-is-desktop"
import { cn } from "@/lib/utils"

// Per-project orbital metadata: short label, icon, status, "energy", links to
// related projects (by id), and a context tag shown on the expanded card.
const ORBIT_META: Record<
  string,
  {
    title: string
    icon: React.ElementType
    status: TimelineItem["status"]
    energy: number
    date: string
    related: string[]
  }
> = {
  reco: {
    title: "Reco",
    icon: PhoneCall,
    status: "in-progress",
    energy: 95,
    date: "StepAI",
    related: ["chatbot-azure", "conversational-automation"],
  },
  androx: {
    title: "Androx",
    icon: HeartPulse,
    status: "completed",
    energy: 82,
    date: "iOS",
    related: [],
  },
  "chatbot-azure": {
    title: "AI Chatbot",
    icon: Bot,
    status: "completed",
    energy: 78,
    date: "Azure",
    related: ["reco", "conversational-automation"],
  },
  shell: {
    title: "Shell",
    icon: SquareTerminal,
    status: "completed",
    energy: 90,
    date: "42",
    related: ["low-level-c", "graphics", "concurrent"],
  },
  "low-level-c": {
    title: "Low-Level C",
    icon: Binary,
    status: "completed",
    energy: 84,
    date: "42",
    related: ["shell", "graphics", "concurrent"],
  },
  graphics: {
    title: "Graphics",
    icon: Boxes,
    status: "completed",
    energy: 80,
    date: "42",
    related: ["shell", "low-level-c", "concurrent"],
  },
  concurrent: {
    title: "Concurrency",
    icon: Cpu,
    status: "completed",
    energy: 85,
    date: "42",
    related: ["shell", "low-level-c", "graphics"],
  },
  "conversational-automation": {
    title: "Automation",
    icon: MessagesSquare,
    status: "completed",
    energy: 72,
    date: "Marketing",
    related: ["reco", "chatbot-azure"],
  },
}

const idOf = new Map(projects.map((p, i) => [p.id, i + 1]))

// Build orbital nodes from project data. Falls back to sensible defaults so a
// project added without an ORBIT_META entry still renders instead of throwing.
const timelineData: TimelineItem[] = projects.map((project, i) => {
  const meta = ORBIT_META[project.id]
  return {
    id: i + 1,
    title: meta?.title ?? project.name,
    date: meta?.date ?? project.org ?? project.tags[0] ?? "",
    content: project.description,
    category: project.tags[0] ?? "",
    icon: meta?.icon ?? Boxes,
    relatedIds: (meta?.related ?? [])
      .map((rid) => idOf.get(rid))
      .filter((id): id is number => id !== undefined),
    status: meta?.status ?? (project.featured ? "in-progress" : "completed"),
    energy: meta?.energy ?? 70,
    url: project.url,
  }
})

export function Projects() {
  // The orbital is a desktop flourish; phones get a clean, readable list (the
  // orbital's expanded cards don't fit a narrow viewport). Gating on a media
  // query means the orbital never mounts (and never auto-rotates) on mobile.
  const isDesktop = useIsDesktop()

  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          label={ui.sectionLabels.projects}
          title={ui.sections.projects}
        />
        {isDesktop ? (
          <p className="mt-4 max-w-xl font-mono-tight text-sm text-muted-foreground">
            {ui.projects.orbitHint}
          </p>
        ) : null}
      </Reveal>

      {isDesktop ? (
        <RadialOrbitalTimeline className="mt-2" timelineData={timelineData} />
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.id}>
              <article
                className={cn(
                  "flex flex-col gap-3 rounded-xl border bg-card/40 p-5",
                  project.featured ? "border-neon/30" : "border-border"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold tracking-tight">
                    {project.name}
                    {project.org ? (
                      <span className="text-muted-foreground">
                        {" "}
                        · {project.org}
                      </span>
                    ) : null}
                  </h3>
                  {project.featured ? (
                    <span className="shrink-0 rounded-full border border-neon/40 bg-neon-soft px-2 py-0.5 font-mono-tight text-[10px] uppercase tracking-wider text-neon">
                      {ui.projects.featured}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {project.description}
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
                    className="inline-flex w-fit items-center gap-1.5 font-mono-tight text-sm text-foreground transition-colors hover:text-neon"
                  >
                    {ui.projects.viewSite}
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      )}

      <Reveal className="mt-10">
        <p className="text-center font-mono-tight text-sm text-muted-foreground">
          {profile.contact.note}
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href={profile.contact.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-md border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-neon hover:text-neon"
          >
            <GithubIcon className="size-5" />
            {ui.projects.viewOnGithub}
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
