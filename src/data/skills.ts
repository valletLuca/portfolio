import type { Localized } from "@/lib/i18n";

export type SkillRank = "apprenti" | "compagnon" | "maitre" | "archimage";

/** Clés d'icônes mappées vers Lucide dans SkillCard.tsx. */
export type SkillIcon =
  | "braces"
  | "file-code"
  | "database"
  | "coffee"
  | "code"
  | "palette"
  | "boxes"
  | "atom"
  | "git-branch"
  | "container"
  | "terminal"
  | "wrench"
  | "cloud"
  | "languages"
  | "dumbbell"
  | "flame"
  | "users"
  | "glass-water"
  | "compass"
  | "rocket";

export type Skill = {
  name: string;
  /** Niveau de 0 à 10 — pilote la barre de mana. */
  level: number;
  rank: SkillRank;
  icon: SkillIcon;
  blurb: Localized;
};

export type SkillCategory = {
  id: string;
  title: Localized;
  skills: Skill[];
};

export const rankLabels: Record<SkillRank, Localized> = {
  apprenti: { fr: "Apprenti", en: "Apprentice" },
  compagnon: { fr: "Compagnon", en: "Journeyman" },
  maitre: { fr: "Maître", en: "Master" },
  archimage: { fr: "Archimage", en: "Archmage" },
};

