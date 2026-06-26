"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { pick, useLang } from "@/lib/i18n";
import { ui } from "@/data/ui";
import { timeline } from "@/data/timeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineBlock } from "./TimelineBlock";
import { ScrollRoll } from "./ScrollRoll";

export function ArchivesSection() {
  const { lang } = useLang();
  const reduceMotion = useReducedMotion();
  const parchmentRef = useRef<HTMLDivElement>(null);

  // Progression liée au scroll dans la zone du parchemin : démarre quand son
  // haut atteint 80% du viewport, se termine quand son bas touche le bas du
  // viewport (tout est donc déroulé dès qu'on peut voir la fin).
  const { scrollYProgress } = useScroll({
    target: parchmentRef,
    offset: ["start 0.8", "end end"],
  });

  // Le rouleau du haut est l'ancrage fixe de l'animation : seul le bord bas
  // du clip descend (100% → 0%), révélant le contenu du haut vers le bas.
  // Le rouleau du bas est positionné via `bottom` en pourcentage (et non
  // translateY, dont les % se réfèrent à l'élément lui-même) pour rester
  // exactement synchronisé avec le bord découpé.
  const bottomInset = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const clipPath = useMotionTemplate`inset(0% 0% ${bottomInset} 0% round 4px)`;

  // prefers-reduced-motion : parchemin entièrement déroulé d'emblée.
  const isStatic = reduceMotion === true;

  return (
    <section id="archives" className="texture-grain relative bg-surface py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeader
          kicker={pick(ui.archives.kicker, lang)}
          title={pick(ui.archives.title, lang)}
          lead={pick(ui.archives.lead, lang)}
        />
      </div>

      {/* Largeur du parchemin : ajuster le `sm:w-[60vw]` ci-dessous
          (plein écran moins le padding sur mobile, centré via mx-auto) */}
      <div className="relative z-10 mx-auto w-full px-6 sm:w-[60vw] sm:px-0">
        <div ref={parchmentRef} className="relative">
          {/* Feuille de parchemin, découpée entre les deux rouleaux */}
          {/* mx-[5.83%] = 70/1200 : aligne la feuille sur la zone parchemin
              des rouleaux SVG (et sur le motif utile de la tuile de fond) */}
          <motion.div
            className="parchment-sheet relative mx-[5.83%]"
            style={isStatic ? undefined : { clipPath }}
          >
            {/* padding latéral ≥ bordures à losanges de la tuile (~4% + marge) */}
            <div className="px-[9%] py-14">
              <ol className="relative">
                {/* Ligne continue reliant les tomes */}
                <div
                  className="absolute bottom-4 left-[1.25rem] top-2 w-px -translate-x-1/2 md:left-[10.25rem]"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-accent), var(--color-primary), var(--color-accent))",
                  }}
                  aria-hidden="true"
                />
                {timeline.map((entry) => (
                  <TimelineBlock key={entry.id} entry={entry} />
                ))}
              </ol>
            </div>
          </motion.div>

          {/* Rouleau du haut — statique, juste sous le titre : il ne bouge jamais */}
          <div className="absolute inset-x-0 top-0 z-20 -translate-y-1/2" aria-hidden="true">
            <ScrollRoll position="top" />
          </div>
          {/* Rouleau du bas — suit le bord bas du clip ; le léger décalage de
              1.2rem le rend distinguable du rouleau du haut à l'état fermé */}
          <motion.div
            className="absolute inset-x-0 z-20 translate-y-[calc(50%+1.2rem)]"
            style={{ bottom: isStatic ? "0%" : bottomInset }}
            aria-hidden="true"
          >
            <ScrollRoll position="bottom" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
