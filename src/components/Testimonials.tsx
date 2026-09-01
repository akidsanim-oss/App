import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "../lib/data";
import { EASE, Reveal } from "./Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = testimonials[index];

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  const initials = item.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <section id="reviews" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,255,0.4), transparent 70%)" }}
      />

      <div className="shell relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">What our clients say</p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,5.4vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
                Rated average <span className="font-serif font-normal italic text-accent">4.9</span> by clients
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-[13px] uppercase tracking-[0.16em] text-mute">Recognized as top by Clutch</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-12 rounded-[28px] border border-bone/10 bg-ink-2/70 p-7 backdrop-blur-sm sm:mt-16 sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="min-h-[260px] sm:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <blockquote className="max-w-[46ch] font-serif text-[clamp(1.4rem,3.1vw,2.4rem)] leading-[1.25] tracking-[-0.01em] text-bone">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${item.tint} font-display text-[14px] font-extrabold text-ink`}
                    >
                      {initials}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-bone">{item.name}</span>
                      <span className="block text-[13px] text-mute">{item.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between gap-6 border-t border-bone/10 pt-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 transition hover:border-accent hover:text-accent"
                  aria-label="Previous review"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 transition hover:border-accent hover:text-accent"
                  aria-label="Next review"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-10 bg-accent" : "w-4 bg-bone/20 hover:bg-bone/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
