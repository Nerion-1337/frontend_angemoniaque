---
title: Admin Structures (Types / Sur les cartes, valeurs individuelles), coffre en or, apparence 3D des structures
slug: struct-types-ui
status: done
updated: 2026-11-28
files:
  - src/admin/StructuresTab.jsx
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
- Admin Structures, sur le modèle de Monstres (`StructuresTab`) : à gauche les types (et modèles de parchemin, et « Constructions des joueurs » sans type) ; un type ouvert a ses onglets Caractéristiques, Règles transverses, Sur les cartes. « Sur les cartes » : tableau de ses structures posées (carte, position ou « détruite », points, propriétaire), « Ajouter » (carte, x, y ou clic sur la mini-carte, nom, race d'une capitale), puis édition de la structure sélectionnée : déplacer / reposer, retirer de la carte, et sa fiche individuelle.
- Structure posée : chaque champ affiche « type : valeur » ou « individuel ↺ » (↺ = revenir au type) ; à l'enregistrement, seules les valeurs modifiées partent (`changedOnly`) et deviennent individuelles ; données propres (`own_data`) rétablissables.
- Capitale : race rattachée, or par emplacement, coût d'un emplacement (0 permis) ; apparence (liste `MODELS`) pour toute structure ; le rendu 3D suit `building_model`.
- Coffre de l'Hôtel de ville : or au coffre / plafond, déposer / retirer ; filtres séparés de l'en-tête du coffre.
- Ressources (admin) : le prix de la carte suit le parchemin de carte du monde (plus de champ).
- Message d'attaque annulée : « Attaque annulée : vous êtes / la cible est dans la zone de non-combat de … ».

## Gotchas
- `isTypeRow` classe aussi les modèles de parchemin (sans position, sans type) dans « Types ».

## Tests
`test/structTypes.test.js`.
