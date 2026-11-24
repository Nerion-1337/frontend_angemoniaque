---
title: Races & Rangs : conditions de passage par rang ; encart Rang en jeu
slug: rank-req-ui
status: done
updated: 2026-11-24
files:
  - src/admin/RankReq.jsx
  - src/admin/rankReq.js
  - src/components/SidePanel.jsx
symbols:
  - src/admin/rankReq.js:reqBody
  - src/admin/rankReq.js:reqSummary
tests:
  - test/rankReq.test.js
---
## Purpose
Onglet « Races & Rangs » : bouton « Passage » par rang pour régler les conditions de passage à ce rang ; en jeu, encart « Rang »
dans l'onglet Amélioration du personnage.

## Business rules
- Case « Passage par conditions » décochée → `{}` (aucun passage par conditions).
- Coût en énergie, type Définitif / Temporaire (durée en heures), objets (sac, quantité), ressources (quantité), consommés ou seulement exigés (`reqBody` borne tout).
- L'XP requise reste le champ « XP requis (prérequis) » du rang.
- La ligne du rang affiche un résumé des conditions (`reqSummary`).
- En jeu : rang actuel, rang temporaire et son échéance, prochain rang, conditions, ce qui manque ; bouton désactivé s'il manque quelque chose ou si un rang temporaire est en cours.

## Gotchas
- `RankReq.jsx` / `rankReq.js` : importer avec l'extension.
- Les boutons de choix `.seg2 .chip.on` doivent rester visibles (style ajouté au lot 3).

## Tests
`test/rankReq.test.js` (`reqBody`, `reqSummary`).
