"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";

const entries = [
  { href: "#prologue", label: ui.landing.newGame },
  { href: "#taverne", label: ui.landing.loadGame },
] as const;

export function MenuRPG() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <nav aria-label="Menu principal" className="mt-14">
      <ul className="flex flex-col items-center gap-4">
        {entries.map((entry, index) => (
          <motion.li
            key={entry.href}
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + index * 0.35, duration: 0.6 }}
          >
            <a
              href={entry.href}
              className="group flex items-center gap-3 px-4 py-2 font-mono text-base text-on-deep-muted transition-all duration-200 hover:text-accent focus-visible:text-accent sm:text-lg"
            >
              <span
                aria-hidden="true"
                className="text-primary opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                ▸
              </span>
              <span className="tracking-wider group-hover:translate-x-1 transition-transform duration-200">
                {pick(entry.label, lang)}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
