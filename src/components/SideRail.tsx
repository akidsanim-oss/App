import { useEffect, useState } from 'react'

/**
 * Persistent left index rail: shows the number + label of the section you are
 * in, and inverts its colour when the section is a light (paper) one.
 */
export default function SideRail() {
  const [state, setState] = useState({ index: '00', label: 'Ignition', tone: 'dark' })

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[data-rail]'),
    )
    if (sections.length === 0) return

    const apply = (el: HTMLElement) => {
      setState({
        index: el.dataset.index || '00',
        label: el.dataset.rail || '',
        tone: el.dataset.tone || 'dark',
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) apply(visible.target as HTMLElement)
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-20% 0px -40% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    apply(sections[0])
    return () => observer.disconnect()
  }, [])

  const light = state.tone === 'light'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className={`microlabel transition-colors duration-500 ${light ? 'text-ember' : 'text-ember'}`}
        >
          {state.index}
        </span>
        <span
          className={`h-24 w-px transition-colors duration-500 ${light ? 'bg-ink/25' : 'bg-paper/25'}`}
        />
        <span
          className={`microlabel whitespace-nowrap transition-colors duration-500 ${
            light ? 'text-ink/55' : 'text-smoke'
          }`}
          style={{ writingMode: 'vertical-rl' }}
        >
          {state.label}
        </span>
      </div>
    </div>
  )
}
