---
title: "Panneau Bestiaire (SUPPRIMÉ phase 3c) : composant retiré de l'onglet Monstres"
slug: bestiaire
status: done
updated: 2026-11-24
files:
  - src/admin/index.jsx
symbols:
  - src/admin/index.jsx:Admin
tests:
  - test/adminDom.test.js
---
## Purpose
Trace de décision : l'ancien panneau « Bestiaire — butin & apparitions » a été retiré de l'onglet Monstres (phase 3c) ; le panneau
`monster-details-ui` couvre butin et équipement par instance. Les règles d'apparition et de gardiens restent au back.

## Business rules
- L'onglet Monstres ne rend que `<MonsterDetails />` ; aucun composant `Bestiary` ne doit être réintroduit.
- Les règles d'apparition (`/admin/content/monsters/{id}/spawns`) et l'état (`/admin/bestiary/status`) sont la vérité du back (card back `bestiaire`).
- Les tableaux admin ont toujours `<thead>` et `<tbody>` (jamais de `<tr>` enfant direct de `<table>`).

## Gotchas
- Pas de second bandeau `div.headrow` dans cet onglet : les actions vont sur une ligne `.actions`.

## Tests
`test/adminDom.test.js` (contrat `<thead>/<tbody>` sur `MonsterDetails.jsx`).
