---
title: Guilde (UI) : option unique du rang par défaut des nouveaux arrivants (Gestion)
slug: guild-default-rank-ui
status: done
updated: 2026-11-24
files:
  - src/components/Guild.jsx
  - src/styles.css
symbols:
  - src/components/Guild.jsx:Manage
tests:
  - test/guild.test.js
---
## Purpose
Onglet Gestion de la guilde (Chef seul) : choix unique du rang attribué aux nouveaux membres, « Automatique (rang le plus bas) »
ou un rang non-Chef.

## Business rules
- Exactement une option cochée : « Automatique » (`default_rank_id` NULL) ou un rang de la guilde.
- Le rang Chef n'est jamais proposé (le back le refuse, 400).
- « Automatique » s'envoie avec `rankId: null` explicite.
- Le front ne fixe que le défaut ; l'attribution du rang à l'arrivée est faite par le serveur.
- La carte est le premier élément de l'onglet Gestion.

## Gotchas
- Si le back autorise un jour le Chef comme défaut, retirer le filtre `!r.is_leader` dans le même changement.
- Le libellé « rang le plus bas » reflète `lowestRank` du back : garder le texte aligné.

## Tests
Pas de test DOM dans ce dépôt ; parcours complet couvert par le back (`guild-default-rank.test.ts`).
