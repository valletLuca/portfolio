"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Target } from "lucide-react";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { about } from "@/data/about";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PrologueSection() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <section id="prologue" className="relative bg-surface py-24">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeader
          kicker={pick(ui.prologue.kicker, lang)}
          title={pick(ui.prologue.title, lang)}
          lead={pick(ui.prologue.lead, lang)}
        />

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <p className="text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-primary">
            {pick(about.intro, lang)}
          </p>

          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-ink-muted">
              {pick(paragraph, lang)}
            </p>
          ))}
        </motion.div>

        <motion.aside
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex items-center gap-4 rounded-xl border border-edge bg-surface-alt p-5 shadow-card"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-primary">
            <Target className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="font-display text-lg font-semibold text-ink">{pick(about.objective, lang)}</p>
        </motion.aside>
      </div>
    </section>
  );
}
