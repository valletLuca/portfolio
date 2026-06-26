# PROMPT — Portfolio RPG "Luca.exe"
 
## Contexte global
 
Crée un portfolio web sous forme de **RPG textuel/visuel jouable**, ancré dans une esthétique **médiévale-fantastique**. Le visiteur ne "lit" pas un CV — il **explore un monde** où chaque zone est un lieu d'un royaume fictif révélant une facette du développeur. L'esthétique mêle **la sobriété d'un layout Notion** (blocs, typo propre, espaces généreux) à l'atmosphère d'un **grimoire ancien** : palette parchemin et sang, dorures discrètes, typographie qui évoque les manuscrits enluminés sans tomber dans le cosplay. Le rendu final doit sentir le cuir et l'encre — un portfolio qui a l'élégance d'un objet forgé, pas la froideur d'un template.
 
---
 
## Stack technique
 
- **Next.js 14+ (App Router)** avec TypeScript
- **Tailwind CSS** pour le styling utilitaire
- **Framer Motion** pour les animations et transitions entre zones
- **Three.js** (via `@react-three/fiber` + `@react-three/drei`) pour les effets de particules contextuels (curseur, transitions, ambiance de fond)
- **next-themes** pour le système de thème
- **Geist** (corps) + **Cinzel** ou **Cormorant Garamond** (titres display — serif romain/médiéval pour le côté grimoire)
- **Lucide React** pour les icônes
---
 
## Système de couleurs — CRITIQUE
 
Toute la palette doit être définie **exclusivement via des CSS custom properties** dans `:root` et réexposée dans `tailwind.config.ts` via `theme.extend.colors`. Objectif : changer 5 variables = changer tout le thème du site.
 
### Palette initiale (médiéval — parchemin & sang)
 
```css
:root {
  /* ─── Palette principale — Parchemin & Sang ─── */
  --color-surface:    #FECE79;   /* Parchemin doré, fond clair principal */
  --color-accent:     #E6A341;   /* Or ancien, accents et ornements */
  --color-primary:    #B14A36;   /* Rouge brique, CTA, liens, highlights */
  --color-deep:       #210100;   /* Encre noire, texte, headers, fonds sombres */
  --color-blood:      #8C0902;   /* Sang séché, glow, hover, accents dramatiques */
 
  /* ─── Dérivées automatiques ─── */
  --color-surface-alt: color-mix(in srgb, var(--color-surface) 85%, var(--color-accent));
  --color-text:        var(--color-deep);
  --color-text-muted:  color-mix(in srgb, var(--color-deep) 60%, transparent);
  --color-border:      color-mix(in srgb, var(--color-accent) 30%, transparent);
  --color-glow:        color-mix(in srgb, var(--color-blood) 40%, transparent);
 
  /* ─── Particules Three.js ─── */
  --color-particles-1: var(--color-accent);
  --color-particles-2: var(--color-blood);
}
```
 
### Règle absolue
**Aucune couleur en dur dans les composants.** Tout passe par les variables. Si une nuance manque, la créer dans `:root` avec `color-mix()`, jamais en inline. Quand je changerai les 5 hex de la palette, tout le site doit suivre sans toucher un seul composant.
 
---
 
## Architecture narrative — Les zones du jeu
 
### Écran titre / Landing
 
- Fond `--color-deep` avec un **champ de particules Three.js** subtil en arrière-plan (particules flottantes aux couleurs `--color-accent` et `--color-primary`, mouvement organique lent).
- Titre principal : **"Luca.exe"** en typo display serif, très grand, avec un léger effet de glow `--color-glow` (lueur de braise).
- Sous-titre : `> Développeur .NET / Angular — Strasbourg` en typo mono, style terminal, apparition lettre par lettre (typewriter).
- Deux options cliquables stylisées comme un menu RPG :
  - `▸ Nouvelle partie` → entre dans le portfolio (scroll ou navigation)
  - `▸ Charger la sauvegarde` → scroll direct vers Contact ("reprendre la conversation")
