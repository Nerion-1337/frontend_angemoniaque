---
title: Admin Parchemins, boutique par race (Objets, Sorts) et fabrication en jeu
slug: scrolls-shop-ui
status: done
updated: 2026-11-24
files:
  - src/admin/ScrollsTab.jsx
  - src/admin/scrolls.js
  - src/admin/shop.jsx
  - src/components/Panels.jsx
  - src/components/Capital.jsx
symbols:
  - src/admin/scrolls.js:recipeBody
  - src/admin/shop.jsx:shopLabel
tests:
  - test/scrolls.test.js
---
## Purpose
Section admin « Parchemins » (recettes), options « boutique de l'hôtel de ville » dans les onglets Objets et Sorts, boutique de la
capitale filtrée par race et section « Fabrication » du panneau Actions en jeu.

## Business rules
- Parchemins : créer un nouveau parchemin (nom) ou choisir un objet existant ; lier un objet, un sort ou un bâtiment ; ressources consommées ; parchemin consommé ou conservé ; hôtel de ville seulement ou partout ; coût en énergie ; quantité produite seulement pour un objet (`recipeBody`).
- Boutique (Objets, Sorts) : case « en vente », races autorisées (rien coché = toutes), stock pour un objet ; hors boutique, le formulaire rappelle que l'élément ne s'obtient qu'en jeu ou par fabrication.
- La boutique de la capitale appelle `/shop?characterId=` (filtrée par race par le serveur).
- Fabrication en jeu : seulement les recettes dont le parchemin est dans le sac ; ressources manquantes affichées et bouton désactivé ; un bâtiment se pose sur la case adjacente ciblée du panneau.
- Onglet Sorts : le formulaire reprend les valeurs de la ligne (énergie, durée…) par correspondance explicite snake_case → camelCase.

## Gotchas
- `ScrollsTab.jsx` / `scrolls.js` et `shop.jsx` : importer avec l'extension.
- `.admin .cell` doit aussi neutraliser `align-items` (règle globale du jeu qui centre).

## Tests
`test/scrolls.test.js` (`recipeBody`, `recipeDraft`, `resLabel`, `shopLabel`, `itemBody` boutique) ; `test/adminDivinePlayers.test.js` (corps d'objet).
