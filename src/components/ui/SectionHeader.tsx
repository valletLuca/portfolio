type SectionHeaderProps = {
  kicker: string;
  title: string;
  lead: string;
  /** "dark" pour les zones sur fond sombre. */
  tone?: "light" | "dark";
};

export function SectionHeader({ kicker, title, lead, tone = "light" }: SectionHeaderProps) {
  const isDark = tone === "dark";
  return (
    <header className="mx-auto mb-14 max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">{kicker}</p>
      <h2
        className={`mt-3 font-display text-4xl font-bold md:text-5xl ${
          isDark ? "text-on-deep" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className="ornament-line mx-auto mt-5 w-48" aria-hidden="true" />
      <p className={`mt-5 italic ${isDark ? "text-on-deep-muted" : "text-ink-muted"}`}>{lead}</p>
    </header>
  );
}