- **Easter egg** : un `konami code` ou une touche cachée qui déclenche un effet spécial (ex : les particules explosent, un message secret apparaît).
- Le **particles cursor** (comme dans l'exemple Three.js de @codewith_muhilan) s'active ICI sur l'écran titre — des particules suivent le curseur de la souris avec traînée lumineuse. Utiliser `threejs-toys` ou recréer l'effet avec `@react-three/fiber`. Ne PAS le mettre partout, seulement sur le landing pour l'effet "wow" initial.
---
 
### Zone 1 — L'Atelier (Projets)
 
**Concept narratif** : Le visiteur entre dans un atelier de forgeron/artisan du code. Chaque projet est une "création" exposée.
 
- Layout : grille de **cartes Notion-like** (coins légèrement arrondis, bordure `--color-border`, fond `--color-surface`, ombre douce).
- Chaque carte projet contient :
  - une image sur la partie supérieur légèrement flouté 
  - Titre du projet (moitié haute du titre sur le bas de l'image)
  - Description courte (Lorem ipsum pour l'instant)
  - Tags de technos utilisées (badges arrondis, fond `--color-accent` à 20% d'opacité, texte `--color-primary`)
  - Lien GitHub (icône) + lien démo si applicable
  - ajouté un petit effet sur la carte : comme si elle avait été poiconné à droite et à gauche sur la ligne du 3/4 en partant du haut de la carte
- **Transition d'entrée** : les cartes apparaissent une par une avec un fondu + léger slide vers le haut (Framer Motion stagger).
- **Hover** : la carte se soulève légèrement (translateY -4px), la bordure passe à `--color-primary`, ombre plus prononcée.
**Projets placeholder à mettre (Lorem ipsum dans les descriptions) :**

1. **Application Eurométropole** — .NET / Angular / JavaScript mobile — Projet universitaire
2. **Maya l'abeille** - projet de la nuit de l'info 2025 (Un jeu éducatif développé avec Godot Engine 3.x pour promouvoir les logiciels libres, l'open source et le numérique responsable.)
3. **GetDrunk** - projet universitaire sur 3 jours, sujet le mercredi midi, présentation le vendredi aprem de la meme semaine
4. **Site vitrine vitaeLIK** — Projet freelance — Site one-page pour naturopathe
5. **Site vitrine Christine-vallet-sophro** - Projet freelance - Site one-page pour sophrologue
. **Portfolio RPG** — Next.js / Three.js / Tailwind — Ce site lui-même (meta!)
6. *(Placeholder vide)* — `+ Ajouter une création` — Carte en pointillés, invitation à revenir
---
 
### Zone 2 — Les Archives (Parcours / Timeline)
 
**Concept narratif** : Une bibliothèque/salle d'archives où chaque "tome" est une étape du parcours.
 
- Layout **vertical type timeline** mais stylisé comme des pages de grimoire/journal de bord.
- Chaque étape est un **bloc Notion** avec :
  - Date à gauche (style tag/badge)
  - Contenu à droite
  - Une ligne verticale continue `--color-accent` reliant les blocs
**Contenu chronologique (du CV) :**
 
```
septembre 2026 - aout 2029 | alternant développeur - Sully Group, Schiltigheim 
                            | formation ingenieur SI et developpement au CNAM 

Sept 2025 → Août 2026 | Alternant développeur — Sully Group, Schiltigheim
                        | Maintenance évolutive app .NET/Angular
                        | Gestion retours client post-déploiement
                        | Lorem ipsum dolor sit amet
 
Été 2025              | Barman — Le Cokoon Guinguette, Nancy
                        | Lorem ipsum dolor sit amet
 
Avril → Juin 2025     | Stage développeur (10 sem.) — Sully Group
                        | Refonte outil hotline .NET Core / Angular
                        | Batch synchronisation données C#
                        | Lorem ipsum dolor sit amet
 
2025-2026             | BUT Informatique 3ème année — IUT Robert Schuman
                        | CI/CD, Docker, gestion d'équipe
                        | Lorem ipsum dolor sit amet
 
2024-2025             | BUT Informatique 2ème année
                        | SQL, PHP, TypeScript, architecture logicielle
                        | Lorem ipsum dolor sit amet
 
Été 2024              | Barman — La Grande Côte, Saint Palais sur Mer
                        | Lorem ipsum dolor sit amet
 
2023-2024             | BUT Informatique 1ère année
                        | C#, Java, HTML/CSS, SQL
                        | Lorem ipsum dolor sit amet
 
2020-2023             | Bac général — Lycée Saint Antoine, Phalsbourg
                        | Mention Assez Bien
                        | BIA mention Très Bien (2020)
```
 
- **Animation** : les blocs apparaissent au scroll (intersection observer + Framer Motion), comme si on "déroulait un parchemin".
---
 
### Zone 3 — Le Codex (Compétences)
 
**Concept narratif** : Un grimoire de sorts/compétences. Chaque compétence est un "sort" ou "pouvoir" avec un niveau de maîtrise.
 
- Layout : grille de **cartes compactes** groupées par catégorie.
- Chaque compétence a :
  - Une icône thématique
  - Le nom de la techno
  - Une **barre de progression** stylisée comme une barre de mana/XP (fond `--color-surface-alt`, remplissage gradient `--color-accent` → `--color-primary`)
  - Un niveau RPG : `Apprenti`, `Compagnon`, `Maître`, `Archimage`
**Compétences (du CV) :**
 
```
 LANGAGES
  C#          ████████░░  Maître
  TypeScript  ███████░░░  Maître
  SQL         ██████░░░░  Compagnon
  Java        █████░░░░░  Compagnon
  PHP         ████░░░░░░  Apprenti
  HTML/CSS    ████████░░  Maître
 
 FRAMEWORKS
  .NET        ████████░░  Maître
  Angular     ███████░░░  Maître
 
 OUTILS
  Git         ████████░░  Maître
  Docker      ██████░░░░  Apprenti
  VS Code     █████████░  Maître
  Visual Studio ████████░░ Compagnon
 
 CLOUD
  Azure       █████░░░░░  Apprenti
 
 LANGUES
  Français    ██████████  Archimage
  Anglais     ██████░░░░  Maître

 SOFT SKILLS/HUMAIN (trouve un titre)
  sportif  █████████░  Maître
  pationné ████████░░  Maître
  continue si tu as d'autres idées pour cette partie je ne suis pas sur de la garder mais essaie de me convaincre avec des choses à mettre ici
```
 
- **Interaction** : au hover sur une compétence, un tooltip ou expansion montre un court texte contextuel (Lorem ipsum).
---
 
### Zone 4 — La Taverne (Contact)
 
**Concept narratif** : Le visiteur entre dans une taverne et peut "engager le héros" ou "laisser un message au tavernier".
 
- Fond légèrement plus chaud/sombre que le reste (`--color-deep` à 95% + un soupçon de `--color-accent`).
- **Formulaire de contact** stylisé Notion-like :
  - Champs : Nom, Email, Message
  - Bouton `Envoyer un corbeau` (style CTA, fond `--color-primary`, texte `--color-surface`)
  - Le formulaire est fonctionnel côté front (validation) mais le backend est un placeholder (console.log ou état local pour l'instant)
- **Infos de contact** à côté du formulaire :
  - Email : lucval1701@gmail.com
  - Téléphone : +33 7 69 25 15 76
  - Localisation : Strasbourg / Illkirch-Graffenstaden
  - Lien GitHub (icône)
  - Lien LinkedIn (icône, placeholder href="#")
- **CTA principal** : un gros bouton `Télécharger le grimoire (CV)` qui télécharge le PDF du CV.
- Phrase d'accroche : *"Disponible pour des quêtes freelance"*
---
 
## Navigation
 
- **Pas de navbar classique.** À la place, un **menu RPG** discret sur la droite au milieu verticalement avec un des bords arrondis avec les zones listées comme des destinations (juste des icones, et icones + texte au hover):
  - `Écran titre`
  - `L'Atelier`
  - `Les Archives`
  - `Le Codex`
  - `La Taverne`
- Le scroll est **fluide entre les zones** (scroll-snap ou smooth scroll).
- Sur mobile : navigation identique, le menu est un drawer.
---
 
## Responsive
 
- Mobile-first. Toutes les grilles passent en une colonne sur mobile.
- L'effet particles cursor est **désactivé sur mobile** (performances + pas de curseur). Remplacer par un léger effet de particules ambiantes en background (moins gourmand).
- Les cartes projets stack verticalement.
- Le menu RPG devient un bottom-sheet ou drawer.
---
 
## Performance & SEO
 
- Les composants Three.js sont chargés en **lazy** (`next/dynamic` avec `ssr: false`).
- Metadata Next.js complètes : title, description, Open Graph, etc.
- `title` : "Luca Vallet — Développeur .NET / Angular"
- `description` : "Portfolio interactif de Luca Vallet, développeur full-stack .NET et Angular basé à Strasbourg."
---
 
## Structure de fichiers attendue
 
```
src/
├── app/
│   ├── layout.tsx          # Layout principal, fonts, metadata
│   ├── page.tsx            # Page unique (toutes les zones en scroll)
│   └── globals.css         # Variables CSS palette + reset
├── components/
│   ├── landing/
│   │   ├── HeroTitle.tsx       # "Luca.exe" + typewriter
│   │   ├── ParticlesCursor.tsx # Effet curseur Three.js
│   │   └── MenuRPG.tsx         # Nouvelle partie / Charger
│   ├── atelier/
│   │   ├── AtelierSection.tsx
│   │   └── ProjectCard.tsx
│   ├── archives/
│   │   ├── ArchivesSection.tsx
│   │   └── TimelineBlock.tsx
│   ├── codex/
│   │   ├── CodexSection.tsx
│   │   └── SkillCard.tsx
│   ├── taverne/
│   │   ├── TaverneSection.tsx
│   │   └── ContactForm.tsx
│   ├── nav/
│   │   └── SideMenu.tsx        # Menu RPG latéral
│   └── ui/
│       ├── Badge.tsx
│       ├── ProgressBar.tsx     # Barre XP/mana
│       └── TypeWriter.tsx      # Effet typewriter réutilisable
├── data/
│   ├── projects.ts             # Données projets (facile à modifier)
│   ├── timeline.ts             # Données parcours
│   ├── skills.ts               # Données compétences
│   └── contact.ts              # Infos contact
├── hooks/
│   └── useScrollReveal.ts      # Hook intersection observer
├── lib/
│   └── theme.ts                # Config palette
└── styles/
    └── palette.css             # Fichier séparé pour tester les palettes
```
 
---
 
## Données externalisées
 
Toutes les données de contenu (projets, timeline, compétences, contact) sont dans `src/data/` en fichiers TypeScript typés. Le contenu est **séparé du rendu**. Pour modifier un projet ou ajouter une compétence, je ne touche qu'aux fichiers data, jamais aux composants.
 
---
 
## Contraintes finales
 
1. **Pas de bibliothèque UI lourde** (pas de MUI, pas de Chakra). Tailwind + composants custom uniquement.
2. **Accessibilité** : aria-labels sur les boutons, focus visible, navigation clavier fonctionnelle.
3. **Reduced motion** : respecter `prefers-reduced-motion` — désactiver les particules et animations lourdes si activé.
4. **Code propre** : composants typés, pas de `any`, noms explicites.
5. **Tout le contenu texte est en français, laissé la possibilité à l'utilisateur de traduire l'ensemble du site en anglais.**
6. **Les descriptions longues (autres que les données) sont du Lorem ipsum** — je les remplacerai moi-même.
















# PROMPT DE CORRECTION — Portfolio RPG "Luca.exe"
 
Trois ajustements visuels à apporter au site. Respecte scrupuleusement le système de couleurs existant (variables CSS `--color-*` uniquement, jamais de hex en dur). Le rendu doit rester cohérent avec l'esthétique médiéval-grimoire/parchemin déjà en place.
 
---
 
## 1. Zone "Les Archives" — Effet parchemin qui se déroule au scroll
 
**Problème actuel** : la section Les Archives ne ressemble pas assez à un parchemin déroulé. Les cartes timeline flottent simplement sur le fond, sans mise en scène cohérente avec le thème.
 
**Objectif** : transformer cette section en **vrai parchemin qui se déroule progressivement au scroll**, avec deux rouleaux de bois visibles en haut et en bas qui s'écartent au fur et à mesure que le visiteur descend.
 
### Comportement attendu
 
1. **État initial (entrée dans la section)** :
   - Les deux rouleaux de bois (haut + bas) sont **proches l'un de l'autre**, presque collés au centre de la zone
   - Le parchemin entre les deux est **fermé** (hauteur quasi nulle) : le contenu de la timeline n'est pas visible
   - Le titre "Les Archives" reste visible au-dessus du rouleau du haut
2. **Pendant le scroll dans la section** :
   - Le **rouleau du haut** translate vers le haut (`transform: translateY(négatif)`)
   - Le **rouleau du bas** translate vers le bas (`transform: translateY(positif)`)
   - La zone de parchemin entre les deux **s'agrandit progressivement** révélant le contenu
   - Chaque carte timeline apparaît au fur et à mesure que l'espace s'ouvre, avec un léger fondu/slide
   - La progression est **liée au scroll** (scroll-driven), pas à un simple "scroll into view" unique
3. **État final (bas de la section)** :
   - Les deux rouleaux sont écartés au maximum
   - Tout le contenu timeline est visible
   - Le parchemin est entièrement déroulé
4. Si le parchemin du haut arrive en haut mais qu'il reste du contenu à découvrir fait scroller la page en continuant d'ouvrir uniquement vers le bas en plus du scroll 
### Implémentation technique
 
- Utiliser **Framer Motion** avec `useScroll` + `useTransform` ciblés sur un `ref` de la section Archives :
  ```tsx
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // ajuster selon le rendu souhaité
  });
  const topRollY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const bottomRollY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  ```
- Les deux rouleaux sont **deux `motion.img`** en `position: sticky` ou `position: absolute` selon le layout choisi, animés via `style={{ y: topRollY }}` / `style={{ y: bottomRollY }}`.
- La zone de parchemin (fond avec texture) est entre les deux rouleaux et **grandit visuellement** par effet d'écartement des rouleaux — pas besoin d'animer sa hauteur, elle est fixe et c'est le mouvement des rouleaux qui crée l'illusion.
- Le contenu (cartes timeline) est dans un conteneur entre les rouleaux, avec un **fondu d'apparition** classique au scroll (intersection observer ou `whileInView`).
### Images des rouleaux
 
L'utilisateur fournira **deux images PNG/SVG** :
- `scroll-top.png` — le rouleau du haut (cylindre de bois avec embouts, vu de côté, parchemin commençant à pendre vers le bas)
- `scroll-bottom.png` — le rouleau du bas (idem, parchemin partant vers le haut)
Placer ces images dans `public/assets/scroll/`. Tu peux pour l'instant utiliser des **placeholders SVG** (deux rectangles avec embouts arrondis, couleur `--color-deep` ou tons bruns) en attendant que les vraies images soient ajoutées. Documenter clairement où remplacer les placeholders (to do).
 
### Texture du parchemin
 
Le fond de la zone entre les rouleaux doit avoir une **texture parchemin légère**. Utiliser :
- Soit une image de texture (`public/assets/textures/parchment.jpg`) avec `background-image` + `background-repeat: repeat`
- Soit un dégradé radial subtil en CSS avec `--color-surface` et `--color-surface-alt` pour simuler les variations du papier vieilli
Les ombres latérales du parchemin (bords légèrement plus sombres pour suggérer la courbure) peuvent être faites avec un `box-shadow: inset` aux deux extrémités.
 
### Performance & accessibilité
 
- **`prefers-reduced-motion`** : si activé, désactiver le scroll-driven, afficher tout le parchemin déroulé d'emblée
- **Mobile** : l'effet doit fonctionner mais avec des rouleaux proportionnellement plus petits (largeur 100% mais hauteur réduite). Si trop coûteux en perf sur mobile, fallback en simple révélation au scroll des cartes individuelles, sans animation des rouleaux.
- Utiliser `will-change: transform` sur les rouleaux pour optimiser le rendu
---
 
## 2. Cartes projets — Poinçons (trous découpés en bas)
 
**Problème actuel** : les petits cercles en bas des cartes projets (à gauche et à droite, façon ticket de cinéma à perforer) sont rendus comme des cercles dessinés avec un contour visible — ils ressemblent à des éléments décoratifs ajoutés par-dessus la carte, pas à de vrais trous découpés.
 
**Objectif** : rendre ces poinçons comme de **vrais trous perforés dans la carte**, révélant le fond de la section derrière.
 
### Implémentation
 
1. **Supprimer complètement** tout `border`, `outline` ou `stroke` actuellement visible sur ces cercles.
2. **Approche recommandée — cercles "trompe-l'œil"** :
   - Positionner deux `<span>` ou `<div>` en `position: absolute`, l'un à gauche, l'autre à droite, en bas de la carte
   - `border-radius: 50%`, `width` / `height` identiques (~16-20px)
   - `background-color: var(--color-surface)` — **exactement la même couleur que le fond de section derrière la carte** (pas la couleur de la carte elle-même, mais ce qu'on verrait à travers le trou)
3. **Ombre interne pour la profondeur** :
   - `box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.25)` — une ombre interne légèrement décalée vers le bas-droite, sombre mais discrète
   - Cela simule la profondeur du trou : la lumière ne rentre pas complètement, le bord supérieur-gauche du trou est plus sombre
   - Optionnellement, une très légère ombre extérieure inversée (`box-shadow: 0 -1px 0 rgba(255,255,255,0.1)`) pour suggérer le relief autour du trou
4. **Alternative plus avancée — `mask-image` / `radial-gradient`** :
   - Si l'approche "cercles posés" ne donne pas un effet assez convaincant, utiliser un `mask-image` sur la carte elle-même avec deux `radial-gradient` qui découpent littéralement deux disques dans la forme de la carte
   - Cette approche est plus pure techniquement (vrais trous) mais plus complexe à maintenir si la carte change de fond
   - À utiliser uniquement si l'effet visuel n'est pas satisfaisant avec la première approche 
---
 
## 3. Cartes projets — Titre à cheval lisible
 
**Problème actuel** : le titre des cartes projets est positionné à cheval entre la zone image (haut, fond gradient sombre) et la zone parchemin (bas, fond clair), mais son fond actuel est trop clair → quand il déborde sur le parchemin, le contraste tombe à zéro et le titre devient illisible.
 
**Objectif** : garder la position **à cheval** (c'est un choix esthétique voulu), mais rendre le titre **toujours lisible** quel que soit ce qu'il y a derrière, en lui donnant son propre fond opaque contrasté façon **cartouche/étiquette de grimoire**.
 
### Implémentation
 
1. **Conserver la position à cheval** : le titre reste positionné de telle sorte qu'il chevauche la frontière entre l'image (zone haute) et le parchemin (zone basse) de la carte.
2. **Nouveau style du bandeau titre — façon cartouche** :
   - **Fond** : `background-color: var(--color-deep)` (encre noire) — opaque, pas de transparence
   - **Texte** : `color: var(--color-surface)` (parchemin clair) — lecture facile sur fond sombre
   - **Padding** : généreux à l'horizontal (`px-4` à `px-6`), modéré à la vertical (`py-2`)
   - **Border-radius** : léger (`rounded-sm` ou `rounded-md`), pas trop arrondi pour garder l'esprit étiquette
   - **Typographie** : la display serif déjà utilisée (Cinzel/Cormorant), légèrement en uppercase ou small-caps pour le côté étiquette officielle
3. **Détails optionnels pour renforcer le côté "étiquette collée"** :
   - Une **légère ombre portée** (`box-shadow: 0 2px 4px rgba(33, 1, 0, 0.3)`) pour suggérer le relief de l'étiquette posée sur la carte
   - Une **très subtile rotation** (`transform: rotate(-0.5deg)` ou `rotate(0.5deg)` alternée selon les cartes) pour éviter l'effet trop aligné et donner un côté "collé à la main"
   - Un **liseré doré** très fin (`border: 1px solid var(--color-accent)`) sur le contour du cartouche, comme un encadrement d'étiquette officielle — à tester, à supprimer si ça surcharge
4. **Bordures du cartouche** : il doit **dépasser légèrement** des bords latéraux de la carte (`negative margin-left` / `margin-right` de quelques pixels), pour vraiment ressembler à une étiquette posée par-dessus, pas à un élément intégré à la carte.
### Z-index
 
Le cartouche doit être **au-dessus de l'image ET de la partie basse** (`z-index: 10` ou supérieur), pour rester visible peu importe les autres animations ou effets de hover sur la carte.
 
---
 
## Contraintes générales (rappel)
 
- **Aucune couleur en dur** : tout passe par les variables CSS existantes (`--color-surface`, `--color-accent`, `--color-primary`, `--color-deep`, `--color-blood`, et les dérivées `--color-border` etc.). Si une nuance manque, la créer via `color-mix()` dans `:root`, jamais en inline.
- **Respect des composants existants** : ne pas refaire tout le composant, juste ajuster les parties concernées. Si tu dois extraire des sous-composants pour plus de clarté (ex : `ScrollRoll.tsx`, `Punch.tsx`, `CartoucheTitle.tsx`), fais-le, mais reste dans la structure de fichiers déjà en place.
- **Accessibilité** : respecter `prefers-reduced-motion`, garder la navigation clavier fonctionnelle, ne pas casser les focus visibles.
- **Responsive** : tester mobile + desktop. Sur mobile, l'effet parchemin doit rester convaincant ou avoir un fallback propre.
- **Code propre** : TypeScript strict, pas de `any`, noms explicites, commentaires uniquement là où c'est utile (notamment sur les calculs de scroll-driven animation).
---
 
## Ordre d'exécution recommandé
 
1. Commence par les **cartes projets** (points 2 et 3) — c'est plus rapide, ça valide les ajustements de détail
2. Puis attaque le **parchemin qui se déroule** (point 1) — c'est le plus gros morceau, prévois plusieurs itérations pour ajuster la vitesse et la fluidité du scroll
Après chaque point, prends un screenshot et critique ton propre rendu : est-ce que c'est convaincant ? Est-ce que ça raconte vraiment l'histoire voulue (parchemin / ticket perforé / étiquette de grimoire) ? Si ce n'est pas le cas, ajuste avant de passer au suivant.
















# PROMPT DE CORRECTION — Système de déroulement du parchemin (Les Archives)
 
Ajustement du comportement de l'effet parchemin de la section "Les Archives". Le système actuel anime les deux rouleaux (haut ET bas), ce qui complexifie inutilement l'effet. On simplifie pour un comportement plus lisible et plus naturel.
 
---
 
## Nouveau comportement attendu
 
### État initial (entrée dans la section)
 
- Le **rouleau du haut est déjà à sa position finale**, fixe, juste sous le titre "Les Archives" — il ne bouge plus jamais.
- Le **rouleau du bas est collé juste en dessous du rouleau du haut** : les deux rouleaux sont quasiment au contact, le parchemin entre eux est fermé (hauteur quasi nulle).
- Aucun contenu de la timeline n'est visible à ce stade.
### Pendant le scroll dans la section
 
- **Seul le rouleau du bas se déplace**, vers le bas (`translateY` positif), au fur et à mesure du scroll.
- Le **rouleau du haut reste parfaitement immobile** — c'est le point d'ancrage fixe de toute l'animation.
- À mesure que le rouleau du bas descend, l'**espace de parchemin entre les deux rouleaux s'agrandit**.
- Le contenu de la timeline (cartes) se révèle **du haut vers le bas**, dans cet espace : les cartes les plus anciennes/récentes (selon l'ordre déjà en place) apparaissent en premier car elles sont juste sous le rouleau du haut fixe, et les suivantes apparaissent progressivement en dessous au fur et à mesure que l'espace s'agrandit.
### État final (fin de la section)
 
- Le rouleau du bas a atteint sa position la plus basse.
- Tout le contenu de la timeline est visible entre les deux rouleaux.
- Le parchemin est entièrement déroulé.
---
 
## Implémentation technique
 
### Positionnement
 
- **Rouleau du haut** : `position: sticky` avec `top: <valeur fixe>`, ou simplement `position: relative` en haut de la section — il n'a **aucune animation liée au scroll**. C'est un élément statique.
- **Rouleau du bas** : `position: relative` ou `absolute`, animé via Framer Motion.
### Animation du rouleau du bas
 
```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end end"] // à ajuster selon le rendu
});
 
const bottomRollY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
// ou en valeurs absolues si plus simple à calibrer :
// const bottomRollY = useTransform(scrollYProgress, [0, 1], [0, contentHeight]);
```
 
- `bottomRollY` est appliqué via `style={{ y: bottomRollY }}` sur le rouleau du bas.
- La valeur `100%` (ou la valeur absolue) doit correspondre à la **hauteur totale du contenu de la timeline**, pour que le rouleau du bas finisse exactement sous la dernière carte.
### Révélation du contenu
 
- Le conteneur du contenu (cartes timeline) est positionné **entre les deux rouleaux**, avec un `overflow: hidden` sur la zone de parchemin pour que seul l'espace actuellement "ouvert" (entre le rouleau du haut fixe et le rouleau du bas qui descend) soit visible.
- Concrètement : le conteneur de contenu a une `clip-path: inset(0 0 <calc dynamique> 0)` ou est dans un wrapper dont la `height` est liée à `scrollYProgress` (même valeur que `bottomRollY`), avec `overflow: hidden`.
- Chaque carte qui devient visible dans cet espace peut avoir un léger fondu d'apparition individuel (`whileInView` ou `useTransform` sur sa propre position relative au scroll), mais l'essentiel de l'effet vient du masquage progressif par le rouleau du bas.
### Fond parchemin
 
- La texture/fond parchemin couvre toute la zone entre les deux rouleaux, mais n'est **visuellement révélée** que dans la portion "ouverte" — donc soumise au même `overflow: hidden` / `clip-path` que le contenu.
---
 
## Ce qui ne change PAS
 
- Le rouleau du haut et son design restent identiques, simplement son comportement passe de "animé" à "fixe".
- Les images/placeholders des rouleaux ne changent pas.
- La texture parchemin, les ombres latérales (`box-shadow: inset`) restent identiques.
- Le respect de `prefers-reduced-motion` (affichage immédiat de tout le contenu si activé) et le fallback mobile restent en place.
- Le système de couleurs via variables CSS (`--color-*`) reste inchangé, aucune couleur en dur.
---
 
## Points d'attention
 
1. **Calibrage de la hauteur** : le scroll total nécessaire pour que le rouleau du bas atteigne sa position finale doit correspondre à peu près à la hauteur du contenu de la timeline, pour que la dernière carte soit pile révélée quand l'utilisateur arrive en bas de la section. Prévoir un `sticky` sur toute la section pendant cette phase si nécessaire (la section reste à l'écran pendant que le scroll fait avancer l'animation interne, comme un "scroll-jacking" léger) — **mais seulement si ça reste fluide et n'an,nule pas le scroll naturel**. Si le scroll-jacking complexifie trop, privilégier une version où la section a simplement une grande hauteur naturelle et l'animation suit le scroll normal sans `position: sticky` sur la section entière.
2. **Performance** : `will-change: transform` sur le rouleau du bas. Éviter d'animer `height` directement (préférer `clip-path` ou `transform` + `overflow: hidden`).
3. **Critique visuelle** : après implémentation, prends un screenshot à 0%, 50% et 100% de progression dans la section pour vérifier que :
   - Le rouleau du haut ne bouge effectivement jamais
   - L'espacement entre les cartes révélées reste cohérent et lisible
   - Aucun contenu n'apparaît "tronqué" de façon disgracieuse pendant la transition
---
 
## Contraintes générales (rappel)
 
- TypeScript strict, pas de `any`, noms explicites.
- Respect de la structure de fichiers existante (`components/archives/`).
- Si extraction de sous-composants utile (ex: `ScrollBottomRoll.tsx`), reste cohérent avec la structure déjà en place.

