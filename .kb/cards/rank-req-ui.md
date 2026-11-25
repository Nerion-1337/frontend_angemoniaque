---
title: Races & Rangs : conditions de passage par rang ; encart Rang en jeu
slug: rank-req-ui
status: done
updated: 2026-11-25
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
- Deux voies indépendantes côte à côte, « Passage définitif » et « Passage temporaire », chacune cochable ; voie décochée → `null` (`reqBody` → `{ permanent, temporary }`).
- Par voie : coût en énergie, objets (sac, quantité), ressources (quantité), consommés ou seulement exigés ; durée en heures pour la voie temporaire (`reqBody` borne tout).
- L'XP requise reste le champ « XP requis (prérequis) » du rang.
- La ligne du rang affiche un résumé des conditions (`reqSummary`).
- En jeu : rang actuel, rang temporaire et son échéance, prochain rang ; une ligne et un bouton par voie proposée (conditions, ce qui manque) ; bouton désactivé s'il manque quelque chose ou si un rang temporaire est en cours ; le bouton envoie `{ mode }`.

## Gotchas
- `RankReq.jsx` / `rankReq.js` : importer avec l'extension.
- Les boutons de choix `.seg2 .chip.on` doivent rester visibles (style ajouté au lot 3).

## Tests
`test/rankReq.test.js` (`reqDraft`, `reqBody` avec les deux voies, `reqSummary`).
