import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "mr-cookie-ok";

export default function CookieBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const id = window.setTimeout(() => setShow(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[70] sm:right-auto sm:max-w-[380px]"
        >
          <div className="flex items-start gap-4 rounded-2xl border border-bone/12 bg-ink-2/90 p-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-[13px] leading-[1.55] text-bone/85">
                We use cookies to improve your user experience.{" "}
                <a
                  href="https://merge.rocks/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-bone/30 underline-offset-4 transition hover:text-accent"
                >
                  Learn more
                </a>
              </p>
              <button
                onClick={accept}
                className="mt-3 rounded-full bg-accent px-5 py-2 text-[13px] font-medium text-ink transition hover:bg-[#ff4d9a]"
              >
                Fine by me!
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
