import { clients } from "../lib/data";
import { Reveal } from "./Reveal";

function Row({ items, reverse = false, delay = 0 }: { items: string[]; reverse?: boolean; delay?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee py-3">
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="group mr-3 flex shrink-0 items-center gap-3 rounded-full border border-bone/10 bg-bone/[0.03] px-6 py-3.5 transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.07] sm:mr-4 sm:px-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            <span
              className={`whitespace-nowrap text-bone/80 transition-colors group-hover:text-bone ${
                i % 4 === 1
                  ? "font-serif text-[19px] italic sm:text-[22px]"
                  : "font-display text-[16px] font-semibold tracking-[-0.02em] sm:text-[19px]"
              }`}
            >
              {name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section id="clients" className="relative scroll-mt-24 py-20 sm:py-24">
      <Reveal className="shell mb-10 flex flex-col items-start gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">Chosen by leaders in best companies</p>
        <p className="text-[13px] text-mute">
          <span className="text-bone">27</span> funded teams · 9 countries · 0 NDAs broken
        </p>
      </Reveal>

      <div className="flex flex-col gap-2 sm:gap-3">
        <Row items={clients.slice(0, half)} />
        <Row items={clients.slice(half)} reverse delay={-12} />
      </div>
    </section>
  );
}
