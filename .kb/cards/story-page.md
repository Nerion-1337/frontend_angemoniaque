---
title: Page L histoire : le jeu raconté
slug: story-page
status: done
updated: 2026-11-26
files:
  - src/components/Story.jsx
symbols:
  - src/components/Story.jsx:Story
  - src/components/Story.jsx:CHAPTERS
tests:
  - test/forum.test.js
---
## Purpose
Page « L'histoire » (#histoire) : le jeu et ses mécanismes racontés en chronique, accessible sans compte depuis l'accueil.

## Business rules
- 16 chapitres (Brisure, peuples, ascension, énergie, relief, récolte, capitales, parchemins, combat, gardiens, compagnons, pactes et foi, objets divins, guildes, améliorations, épilogue) ; chaque chapitre a une ligne « En jeu » qui traduit le récit en mécanique.
- Affichée dans le cadre du forum (onglet « L'histoire ») ; lien « L'histoire du jeu » sur l'écran de connexion ; aucun appel serveur.
- Le récit doit suivre les règles réelles : à mettre à jour quand une mécanique change (rangs, pactes, objets divins…).

## Gotchas
- Sommaire : défilement doux vers le chapitre sans changer le hash (#histoire reste la route).

## Tests
`test/forum.test.js` (route #histoire).
