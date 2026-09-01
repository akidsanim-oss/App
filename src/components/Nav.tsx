import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '#manifesto', label: 'Studio' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="display text-2xl tracking-tight text-paper md:text-[1.7rem]">
              Spark
            </span>
            <span className="text-ember transition-transform duration-500 group-hover:rotate-90">
              ✳
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="microlabel text-paper/70 transition-colors hover:text-ember"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="microlabel rounded-full bg-ember px-5 py-2.5 text-ink transition-colors hover:bg-spark"
            >
              Start a project
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-[2px] w-6 bg-paper transition-transform duration-300 ${
                open ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-paper transition-transform duration-300 ${
                open ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
        <span
          className={`mx-5 block h-px transition-colors md:mx-10 ${
            scrolled ? 'bg-paper/15' : 'bg-transparent'
          }`}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 pt-20 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display border-b border-paper/10 py-4 text-5xl text-paper"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.5 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="microlabel mt-10 self-start rounded-full bg-ember px-7 py-4 text-ink"
            >
              Start a project
            </a>
            <p className="microlabel mt-10 text-smoke">Est. 2004 — Creativity powerhouse</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
