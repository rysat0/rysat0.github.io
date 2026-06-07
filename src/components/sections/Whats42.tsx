import { ArrowUpRightIcon } from "@/components/icons"
import { Section } from "@/components/Section"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"

export function Whats42() {
  const { lang } = useLanguage()

  return (
    <Section className="py-8 md:py-10">
      <div className="relative overflow-hidden rounded-2xl border border-neon/20 bg-card/40 p-8 shadow-neon backdrop-blur md:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-neon-soft blur-3xl"
        />
        <div className="relative flex flex-col gap-4">
          <span className="font-mono-tight text-xs uppercase tracking-[0.22em] text-neon">
            💡 {ui.sections.whats42[lang]}
          </span>
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            42&nbsp;/&nbsp;42Tokyo
          </h3>
          <div className="flex max-w-3xl flex-col gap-3">
            {profile.whats42.body[lang].map((text, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground text-pretty">
                {text}
              </p>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {profile.whats42.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3.5 py-1.5 font-mono-tight text-sm text-foreground transition-colors hover:border-neon hover:text-neon"
              >
                {link.label}
                <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
