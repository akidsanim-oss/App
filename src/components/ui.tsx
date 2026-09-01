import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/* ------------------------------------------------------------------ Reveal */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------- word-by-word burn */

export function BurnIn({
  text,
  className = '',
  step = 0.022,
}: {
  text: string
  className?: string
  step?: number
}) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0.14, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15% 0px -25% 0px' }}
          transition={{ duration: 0.5, delay: i * step, ease: 'easeOut' }}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------- section head */

export function SectionHead({
  n,
  label,
  tone = 'dark',
}: {
  n: string
  label: string
  tone?: 'dark' | 'light'
}) {
  const line = tone === 'dark' ? 'bg-paper/20' : 'bg-ink/20'
  const dim = tone === 'dark' ? 'text-smoke' : 'text-ink/55'
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-14">
      <span className="microlabel text-ember">{n}</span>
      <span className={`microlabel ${dim}`}>{label}</span>
      <span className={`h-px flex-1 ${line}`} />
    </div>
  )
}

/* ----------------------------------------------------------------- count up */

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1500
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------ arrow / links */

export function ArrowLink({
  href,
  children,
  tone = 'dark',
}: {
  href: string
  children: ReactNode
  tone?: 'dark' | 'light'
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 border-b pb-1 transition-colors ${
        tone === 'dark'
          ? 'border-paper/25 text-paper hover:border-ember hover:text-ember'
          : 'border-ink/25 text-ink hover:border-ember hover:text-ember'
      }`}
    >
      <span className="microlabel">{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
    </a>
  )
}
