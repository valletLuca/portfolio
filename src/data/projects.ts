import type { Localized } from "@/lib/i18n";

export type Project = {
  id: string;
  /** Nom propre (chaîne) ou libellé traduit (placeholder). */
  title: string | Localized;
  context: Localized;
  description: Localized;
  tags: string[];
  /** Illustration locale (WebP), tirée du dépôt du projet ; remplace le motif décoratif. */
  image?: string;
  /** Cadrage de l'image : "cover" pour une capture, "contain" pour un logo. Défaut : "cover". */
  imageFit?: "cover" | "contain";
  /** Lien vers le dépôt — remplacer les "#" par les vraies URLs. */
  github?: string;
  demo?: string;
  /** Carte "+ Ajouter une création" en pointillés. */
  isPlaceholder?: boolean;
  /** Index visuel pour varier le motif décoratif de l'illustration. */
  motif: number;
};

export const projects: Project[] = [
  {
    id: "odystras",
    title: "Ody'stras",
    context: {
      fr: "Projet Níðhöggr, BUT3 en équipe",
      en: "Níðhöggr project, 3rd year, team",
    },
    description: {
      fr: "Le grand projet imposé de 3ᵉ année (nom de code Níðhöggr), dont notre application s'appelle Ody'stras : un outil pour les agents de terrain de l'Eurométropole de Strasbourg permettant de saisir des points d'intérêt lors d'événements (coordonnées GPS, photos, commentaires), de les organiser et de simuler une navigation guidée avec détection automatique d'arrivée. Architecture full-stack : back-end .NET (ASP.NET, Entity Framework), front Angular et application mobile. C'est le projet qui m'a le plus rapproché du métier : une vraie stack .NET / Angular, du travail en équipe sur GitLab avec CI/CD, exactement ce que je retrouve aujourd'hui en alternance.",
      en: "The major imposed third-year project (codename Níðhöggr), whose app we named Ody'stras: a tool for the field agents of the Strasbourg Eurométropole to capture points of interest during events (GPS coordinates, photos, comments), organise them and simulate guided navigation with automatic arrival detection. A full-stack architecture: .NET back-end (ASP.NET, Entity Framework), Angular front-end and a mobile app. It's the project that brought me closest to the profession: a real .NET / Angular stack, teamwork on GitLab with CI/CD, exactly what I now find in my apprenticeship.",
    },
    tags: [".NET", "Angular", "Mobile", "Full-stack"],
    image: "/assets/projects/odystras.webp",
    github: "https://github.com/valletLuca/ody-stras_frontend",
    motif: 0,
  },
  {
    id: "maya",
    title: "Maya l'abeille",
    context: {
      fr: "Nuit de l'Info 2025",
      en: "Nuit de l'Info 2025",
    },
    description: {
      fr: "Jeu éducatif développé en une nuit lors de la Nuit de l'Info : on y incarne un membre du collectif NIRD chargé de convaincre un établissement scolaire d'adopter les logiciels libres et le numérique responsable. Développé en équipe sous Godot 3.x, un concentré de travail collaboratif sous contrainte de temps, comme un sprint en entreprise.",
      en: "Educational game built in a single night during Nuit de l'Info: you play a member of the NIRD collective tasked with convincing a school to adopt free software and responsible computing. Built as a team with Godot 3.x, collaborative work under tight time pressure, just like a sprint at work.",
    },
    tags: ["Godot 3.x", "GDScript", "Game jam", "Open source"],
    image: "/assets/projects/maya.webp",
    github: "https://github.com/valletLuca/open-source-rpg",
    motif: 1,
  },
  {
    id: "IUT simulator",
    title: "IUT simulator",
    context: {
      fr: "Projet universitaire, 3 mois, premier long projet",
      en: "University project, 3 months, first long project",
    },
    description: {
      fr: "Premier long projet à l'école (3 mois, en équipe de 4) : un jeu sérieux où l'on incarne le directeur d'un IUT et où l'on arbitre budget, bâtiments, étudiants et enseignants sur 15 tours répartis en trois niveaux. C'est là que j'ai appris la gestion de projet dans la durée, le travail à plusieurs sur un même dépôt Git et le maintien d'un code propre dans le temps, des réflexes désormais quotidiens en entreprise.",
      en: "First long project at school (3 months, team of 4): a serious game where you run an IUT as its director, balancing budget, buildings, students and teachers across 15 turns split into three levels. This is where I learned long-haul project management, collaborating on a shared Git repository and keeping a codebase clean over time, reflexes I now rely on daily at work.",
    },
    tags: ["C#", "Jeu sérieux", "Travail d'équipe", "Gestion de projet"],
    image: "/assets/projects/iut-simulator.webp",
    github: "https://github.com/valletLuca/IUT_simulator",
    motif: 2,
  },
  {
    id: "getdrunk",
    title: "GetDrunk",
    context: {
      fr: "Projet universitaire, 3 jours chrono",
      en: "University project, 3-day sprint",
    },
    description: {
      fr: "Sujet dévoilé le mercredi midi, démo le vendredi après-midi de la même semaine : une application Android (Kotlin) qui repère les 10 bars les plus proches par géolocalisation et en tire un au sort. L'exercice du sprint court m'a appris à livrer un produit fonctionnel sous forte contrainte de temps, une compétence qui sert chaque jour en production.",
      en: "Topic revealed Wednesday noon, demo Friday afternoon the same week: an Android app (Kotlin) that finds the 10 nearest bars by geolocation and picks one at random. The short-sprint format taught me to ship a working product under heavy time pressure, a skill that pays off every day in production.",
    },
    tags: ["Kotlin", "Android", "Géolocalisation", "Sprint"],
    image: "/assets/projects/getdrunk.webp",
    github: "https://github.com/valletLuca/get_drunk/tree/master",
    motif: 2,
  },
  {
    id: "vitaelik",
    title: "vitaeLIK",
    context: {
      fr: "Projet freelance",
      en: "Freelance project",
    },
    description: {
      fr: "Site vitrine one-page réalisé en freelance pour Isabelle Klein, naturopathe à Sarrebourg : approche, prestations, tarifs et cabinet, avec prise de contact intégrée. Mené en autonomie complète, du brief client à la mise en ligne, et optimisé pour le référencement local.",
      en: "One-page showcase site built freelance for Isabelle Klein, a naturopath in Sarrebourg: her approach, services, pricing and practice, with built-in contact. Handled end to end on my own, from client brief to deployment, and tuned for local SEO.",
    },
    tags: ["Site vitrine", "One-page", "SEO", "Freelance"],
    image: "/assets/projects/vitaelik.webp",
    demo: "https://vitae-lik.vercel.app/#accueil",
    motif: 3,
  },
  {
    id: "christine-vallet",
    title: "Christine Vallet Sophrologie",
    context: {
      fr: "Projet freelance",
      en: "Freelance project",
    },
    description: {
      fr: "Site vitrine one-page réalisé en freelance pour Christine Vallet, sophrologue : parcours, prestations détaillées, déroulé d'une séance, témoignages, FAQ et prise de rendez-vous. Conçu avec un soin particulier pour l'accessibilité et la lisibilité, à destination d'un public large.",
      en: "One-page showcase site built freelance for Christine Vallet, a sophrologist: background, detailed services, session walkthrough, testimonials, FAQ and appointment booking. Crafted with particular care for accessibility and readability, for a broad audience.",
    },
    tags: ["Site vitrine", "One-page", "Accessibilité", "Freelance"],
    image: "/assets/projects/sophro.webp",
    demo: "https://vallet-christine-sophrologue.vercel.app/",
    motif: 4,
  },
  {
    id: "portfolio-rpg",
    title: "Portfolio RPG",
    context: {
      fr: "Ce site lui-même",
      en: "This very website",
    },
    description: {
      fr: "Le grimoire que vous êtes en train de feuilleter : un portfolio pensé comme un jeu de rôle, bilingue, animé et responsive. Next.js et Tailwind pour la structure, Three.js et Framer Motion pour la mise en scène, un terrain de jeu pour explorer des technologies front au-delà de ma stack habituelle.",
      en: "The grimoire you are currently leafing through: a portfolio designed as a role-playing game, bilingual, animated and responsive. Next.js and Tailwind for the structure, Three.js and Framer Motion for the staging, a playground to explore front-end tech beyond my usual stack.",
    },
    tags: ["Next.js", "Three.js", "Tailwind"],
    image: "/assets/projects/portfolio.webp",
    demo: "#",
    motif: 5,
  },
  {
    id: "placeholder",
    title: {
      fr: "+ Ajouter une création",
      en: "+ add a creation"
    },
    context: {
      fr: "Quête en cours…",
      en: "Quest in progress…",
    },
    description: {
      fr: "Cette vitrine attend sa prochaine création. Revenez bientôt, l'atelier ne dort jamais.",
      en: "This display awaits its next creation. Come back soon, the workshop never sleeps.",
    },
    tags: [],
    isPlaceholder: true,
    motif: 6,
  },
];
