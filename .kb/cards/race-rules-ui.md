---
title: Races (apparition, limites, équipement de départ) dans l'admin, écran de création piloté par le serveur, horloge au Pilotage
slug: race-rules-ui
status: done
updated: 2026-11-26
files:
  - src/admin/xpRank.js
  - src/admin/XpRank.jsx
  - src/admin/raceRules.jsx
  - src/admin/Races.jsx
  - src/components/Login.jsx
  - src/admin/Dashboard.jsx
  - src/admin/StartKit.jsx
  - src/admin/startKit.js
symbols:
  - src/admin/raceRules.jsx:rulesBody
  - src/admin/raceRules.jsx:rulesDraft
  - src/admin/raceRules.jsx:rulesLabel
  - src/admin/raceRules.jsx:RaceRules
  - src/components/Login.jsx:CharSelect
  - src/admin/startKit.js:kitBody
tests:
  - test/xpRank.test.js
  - test/raceRules.test.js
  - test/startKit.test.js
---
## Purpose
Onglet « Races & Rangs » : zone d'apparition, limites de personnages et équipement de départ de chaque race ; panneau Horloge du
Pilotage (dernier et prochain tick).

## Business rules
- Apparition : monde + centre X/Y + rayon ; vide = capitale de la race ; un centre sans monde n'est pas envoyé (`rulesBody`).
- Limites : par compte (nouvelle race : 3) et population totale ; vide = illimité. Le compte admin n'y est jamais soumis.
- Équipement de départ (bouton « Départ ») : palier (vide = premier), or, XP, objets (sac ou coffre, quantité), sorts (sans doublon), ressources (plus de montures) ; enregistré en entier (`kitBody`).
- Toutes les valeurs envoyées sont des entiers ≥ 0.
- L'en-tête de chaque race résume apparition et limites (`rulesLabel`) ; l'infobulle du bouton Départ résume le kit (`kitSummary`).
- Chaque rang a un bouton « Passage » (conditions pour passer à ce rang, card `rank-req-ui`).
- Races & rangs commence par « Gain d'XP selon l'écart de rang » (`XpRank.jsx`, helpers `xpRank.js`, miroir de `back/src/game/xp.ts:rankPercent`) : lignes écart → %, libellé « Cible N rangs au-dessus / en dessous », ajout / retrait de lignes, enregistrement par `PUT /admin/content/xp-rank`.

## Gotchas
- Les règles de création sont décidées par le SERVEUR ; le front n'affiche que `allowed` / `reason`.
- `StartKit.jsx` (composant) et `startKit.js` (fonctions), `raceRules.jsx` : importer avec l'extension.
- `RaceRules` est dans la grille `.form` : `.admin .form>.racerules{grid-column:1/-1}` lui donne la ligne entière.

## Tests
`test/raceRules.test.js` (`rulesBody`, `rulesDraft`, `rulesLabel`, écran de création piloté par le serveur) ; `test/startKit.test.js` (`kitDraft`, `kitBody`, `kitSummary`).
