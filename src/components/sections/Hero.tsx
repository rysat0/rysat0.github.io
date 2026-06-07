import { ArrowDownIcon } from "@/components/icons"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"

function scrollToId(id: string) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
  })
}

export function Hero() {
  const { lang } = useLanguage()

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Colorful WebGL shader, clipped to the hero */}
      <WebGLShader className="absolute inset-0 block h-full w-full" />
      {/* Legibility + fade into the next section */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-28 text-center">
        <p className="font-mono-tight text-sm text-neon">
          ~/{profile.handle} $ whoami
        </p>

        <h1 className="text-5xl font-semibold tracking-tighter text-glow sm:text-6xl md:text-7xl">
          {profile.heroHeadlinePrefix[lang]}{" "}
          <span className="text-neon">{profile.nickname}</span>
        </h1>

        <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon-soft px-3 py-1">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-neon opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-neon" />
          </span>
          <span className="font-mono-tight text-xs text-neon">
            {ui.hero.available[lang]}
          </span>
        </div>

        <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          {profile.heroTagline[lang]}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <LiquidButton
            type="button"
            size="xl"
            className="text-foreground"
            onClick={() => scrollToId("projects")}
          >
            {ui.hero.cta[lang]}
          </LiquidButton>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border px-7 font-medium text-foreground transition-colors hover:border-neon hover:text-neon"
          >
            {ui.hero.secondaryCta[lang]}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label={ui.hero.scroll[lang]}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-neon"
      >
        <ArrowDownIcon className="size-6 motion-safe:animate-bounce" />
      </button>
    </section>
  )
}
