/**
 * Config palette — le site est entièrement piloté par les CSS custom
 * properties déclarées dans src/styles/palette.css.
 *
 * Les composants Three.js ne peuvent pas consommer `var(--…)` directement :
 * on lit donc la valeur calculée au runtime via getComputedStyle.
 */

export const PARTICLE_COLOR_VARS = {
  primary: "--color-particles-1",
  secondary: "--color-particles-2",
} as const;

/**
 * Lit la valeur calculée d'une custom property CSS sur :root.
 * Les `var()` imbriqués sont résolus par le navigateur ; le résultat
 * est un hex exploitable par THREE.Color.
 */
export function readCssColor(variable: string, fallback = "#ffffff"): string {
  if (typeof window === "undefined") {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}
