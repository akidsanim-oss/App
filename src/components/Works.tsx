import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { cases, type CaseStudy } from "../lib/data";
import { EASE, Reveal } from "./Reveal";

function CaseModal({ item, onClose }: { item: CaseStudy | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[75] flex items-end justify-center bg-black/80 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.client} case study`}
        >
          <motion.article
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-bone/12 bg-ink-2 sm:rounded-3xl"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={item.image} alt={`${item.client} project`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/20 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">{item.year}</p>
                  <h3 className="mt-1.5 font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-[-0.04em]">
                    {item.client}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-bone/25 bg-ink/50 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-bone/25 bg-ink/60 backdrop-blur transition hover:border-accent hover:text-accent"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-7">
                <div>
                  <p className="eyebrow">The challenge</p>
                  <p className="mt-3 text-[16px] leading-[1.65] text-bone/85">{item.challenge}</p>
                </div>
                <div>
                  <p className="eyebrow">What we did</p>
                  <p className="mt-3 text-[16px] leading-[1.65] text-bone/85">{item.approach}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
                  {item.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-bone/10 bg-bone/[0.03] p-4">
                      <p className="font-display text-[26px] font-extrabold leading-none tracking-[-0.04em] text-accent">
                        {m.value}
                      </p>
                      <p className="mt-1.5 text-[12px] uppercase tracking-[0.14em] text-mute">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="eyebrow">Services</p>
                  <ul className="mt-3 space-y-2 text-[14px] text-bone/75">
                    {item.services.map((s) => (
                      <li key={s} className="flex items-center gap-2.5">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Works() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <Reveal className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Our works</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,5.6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              We&apos;ve helped <span className="font-serif font-normal italic text-accent">100+</span> startups
              reach a top-tier league
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="max-w-[34ch] text-[15px] leading-[1.6] text-mute">
              From Angel/Seed to Series A/B — products, brands and websites that made the next round easier to
              raise.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 border-b border-bone/30 pb-1.5 text-[14px] transition-colors hover:border-accent hover:text-accent"
            >
              View all cases
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="shell mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-2">
        {cases.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.07}>
            <button
              onClick={() => setActive(c)}
              className="group relative block w-full overflow-hidden rounded-[26px] border border-bone/10 bg-ink-2 text-left transition-colors duration-500 hover:border-accent/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
                <img
                  src={c.image}
                  alt={`${c.client} project`}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/25 to-transparent" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-bone/20 bg-ink/45 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-bone/85 backdrop-blur transition-colors duration-500 group-hover:border-accent/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-extrabold tracking-[-0.04em]">
                    {c.client}
                  </h3>
                  <p className="mt-1.5 max-w-[38ch] text-[14px] leading-[1.5] text-bone/70">{c.blurb}</p>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-bone/25 bg-ink/50 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <CaseModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
