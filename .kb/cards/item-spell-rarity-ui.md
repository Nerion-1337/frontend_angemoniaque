---
title: Onglets admin Objets & Sorts (phase 4) : rareté + « qui peut s'en équiper / l'apprendre »
slug: item-spell-rarity-ui
status: done
updated: 2026-11-24
files:
  - src/admin/ItemsTab.jsx
  - src/admin/SpellsTab.jsx
  - src/admin/rarity.js
  - src/admin/index.jsx
symbols:
  - src/admin/ItemsTab.jsx:ItemsTab
  - src/admin/SpellsTab.jsx:SpellsTab
  - src/admin/rarity.js:RARITIES
tests:
  - test/itemSpellRarity.test.js
---
## Purpose
Onglets admin « Objets » et « Sorts » : catalogue par rareté (Commun → Divin), filtre par type d'équipement, décomptes de
détenteurs / apprenants, et paramètre « qui peut s'en équiper / l'apprendre ».

## Business rules
- Raretés proposées : commun, rare, epique, legendaire, divin ; l'affichage d'un objet passe par `rarity_n` (rareté historique normalisée).
- « Qui peut s'en équiper / l'apprendre » ⊂ {humain, ange, demon, monstre, structure, monture} ; rien de coché = tout le monde.
- Filtre « type d'équipement » : les 7 slots + « sans type ».
- « Détenu par » compte les inventaires (+ exemplaires divins détenus) ; « Appris par » compte les personnages qui ont le sort.
- « Éditer » ouvre la ligne (`open(r)`) ; l'éditeur s'affiche au-dessus du tableau ; suppression confirmée.
- Divin : voir card `admin-players-divine-ui` (même formulaire + famille + exemplaires).
- Boutique de l'hôtel de ville (Objets et Sorts) : en vente ou non, races autorisées, stock pour un objet ; colonne « Boutique » (card `scrolls-shop-ui`).

## Gotchas
- `items.rarity` reste du texte libre en base (seule `spells.rarity` est bornée) : toujours afficher `rarity_n`.
- `usable_by` peut arriver parsé ou en chaîne : passer par `usableBadge`, jamais `JSON.parse` à l'aveugle.
- `USABLE_KINDS` et `RARITIES` sont synchronisés avec `admin/common.ts` du back : modifier les deux.

## Tests
`test/itemSpellRarity.test.js` (miroir des constantes, sous-onglets, filtres) ; back `test/integration/itemSpellRarity.test.ts`.
