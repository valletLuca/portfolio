import type { Localized } from "@/lib/i18n";

/**
 * Texte de présentation (« qui je suis ») — relie le parcours IUT et les
 * expériences personnelles à l'identité professionnelle visée.
 * Contenu séparé du rendu, à la manière des autres fichiers de `data/`.
 */
export const about = {
  intro: {
    fr: "Je m'appelle Luca Vallet, développeur en troisième année de BUT Informatique à l'IUT Robert Schuman, en alternance chez Sully Group. Au quotidien, je fais vivre des applications métier en .NET et Angular, de la nouvelle fonctionnalité au suivi des retours client une fois en production.",
    en: "I'm Luca Vallet, a third-year Computer Science (BUT) student at IUT Robert Schuman, working as an apprentice at Sully Group. Day to day, I keep business applications alive in .NET and Angular, from new features to handling client feedback once in production.",
  },
  paragraphs: [
    {
      fr: "Chaque étape de mon parcours a forgé une compétence concrète. Mon premier long projet à l'IUT, IUT simulator, m'a appris à mener un développement à plusieurs sur trois mois et à tenir un dépôt Git en équipe. Les sprints courts comme GetDrunk ou la Nuit de l'Info m'ont entraîné à livrer sous forte contrainte de temps. Et mes sites vitrines réalisés en freelance m'ont fait gérer un projet de bout en bout, du brief client à la mise en ligne, en totale autonomie.",
      en: "Every step of my journey has forged a concrete skill. My first long project at the IUT, IUT simulator, taught me to lead development as a team over three months and to maintain a shared Git repository. Short sprints like GetDrunk or Nuit de l'Info trained me to ship under heavy time pressure. And the showcase sites I built freelance had me run a project end to end, from client brief to deployment, entirely on my own.",
    },
    {
      fr: "En dehors du code, deux étés derrière un bar m'ont donné le sang-froid de gérer le rush et le sens du collectif. Le sport entretient mon endurance et ma discipline, et une curiosité tenace me pousse à apprendre une techno de plus à chaque projet.",
      en: "Away from code, two summers behind a bar gave me the composure to handle the rush and a strong sense of teamwork. Sport keeps my stamina and discipline sharp, and a stubborn curiosity pushes me to learn one more technology with every project.",
    },
    {
      fr: "Mon cap est clair : devenir ingénieur en systèmes d'information. Dès septembre 2026, je poursuis en formation d'ingénieur au CNAM, toujours en alternance chez Sully Group, pour monter en compétences sur des projets clients d'envergure. À terme, je veux concevoir des applications robustes et utiles, au plus près des besoins métier.",
      en: "My direction is clear: to become an information systems engineer. From September 2026, I continue with an engineering degree at CNAM, still as an apprentice at Sully Group, to grow on large-scale client projects. Ultimately, I want to design robust, useful applications that stay close to real business needs.",
    },
  ],
  objective: {
    fr: "Objectif : ingénieur en développement logiciel, là où la rigueur du .NET rencontre le besoin métier.",
    en: "Goal: software engineer, where the rigour of .NET meets real business needs.",
  },
} as const;

export type About = typeof about;
export type { Localized };
