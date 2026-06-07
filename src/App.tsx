import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { profile } from "@/data/profile"
import { ui } from "@/i18n/dictionary"
import { useLanguage } from "@/i18n/language-context"

function App() {
  const { lang, toggle } = useLanguage()

  return (
    <>
      {/* Fixed full-screen colorful shader background */}
      <WebGLShader />
      {/* Legibility overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />

      {/* Temporary language toggle (full nav arrives in the sections phase) */}
      <button
        type="button"
        onClick={toggle}
        aria-label={ui.a11y.toggleLanguage[lang]}
        className="fixed top-5 right-5 z-20 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono-tight text-xs text-foreground backdrop-blur transition-colors hover:border-neon hover:text-neon"
      >
        {lang === "en" ? "JA" : "EN"}
      </button>

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-mono-tight text-sm text-neon">~/rysato $ whoami</p>
        <h1 className="text-5xl font-semibold tracking-tighter text-glow md:text-7xl">
          {profile.heroHeadlinePrefix[lang]}{" "}
          <span className="text-neon">{profile.nickname}</span>
        </h1>
        <p className="max-w-2xl text-pretty text-muted-foreground">
          {profile.heroTagline[lang]}
        </p>
        <LiquidButton
          type="button"
          size="xl"
          className="text-foreground"
          onClick={() =>
            window.open(
              profile.contact.github.href,
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          {ui.hero.cta[lang]}
        </LiquidButton>
      </main>
    </>
  )
}

export default App
