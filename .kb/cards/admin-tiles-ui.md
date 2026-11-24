---
title: Section admin « Cases » : types de case par monde + affichage en jeu
slug: admin-tiles-ui
status: done
updated: 2026-11-24
files:
  - src/admin/TilesTab.jsx
  - src/admin/tiles.js
  - src/lib/tiles.js
symbols:
  - src/admin/tiles.js:tileBody
  - src/admin/tiles.js:hpPerHour
  - src/lib/tiles.js:costOf
tests:
  - test/adminTiles.test.js
---
## Purpose
Section admin « Cases » : types de case par monde (nom, description, coût d'énergie, sort appliqué en continu) ; en jeu, la carte
de case affiche nom, description, effet continu et coût réglés en admin.

## Business rules
- Un onglet par monde ; on édite les TYPES de case, jamais la géométrie des cartes.
- Un sort passif exige un mode Bonus ou Malus ; sans sort, le mode n'est pas envoyé (`tileBody`).
- Aperçu de l'effet = ± dégâts du sort PV par heure (`hpPerHour`, miroir de `tileHpDelta` du back) ; un sort à 0 dégât n'a pas d'effet.
- Eau profonde : infranchissable à pied quel que soit le coût saisi (rappel affiché).
- En jeu, l'estimation d'énergie utilise le coût admin du monde courant (`costOf`), sinon le coût du terrain ; le serveur reste seul juge.
- Les textes saisis en admin sont rendus comme texte.

## Gotchas
- `setTileCosts` vaut pour le monde courant : rechargé à chaque changement de carte du personnage.

## Tests
`test/adminTiles.test.js` (`tileBody`, `hpPerHour`, `spellSummary`, `spellLine`, priorité de `costOf`, section branchée, pas de HTML brut).
