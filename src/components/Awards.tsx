import { awards } from "../lib/data";
import { Reveal } from "./Reveal";

function Laurel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M22 54c-8-4-12-12-11-22 6 1 11 4 14 9" />
        <path d="M18 44c-4-1-7-4-9-8 5-1 9 0 12 3" />
        <path d="M17 33c-3-3-5-7-5-11 5 1 8 3 10 7" />
        <path d="M42 54c8-4 12-12 11-22-6 1-11 4-14 9" />
        <path d="M46 44c4-1 7-4 9-8-5-1-9 0-12 3" />
        <path d="M47 33c3-3 5-7 5-11-5 1-8 3-10 7" />
      </g>
    </svg>
  );
}

export default function Awards() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-start gap-8 border-y border-bone/10 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-12">
            <p className="eyebrow max-w-[22ch] sm:max-w-none">Featured by top design awards</p>
            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:w-auto sm:grid-cols-5 sm:gap-6 lg:gap-10">
              {awards.map((a) => (
                <div
                  key={a.name}
                  className="group flex items-center gap-3 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Laurel className="h-9 w-9 shrink-0 text-bone/35 transition-colors duration-300 group-hover:text-accent" />
                  <div>
                    <p className="text-[13px] font-semibold leading-tight tracking-[-0.01em] text-bone/90">
                      {a.name}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-mute">{a.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
