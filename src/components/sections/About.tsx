import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"

export function About() {
  const { lang } = useLanguage()
  const paragraphs = profile.about[lang]

  return (
    <Section id="about">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <Reveal>
            <SectionHeading
              label={ui.sectionLabels.about[lang]}
              title={ui.sections.about[lang]}
            />
            <p className="mt-6 font-mono-tight text-sm text-muted-foreground">
              {profile.role[lang]}
            </p>
            <p className="font-mono-tight text-sm text-muted-foreground">
              📍 {profile.location[lang]}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-foreground text-pretty"
                    : "leading-relaxed text-muted-foreground text-pretty"
                }
              >
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
