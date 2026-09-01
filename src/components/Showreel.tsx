import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { reelFrames } from "../lib/data";
import { EASE, Reveal } from "./Reveal";

const FRAME_MS = 3.2;
const TOTAL = reelFrames.length * FRAME_MS;

function fmt(t: number) {
  const s = Math.floor(t);
  return `00:${String(s).padStart(2, "0")}`;
}

export function ShowreelPlayer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!open) return;
    setT(0);
    setPlaying(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !playing) return;
    const id = window.setInterval(() => {
      setT((prev) => (prev + 0.1 >= TOTAL ? 0 : prev + 0.1));
    }, 100);
    return () => window.clearInterval(id);
  }, [open, playing]);

  const index = Math.min(reelFrames.length - 1, Math.floor(t / FRAME_MS));
  const frame = reelFrames[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Merge Rocks showreel"
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-bone/12 bg-ink-2 shadow-[0_40px_140px_-40px_rgba(255,46,136,0.5)]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-bone/25 bg-black/50 text-bone backdrop-blur transition hover:border-accent hover:text-accent"
              aria-label="Close showreel"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-video overflow-hidden bg-black">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={frame.image}
                  src={frame.image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1.01 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={frame.word}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <p className="font-display text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
                      {frame.word}
                    </p>
                    <p className="mt-2 text-[14px] uppercase tracking-[0.22em] text-bone/70 sm:text-[16px]">
                      {frame.sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => setPlaying((p) => !p)}
                className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-bone/25 bg-black/40 text-bone backdrop-blur transition hover:border-accent hover:text-accent"
                aria-label={playing ? "Pause showreel" : "Play showreel"}
              >
                {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <span className="font-mono text-[12px] tabular-nums text-mute">
                {fmt(t)} / {fmt(TOTAL)}
              </span>
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-bone/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-100 ease-linear"
                  style={{ width: `${(t / TOTAL) * 100}%` }}
                />
              </div>
              <span className="hidden text-[11px] uppercase tracking-[0.2em] text-mute sm:inline">2K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ShowreelSection({ onPlay }: { onPlay: () => void }) {
  return (
    <section id="showreel" className="relative scroll-mt-24 py-6 sm:py-10">
      <Reveal className="shell">
        <button
          onClick={onPlay}
          className="group relative block w-full overflow-hidden rounded-[28px] border border-bone/12 bg-ink-2 text-left"
          aria-label="Play Merge Rocks showreel"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {reelFrames.map((f) => (
              <div key={f.image} className="relative aspect-[4/3] overflow-hidden sm:aspect-[3/4]">
                <img
                  src={f.image}
                  alt=""
                  className="h-full w-full object-cover opacity-45 saturate-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-bone/60 sm:text-[11px]">
                  {f.word}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 grid place-items-center">
            <div className="relative grid h-24 w-24 place-items-center rounded-full border border-bone/25 bg-ink/50 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent sm:h-28 sm:w-28">
              <Play className="h-8 w-8 fill-bone text-bone transition-colors duration-500 group-hover:fill-ink group-hover:text-ink" />
              <span className="animate-spin-slow absolute inset-[-14px] rounded-full border border-dashed border-bone/20" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-ink-2 via-ink-2/70 to-transparent p-6 sm:p-8">
            <div>
              <p className="eyebrow">Merge Rocks Showreel 2026</p>
              <p className="mt-2 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.04em]">
                Two years of shipping, in 12 seconds
              </p>
            </div>
            <span className="rounded-full border border-bone/20 px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-bone/70 transition-colors group-hover:border-accent group-hover:text-accent">
              Watch showreel
            </span>
          </div>
        </button>
      </Reveal>
    </section>
  );
}
