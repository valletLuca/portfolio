import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** "dark" pour les fonds sombres (taverne, écran titre). */
  tone?: "light" | "dark";
};

export function Badge({ children, tone = "light" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-edge bg-accent-soft px-2.5 py-0.5 font-mono text-xs ${
        tone === "dark" ? "text-accent" : "text-primary"
      }`}
    >
      {children}
    </span>
  );
}
