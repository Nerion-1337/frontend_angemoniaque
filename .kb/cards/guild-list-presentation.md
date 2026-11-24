---
slug: guild-list-presentation
title: "Onglets guilde : présentation centrée, liste (invitations/postulants/membres)"
status: done
files:
  - src/components/Guild.jsx
  - src/styles.css
symbols:
  - src/components/Guild.jsx:Pres
  - src/components/Guild.jsx:Members
tests:
  - test/guild.test.js
updated: 2026-11-24
---
## Purpose
Mise en page des onglets « Présentation » et « Liste » de la guilde : colonne unique centrée (emblème en tête), invitations puis
postulants puis membres (2 par ligne) avec leur rang de jeu.

## Business rules
- Présentation : emblème (logo, nom, tag) AVANT mantra et histoire ; tout centré ; édition réservée au Chef.
- Liste dans cet ordre : « Inviter un joueur » (si `send_invites`), postulants (si `accept_applicants`), membres.
- Postulants en puces qui s'étendent sur la ligne avant de passer à la suivante (un seul postulant = toute la largeur).
- Membres en grille de 2 colonnes (1 sur petit écran) : pseudo · race · rang de jeu · rang de guilde (sélecteur si `assign_ranks`).
- Rang de jeu absent → « — ».

## Gotchas
- Après toute restructuration de ces JSX, lancer `vite build` (une fermeture de div cassée est déjà passée inaperçue).
- La classe `.cols` sert encore ailleurs (choix du personnage, fondation de guilde) : ne pas la supprimer.

## Tests
`test/guild.test.js` (gardes : ordre Inviter → Postulants → Membres, puces, grille, `game_rank`, emblème avant le mantra) ; back `guild-ranks.test.ts` (`game_rank`).
