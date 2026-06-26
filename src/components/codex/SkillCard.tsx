"use client";

import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  Code,
  Coffee,
  Compass,
  Container,
  Database,
  Dumbbell,
  FileCode,
  Flame,
  GitBranch,
  GlassWater,
  Languages,
  Palette,
  Rocket,
  Terminal,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { pick, useLang } from "@/lib/i18n";
import { rankLabels, type Skill, type SkillIcon } from "@/data/skills";
import { ProgressBar } from "@/components/ui/ProgressBar";

const icons: Record<SkillIcon, LucideIcon> = {
  braces: Braces,
  "file-code": FileCode,
  database: Database,
  coffee: Coffee,
  code: Code,
  palette: Palette,
  boxes: Boxes,
  atom: Atom,
  "git-branch": GitBranch,
  container: Container,
  terminal: Terminal,
  wrench: Wrench,
  cloud: Cloud,
  languages: Languages,
  dumbbell: Dumbbell,
  flame: Flame,
  users: Users,
  "glass-water": GlassWater,
  compass: Compass,
  rocket: Rocket,
};

type SkillCardProps = {
  skill: Skill;
};

export function SkillCard({ skill }: SkillCardProps) {
  const { lang } = useLang();
  const Icon = icons[skill.icon];

  return (
    <div
      tabIndex={0}
      className="group rounded-lg border border-edge bg-surface p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary focus-visible:border-primary"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="truncate font-semibold text-ink">{skill.name}</h4>
            <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-primary">
              {pick(rankLabels[skill.rank], lang)}
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar value={skill.level} label={`${skill.name} · ${skill.level}/10`} />
          </div>
        </div>
      </div>
      {/* Texte contextuel révélé au hover / focus clavier */}
      <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="pt-3 text-xs italic leading-relaxed text-ink-muted">
            {pick(skill.blurb, lang)}
          </p>
        </div>
      </div>
    </div>
  );
}
