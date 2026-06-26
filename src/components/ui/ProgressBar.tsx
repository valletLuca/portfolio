"use client";

import { motion, useReducedMotion } from "framer-motion";

type ProgressBarProps = {
  /** Valeur courante (0 → max). */
  value: number;
  max?: number;
  label: string;
};

/** Barre de mana/XP — fond parchemin, remplissage or → rouge brique. */
export function ProgressBar({ value, max = 10, label }: ProgressBarProps) {
  const reduceMotion = useReducedMotion();
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className="h-2.5 w-full overflow-hidden rounded-full border border-edge bg-surface-alt"
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))",
        }}
        initial={reduceMotion ? { width: `${percent}%` } : { width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
