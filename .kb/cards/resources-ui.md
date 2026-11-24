---
title: Section admin Ressources (gisements) ; gisement dans la carte de case
slug: resources-ui
status: done
updated: 2026-11-24
files:
  - src/admin/ResourcesTab.jsx
  - src/admin/deposits.js
  - src/components/TileCard.jsx
symbols:
  - src/admin/deposits.js:depositBody
  - src/admin/deposits.js:zoneLabel
tests:
  - test/deposits.test.js
---
## Purpose
Section admin « Ressources » : gisements par monde (ressource, zone, stock, régénération, quantité par récolte) ; en jeu, la carte de
case affiche le gisement et propose sa récolte.

## Business rules
- Un onglet par monde ; zone « case unique » (max = min) ou « rectangle » (coins remis dans l'ordre) ; stock actuel borné par le maximum (`depositBody`).
- Tableau : ressource, zone (`zoneLabel`), jauge de stock, régénération, quantité par récolte ; suppression confirmée.
- Carte de case : ligne « Gisement : ressource — stock / max » ; action « Récolter » proposée même sans ressource de terrain, avec le stock affiché.

## Gotchas
- `ResourcesTab.jsx` / `deposits.js` : importer avec l'extension.

## Tests
`test/deposits.test.js` (`depositBody`, `zoneLabel`, brouillon).
