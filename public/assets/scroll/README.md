# Assets du parchemin des Archives

- `scroll-top-v2.svg` — rouleau laqué du haut (viewBox 1200×130), affiché par
  `ScrollRoll.tsx` avec `position="top"`
- `scroll-bottom-v2.svg` — rouleau du bas (idem, éclairage inversé),
  `position="bottom"`
- `parchment-tile.svg` — tuile de fond (1200×240) répétée verticalement via la
  classe `.parchment-sheet` (`globals.css`) ; le motif utile occupe
  x = 70 → 1130, les bandes latérales transparentes sont rognées par le
  `background-size: 113.21%`

Le déroulé au scroll (clip-path + position du rouleau bas) est piloté par
`ArchivesSection.tsx`.
