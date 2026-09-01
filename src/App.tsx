import { useCallback, useRef, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import ShowreelSection, { ShowreelPlayer } from "./components/Showreel";
import Works from "./components/Works";
import Awards from "./components/Awards";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieBar from "./components/CookieBar";

export default function App() {
  const [reelOpen, setReelOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const scrollToForm = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const input = formRef.current?.querySelector("input") as HTMLInputElement | null;
      input?.focus({ preventScroll: true });
    }, 700);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[65] opacity-[0.05] mix-blend-soft-light" />

      <Nav onBook={scrollToForm} />
      <main>
        <Hero onBook={scrollToForm} onReel={() => setReelOpen(true)} />
        <LogoMarquee />
        <ShowreelSection onPlay={() => setReelOpen(true)} />
        <Works />
        <Awards />
        <Testimonials />
        <Contact formRef={formRef} />
      </main>
      <Footer onBook={scrollToForm} />

      <ShowreelPlayer open={reelOpen} onClose={() => setReelOpen(false)} />
      <CookieBar />
    </div>
  );
}
