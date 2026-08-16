import { Navbar } from '../components'
import { AboutSection, ContactSection, Hero, ProjectsSection, StackSection } from '../components/sections'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}

