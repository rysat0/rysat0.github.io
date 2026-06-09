import {
  AudioLines,
  BrainCircuit,
  Cloud,
  CloudCog,
  Code2,
  Cpu,
  GitFork,
  MemoryStick,
  Radio,
  Rocket,
  ShieldCheck,
  Terminal,
  Waypoints,
  Workflow,
} from "lucide-react"
import {
  siC,
  siCplusplus,
  siGo,
  siLinux,
  siPython,
  siTypescript,
} from "simple-icons"

import { Reveal } from "@/components/Reveal"
import { Section, SectionHeading } from "@/components/Section"
import { Card, CardContent } from "@/components/ui/card"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"

// Icon + bento span per skill category, keyed by name. Spans build a 2+4 / 3+3
// grid on large screens (the featured "Systems" card is the widest).
const CATEGORY_META: Record<string, { icon: React.ElementType; span: string }> =
  {
    Languages: { icon: Code2, span: "lg:col-span-2" },
    Systems: { icon: Cpu, span: "lg:col-span-4" },
    "AI / Backend": { icon: BrainCircuit, span: "lg:col-span-3" },
    "Cloud & Infra": { icon: Cloud, span: "lg:col-span-3" },
  }

// Wrap a Simple Icons brand glyph as a currentColor SVG component.
function brandIcon(icon: { path: string; title: string }) {
  return function BrandGlyph({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    )
  }
}

// A small icon for each individual skill: brand logos where they exist,
// lucide glyphs for the lower-level concepts.
const SKILL_ICONS: Record<string, React.ElementType> = {
  C: brandIcon(siC),
  "C++": brandIcon(siCplusplus),
  Python: brandIcon(siPython),
  TypeScript: brandIcon(siTypescript),
  Go: brandIcon(siGo),
  "System calls": Terminal,
  "Kernel interaction": Cpu,
  "Memory optimization": MemoryStick,
  "fork / execve": GitFork,
  Signals: Radio,
  "Concurrency (ACID)": Workflow,
  "LLM + RAG": BrainCircuit,
  "STT / TTS": AudioLines,
  "Voice pipelines": Waypoints,
  AWS: Cloud,
  Azure: CloudCog,
  "Linux server ops": brandIcon(siLinux),
  "Security hardening": ShieldCheck,
  "Web deployment": Rocket,
}

export function Expertise() {
  return (
    <Section id="expertise">
      <Reveal>
        <SectionHeading
          label={ui.sectionLabels.expertise}
          title={ui.sections.expertise}
        />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {profile.expertiseIntro}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-6">
        {profile.skills.map((category, i) => {
          const meta = CATEGORY_META[category.name]
          const Icon = meta?.icon ?? Code2
          return (
            <Reveal
              key={category.name}
              delay={i * 0.08}
              className={`col-span-full ${meta?.span ?? "lg:col-span-3"}`}
            >
              <Card className="group h-full border-border bg-card/40 transition-colors hover:border-neon/50">
                <CardContent className="flex h-full flex-col gap-6 p-6">
                  <div className="flex items-center gap-4">
                    {/* features-8 style double-ring icon badge */}
                    <div className="relative flex aspect-square size-12 shrink-0 rounded-full border border-neon/30 before:absolute before:-inset-2 before:rounded-full before:border before:border-neon/10">
                      <Icon
                        className="m-auto size-5 text-neon"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-mono-tight text-sm uppercase tracking-[0.18em] text-neon">
                      {category.name}
                    </h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {category.items.map((item) => {
                      const ItemIcon = SKILL_ICONS[item]
                      return (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-sm text-foreground"
                        >
                          {ItemIcon ? (
                            <ItemIcon className="size-3.5 shrink-0 text-muted-foreground" />
                          ) : null}
                          {item}
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
