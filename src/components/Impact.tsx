import { CountUp, Reveal, SectionHead } from './ui'

const stats = [
  { n: 20, suffix: '+', label: 'years in the craft', note: 'Since 2004, through every platform shift' },
  { n: 340, suffix: '+', label: 'projects launched', note: 'Startups to listed companies' },
  { n: 46, suffix: '', label: 'awards & honours', note: 'Design, product and craft' },
  { n: 12, suffix: '', label: 'countries reached', note: 'One studio, four time zones' },
]

export default function Impact() {
  return (
    <section
      id="impact"
      data-rail="Impact"
      data-index="04"
      data-tone="dark"
      className="relative overflow-hidden bg-ink py-20 md:py-32"
    >
      <img
        src="/images/studio.png"
        alt="Designers working around a long table in the Spark studio at night"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, #000 40%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 40%, transparent)',
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="04" label="Impact" />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.2rem,6vw,5rem)] text-paper">
              Real impact — on people, <span className="italic text-ember">and on results</span>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-paper/70">
                We measure the work twice: does it move someone, and does it move the business?
                If it only does one, it isn’t finished.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-px self-start bg-paper/15 lg:col-span-7 lg:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-ink/95 p-6 md:p-8">
                <p className="display text-[clamp(2.6rem,6vw,4.6rem)] text-spark">
                  <CountUp to={s.n} suffix={s.suffix} />
                </p>
                <p className="microlabel mt-3 text-paper">{s.label}</p>
                <p className="mt-2 text-sm leading-snug text-smoke">{s.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
