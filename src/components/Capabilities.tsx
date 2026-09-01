import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SectionHead } from './ui'

const items = [
  {
    title: 'Websites',
    lead: 'Flagship sites that carry a brand\u2019s whole argument.',
    body: 'Editorial storytelling, motion, headless architecture and performance budgets that keep the experience fast everywhere. We design the system, write the code and hand over something your team can actually run.',
    tags: ['Design systems', 'Headless CMS', 'Motion & 3D', 'Technical SEO', 'Accessibility'],
  },
  {
    title: 'Apps',
    lead: 'Products people keep on the first screen.',
    body: 'From discovery sprint to App Store release — research, product strategy, interface design and native or cross-platform builds, with analytics wired in from day one so every release learns something.',
    tags: ['Product strategy', 'UX research', 'iOS & Android', 'Design systems', 'Prototyping'],
  },
  {
    title: 'Custom platforms',
    lead: 'Software shaped around how your business really works.',
    body: 'Portals, dashboards, internal tools and marketplaces. We map the workflows, remove the friction and build secure, scalable platforms that make teams faster and decisions clearer.',
    tags: ['Discovery workshops', 'API design', 'Dashboards', 'Integrations', 'Cloud infra'],
  },
  {
    title: 'E-commerce',
    lead: 'Storefronts that convert and still feel like a brand.',
    body: 'Composable commerce, checkout optimisation, subscription models and retention programmes — measured on revenue per session, not on vanity metrics.',
    tags: ['Shopify Plus', 'Headless commerce', 'CRO', 'Subscriptions', 'Retention'],
  },
]

export default function Capabilities() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="capabilities"
      data-rail="Capabilities"
      data-index="02"
      data-tone="dark"
      className="relative bg-ink py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="02" label="What we make" />

        <div className="mb-12 max-w-[20ch] md:mb-16">
          <h2 className="display text-[clamp(2.4rem,7vw,6rem)] text-paper">
            Four ways to <span className="italic text-ember">ignite</span>
          </h2>
        </div>

        <div className="border-t border-paper/15">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.title} className="border-b border-paper/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-baseline gap-4 py-6 text-left md:gap-8 md:py-8"
                >
                  <span className={`microlabel shrink-0 transition-colors ${isOpen ? 'text-ember' : 'text-smoke'}`}>
                    0{i + 1}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`display block text-[clamp(1.9rem,5vw,4rem)] transition-colors duration-300 ${
                        isOpen ? 'text-ember' : 'text-paper group-hover:text-ember'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="mt-2 block font-display text-lg italic text-paper/60 md:text-xl">
                      {item.lead}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-2xl transition-transform duration-500 ${
                      isOpen ? 'rotate-45 text-ember' : 'text-paper/50'
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 md:grid-cols-12 md:gap-10 md:pl-[calc(2rem+3ch)]">
                        <p className="text-base leading-relaxed text-paper/70 md:col-span-6 md:text-lg">
                          {item.body}
                        </p>
                        <ul className="flex flex-wrap content-start gap-2 md:col-span-6">
                          {item.tags.map((tag) => (
                            <li
                              key={tag}
                              className="microlabel rounded-full border border-paper/20 px-4 py-2 text-paper/70"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <Reveal className="mt-12">
          <p className="max-w-[52ch] font-display text-xl italic text-paper/60">
            Not sure which one you need? Neither are most briefs. That’s what the first
            conversation is for.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
