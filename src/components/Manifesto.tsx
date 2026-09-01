import { BurnIn, Reveal, SectionHead } from './ui'

const paragraphs = [
  'For over 20 years, we\u2019ve worked alongside startups and leading companies to rediscover their essence and stand out. Through collaboration, creativity, and technology, we craft work that connects, resonates, and drives real impact \u2014 on people and on results.',
  'In a constantly changing digital world, we help brands discover their essence, shape identities that grow, adapt, and stand out \u2014 creating experiences that connect and tell a bigger story.',
]

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-rail="Manifesto"
      data-index="01"
      data-tone="light"
      className="relative bg-paper py-20 text-ink md:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="01" label="Manifesto" tone="light" />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-display text-2xl italic leading-tight text-ink/70">
                “A brand is not what you say it is. It’s what people feel when the noise
                stops.”
              </p>
              <p className="microlabel mt-6 text-ink/45">Our founding belief</p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(2rem,5vw,4.4rem)] text-ink">
              <BurnIn text={paragraphs[0]} />
            </h2>
            <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-ink/70 md:text-xl">
              <BurnIn text={paragraphs[1]} step={0.016} />
            </p>

            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink/15 md:grid-cols-4">
              {[
                ['Listen', 'Immersion, audits, interviews'],
                ['Distil', 'Positioning & brand essence'],
                ['Make', 'Design, code, content'],
                ['Amplify', 'Launch, measure, grow'],
              ].map(([title, sub], i) => (
                <Reveal key={title} delay={i * 0.07} className="bg-paper p-5">
                  <span className="microlabel text-ember">0{i + 1}</span>
                  <p className="display mt-3 text-2xl">{title}</p>
                  <p className="mt-2 text-sm leading-snug text-ink/60">{sub}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
