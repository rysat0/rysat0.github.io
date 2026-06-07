import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

function App() {
  return (
    <>
      {/* Fixed full-screen colorful shader background */}
      <WebGLShader />
      {/* Legibility overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-mono-tight text-sm text-neon">~/rysato $ whoami</p>
        <h1 className="text-5xl font-semibold tracking-tighter text-glow md:text-7xl">
          Hi, I&apos;m <span className="text-neon">Leonardo</span>
        </h1>
        <p className="max-w-xl text-pretty text-muted-foreground">
          Brazilian-Japanese Software Engineer &amp; CTO of StepAI. Low-level
          systems in C, AI voice &amp; RAG pipelines, cloud infrastructure.
        </p>
        <LiquidButton
          type="button"
          size="xl"
          className="text-foreground"
          onClick={() =>
            window.open(
              "https://github.com/rysat0",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          View My Work
        </LiquidButton>
      </main>
    </>
  )
}

export default App
