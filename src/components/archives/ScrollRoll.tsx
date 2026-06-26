import Image from "next/image";

type ScrollRollProps = {
  /** Rouleau du haut ou du bas — chacun a son propre SVG (éclairage cohérent). */
  position: "top" | "bottom";
};

/**
 * Rouleau laqué du parchemin des Archives.
 * Le <div> conteneur est positionné et animé par ArchivesSection.tsx.
 */
export function ScrollRoll({ position }: ScrollRollProps) {
  return (
    <div className="pointer-events-none select-none">
      <Image
        src={`/assets/scroll/scroll-${position}-v2.svg`}
        alt=""
        width={1200}
        height={130}
        className="h-auto w-full"
        unoptimized
        aria-hidden="true"
      />
    </div>
  );
}
