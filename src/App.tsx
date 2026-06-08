import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Expertise } from "@/components/sections/Expertise"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { Whats42 } from "@/components/sections/Whats42"
import { ui } from "@/data/ui"

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-foreground focus:ring-2 focus:ring-neon"
      >
        {ui.a11y.skipToContent}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Whats42 />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
