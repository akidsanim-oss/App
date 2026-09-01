const year = new Date().getFullYear()

const columns = [
  {
    head: 'Studio',
    items: [
      ['#manifesto', 'Manifesto'],
      ['#process', 'Process'],
      ['#impact', 'Impact'],
      ['#work', 'Work'],
    ],
  },
  {
    head: 'Make',
    items: [
      ['#capabilities', 'Websites'],
      ['#capabilities', 'Apps'],
      ['#capabilities', 'Custom platforms'],
      ['#capabilities', 'E-commerce'],
    ],
  },
  {
    head: 'Elsewhere',
    items: [
      ['https://www.instagram.com', 'Instagram'],
      ['https://www.linkedin.com', 'LinkedIn'],
      ['https://dribbble.com', 'Dribbble'],
      ['mailto:hello@spark.studio', 'Email'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/12 bg-ink pt-16 md:pt-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-baseline gap-2">
              <span className="display text-3xl text-paper">Spark</span>
              <span className="text-ember">✳</span>
            </a>
            <p className="mt-5 max-w-[30ch] font-display text-xl italic text-paper/60">
              Creativity powerhouse. We empower brands to inspire people.
            </p>
            <p className="microlabel mt-8 text-smoke">Barcelona · Lisbon · Remote</p>
          </div>

          {columns.map((col) => (
            <nav key={col.head} className="lg:col-span-2">
              <p className="microlabel text-ember">{col.head}</p>
              <ul className="mt-5 space-y-3">
                {col.items.map(([href, label]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-paper/65 transition-colors hover:text-ember"
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-2 lg:col-span-2">
            <p className="microlabel text-ember">New business</p>
            <a
              href="mailto:hello@spark.studio"
              className="mt-5 block break-words font-display text-xl italic text-paper transition-colors hover:text-ember lg:text-2xl"
            >
              hello@spark.studio
            </a>
            <p className="mt-3 text-sm text-smoke">We reply within two working days.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/12 pt-6">
          <p className="microlabel text-smoke">© {year} Spark Studio — All rights reserved</p>
          <p className="microlabel text-smoke">Crafted with fire, not templates</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display mt-10 select-none whitespace-nowrap text-center text-[19vw] leading-[0.75] text-paper/6"
        style={{ marginBottom: '-0.16em' }}
      >
        SPARK<span className="text-ember/25">✳</span>
      </p>
    </footer>
  )
}
