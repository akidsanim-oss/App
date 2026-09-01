import { motion } from 'framer-motion'
import EmberCanvas from './EmberCanvas'

const headline = ['It', 'all', 'starts', 'with', 'a', 'spark.']

export default function Hero() {
  return (
    <section
      id="top"
      data-rail="Ignition"
      data-index="00"
      data-tone="dark"
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <img
        src="/images/hero-embers.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
        style={{
          maskImage: 'radial-gradient(115% 85% at 50% 100%, #000 15%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(115% 85% at 50% 100%, #000 15%, transparent 72%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/85" />
      <EmberCanvas className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pt-36">
        <div className="flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-ember animate-glow" />
          <span className="microlabel text-smoke">Creativity powerhouse — since 2004</span>
        </div>

        <div className="py-10">
          <h1 className="display max-w-[16ch] text-[clamp(3.4rem,13.5vw,12.5rem)] text-paper">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                className={`mr-[0.22em] inline-block ${
                  word === 'spark.' ? 'italic text-ember' : ''
                }`}
                initial={{ opacity: 0, y: '0.32em', filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 1,
                  delay: 0.15 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-[34ch] font-display text-xl italic leading-snug text-paper/85 md:mt-10 md:text-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
          >
            We empower brands to inspire people — creating experiences that ignite passion by
            reimagining what's possible.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            <a
              href="#contact"
              className="microlabel rounded-full bg-ember px-8 py-4 text-ink transition-all duration-300 hover:bg-spark hover:shadow-[0_0_45px_rgba(255,106,19,0.45)]"
            >
              Start a project with us
            </a>
            <a
              href="#work"
              className="microlabel rounded-full border border-paper/30 px-8 py-4 text-paper transition-colors hover:border-ember hover:text-ember"
            >
              See the work
            </a>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-wrap items-end justify-between gap-6 border-t border-paper/12 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
        >
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              ['20+ years', 'alongside ambitious brands'],
              ['4 disciplines', 'strategy, design, code, growth'],
              ['Global reach', 'work in 12 countries'],
            ].map(([big, small]) => (
              <div key={big}>
                <p className="microlabel text-paper">{big}</p>
                <p className="mt-1 text-sm text-smoke">{small}</p>
              </div>
            ))}
          </div>
          <a href="#manifesto" className="microlabel hidden text-smoke transition-colors hover:text-ember md:block">
            Scroll ↓
          </a>
        </motion.div>
      </div>
    </section>
  )
}
