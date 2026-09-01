import { ArrowUpRight } from "lucide-react";
import { servicesTicker } from "../lib/data";
import { Mark } from "./Nav";
import { Reveal } from "./Reveal";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/merge-rocks/" },
  { label: "X / Twitter", href: "https://twitter.com/mergerocks" },
  { label: "Dribbble", href: "https://dribbble.com/mergerocks" },
  { label: "Behance", href: "https://www.behance.net/mergerocks" },
];

export default function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 pt-16">
      <div className="marquee select-none">
        <div className="marquee-track marquee-track--fast">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className={`mr-8 whitespace-nowrap font-display text-[13vw] font-extrabold leading-[1] tracking-[-0.05em] ${
                i % 2 === 0 ? "text-outline" : "text-accent"
              }`}
            >
              LET&apos;S TALK —
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 border-y border-bone/10 py-4">
        <div className="marquee">
          <div className="marquee-track marquee-track--reverse">
            {[...servicesTicker, ...servicesTicker, ...servicesTicker, ...servicesTicker].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="mr-6 flex items-center gap-6 whitespace-nowrap text-[13px] uppercase tracking-[0.2em] text-mute"
              >
                {s}
                <span className="h-1 w-1 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5">
              <Mark className="h-[18px] w-[18px] text-accent" />
              <span className="font-display text-[17px] font-extrabold tracking-[-0.03em]">
                merge<span className="text-accent">.</span>rocks
              </span>
            </a>
            <p className="mt-4 max-w-[30ch] text-[14px] leading-[1.6] text-mute">
              Product, brand and web UX design agency for B2B, SaaS and Fintech teams.
            </p>
            <button onClick={onBook} className="btn btn-accent group mt-6 !px-6 !py-3 text-[14px]">
              Book a call
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 space-y-3 text-[14px] text-bone/75">
              {[
                { label: "Our works", href: "#work" },
                { label: "Showreel", href: "#showreel" },
                { label: "Clients", href: "#clients" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="eyebrow">Services</p>
            <ul className="mt-5 space-y-3 text-[14px] text-bone/75">
              {servicesTicker.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 space-y-3 text-[14px] text-bone/75">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    {s.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:hello@merge.rocks" className="transition-colors hover:text-accent">
                  hello@merge.rocks
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="shell flex flex-col items-start justify-between gap-3 border-t border-bone/10 py-7 text-[12px] text-mute sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Merge Rocks. All rights reserved.</p>
        <p>
          Built as a design study · Inspired by{" "}
          <a
            href="https://merge.rocks"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-bone/30 underline-offset-4 transition hover:text-accent"
          >
            merge.rocks
          </a>
        </p>
      </div>
    </footer>
  );
}
