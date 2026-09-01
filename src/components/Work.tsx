import { motion } from 'framer-motion'
import { Reveal, SectionHead } from './ui'

const projects = [
  {
    name: 'Aurea',
    kind: 'Brand identity · E-commerce',
    year: '2024',
    img: '/images/work-identity.png',
    blurb:
      'A 40-year-old homeware maker had never spoken to anyone under 55. We rebuilt the essence, the identity and the storefront around craft you can touch.',
    result: '+212%',
    resultLabel: 'online revenue in 12 months',
  },
  {
    name: 'Northbound',
    kind: 'Product design · Mobile app',
    year: '2023',
    img: '/images/work-app.png',
    blurb:
      'An outdoor community app rebuilt from a blank canvas: fewer features, sharper rituals, one habit loop that people actually kept.',
    result: '480k',
    resultLabel: 'downloads in the first 90 days',
  },
  {
    name: 'Halo Retail',
    kind: 'Custom platform · Commerce',
    year: '2025',
    img: '/images/work-commerce.png',
    blurb:
      'One platform connecting 26 concept stores, the warehouse and the web — so a customer can start a purchase on one channel and finish it on another.',
    result: '3.4×',
    resultLabel: 'average order value vs. baseline',
  },
]

export default function Work() {
  return (
    <section
      id="work"
      data-rail="Selected work"
      data-index="03"
      data-tone="dark"
      className="relative bg-soot py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="03" label="Selected work" />

        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-[14ch] text-[clamp(2.4rem,7vw,6rem)] text-paper">
            Work that <span className="italic text-ember">resonates</span>
          </h2>
          <p className="max-w-[38ch] text-paper/60">
            A few of the partnerships we’re proud of — from heritage makers to software
            scale-ups.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((p, i) => (
            <Reveal key={p.name} className={i % 2 === 1 ? 'lg:pl-[12%]' : ''}>
              <article className="group grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-sm bg-ink">
                    <motion.img
                      src={p.img}
                      alt={`${p.name} — ${p.kind}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
                      whileHover={{ scale: 1.02 }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="microlabel absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-paper backdrop-blur-sm">
                      {p.year}
                    </span>
                  </div>
                </div>

                <div className={`flex flex-col justify-center lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="microlabel text-ember">{p.kind}</span>
                  <h3 className="display mt-4 text-[clamp(2rem,4.5vw,3.6rem)] text-paper transition-colors duration-300 group-hover:text-ember">
                    {p.name}
                  </h3>
                  <p className="mt-5 max-w-[46ch] leading-relaxed text-paper/70">{p.blurb}</p>

                  <div className="mt-8 flex items-baseline gap-4 border-t border-paper/15 pt-6">
                    <span className="display text-[clamp(2.2rem,4vw,3.4rem)] text-spark">
                      {p.result}
                    </span>
                    <span className="microlabel text-smoke">{p.resultLabel}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
