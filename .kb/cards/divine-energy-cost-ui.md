---
title: Coût en énergie divine : champs admin et affichage en jeu
slug: divine-energy-cost-ui
status: done
updated: 2026-11-26
files:
  - src/admin/SpellsTab.jsx
  - src/admin/ScrollsTab.jsx
  - src/admin/scrolls.js
  - src/admin/TilesTab.jsx
  - src/admin/tiles.js
  - src/admin/RankReq.jsx
  - src/admin/rankReq.js
  - src/admin/monsterDetails.js
  - src/components/Panels.jsx
  - src/components/TileCard.jsx
  - src/components/Capital.jsx
  - src/components/SidePanel.jsx
symbols:
  - src/admin/scrolls.js:recipeBody
  - src/admin/rankReq.js:reqBody
  - src/admin/tiles.js:tileBody
tests:
  - test/scrolls.test.js
  - test/rankReq.test.js
  - test/adminTiles.test.js
---
## Purpose
Champ « Coût en énergie divine (0 = aucune) » à côté de chaque coût en énergie de l'admin (sorts, parchemins, cases, voies de passage de rang) et affichage ✦N en jeu quand il est non nul.

## Business rules
- Corps envoyés : `divineEnergyCost` entier ≥ 0 (recettes, cases, voies de rang : 0 si vide) ; sorts : champ vide = non envoyé (création → 0 côté serveur).
- En jeu, ✦N (classe `.divcost`, couleur `--div`) n'apparaît que si le coût est > 0 : bouton « Lancer », capacités de monture, boutique de sorts, recettes, conditions de rang, carte de case (survol et case choisie).
- Libellé « (0 = aucune) » DANS le titre de la cellule (une note sous le champ décale la grille de l'admin).

## Gotchas
- Les tests des corps (`toEqual`) listent `divineEnergyCost` : tout nouveau champ de corps doit y être ajouté.

## Tests
`test/scrolls.test.js`, `test/rankReq.test.js`, `test/adminTiles.test.js` (corps avec le coût divin borné).
