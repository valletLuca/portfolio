"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { TypeWriter } from "@/components/ui/TypeWriter";

export function HeroTitle() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <div className="text-center">
      <motion.h1
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="ember-glow animate-ember-pulse font-display text-6xl font-black tracking-wide text-on-deep sm:text-7xl md:text-8xl lg:text-9xl"
      >
        Luca<span className="text-primary">.</span>exe
      </motion.h1>
      <p className="mt-6 font-mono text-sm text-accent sm:text-base md:text-lg">
        <TypeWriter key={lang} text={pick(ui.landing.subtitle, lang)} startDelay={900} />
      </p>
    </div>
  );
}
