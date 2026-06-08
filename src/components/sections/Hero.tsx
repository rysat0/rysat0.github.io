import { animate, stagger } from "animejs"
import { lazy, Suspense, useLayoutEffect, useMemo, useRef } from "react"

import { ArrowDownIcon } from "@/components/icons"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { profile } from "@/data/profile"
import { ui } from "@/data/ui"
import { prefersReducedMotion } from "@/lib/motion"

// Code-split three.js out of the initial bundle; the dark background and hero
// copy render immediately while the shader chunk loads.
const WebGLShader = lazy(() =>
  import("@/components/ui/web-gl-shader").then((m) => ({
    default: m.WebGLShader,
  }))
)

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  })
}

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  const prefersReduced = useMemo(() => prefersReducedMotion(), [])

  // Staggered entrance for the hero copy (anime.js). useLayoutEffect sets the
  // initial hidden state before paint to avoid a flash.
  useLayoutEffect(() => {
    if (prefersReduced || !contentRef.current) return
    const targets =
      contentRef.current.querySelectorAll<HTMLElement>("[data-animate]")
    targets.forEach((el) => {
      el.style.opacity = "0"
    })
    animate(targets, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: stagger(85),
      duration: 750,
      ease: "outExpo",
    })
  }, [prefersReduced])

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Colorful WebGL shader, clipped to the hero (lazy-loaded) */}
      <Suspense fallback={null}>
        <WebGLShader className="absolute inset-0 block h-full w-full motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />
      </Suspense>
      {/* Legibility + fade into the next section */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-28 text-center"
      >
        <p data-animate className="font-mono-tight text-sm text-neon">
          ~/{profile.handle} $ whoami
        </p>

        <h1
          data-animate
          className="text-5xl font-semibold tracking-tighter text-glow sm:text-6xl md:text-7xl"
        >
          {profile.heroHeadlinePrefix}{" "}
          <span className="text-neon">{profile.nickname}</span>
        </h1>

        <div
          data-animate
          className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon-soft px-3 py-1"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-neon opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-neon" />
          </span>
          <span className="font-mono-tight text-xs text-neon">
            {ui.hero.available}
          </span>
        </div>

        <p
          data-animate
          className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          {profile.heroTagline}
        </p>

        <div
          data-animate
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <LiquidButton
            type="button"
            size="xl"
            className="text-foreground"
            onClick={() => scrollToId("projects")}
          >
            {ui.hero.cta}
          </LiquidButton>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border px-7 font-medium text-foreground transition-colors hover:border-neon hover:text-neon"
          >
            {ui.hero.secondaryCta}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label={ui.hero.scroll}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-neon"
      >
        <ArrowDownIcon className="size-6 motion-safe:animate-bounce" />
      </button>
    </section>
  )
}
