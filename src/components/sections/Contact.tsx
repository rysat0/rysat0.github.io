import type { ComponentType, SVGProps } from "react"

import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import {
  ArrowUpRightIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  XIcon,
} from "@/components/icons"
import DisplayCards, {
  type DisplayCardProps,
} from "@/components/ui/display-cards"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"

interface ContactMethod {
  title: string
  value: string
  meta: string
  href: string
  external: boolean
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

// Hovering scales the card up and lifts it above the others (z-index) without
// touching its translate offset, so it stays under the cursor (no jump/flicker).
const HOVER = "hover:z-20 hover:scale-[1.04]"

// Lower cards are dimmed until hovered.
const DIM =
  `grayscale-[60%] hover:grayscale-0 ${HOVER} before:absolute before:inset-0 before:rounded-xl before:bg-background/40 before:content-[''] before:transition-opacity before:duration-700 hover:before:opacity-0`

// Fan-out offsets (bottom of the stack first, fully-revealed card last).
const STACK = [
  `[grid-area:stack] translate-x-[0px] translate-y-[0px] ${DIM}`,
  `[grid-area:stack] translate-x-[140px] translate-y-[26px] ${DIM}`,
  `[grid-area:stack] translate-x-[280px] translate-y-[52px] ${DIM}`,
  `[grid-area:stack] translate-x-[420px] translate-y-[78px] ${DIM}`,
  `[grid-area:stack] translate-x-[560px] translate-y-[104px] ${HOVER}`,
]

export function Contact() {
  const { contact } = profile

  // Ordered bottom -> top of the stack (the last sits on top, in full colour).
  const methods: ContactMethod[] = [
    {
      title: "StepAI",
      value: contact.company.label,
      meta: "Visit company",
      href: contact.company.href,
      external: true,
      Icon: ExternalLinkIcon,
    },
    {
      title: "LinkedIn",
      value: contact.linkedin.label,
      meta: "Connect",
      href: contact.linkedin.href,
      external: true,
      Icon: LinkedinIcon,
    },
    {
      title: "X",
      value: contact.x.label,
      meta: "Follow",
      href: contact.x.href,
      external: true,
      Icon: XIcon,
    },
    {
      title: "GitHub",
      value: contact.github.label,
      meta: "View profile",
      href: contact.github.href,
      external: true,
      Icon: GithubIcon,
    },
    {
      title: ui.contact.email,
      value: contact.email,
      meta: "Send a message",
      href: `mailto:${contact.email}`,
      external: false,
      Icon: MailIcon,
    },
  ]

  const cards: DisplayCardProps[] = methods.map((m, i) => ({
    icon: <m.Icon />,
    title: m.title,
    description: m.value,
    meta: m.meta,
    href: m.href,
    external: m.external,
    className: STACK[i],
  }))

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
        <p className="mt-2 hidden font-mono-tight text-sm text-muted-foreground md:block">
          Hover a card to bring it forward, then click to reach me there.
        </p>
      </Reveal>

      {/* Desktop: interactive Display Cards stack */}
      <div className="mt-6 hidden min-h-[24rem] w-full items-center justify-center overflow-hidden md:flex">
        <div className="origin-center scale-[0.72] lg:scale-90 xl:scale-100">
          {/* Recenter the rightward/downward fan within the container */}
          <div className="translate-x-[-280px] translate-y-[-52px]">
            <DisplayCards cards={cards} />
          </div>
        </div>
      </div>

      {/* Mobile: simple, fully-tappable list */}
      <ul className="mt-8 flex flex-col gap-3 md:hidden">
        {methods.map(({ title, value, href, external, Icon }) => (
          <li key={title}>
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-neon/50"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/40 text-foreground transition-colors group-hover:border-neon/50 group-hover:text-neon [&>svg]:size-5">
                <Icon />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-mono-tight text-xs uppercase tracking-wider text-muted-foreground">
                  {title}
                </span>
                <span className="truncate text-foreground">{value}</span>
              </span>
              <ArrowUpRightIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
