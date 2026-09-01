import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHead } from './ui'

const projectTypes = ['Website', 'App', 'Custom platform', 'E-commerce', 'Brand identity', 'Not sure yet']
const budgets = ['< \u20ac25k', '\u20ac25k \u2013 \u20ac60k', '\u20ac60k \u2013 \u20ac150k', '\u20ac150k+']

const fieldBase =
  'w-full border-b border-paper/25 bg-transparent py-3 text-lg text-paper outline-none transition-colors placeholder:text-smoke/70 focus:border-ember'

export default function Contact() {
  const [types, setTypes] = useState<string[]>([])
  const [budget, setBudget] = useState(budgets[1])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = 'Tell us what to call you'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'A valid email, so we can reply'
    if (message.trim().length < 12) next.message = 'A sentence or two about the ambition'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  return (
    <section
      id="contact"
      data-rail="Start a project"
      data-index="06"
      data-tone="dark"
      className="relative overflow-hidden bg-soot py-20 md:py-32"
    >
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #ff6a13 0%, transparent 65%)' }}
      />
      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="06" label="Contact" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.6rem,7.5vw,6rem)] text-paper">
              Start a project <span className="italic text-ember">with us</span>
            </h2>
            <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-paper/70">
              Tell us where you are and where you want to go. We reply within two working days —
              with thoughts, not a brochure.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:hello@spark.studio"
                className="block font-display text-2xl italic text-paper transition-colors hover:text-ember md:text-3xl"
              >
                hello@spark.studio
              </a>
              <p className="microlabel text-smoke">+34 931 555 040</p>
              <p className="microlabel text-smoke">Barcelona · Lisbon · Remote</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-full min-h-[420px] flex-col justify-center border border-ember/40 bg-ink/60 p-8 md:p-12"
                >
                  <span className="microlabel text-ember">Received</span>
                  <p className="display mt-5 text-[clamp(2rem,4.5vw,3.4rem)] text-paper">
                    Thanks, {name.split(' ')[0]} — the spark is lit.
                  </p>
                  <p className="mt-6 max-w-[44ch] text-paper/70">
                    Your brief is with the studio. Expect a reply from a human within two working
                    days{types.length ? ` about your ${types.join(', ').toLowerCase()} project` : ''}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="microlabel mt-10 self-start border-b border-paper/30 pb-1 text-paper transition-colors hover:border-ember hover:text-ember"
                  >
                    Send another brief
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  <fieldset>
                    <legend className="microlabel mb-4 text-smoke">What are we making?</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {projectTypes.map((t) => {
                        const active = types.includes(t)
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggleType(t)}
                            className={`microlabel rounded-full border px-5 py-3 transition-all duration-300 ${
                              active
                                ? 'border-ember bg-ember text-ink'
                                : 'border-paper/25 text-paper/70 hover:border-ember hover:text-ember'
                            }`}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="microlabel mb-4 text-smoke">Ballpark budget</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          aria-pressed={budget === b}
                          onClick={() => setBudget(b)}
                          className={`microlabel rounded-full border px-5 py-3 transition-all duration-300 ${
                            budget === b
                              ? 'border-spark text-spark'
                              : 'border-paper/20 text-paper/60 hover:border-paper/50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-8 md:grid-cols-2">
                    <label className="block">
                      <span className="microlabel text-smoke">Name</span>
                      <input
                        className={fieldBase}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        autoComplete="name"
                      />
                      {errors.name && <span className="mt-2 block text-sm text-ember">{errors.name}</span>}
                    </label>
                    <label className="block">
                      <span className="microlabel text-smoke">Email</span>
                      <input
                        className={fieldBase}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                        inputMode="email"
                      />
                      {errors.email && <span className="mt-2 block text-sm text-ember">{errors.email}</span>}
                    </label>
                  </div>

                  <label className="block">
                    <span className="microlabel text-smoke">Company</span>
                    <input
                      className={fieldBase}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Where do you work?"
                      autoComplete="organization"
                    />
                  </label>

                  <label className="block">
                    <span className="microlabel text-smoke">The ambition</span>
                    <textarea
                      className={`${fieldBase} min-h-[120px] resize-y`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={"We’re a 12-year-old brand that needs to feel 3 years old again…"}
                    />
                    {errors.message && (
                      <span className="mt-2 block text-sm text-ember">{errors.message}</span>
                    )}
                  </label>

                  <button
                    type="submit"
                    className="microlabel group inline-flex items-center gap-4 rounded-full bg-ember px-9 py-4 text-ink transition-all duration-300 hover:bg-spark hover:shadow-[0_0_45px_rgba(255,106,19,0.4)]"
                  >
                    Send the brief
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
