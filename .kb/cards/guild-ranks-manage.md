---
title: Guilde (UI) : section Rangs & privilèges (titre centré, carte ajout, réorganisation, label Chef éditable)
slug: guild-ranks-manage
status: done
updated: 2026-11-24
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
  - src/styles.css
symbols:
  - src/lib/guild.js:displayRanks
  - src/lib/guild.js:moveRankRow
  - src/components/Guild.jsx:Manage
  - src/components/Guild.jsx:Arrows
tests:
  - test/guild.test.js
---
## Purpose
Section « Rangs & privilèges » (Chef) : cartes de rangs ordonnables par flèches, carte d'ajout « + » qui ouvre la création,
renommage en place.

## Business rules
- L'ordre des RANGS est persistant (`POST /guilds/reorder`, Chef seul) ; la position de la carte d'ajout n'est qu'un état de session (revient en dernier).
- Une flèche n'envoie la requête que si l'ordre des rangs change vraiment (déplacer seulement la carte d'ajout n'envoie rien).
- Un nouveau rang arrive en fin de liste côté serveur.
- La carte d'ajout est un `div` cliquable contenant de vrais boutons (jamais de bouton dans un bouton) ; les flèches stoppent la propagation.
- La liste des rangs n'est pas paginée (c'est un éditeur d'ordre complet).

## Gotchas
- `.radd` : grille `1fr auto 1fr` dont le premier enfant est un `<span />` vide, sinon le « + » n'est plus centré.
- La logique d'affichage (`displayRanks`, `moveRankRow`) est pure et centralisée dans `lib/guild.js` : ne pas la dupliquer.

## Tests
`test/guild.test.js` (`displayRanks`, `moveRankRow` : échange de rangs, carte seule, bornes) ; back `guild-ranks-order.test.ts`.
