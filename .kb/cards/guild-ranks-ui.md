---
title: Guilde (UI) : dernier Chef, renommage des rangs, création de rang en modale
slug: guild-ranks-ui
status: done
updated: 2026-11-24
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
symbols:
  - src/lib/guild.js:lastChef
  - src/components/Guild.jsx:Manage
  - src/components/Guild.jsx:NewRankModal
tests:
  - test/guild.test.js
---
## Purpose
Gestion des rangs de guilde côté interface (Chef) : création par une fenêtre dédiée, renommage de chaque rang (Chef compris),
et blocage visuel des gestes que le serveur refuserait pour le dernier Chef.

## Business rules
- `lastChef(g)` (miroir du back) : vrai si je suis Chef et le SEUL membre à détenir un rang Chef.
- Dernier Chef : le bouton « Quitter » est remplacé par une explication, et son propre sélecteur de rang est désactivé (le serveur répond 409 de toute façon).
- Création d'un rang : nom de 2 à 24 caractères + 4 permissions ; la fenêtre reste ouverte en cas d'erreur (toast).
- Renommage possible sur tous les rangs, y compris le Chef ; les cases de permissions du rang Chef restent verrouillées (tous les droits).
- Après une mutation, la guilde est rechargée ; quitter recharge aussi le personnage.

## Gotchas
- Fenêtres imbriquées : Échap ferme toutes les fenêtres empilées (comportement existant de `Modal`).
- Si la règle du back change, modifier `lib/guild.js` ET son test (messages 409 alignés).

## Tests
`test/guild.test.js` (`lastChef` : seul Chef / deux Chefs / non-Chef) ; back `guild-ranks.test.ts`.
