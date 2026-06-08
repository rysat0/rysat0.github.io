import type { ComponentType, SVGProps } from "react"

import {
  ArrowUpRightIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  XIcon,
} from "@/components/icons"
import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"

interface ContactMethod {
  label: string
  value: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  external: boolean
}

export function Contact() {
  const { contact } = profile

  const methods: ContactMethod[] = [
    {
      label: ui.contact.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: MailIcon,
      external: false,
    },
    {
      label: "X",
      value: contact.x.label,
      href: contact.x.href,
      Icon: XIcon,
      external: true,
    },
    {
      label: "GitHub",
      value: contact.github.label,
      href: contact.github.href,
      Icon: GithubIcon,
      external: true,
    },
    {
      label: "LinkedIn",
      value: contact.linkedin.label,
      href: contact.linkedin.href,
      Icon: LinkedinIcon,
      external: true,
    },
    {
      label: "StepAI",
      value: contact.company.label,
      href: contact.company.href,
      Icon: ExternalLinkIcon,
      external: true,
    },
  ]

  return (
    <Section id="contact">
      <Reveal>
        <SectionHeading
          label={ui.sectionLabels.contact}
          title={ui.sections.contact}
        />

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {ui.contact.intro}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {methods.map(({ label, value, href, Icon, external }, i) => (
          <Reveal key={label} delay={(i % 2) * 0.08}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-neon/50"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/40 text-foreground transition-colors group-hover:border-neon/50 group-hover:text-neon">
                <Icon className="size-5" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-mono-tight text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </span>
                <span className="truncate text-foreground">{value}</span>
              </span>
              <ArrowUpRightIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
