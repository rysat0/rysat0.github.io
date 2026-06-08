import { Navigate, Route, Routes } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import { AboutPage } from "@/pages/AboutPage"
import { ContactPage } from "@/pages/ContactPage"
import { ExpertisePage } from "@/pages/ExpertisePage"
import { Home } from "@/pages/Home"
import { ProjectsPage } from "@/pages/ProjectsPage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="expertise" element={<ExpertisePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
