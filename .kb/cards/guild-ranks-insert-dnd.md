---
title: Guilde (UI) : toggle d'insertion + drag & drop des rangs (Gestion)
slug: guild-ranks-insert-dnd
status: done
updated: 2026-11-24
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
  - src/styles.css
symbols:
  - src/lib/guild.js:dropRankRow
  - src/lib/guild.js:insertRankTarget
  - src/components/Guild.jsx:Manage
tests:
  - test/guild.test.js
---
## Purpose
Réordonnancement par glisser-déposer (en plus des flèches) et choix d'insertion d'un nouvel élément au-dessus ou en dessous de la
carte d'ajout, pour les rangs puis, via les composants partagés, pour les catégories et sujets du forum.

## Business rules
- Le glisser ne démarre qu'après 8 px de mouvement : un simple clic reste un clic ; l'élément glissé est à demi transparent, une ligne dorée marque l'insertion.
- Un glisser ne démarre jamais depuis un bouton, champ, sélecteur, libellé ou lien.
- Le clic qui suit immédiatement un glisser est ignoré (une seule fois).
- Le dépôt vise « avant » ou « après » une ligne selon la moitié survolée (même sens que les flèches).
- Interrupteur d'insertion (défaut « au-dessus ») : après création (toujours en fin côté serveur), le front persiste l'ordre voulu si différent.
- Aucune modification du back pour cette fonction.

## Gotchas
- Le conteneur doit rester `position:relative` et la ligne `.inl` `pointer-events:none`.
- `touch-action:none` sur les cartes empêche le défilement tactile qui commence sur une carte (accepté).
- La logique est dans le hook partagé `lib/drag.js:useDrag` et les fonctions pures `dropRankRow` / `insertRankTarget`.

## Tests
`test/guild.test.js` (`dropRankRow`, `insertRankTarget`) ; back `guild-ranks-order.test.ts` (séquence création puis réordonnancement).
