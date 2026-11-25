---
title: Objets : caractéristiques offertes (toutes celles du joueur), armure magique dans les fiches
slug: item-stats-ui
status: done
updated: 2026-11-25
files:
  - src/admin/divine.js
  - src/admin/ItemsTab.jsx
  - src/components/SidePanel.jsx
symbols:
  - src/admin/divine.js:bonusesBody
  - src/admin/divine.js:statsLine
tests:
  - test/itemStats.test.js
---
## Purpose
Onglet Objets : un groupe « Caractéristiques offertes » couvre toutes les caractéristiques du joueur ; les fiches monstre,
bâtiment, sort et joueur connaissent l'armure magique.

## Business rules
- Les 10 caractéristiques (`ITEM_STATS`) : force, agilité, armure, armure magique (colonnes de l'objet) ; PV max, régénération, énergie max, énergie divine max, vue, portée (`bonuses`, `bonusesBody` : entiers, zéros et vides retirés, malus gardés).
- La liste des objets résume les caractéristiques non nulles (`statsLine`) ; l'info-bulle de l'inventaire en jeu aussi.
- Armure magique éditable : fiche monstre (groupe Combat), bâtiment (bonus de l'occupant), effets de sort, fiche joueur.

## Gotchas
- Les champs Armure / Force + / Agilité + / Armure magique isolés ont été remplacés par le groupe : ne pas les remettre (doublons).

## Tests
`test/itemStats.test.js` (liste des 10, `bonusesBody`, `statsLine`) ; `test/adminDivinePlayers.test.js` (`itemBody` avec `bonuses`).
