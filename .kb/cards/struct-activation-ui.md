---
title: Fenêtre de structure (éléments d'activation), onglet Interactions, attaques grisées en zone de paix, Hôtel de ville filtré, admin des éléments
slug: struct-activation-ui
status: done
updated: 2026-11-28
files:
  - src/components/StructureModal.jsx
  - src/lib/peace.js
  - src/lib/usePeaceZones.js
  - src/lib/shopFilter.js
  - src/lib/doors.js
  - src/components/Capital.jsx
  - src/components/Panels.jsx
  - src/components/TileCard.jsx
  - src/components/TopBar.jsx
  - src/admin/BuildingExtras.jsx
  - src/admin/building.js
  - src/admin/StructuresTab.jsx
  - src/admin/entityFields.js
symbols:
  - src/lib/peace.js:peaceBlock
  - src/lib/shopFilter.js:passes
  - src/admin/building.js:activationsBody
tests:
  - test/activationShop.test.js
---
## Purpose
Interface du lot du 2026-11-28 (suite, migration 49).

## Business rules
- `StructureModal` (porte ou structure activable) : état, éléments d'activation (libellé, manque, « × N » pour un élément consommé), conditions en plus ; porte : franchir et choisir l'arrivée.
- Actions : onglet « Interactions » (structures adjacentes) séparé de « Récolte ».
- Zones de paix (`/map/{id}/zones`) : attaques et sorts qui infligent des dégâts restent affichés mais grisés, avec la raison au survol (`title`) et une note 🕊 ; la carte au survol l'indique aussi ; la carte du monde trace les zones. Plus de zone sacrée codée en dur.
- Hôtel de ville : plus d'onglet « Sorts » (sorts dans la Boutique) ; Boutique, Marché, Coffre filtrables par catégorie et par rareté.
- Admin Structures : « Visible sur la carte des joueurs » (vrai par défaut), éléments d'activation (type, référence, quantité, durée ou définitif, consommé / possédé), conditions supplémentaires facultatives.
- Barre du haut : l'XP affichée est l'XP libre ; le survol donne l'XP totale accumulée.

## Gotchas
- `usePeaceZones` est séparé de `peace.js` (fonctions pures testables sans navigateur).

## Tests
`test/activationShop.test.js`.
