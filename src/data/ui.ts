import type { Localized } from "@/lib/i18n";

/**
 * Toutes les chaînes d'interface (hors données projets/parcours/compétences)
 * — le contenu reste séparé du rendu.
 */
export const ui = {
  landing: {
    subtitle: {
      fr: "> Développeur .NET / Angular · Strasbourg",
      en: "> .NET / Angular developer · Strasbourg",
    },
    newGame: { fr: "Nouvelle partie", en: "New game" },
    loadGame: { fr: "Charger la sauvegarde", en: "Load save" },
    scrollHint: { fr: "défiler pour explorer", en: "scroll to explore" },
    konamiTitle: { fr: "Code secret reconnu", en: "Secret code recognized" },
    konamiBody: {
      fr: "+100 XP. Le tavernier t'attend au fond de la salle.",
      en: "+100 XP. The innkeeper awaits you at the back of the room.",
    },
  },
  nav: {
    title: { fr: "Écran titre", en: "Title screen" },
    prologue: { fr: "Le Prologue", en: "The Prologue" },
    atelier: { fr: "L'Atelier", en: "The Workshop" },
    archives: { fr: "Les Archives", en: "The Archives" },
    codex: { fr: "Le Codex", en: "The Codex" },
    taverne: { fr: "La Taverne", en: "The Tavern" },
    ariaLabel: { fr: "Navigation entre les zones", en: "Zone navigation" },
    langToggle: { fr: "Switch to English", en: "Passer en français" },
  },
  prologue: {
    kicker: { fr: "Zone 00", en: "Zone 00" },
    title: { fr: "Le Prologue", en: "The Prologue" },
    lead: {
      fr: "La fiche du héros : d'où il vient, et la quête qu'il s'est choisie.",
      en: "The hero's character sheet: where he comes from, and the quest he chose.",
    },
  },
  atelier: {
    kicker: { fr: "Zone 01", en: "Zone 01" },
    title: { fr: "L'Atelier", en: "The Workshop" },
    lead: {
      fr: "Chaque création est sortie de la forge, certaines encore tièdes.",
      en: "Every creation came out of the forge, some still warm.",
    },
    github: { fr: "Voir le code sur GitHub", en: "View code on GitHub" },
    demo: { fr: "Voir la démo", en: "View demo" },
    preview: { fr: "Aperçu du projet", en: "Project preview" },
  },
  archives: {
    kicker: { fr: "Zone 02", en: "Zone 02" },
    title: { fr: "Les Archives", en: "The Archives" },
    lead: {
      fr: "Le journal de bord du héros, tome après tome.",
      en: "The hero's logbook, volume after volume.",
    },
  },
  codex: {
    kicker: { fr: "Zone 03", en: "Zone 03" },
    title: { fr: "Le Codex", en: "The Codex" },
    lead: {
      fr: "Sorts appris, pouvoirs en cours d'invocation.",
      en: "Spells learned, powers still being summoned.",
    },
  },
  taverne: {
    kicker: { fr: "Zone 04", en: "Zone 04" },
    title: { fr: "La Taverne", en: "The Tavern" },
    lead: {
      fr: "Disponible pour des quêtes freelance",
      en: "Available for freelance quests",
    },
    formName: { fr: "Nom", en: "Name" },
    formEmail: { fr: "Email", en: "Email" },
    formMessage: { fr: "Message", en: "Message" },
    formNamePlaceholder: { fr: "Aragorn, fils d'Arathorn", en: "Aragorn, son of Arathorn" },
    formEmailPlaceholder: { fr: "vous@royaume.fr", en: "you@kingdom.com" },
    formMessagePlaceholder: {
      fr: "Noble héros, j'ai une quête à te proposer…",
      en: "Noble hero, I have a quest for you…",
    },
    formSubmit: { fr: "Envoyer un corbeau", en: "Send a raven" },
    formSending: { fr: "Le corbeau prend son envol…", en: "The raven is taking flight…" },
    formSent: {
      fr: "Le corbeau s'est envolé ! Réponse au prochain lever de soleil.",
      en: "The raven has taken flight! Reply by next sunrise.",
    },
    errorRequired: { fr: "Ce champ est requis.", en: "This field is required." },
    errorEmail: { fr: "Cet email semble maudit (format invalide).", en: "This email seems cursed (invalid format)." },
    errorSend: {
      fr: "Le corbeau s'est perdu en chemin. Réessaie ou écris-moi directement par email.",
      en: "The raven lost its way. Try again or email me directly.",
    },
    downloadCv: { fr: "Télécharger le grimoire (CV)", en: "Download the grimoire (resume)" },
    contactTitle: { fr: "Parler au tavernier", en: "Speak to the innkeeper" },
    infoTitle: { fr: "Avis de recherche", en: "Wanted poster" },
  },
  footer: {
    line: {
      fr: "Forgé à la main avec Next.js, Three.js & encre de seiche.",
      en: "Hand-forged with Next.js, Three.js & squid ink.",
    },
    license: {
      fr: "Licence MIT",
      en: "MIT License",
    },
  },
} as const;

export type UiStrings = typeof ui;
export type { Localized };
