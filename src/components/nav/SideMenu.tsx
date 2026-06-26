"use client";

import { useEffect, useState } from "react";
import { Beer, BookOpen, Crown, Hammer, ScrollText, Sparkles, type LucideIcon } from "lucide-react";
import { pick, useLang, type Localized } from "@/lib/i18n";
import { ui } from "@/data/ui";

type Zone = {
  id: string;
  label: Localized;
  icon: LucideIcon;
};

const zones: Zone[] = [
  { id: "titre", label: ui.nav.title, icon: Crown },
  { id: "prologue", label: ui.nav.prologue, icon: BookOpen },
  { id: "atelier", label: ui.nav.atelier, icon: Hammer },
  { id: "archives", label: ui.nav.archives, icon: ScrollText },
  { id: "codex", label: ui.nav.codex, icon: Sparkles },
  { id: "taverne", label: ui.nav.taverne, icon: Beer },
];

function useActiveZone(): string {
  const [active, setActive] = useState("titre");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const zone of zones) {
      const element = document.getElementById(zone.id);
      if (element) {
        observer.observe(element);
      }
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function SideMenu() {
  const { lang, toggle } = useLang();
  const active = useActiveZone();

  return (
    <>
      {/* ─── Desktop : pilule fixe à droite, centrée verticalement ─── */}
      <nav
        aria-label={pick(ui.nav.ariaLabel, lang)}
        className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block"
      >
        <ul className="flex flex-col gap-1 rounded-l-2xl border border-r-0 border-edge bg-deep px-2 py-3 shadow-card">
          {zones.map((zone) => {
            const isActive = active === zone.id;
            return (
              <li key={zone.id} className="relative">
                <a
                  href={`#${zone.id}`}
                  aria-label={pick(zone.label, lang)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-on-deep-muted hover:bg-accent-soft hover:text-accent"
                  }`}
                >
                  <zone.icon className="h-5 w-5" aria-hidden="true" />
                  {/* Label révélé au hover */}
                  <span
                    className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md border border-edge bg-deep px-3 py-1.5 font-display text-sm font-semibold text-on-deep opacity-0 shadow-card transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    aria-hidden="true"
                  >
                    {pick(zone.label, lang)}
                  </span>
                </a>
              </li>
            );
          })}
          <li className="mt-1 border-t border-edge pt-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={pick(ui.nav.langToggle, lang)}
              className="flex h-11 w-11 items-center justify-center rounded-xl font-mono text-xs font-bold uppercase text-on-deep-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </li>
        </ul>
      </nav>

      {/* ─── Mobile : barre flottante en bas ─── */}
      <nav
        aria-label={pick(ui.nav.ariaLabel, lang)}
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden"
      >
        <ul className="flex items-center gap-1 rounded-full border border-edge bg-deep px-2 py-1.5 shadow-card-hover">
          {zones.map((zone) => {
            const isActive = active === zone.id;
            return (
              <li key={zone.id}>
                <a
                  href={`#${zone.id}`}
                  aria-label={pick(zone.label, lang)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-accent-soft text-accent" : "text-on-deep-muted"
                  }`}
                >
                  <zone.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            );
          })}
          <li className="border-l border-edge pl-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={pick(ui.nav.langToggle, lang)}
              className="flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs font-bold uppercase text-on-deep-muted"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
