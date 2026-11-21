---
title: "Panneau Bestiaire (SUPPRIMÉ phase 3c) : composant retiré de l'onglet Monstres"
slug: bestiaire
status: done
updated: 2026-11-21
files:
  - src/admin/index.jsx
symbols:
  - src/admin/index.jsx:Admin
tests:
  - test/adminDom.test.js
---
## Purpose
Le panneau « Bestiaire — butin & apparitions » (`Bestiary.jsx` + helpers `bestiary.js`)
a été **supprimé de l'onglet Monstres** (phase 3c, à la demande du propriétaire) : sa
section titre (`div.headrow`) ne servait à rien et était mal affichée, et le nouveau
panneau `monster-details-ui` couvre déjà le butin (par instance) et l'équipement.
Le back reste seul point de vérité pour les règles de spawn et les gardiens :
`POST/GET /admin/content/monsters/{id}/spawns` et `/admin/bestiary/status` (fiche back
`bestiaire` du dépôt `back`).

## How it works
- `src/admin/index.jsx` : l'onglet `monster` ne rend plus que `<MonsterDetails />`
  (import de `Bestiary` retiré, composant + helpers + fiche supprimés).
- Le contrat DOM du tableau (`thead`/`tbody`) est suivi par `test/adminDom.test.js`
  (retargeté sur `MonsterDetails.jsx`).

## Gotchas
- Ne pas réintroduire un second bandeau `div.headrow` dans cet onglet (supprimé
  systématiquement, phase 3c) — les actions se placent sur une simple ligne
  `.actions` alignée à droite.
