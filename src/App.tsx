import Nav from './components/Nav'
import SideRail from './components/SideRail'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Manifesto from './components/Manifesto'
import Capabilities from './components/Capabilities'
import Work from './components/Work'
import Impact from './components/Impact'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-ink font-grotesk antialiased">
      <Nav />
      <SideRail />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Capabilities />
        <Work />
        <Impact />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
