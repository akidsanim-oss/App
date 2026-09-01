import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Showreel", href: "#showreel" },
  { label: "Clients", href: "#clients" },
  { label: "Reviews", href: "#reviews" },
];

export function Mark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.4l2 6.3 5.6-3-3.1 5.6 6.4 1.7-6.4 1.7 3.1 5.6-5.6-3-2 6.3-2-6.3-5.6 3 3.1-5.6L.9 12l6.4-1.7-3.1-5.6 5.6 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Nav({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Merge Rocks home">
            <Mark className="h-[18px] w-[18px] text-accent transition-transform duration-500 hover:rotate-90" />
            <span className="font-display text-[17px] font-extrabold tracking-[-0.03em]">
              merge<span className="text-accent">.</span>rocks
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[14px] text-bone/70 transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onBook} className="btn btn-accent group hidden !px-6 !py-3 text-[14px] sm:inline-flex">
              Book a call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-[72px] items-center justify-between">
              <span className="font-display text-[17px] font-extrabold">
                merge<span className="text-accent">.</span>rocks
              </span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-bone/15"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="shell mt-10 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="font-display text-[13vw] font-extrabold leading-[1.05] tracking-[-0.04em]"
                >
                  {l.label}
                </motion.a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="btn btn-accent group mt-8 w-full"
              >
                Book a call
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
