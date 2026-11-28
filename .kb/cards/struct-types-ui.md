---
title: Admin Structures (Types / Sur les cartes, valeurs individuelles), coffre en or, apparence 3D des structures
slug: struct-types-ui
status: done
updated: 2026-11-28
files:
  - src/admin/Entities.jsx
  - src/admin/building.js
  - src/admin/BuildingExtras.jsx
  - src/admin/entityFields.js
  - src/admin/ResourcesTab.jsx
  - src/components/Capital.jsx
  - src/three/entities.js
  - src/lib/peace.js
symbols:
  - src/admin/building.js:changedOnly
  - src/admin/building.js:isTypeRow
tests:
  - test/structTypes.test.js
---
## Purpose
Interface du lot du 2026-11-28 (3, migration 50).

## Business rules
- Admin Structures : onglets « Types » (types et modèles sans position ; création = type ; pose sur la carte : monde, x, y, nom, race pour une capitale) et « Sur les cartes » (structures posées, type et position ou « détruite »).
- Structure posée : chaque champ affiche « type : valeur » ou « individuel ↺ » (↺ = revenir au type) ; à l'enregistrement, seules les valeurs modifiées partent (`changedOnly`) et deviennent individuelles ; données propres (`own_data`) rétablissables.
- Capitale : race rattachée, or par emplacement, coût d'un emplacement (0 permis) ; apparence (liste `MODELS`) pour toute structure ; le rendu 3D suit `building_model`.
- Coffre de l'Hôtel de ville : or au coffre / plafond, déposer / retirer ; filtres séparés de l'en-tête du coffre.
- Ressources (admin) : le prix de la carte suit le parchemin de carte du monde (plus de champ).
- Message d'attaque annulée : « Attaque annulée : vous êtes / la cible est dans la zone de non-combat de … ».

## Gotchas
- `isTypeRow` classe aussi les modèles de parchemin (sans position, sans type) dans « Types ».

## Tests
`test/structTypes.test.js`.
