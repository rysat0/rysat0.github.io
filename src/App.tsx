import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Expertise } from "@/components/sections/Expertise"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { Whats42 } from "@/components/sections/Whats42"

function App() {
  return (
    <>
      <Navbar />
      <main>
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
