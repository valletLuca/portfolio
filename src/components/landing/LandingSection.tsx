"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, KeyRound } from "lucide-react";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { useKonami } from "@/hooks/useKonami";
import { HeroTitle } from "./HeroTitle";
import { MenuRPG } from "./MenuRPG";

const ParticlesCursor = dynamic(() => import("./ParticlesCursor"), { ssr: false });

export function LandingSection() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [secretVisible, setSecretVisible] = useState(false);
  const burstSignal = useRef(0);

  useEffect(() => {
    setMounted(true);
    setInteractive(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useKonami(() => {
    burstSignal.current += 1;
    setSecretVisible(true);
  });

  useEffect(() => {
    if (!secretVisible) {
      return;
    }
    const timer = setTimeout(() => setSecretVisible(false), 6000);
    return () => clearTimeout(timer);
  }, [secretVisible]);

  return (
    <section
      id="titre"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-deep"
    >
      {/* Repli CSS toujours présent : sert de fond sur mobile (pas de Three.js)
          et de lueur ambiante derrière le canvas alpha sur desktop. */}
      <div className="hero-ember-static absolute inset-0" aria-hidden="true" />

      {/* Le canvas Three.js ne se monte que sur les appareils à pointeur fin
          (desktop). Sur tactile il n'y a pas de curseur : on évite ainsi tout
          le coût de parsing/exécution du bundle Three.js. */}
      {mounted && !reduceMotion && interactive && (
        <div className="absolute inset-0" aria-hidden="true">
          <ParticlesCursor burstSignal={burstSignal} interactive={interactive} />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center px-6">
        <HeroTitle />
        <MenuRPG />
      </div>

      <a
        href="#prologue"
        aria-label={pick(ui.landing.scrollHint, lang)}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-on-deep-muted transition-colors hover:text-accent"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em]">
          {pick(ui.landing.scrollHint, lang)}
        </span>
        <ChevronDown className="h-5 w-5 animate-float-slow" aria-hidden="true" />
      </a>

      <AnimatePresence>
        {secretVisible && (
          <motion.div
            role="status"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-24 z-20 mx-6 flex items-center gap-4 rounded-lg border border-edge bg-deep-warm px-6 py-4 shadow-ember"
          >
            <KeyRound className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-display text-lg font-bold text-accent">
                {pick(ui.landing.konamiTitle, lang)}
              </p>
              <p className="font-mono text-sm text-on-deep">
                {pick(ui.landing.konamiBody, lang)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
