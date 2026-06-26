"use client";

import { Beer, GraduationCap, Swords } from "lucide-react";
import { pick, useLang } from "@/lib/i18n";
import type { TimelineEntry, TimelineKind } from "@/data/timeline";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const kindIcons: Record<TimelineKind, typeof Swords> = {
  work: Swords,
  school: GraduationCap,
  side: Beer,
};

type TimelineBlockProps = {
  entry: TimelineEntry;
};

export function TimelineBlock({ entry }: TimelineBlockProps) {
  const { lang } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLLIElement>(0.25);
  const Icon = kindIcons[entry.kind];

  return (
    <li
      ref={ref}
      className={`relative grid grid-cols-[2.5rem_1fr] gap-4 pb-10 transition-all duration-700 ease-out md:grid-cols-[9rem_2.5rem_1fr] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Date — badge à gauche (au-dessus du bloc sur mobile) */}
      <div className="col-start-2 mb-2 md:col-start-1 md:mb-0 md:justify-self-end md:pt-1">
        <span className="inline-flex rounded-full border border-edge bg-accent-soft px-3 py-1 font-mono text-xs font-medium text-primary">
          {pick(entry.period, lang)}
        </span>
      </div>

      {/* Jalon en losange sur la ligne */}
      <div
        className="col-start-1 row-start-1 flex justify-center pt-2 md:col-start-2"
        aria-hidden="true"
      >
        <span className="h-3 w-3 rotate-45 border border-accent bg-primary shadow-ember" />
      </div>

      {/* Tome du grimoire */}
      <div className="col-start-2 rounded-lg border border-edge bg-surface-alt p-5 shadow-card transition-colors hover:border-primary md:col-start-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{pick(entry.title, lang)}</h3>
            <p className="mt-0.5 text-sm font-medium text-primary">{pick(entry.place, lang)}</p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {entry.details.map((detail) => (
            <li key={detail.fr} className="flex gap-2 text-sm text-ink-muted">
              <span className="text-accent" aria-hidden="true">
                ❖
              </span>
              {pick(detail, lang)}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
