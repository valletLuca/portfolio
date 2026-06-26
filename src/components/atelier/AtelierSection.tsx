"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "./ProjectCard";

export function AtelierSection() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();

  return (
    <section id="atelier" className="texture-grain relative bg-surface-alt py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          kicker={pick(ui.atelier.kicker, lang)}
          title={pick(ui.atelier.title, lang)}
          lead={pick(ui.atelier.lead, lang)}
        />
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
