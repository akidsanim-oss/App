import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { EASE, Reveal } from "./Reveal";

const reasons = [
  "Fill out the form — we'll get back to you within 24 hours",
  "Get a tailored proposal specifically for your project",
  "Kick-start your project with our expert team",
];

const sources = ["Clutch", "Awwwards", "Google", "Referral", "LinkedIn", "Other"];

type Errors = { name?: string; email?: string; message?: string };

export default function Contact({ formRef }: { formRef: React.RefObject<HTMLFormElement | null> }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", email: "", source: "", message: "" });

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = "A valid work email, please";
    if (values.message.trim().length < 10) next.message = "A sentence or two about the project helps";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    window.setTimeout(() => setStatus("success"), 950);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-45 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,46,136,0.45), transparent 70%)" }}
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              <p className="eyebrow">Let&apos;s begin</p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
                <span className="font-serif font-normal italic text-accent">Begin</span>
                <br />
                something good
              </h2>

              <ol className="mt-9 space-y-5">
                {reasons.map((r, i) => (
                  <li key={r} className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/50 text-[12px] font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-[1.55] text-bone/85">{r}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative hidden overflow-hidden rounded-3xl border border-bone/10 lg:block">
              <img
                src="/images/contact-orb.png"
                alt="Abstract chrome and pink glass sculpture"
                className="h-56 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <p className="absolute bottom-5 left-6 right-6 text-[13px] text-bone/80">
                Prefer async? Write to <span className="text-accent">hello@merge.rocks</span>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[28px] border border-bone/10 bg-ink-2/80 p-6 backdrop-blur-sm sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[440px] flex-col items-start justify-center gap-5"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-ink">
                    <Check className="h-7 w-7" strokeWidth={3} />
                  </span>
                  <h3 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-[-0.04em]">
                    Thanks! We&apos;ll get back to you soon.
                  </h3>
                  <p className="max-w-[38ch] text-[15px] leading-[1.6] text-mute">
                    Your brief is in the queue. Expect a reply from a real designer — usually within 24 hours,
                    always with questions.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setValues({ name: "", email: "", source: "", message: "" });
                    }}
                    className="btn btn-ghost group mt-2"
                  >
                    Send another brief
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-mute">
                        Name
                      </label>
                      <input
                        id="name"
                        className="field"
                        placeholder="Ada Lovelace"
                        value={values.name}
                        onChange={set("name")}
                      />
                      {errors.name && <p className="mt-2 text-[12px] text-accent">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-mute">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="field"
                        placeholder="ada@company.com"
                        value={values.email}
                        onChange={set("email")}
                      />
                      {errors.email && <p className="mt-2 text-[12px] text-accent">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="source" className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-mute">
                      How did you find us?
                    </label>
                    <select
                      id="source"
                      className="field appearance-none"
                      value={values.source}
                      onChange={set("source")}
                    >
                      <option value="" className="bg-ink-2">
                        Select an option
                      </option>
                      {sources.map((s) => (
                        <option key={s} value={s} className="bg-ink-2">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-[12px] uppercase tracking-[0.16em] text-mute">
                      Your request
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="field resize-none"
                      placeholder="We're raising a Series A and our product outgrew its design…"
                      value={values.message}
                      onChange={set("message")}
                    />
                    {errors.message && <p className="mt-2 text-[12px] text-accent">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={status === "sending"} className="btn btn-accent group w-full disabled:opacity-70">
                    {status === "sending" ? "Sending…" : "Submit"}
                    {status !== "sending" && (
                      <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </button>

                  <p className="text-center text-[12px] leading-[1.6] text-mute">
                    By submitting this form you agree to our{" "}
                    <a
                      href="https://merge.rocks/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-bone/30 underline-offset-4 transition hover:text-accent"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
