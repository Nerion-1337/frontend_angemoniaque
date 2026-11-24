---
title: Races (apparition, limites) dans l'admin, écran de création piloté par le serveur, horloge au Pilotage
slug: race-rules-ui
status: done
updated: 2026-11-24
files:
  - src/admin/raceRules.jsx
  - src/admin/Races.jsx
  - src/components/Login.jsx
  - src/admin/Dashboard.jsx
symbols:
  - src/admin/raceRules.jsx:rulesBody
  - src/admin/raceRules.jsx:rulesDraft
  - src/admin/raceRules.jsx:rulesLabel
  - src/admin/raceRules.jsx:RaceRules
  - src/components/Login.jsx:CharSelect
tests:
  - test/raceRules.test.js
---
## Purpose
Admin « Races & Rangs » : bloc « Apparition des nouveaux personnages » (monde, centre X/Y, rayon) et « Limites de personnages »
(par compte, population totale) dans le formulaire d'une race ; résumé sur l'en-tête de chaque race. Écran de création de
personnage : races, places et refus fournis par le serveur ; le compte admin crée sans limite, toutes races.

## How it works
- `raceRules.jsx` : `rulesDraft(r)` (null → '' ; nouvelle race : 3 / compte, rayon 4), `rulesBody(f)` ('' → null = défaut /
  illimité ; pas de centre sans monde), `rulesLabel(r)`, composant `RaceRules` (monde choisi dans `/admin/catalog` `maps`, bornes affichées).
- `Races.jsx` : brouillon de race = champs historiques + `rulesDraft` ; `saveRace` envoie `...rulesBody(raceDraft)` ; `<RaceRules>`
  rendu sous le formulaire (édition et création).
- `Login.jsx` `CharSelect` : `GET /characters/races` (allowed, reason, max, admin, locked) ; boutons de race désactivés avec la raison ;
  compteur « n sur max » ou « administrateur, sans limite » ; icônes connues pour human/demon/angel, `User` sinon.
- `Dashboard.jsx` : panneau Horloge = dernier tick (`clock.last_tick_at`) et prochain vers +1 h ; le bouton reste un tick supplémentaire.

## Entry points
Section admin `races` ; écran de sélection de personnage (`App.jsx` → `CharSelect`). Back : card `races-spawn-clock`.

## Data flow
Lit `/admin/content/races`, `/admin/catalog`, `/characters/races`, `/admin/dashboard` ; écrit `PUT/POST /admin/content/races`, `POST /characters`.

## Tests
`test/raceRules.test.js` : `rulesBody`, `rulesDraft`, `rulesLabel`, et `Login.jsx` utilise `/characters/races` (plus de « < 3 » codé en dur).
Rendu vérifié dans Chromium (Playwright) le 2026-11-24 : formulaire race avec zone/limites, écran de création admin (4 personnages, 3 races).

## Gotchas
- Les règles de création sont décidées par le SERVEUR ; l'écran ne fait qu'afficher `allowed` / `reason` — ne pas recoder de limite côté front.
- `RaceRules` est placé dans la grille `.form` : la règle CSS `.admin .form>.racerules{grid-column:1/-1}` lui donne toute la ligne.
