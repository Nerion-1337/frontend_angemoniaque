---
title: Onglet Monstres (phase 3b/3c) : types, capacités actives/passives, spécificités, liste & édition des instances
slug: monster-details-ui
status: done
updated: 2026-11-24
files:
  - src/admin/MonsterDetails.jsx
  - src/admin/monsterDetails.js
  - src/admin/Pick.jsx
  - src/admin/MiniMap.jsx
  - src/admin/index.jsx
  - src/styles.css
symbols:
  - src/admin/monsterDetails.js:SLOTS
  - src/admin/monsterDetails.js:pickFilter
  - src/admin/MonsterDetails.jsx:MonsterDetails
  - src/admin/Pick.jsx:Pick
tests:
  - test/monsterDetails.test.js
---
## Purpose
Onglet admin « Monstres » : liste des types, puis fiche à 4 onglets — Caractéristiques, Capacité (sorts actifs/passifs),
Spécificités (quantités max, parties du corps équipables), Liste (instances du type : placement, déplacement, butin, équipement).

## Business rules
- Capacités : actives (lancées à la demande) et passives (en continu, sans énergie, cible alliés/ennemis + rayon) ; catalogue global de sorts avec recherche.
- Parties équipables : 7 puces sur une ligne ; sans partie cochée, aucun équipement ne peut être ajouté aux monstres du type (règle aussi appliquée par le serveur) ; une pièce portée reste supprimable.
- L'onglet Liste n'affiche que les instances DU TYPE ouvert ; une seule zone partagée création / édition.
- Déplacement par x/y saisis ou clic sur la mini-carte (zoom molette/boutons, déplacement par glisser ; clic sans glisser = choix de case).
- Butin du tueur : objet, ressource (id du catalogue) ou Or (`resource: 'or'`, crédité en or par le back).
- Menus de choix (`Pick`) : recherche + 20 éléments par page, rendus seulement quand ouverts, fermés au clic extérieur.

## Gotchas
- `SLOTS` = 7 valeurs alignées sur le CHECK `monster_equips.slot` du back : modifier les deux ensemble.
- Mettre à jour l'état de création avec `setNw({ ...nw, mapId })` (la forme updater mal appelée a corrompu l'état).
- `open()` ne doit appeler aucun setter supprimé (`setPend` avait vidé toutes les fiches).
- Ne pas masquer le menu `Pick` par `display:none` ; garder `wheel` en écouteur natif non passif.
- Pas de second bandeau `headrow` dans l'onglet (supprimé volontairement).

## Tests
`test/monsterDetails.test.js` (7 `SLOTS`, filtres, libellés, `placeBody`, effets en corps de bloc, `<thead>/<tbody>`, `Pick` paginé, `MiniMap`) ; `test/adminDom.test.js`.
