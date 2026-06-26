"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Plus } from "lucide-react";

/** Tailles affichées : 1 colonne en mobile, 2 en md, 3 en lg (~362px). */
const CARD_IMAGE_SIZES = "(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 362px";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";

type ProjectCardProps = {
  project: Project;
};

/** Motifs décoratifs en dégradés — varient selon l'index, zéro image externe. */
function motifStyle(motif: number): React.CSSProperties {
  const angle = 35 + motif * 47;
  const spot = 18 + (motif % 4) * 22;
  return {
    background: [
      `radial-gradient(circle at ${spot}% 30%, var(--color-accent), transparent 55%)`,
      `radial-gradient(circle at ${100 - spot}% 75%, var(--color-blood), transparent 60%)`,
      `linear-gradient(${angle}deg, var(--color-deep), var(--color-primary))`,
    ].join(", "),
  };
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();
  const title = typeof project.title === "string" ? project.title : pick(project.title, lang);

  if (project.isPlaceholder) {
    return (
      <motion.article
        variants={reduceMotion ? undefined : cardVariants}
        className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-edge p-8 text-center text-ink-muted"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-primary">
          <Plus className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
        <p className="text-sm italic">{pick(project.description, lang)}</p>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={reduceMotion ? undefined : cardVariants}
      className="group relative flex flex-col rounded-xl border border-edge bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-hover"
    >
      {/* Illustration : capture du dépôt si disponible, sinon motif décoratif */}
      <div className="relative h-40 rounded-t-xl">
        <div className="absolute inset-0 overflow-hidden rounded-t-xl">
          {project.image ? (
            project.imageFit === "contain" ? (
              <div className="absolute inset-0" style={motifStyle(project.motif)}>
                <Image
                  src={project.image}
                  alt={`${pick(ui.atelier.preview, lang)} : ${title}`}
                  fill
                  sizes={CARD_IMAGE_SIZES}
                  className="object-contain p-5"
                />
              </div>
            ) : (
              <Image
                src={project.image}
                alt={`${pick(ui.atelier.preview, lang)} : ${title}`}
                fill
                sizes={CARD_IMAGE_SIZES}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )
          ) : (
            <div
              className="absolute -inset-3 scale-110 blur-[3px] transition-transform duration-500 group-hover:scale-125"
              style={motifStyle(project.motif)}
              aria-hidden="true"
            />
          )}
        </div>
        {/* Cartouche-étiquette à cheval entre l'image et le parchemin.
            Déborde légèrement du bord gauche de la carte, rotation alternée
            selon le motif pour un effet "collé à la main". */}
        <h3
          className={`absolute -left-2 bottom-0 z-10 max-w-[calc(100%-0.5rem)] translate-y-1/2 ${
            project.motif % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]"
          }`}
        >
          <span className="inline-block rounded-sm border border-accent bg-deep px-4 py-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-surface shadow-[0_2px_4px_var(--shadow-strong)]">
            {title}
          </span>
        </h3>
      </div>

      {/* Corps */}
      <div className="flex flex-1 flex-col gap-3 px-5 pb-4 pt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          {pick(project.context, lang)}
        </p>
        <p className="text-sm leading-relaxed text-ink-muted">{pick(project.description, lang)}</p>
        <div className="mt-auto flex flex-wrap gap-2 pb-1">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      {/* Ligne poinçonnée aux 3/4 de la carte — les cercles reprennent la
          couleur du fond de section pour passer pour de vrais trous découpés. */}
      <div className="relative" aria-hidden="true">
        <span className="punch-hole absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" />
        <span className="punch-hole absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" />
        <div className="mx-4 border-t-2 border-dashed border-edge" />
      </div>

      {/* Pied : liens */}
      <div className="flex items-center gap-3 px-5 py-3">
        {project.github && (
          <a
            href={project.github}
            aria-label={`${pick(ui.atelier.github, lang)} · ${title}`}
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-accent-soft hover:text-primary"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            aria-label={`${pick(ui.atelier.demo, lang)} · ${title}`}
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-accent-soft hover:text-primary"
          >
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
