import type { Localized } from "@/lib/i18n";

export type TimelineKind = "work" | "school" | "side";

export type TimelineEntry = {
  id: string;
  period: Localized;
  title: Localized;
  place: Localized;
  details: Localized[];
  kind: TimelineKind;
};

export const timeline: TimelineEntry[] = [
  {
    id: "alternance-cnam",
    period: { fr: "Sept. 2026 → Août 2029", en: "Sep 2026 → Aug 2029" },
    title: { fr: "Alternant développeur", en: "Apprentice developer" },
    place: { fr: "Sully Group, Schiltigheim", en: "Sully Group, Schiltigheim" },
    details: [
      {
        fr: "Formation ingénieur SI et développement au CNAM",
        en: "IS & software engineering degree at CNAM",
      },
      {
        fr: "Montée en compétences sur des projets clients d'envergure",
        en: "Growing into large-scale client projects",
      },
    ],
    kind: "work",
  },
  {
    id: "alternance-but3",
    period: { fr: "Sept. 2025 → Août 2026", en: "Sep 2025 → Aug 2026" },
    title: { fr: "Alternant développeur", en: "Apprentice developer" },
    place: { fr: "Sully Group, Schiltigheim", en: "Sully Group, Schiltigheim" },
    details: [
      {
        fr: "Maintenance évolutive d'une application .NET/Angular",
        en: "Evolutive maintenance of a .NET/Angular application",
      },
      {
        fr: "Gestion des retours client post-déploiement",
        en: "Handling post-deployment client feedback",
      },
      {
        fr: "Développement de nouvelles fonctionnalités selon les besoins métier",
        en: "Building new features driven by business needs",
      },
    ],
    kind: "work",
  },
  {
    id: "barman-2025",
    period: { fr: "Été 2025", en: "Summer 2025" },
    title: { fr: "Barman", en: "Bartender" },
    place: { fr: "Le Cokoon Guinguette, Nancy", en: "Le Cokoon Guinguette, Nancy" },
    details: [
      {
        fr: "Service en plein rush : gestion du stress, de la caisse et de la relation client",
        en: "Service in full rush: managing stress, the till and customer relations",
      },
    ],
    kind: "side",
  },
  {
    id: "stage-2025",
    period: { fr: "Avril → Juin 2025", en: "Apr → Jun 2025" },
    title: { fr: "Stage développeur (10 sem.)", en: "Developer internship (10 wks)" },
    place: { fr: "Sully Group", en: "Sully Group" },
    details: [
      {
        fr: "Refonte d'un outil hotline .NET Core / Angular",
        en: "Rebuild of a hotline tool in .NET Core / Angular",
      },
      {
        fr: "Batch de synchronisation de données en C#",
        en: "Data synchronisation batch in C#",
      },
      {
        fr: "Première immersion dans une équipe de développement professionnelle",
        en: "First immersion in a professional development team",
      },
    ],
    kind: "work",
  },
  {
    id: "but3",
    period: { fr: "2025 – 2026", en: "2025 – 2026" },
    title: { fr: "BUT Informatique, 3ᵉ année", en: "BUT Computer Science, 3rd year" },
    place: { fr: "IUT Robert Schuman", en: "IUT Robert Schuman" },
    details: [
      {
        fr: "CI/CD, Docker, gestion d'équipe",
        en: "CI/CD, Docker, team management",
      },
      {
        fr: "Conduite de projet et déploiement continu sur des applications complètes",
        en: "Project leadership and continuous deployment on full applications",
      },
      {
        fr: "Traitement d'images : convolution, histogrammes et filtres",
        en: "Image processing: convolution, histograms and filters",
      },
      {
        fr: "Initiation au machine learning : perceptron et réseaux de neurones",
        en: "Intro to machine learning: perceptron and neural networks",
      },
      {
        fr: "Tests logiciels (unitaires et fonctionnels)",
        en: "Software testing (unit and functional)",
      },
    ],
    kind: "school",
  },
  {
    id: "but2",
    period: { fr: "2024 – 2025", en: "2024 – 2025" },
    title: { fr: "BUT Informatique, 2ᵉ année", en: "BUT Computer Science, 2nd year" },
    place: { fr: "IUT Robert Schuman", en: "IUT Robert Schuman" },
    details: [
      {
        fr: "SQL, PHP, TypeScript, architecture logicielle",
        en: "SQL, PHP, TypeScript, software architecture",
      },
      {
        fr: "Premiers projets longs en équipe, dont IUT simulator",
        en: "First long-form team projects, including IUT simulator",
      },
    ],
    kind: "school",
  },
  {
    id: "barman-2024",
    period: { fr: "Été 2024", en: "Summer 2024" },
    title: { fr: "Barman", en: "Bartender" },
    place: {
      fr: "La Grande Côte, Saint-Palais-sur-Mer",
      en: "La Grande Côte, Saint-Palais-sur-Mer",
    },
    details: [
      {
        fr: "Premier été en salle : rythme soutenu et sens du collectif",
        en: "First summer on the floor: fast pace and team spirit",
      },
    ],
    kind: "side",
  },
  {
    id: "but1",
    period: { fr: "2023 – 2024", en: "2023 – 2024" },
    title: { fr: "BUT Informatique, 1ʳᵉ année", en: "BUT Computer Science, 1st year" },
    place: { fr: "IUT Robert Schuman", en: "IUT Robert Schuman" },
    details: [
      {
        fr: "C#, Java, HTML/CSS, SQL",
        en: "C#, Java, HTML/CSS, SQL",
      },
      {
        fr: "Découverte des fondamentaux de la programmation et de l'algorithmique",
        en: "Discovering the fundamentals of programming and algorithms",
      },
    ],
    kind: "school",
  },
  {
    id: "bac",
    period: { fr: "2020 – 2023", en: "2020 – 2023" },
    title: { fr: "Bac général", en: "High school diploma" },
    place: { fr: "Lycée Saint Antoine, Phalsbourg", en: "Lycée Saint Antoine, Phalsbourg" },
    details: [
      { fr: "Mention Assez Bien", en: "With honours" },
      { fr: "BIA mention Très Bien, major de promo (2020)", en: "BIA with highest honours, top of the class (2020)" },
    ],
    kind: "school",
  },
];
