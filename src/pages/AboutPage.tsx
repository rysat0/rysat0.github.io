import { PageShell } from "@/components/layout/PageShell"
import { About } from "@/components/sections/About"
import { Whats42 } from "@/components/sections/Whats42"

export function AboutPage() {
  return (
    <PageShell>
      <About />
      <Whats42 />
    </PageShell>
  )
}
