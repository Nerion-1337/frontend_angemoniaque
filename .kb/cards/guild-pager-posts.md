---
slug: guild-pager-posts
title: "Pagination commune des listes et cartes de message restructurées"
status: done
files:
  - src/components/Guild.jsx
  - src/styles.css
symbols:
  - src/components/Guild.jsx:PageNav
  - src/components/Guild.jsx:Post
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:Members
tests:
  - test/guild.test.js
updated: 2026-11-24
---
## Purpose
Pagination commune des listes de guilde (catégories, sujets, messages, postulants, membres) et mise en page des cartes de message.

## Business rules
- Tailles de page : 8 pour catégories et sujets, 20 pour les messages, 10 pour postulants et membres.
- Pagination masquée s'il n'y a qu'une page ; page remise à 1 quand on change de catégorie ou de sujet ; l'input de page n'accepte que des chiffres.
- La carte d'ajout est la dernière ligne de CHAQUE page et n'est pas déplaçable.
- Le glisser-déposer est limité à la page courante ; l'indice local est converti en indice global avant d'envoyer l'ordre complet.
- Pagination d'affichage seulement (les listes sont entièrement chargées par `GET /guilds/{id}`).
- Message : auteur à gauche (avatar, rang de guilde, pseudo), texte à gauche dans la zone de droite, date en bas à droite ; fonds alternés pair/impair.
- La liste des rangs (onglet Gestion) n'est jamais paginée.

## Gotchas
- `.post` doit garder `width:100%` sans `margin:0 auto` (sinon rétréci et centré dans la colonne flex).
- L'alternance pair/impair suppose que `.posts` ne contient que des `.post`.
- Pour de gros volumes, il faudra une pagination côté API.

## Tests
`test/guild.test.js` (gardes : `PageNav`, 5 usages, masquage à une page, carte d'ajout par page, structure des messages).
