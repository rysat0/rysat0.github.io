import type { COBEOptions } from "cobe"

import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import { Globe } from "@/components/ui/globe"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"

// Dark, neon-accented globe. Tokyo & São Paulo are emphasised with larger markers.
const ABOUT_GLOBE: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 4,
  baseColor: [0.32, 0.36, 0.4],
  markerColor: [0.22, 0.95, 0.55],
  glowColor: [0.12, 0.4, 0.28],
  markers: [
    { location: [35.18, 136.91], size: 0.05 }, // Aichi (Nagoya)
    { location: [35.6762, 139.6503], size: 0.11 }, // Tokyo (emphasised)
    { location: [42.3601, -71.0589], size: 0.05 }, // Boston
    { location: [-23.5505, -46.6333], size: 0.11 }, // São Paulo (emphasised)
  ],
}

export function About() {
  const [lead, ...rest] = profile.about

  return (
    <Section id="about" className="relative">
      {/* Decorative layer spanning the (tall) section. A sticky, viewport-tall
          panel keeps the globe vertically centred on screen while the reveal
          scrolls past, instead of letting it sink to the section's midpoint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Oversized ambient globe that bleeds in behind the content.
              md keeps translate-x at 0 so the sphere stays fully on-screen
              (a negative shift would get hard-clipped at the section's edge). */}
          <div className="absolute top-1/2 left-1/2 w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-40 md:left-0 md:w-[46rem] md:translate-x-0 md:opacity-90">
            <Globe config={ABOUT_GLOBE} className="w-full" />
          </div>
          {/* Scrim so the text stays legible over the globe */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/30 to-background/80" />
        </div>
      </div>

      <div className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <Reveal>
            <SectionHeading
              label={ui.sectionLabels.about}
              title={ui.sections.about}
            />
            <p className="mt-6 font-mono-tight text-sm text-muted-foreground">
              {profile.role}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 md:pt-20">
          {/* First paragraph is always shown; the rest reveal on scroll. */}
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground text-pretty">
              {lead}
            </p>
          </Reveal>
          {/* Pinned scroll-reveal: dim at load, fills in as you scroll past. */}
          <TextGradientScroll
            paragraphs={rest}
            className="gap-6"
            paragraphClassName="text-base leading-relaxed text-muted-foreground sm:text-lg"
            type="word"
            textOpacity="medium"
          />
        </div>
      </div>
    </Section>
  )
}
