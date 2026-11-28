---
title: Fenêtre de porte en jeu, pactes des demi-dieux, admin Structures (zones, portes, réapparition), Règles générales
slug: gates-structures-ui
status: done
updated: 2026-11-28
files:
  - src/components/DoorModal.jsx
  - src/lib/doors.js
  - src/lib/time.js
  - src/components/TileCard.jsx
  - src/components/Panels.jsx
  - src/admin/RulesTab.jsx
  - src/admin/rules.js
  - src/admin/PactTab.jsx
  - src/admin/Entities.jsx
  - src/admin/entityFields.js
  - src/admin/MonsterParts.jsx
  - src/admin/building.js
  - src/admin/index.jsx
symbols:
  - src/lib/doors.js:doorLines
  - src/admin/rules.js:rulesBody
  - src/admin/building.js:structureRespawnBody
tests:
  - test/gatesUi.test.js
---
## Purpose
Interface du lot du 2026-11-28 (migration 48).

## Business rules
- Porte (fiche de case ou panneau d'actions) : ouvre `DoorModal` (GET `/divine/door/{id}/{characterId}`) : monde, ouverture restante, portes en face (ouvertes / détruites), activation avec N objets divins (joueur de ce monde), « Franchir » ; plusieurs arrivées possibles → boutons de choix.
- Pactes : rôle par pacte (`i_propose`) au lieu de la race ; un demi-dieu choisit la composition des pactes qu'il propose ; pacte suspendu affiché et non activable.
- Admin : « Bâtiments » renommé « Structures » ; champs zone de paix, zone sans construction, monde / destination de porte (listes), heures par objet ; réapparition de la structure (même panneau que les monstres, `kind="building"`) ; « Règles générales » (perte à la mort, bonus des portes ouvertes par camp) ; Pacte : onglets Anges·Démons / Demi-dieux et case « propose des pactes » par rang humain.

## Gotchas
- `fmtWait` vit dans `lib/time.js` (réexporté par Panels).

## Tests
`test/gatesUi.test.js`.
