---
title: Onglet Bâtiments : armure, case occupable, bonus et attaques de l’occupant, production, sorts
slug: buildings-ui
status: done
updated: 2026-11-25
files:
  - src/admin/BuildingExtras.jsx
  - src/admin/building.js
  - src/admin/entityFields.js
  - src/admin/Entities.jsx
  - src/components/TileCard.jsx
symbols:
  - src/admin/building.js:buildingBody
tests:
  - test/building.test.js
  - test/buildingActivation.test.js
---
## Purpose
Onglet admin « Bâtiments » : armure et PV de la structure, case occupable, bonus de l'occupant, attaques possibles contre lui,
production horaire par ressource et sorts de la structure.

## Business rules
- Champs du formulaire : PV (structure), armure, taille, case occupable, bonus armure / armure magique / vue / portée de l'occupant.
- Si la case est occupable : cases « au corps à corps / à distance / par sort » (décoché = l'occupant ne peut pas être attaqué ainsi).
- Production : ressource + quantité par heure ; fusionnée dans `data.production` sans perdre les autres clés de `data` (`buildingBody`).
- Sorts de la structure (bâtiment enregistré) : en continu ou à la demande ; liés / retirés immédiatement ; effets réglés dans l'onglet Sorts.
- Activation de la capacité (lot E) : options alternatives ajoutées / retirées ; par option : objets du sac (quantité), ressources, objets divins (famille ou toutes, nombre), sort connu, or, rang minimum, rangs précis, consommation ; enregistrées avec la fiche (`activationBody`, `groupDraft`).
- En jeu : « Interagir » sur un bâtiment à options l'active (résultat des sorts affiché) ; une porte se franchit (mêmes conditions côté serveur).

## Gotchas
- La production saisie dans l'éditeur remplace `data.production` du JSON brut à l'enregistrement.
- `BuildingExtras.jsx` / `building.js` : importer avec l'extension.

## Tests
`test/buildingActivation.test.js` (corps, relecture, résumé) ; `test/building.test.js` (`buildingBody`, `buildingDraft`, champs de `FIELDS.building`).