export const skillCategories: SkillCategory[] = [
  {
    id: "langages",
    title: { fr: "Langages", en: "Languages" },
    skills: [
      {
        name: "C#",
        level: 8,
        rank: "maitre",
        icon: "braces",
        blurb: {
          fr: "Mon langage de prédilection, du back-end .NET aux jeux sérieux universitaires.",
          en: "My language of choice, from .NET back-ends to university serious games.",
        },
      },
      {
        name: "TypeScript",
        level: 8,
        rank: "maitre",
        icon: "file-code",
        blurb: {
          fr: "Le typage strict au service d'Angular et de ce portfolio.",
          en: "Strict typing in the service of Angular and this very portfolio.",
        },
      },
      {
        name: "SQL",
        level: 6,
        rank: "compagnon",
        icon: "database",
        blurb: {
          fr: "Modélisation et requêtes : des schémas relationnels aux jointures.",
          en: "Modelling and querying: from relational schemas to joins.",
        },
      },
      {
        name: "HTML/CSS",
        level: 8,
        rank: "maitre",
        icon: "palette",
        blurb: {
          fr: "La matière première de mes sites vitrines freelance, responsive et accessibles.",
          en: "The raw material of my freelance showcase sites, responsive and accessible.",
        },
      },
      {
        name: "Java",
        level: 5,
        rank: "compagnon",
        icon: "coffee",
        blurb: {
          fr: "Découvert dès la première année, mon socle de la programmation orientée objet.",
          en: "Picked up in first year, my foundation in object-oriented programming.",
        },
      },
      {
        name: "PHP",
        level: 3,
        rank: "apprenti",
        icon: "code",
        blurb: {
          fr: "Abordé en cours pour le web côté serveur et les premières API.",
          en: "Studied in class for server-side web and first APIs.",
        },
      },
    ],
  },
  {
    id: "frameworks",
    title: { fr: "Frameworks", en: "Frameworks" },
    skills: [
      {
        name: ".NET",
        level: 8,
        rank: "maitre",
        icon: "boxes",
        blurb: {
          fr: "Le cœur de mon quotidien en alternance : API, services et logique métier.",
          en: "The core of my daily apprenticeship work: APIs, services and business logic.",
        },
      },
      {
        name: "Angular",
        level: 7,
        rank: "maitre",
        icon: "atom",
        blurb: {
          fr: "Le front des applications métier : composants, formulaires et flux RxJS.",
          en: "The front-end of business apps: components, forms and RxJS streams.",
        },
      },
    ],
  },
  {
    id: "outils",
    title: { fr: "Outils", en: "Tools" },
    skills: [
      {
        name: "Git",
        level: 8,
        rank: "maitre",
        icon: "git-branch",
        blurb: {
          fr: "Versionnage et travail à plusieurs, branche après branche, sans écraser la guilde.",
          en: "Versioning and teamwork, branch after branch, without overwriting the guild.",
        },
      },
      {
        name: "Docker",
        level: 6,
        rank: "apprenti",
        icon: "container",
        blurb: {
          fr: "Conteneurisation pour des environnements reproductibles, abordée en 3ᵉ année.",
          en: "Containerisation for reproducible environments, picked up in third year.",
        },
      },
      {
        name: "VS Code",
        level: 9,
        rank: "maitre",
        icon: "terminal",
        blurb: {
          fr: "Mon atelier de tous les jours, étendu d'extension en extension.",
          en: "My everyday workshop, extended one plugin at a time.",
        },
      },
      {
        name: "Visual Studio",
        level: 7,
        rank: "compagnon",
        icon: "wrench",
        blurb: {
          fr: "L'enclume du développement .NET lourd : débogage et outillage complet.",
          en: "The anvil for heavy .NET development: debugging and full tooling.",
        },
      },
    ],
  },
  {
    id: "cloud",
    title: { fr: "Cloud", en: "Cloud" },
    skills: [
      {
        name: "Azure",
        level: 5,
        rank: "apprenti",
        icon: "cloud",
        blurb: {
          fr: "Déploiement et services cloud Microsoft, dans la continuité de l'écosystème .NET.",
          en: "Deployment and Microsoft cloud services, in step with the .NET ecosystem.",
        },
      },
    ],
  },
  {
    id: "langues",
    title: { fr: "Langues", en: "Spoken languages" },
    skills: [
      {
        name: "Français",
        level: 10,
        rank: "archimage",
        icon: "languages",
        blurb: { fr: "Langue maternelle.", en: "Native language." },
      },
      {
        name: "Anglais",
        level: 7,
        rank: "maitre",
        icon: "languages",
        blurb: {
          fr: "Lecture de documentation technique et échanges professionnels au quotidien.",
          en: "Reading technical documentation and handling professional exchanges daily.",
        },
      },
    ],
  },
  {
    id: "traits",
    title: { fr: "Traits du héros", en: "Hero traits" },
    skills: [
      {
        name: "Passionné",
        level: 8,
        rank: "maitre",
        icon: "flame",
        blurb: {
          fr: "Le feu intérieur qui transforme un ticket en quête épique.",
          en: "The inner fire that turns a ticket into an epic quest.",
        },
      },
      {
        name: "Esprit d'équipe",
        level: 8,
        rank: "maitre",
        icon: "users",
        blurb: {
          fr: "Huit ans de handball dans le même club et autant de projets de groupe : la guilde avant tout.",
          en: "Eight years of handball in the same club, and as many group projects: the guild comes first.",
        },
      },
      {
        name: "Sang-froid",
        level: 8,
        rank: "maitre",
        icon: "glass-water",
        blurb: {
          fr: "Deux étés derrière un bar en plein rush : la prod un vendredi soir ne fait plus peur.",
          en: "Two summers behind a packed bar: a Friday-night deploy holds no fear.",
        },
      },
      {
        name: "Curiosité",
        level: 9,
        rank: "maitre",
        icon: "compass",
        blurb: {
          fr: "Toujours une techno de plus dans la besace. Ce site en est la preuve.",
          en: "Always one more tech in the satchel. This site is proof.",
        },
      },
      {
        name: "Autonomie",
        level: 7,
        rank: "maitre",
        icon: "rocket",
        blurb: {
          fr: "Du brief client au déploiement, en solo sur les projets freelance.",
          en: "From client brief to deployment, solo on freelance projects.",
        },
      },
      {
        name: "Sportif",
        level: 9,
        rank: "maitre",
        icon: "dumbbell",
        blurb: {
          fr: "Huit ans de handball dans le même club : endurance, discipline et goût de l'effort sur la durée.",
          en: "Eight years of handball in the same club: stamina, discipline and a taste for long-term effort.",
        },
      },
    ],
  },
];
