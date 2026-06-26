"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { skillCategories } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillCard } from "./SkillCard";

export function CodexSection() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <section id="codex" className="texture-grain relative bg-surface-alt py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <SectionHeader
          kicker={pick(ui.codex.kicker, lang)}
          title={pick(ui.codex.title, lang)}
          lead={pick(ui.codex.lead, lang)}
        />
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 flex items-center gap-4">
                <h3 className="shrink-0 font-display text-2xl font-bold text-ink">
                  {pick(category.title, lang)}
                </h3>
                <div className="ornament-line flex-1" aria-hidden="true" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
