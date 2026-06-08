import { Link, useLocation } from "react-router-dom"

import { GithubIcon, LinkedinIcon, MailIcon, XIcon } from "@/components/icons"
import { profile } from "@/data/profile"
import { prefersReducedMotion } from "@/lib/motion"

export function Footer() {
  const { contact } = profile
  const isHome = useLocation().pathname === "/"
  const year = 2026

  const socials = [
    { href: `mailto:${contact.email}`, Icon: MailIcon, label: "Email", external: false },
    { href: contact.github.href, Icon: GithubIcon, label: "GitHub", external: true },
    { href: contact.x.href, Icon: XIcon, label: "X", external: true },
    { href: contact.linkedin.href, Icon: LinkedinIcon, label: "LinkedIn", external: true },
  ]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Link
            to="/"
            onClick={() => {
              // Already home: Link won't navigate, so scroll back to the hero.
              if (isHome) {
                window.scrollTo({
                  top: 0,
                  behavior: prefersReducedMotion() ? "auto" : "smooth",
                })
              }
            }}
            className="font-mono-tight text-sm font-medium text-foreground transition-colors hover:text-neon"
          >
            <span className="text-neon">{">_"}</span> {profile.handle}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ href, Icon, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neon/50 hover:text-neon"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>

        <p className="font-mono-tight text-xs text-muted-foreground">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
