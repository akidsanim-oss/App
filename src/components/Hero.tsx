import { useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Star } from "lucide-react";
import { EASE } from "./Reveal";

const stats = [
  { value: "100+", label: "Startups shipped" },
  { value: "4.9", label: "Average rating" },
  { value: "26", label: "Design awards" },
  { value: "12", label: "Years in B2B" },
];

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ onBook, onReel }: { onBook: () => void; onReel: () => void }) {
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = spotRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - r.left - 300}px, ${e.clientY - r.top - 300}px, 0)`;
  };

  return (
    <section id="top" className="relative isolate overflow-hidden pt-[120px] pb-16 sm:pt-[150px] lg:pt-[168px]">
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[900px] -translate-x-1/2 rounded-full opacity-70 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,46,136,0.5), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute right-[-12%] top-[38%] h-[460px] w-[520px] rounded-full opacity-50 blur-[120px]"
        style={{
          background: "radial-gradient(closest-side, rgba(139,92,255,0.55), transparent 70%)",
          animationDelay: "-6s",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246,242,236,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(246,242,236,0.05) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000, transparent 75%)",
        }}
      />

      <div onMouseMove={handleMove} className="shell relative">
        <div
          ref={spotRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-10 hidden h-[600px] w-[600px] rounded-full lg:block"
          style={{
            background: "radial-gradient(closest-side, rgba(255,46,136,0.13), transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-bone/15 bg-bone/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-bone/75 backdrop-blur">
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Booking Q3 · 2 slots left
          </span>
          <span className="hidden items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] text-mute sm:inline-flex">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            4.9 on Clutch
          </span>
        </motion.div>

        <h1 className="mt-7 font-display text-[clamp(2.7rem,8.4vw,7.4rem)] font-extrabold leading-[0.93] tracking-[-0.045em]">
          <Line delay={0.08}>Product, brand,</Line>
          <Line delay={0.18}>
            and <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">web UX design</span>
          </Line>
          <Line delay={0.28}>for B2B, SaaS &amp; Fintech</Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-9 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-[32ch] text-[17px] leading-[1.55] text-mute">
            We help startups from Angel/Seed to Series A/B reach a top-tier league — with design that raises
            rounds, not just moodboards.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={onBook} className="btn btn-accent group">
              Book a call
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button onClick={onReel} className="btn btn-ghost group">
              <Play className="h-4 w-4 fill-current" />
              Watch showreel
            </button>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="hairline mt-14 grid grid-cols-2 gap-x-6 gap-y-8 pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-none tracking-[-0.04em]">
                {s.value}
              </dt>
              <dd className="mt-2 text-[13px] uppercase tracking-[0.16em] text-mute">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
