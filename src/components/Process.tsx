import { Reveal, SectionHead } from './ui'

const steps = [
  {
    n: '01',
    title: 'Rediscover',
    body: 'Immersion, stakeholder interviews and an honest audit. We find the essence that\u2019s already there — usually buried under years of compromise.',
    out: 'Essence & positioning',
  },
  {
    n: '02',
    title: 'Reimagine',
    body: 'Strategy becomes territory: narrative, identity direction, product principles. We prototype early so opinions meet something real, not a slide.',
    out: 'Concept & roadmap',
  },
  {
    n: '03',
    title: 'Craft',
    body: 'Design and engineering in one room, shipping in weekly increments. Design systems, content, code and QA held to the same standard.',
    out: 'The product, built',
  },
  {
    n: '04',
    title: 'Ignite',
    body: 'Launch is the start of the interesting part. We instrument everything, watch how people behave, and keep tuning what the data tells us.',
    out: 'Growth & iteration',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      data-rail="Process"
      data-index="05"
      data-tone="light"
      className="relative bg-paper py-20 text-ink md:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="05" label="How we work" tone="light" />

        <h2 className="display mb-14 max-w-[16ch] text-[clamp(2.2rem,6vw,5rem)] md:mb-20">
          Collaboration is the <span className="italic text-ember">method</span>
        </h2>

        <ol className="grid gap-px bg-ink/15 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="contents">
              <Reveal delay={i * 0.08} className="bg-paper">
                <div className="group relative flex h-full flex-col p-6 transition-colors duration-500 hover:bg-ink md:p-8">
                <span className="microlabel text-ember transition-colors">{s.n}</span>
                <h3 className="display mt-5 text-[clamp(1.8rem,3vw,2.6rem)] transition-colors duration-500 group-hover:text-paper">
                  {s.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-paper/70">
                  {s.body}
                </p>
                <p className="microlabel mt-8 text-ink/40 transition-colors duration-500 group-hover:text-spark">
                  → {s.out}
                </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
