import { Section, SectionHeading } from "@/components/Section"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"

export function Expertise() {
  const { lang } = useLanguage()

  return (
    <Section id="expertise">
      <SectionHeading
        label={ui.sectionLabels.expertise[lang]}
        title={ui.sections.expertise[lang]}
      />

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {profile.expertiseIntro[lang]}
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {profile.skills.map((category) => (
          <div
            key={category.name.en}
            className="group rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-neon/50"
          >
            <h3 className="font-mono-tight text-sm uppercase tracking-[0.18em] text-neon">
              {category.name[lang]}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-sm text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
