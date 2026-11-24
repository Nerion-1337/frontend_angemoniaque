---
title: Guilde (UI) : forum v2 — typo centrée, cartes d'ajout + toggle, drag & drop, droits par rang, non-lus, carte de message
slug: guild-forum-v2
status: done
updated: 2026-11-24
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
  - src/lib/drag.js
  - src/styles.css
symbols:
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:Perks
  - src/lib/guild.js:effWrite
  - src/lib/drag.js:useDrag
tests:
  - test/guild.test.js
---
## Purpose
Refonte du forum côté interface : titres et descriptions, cartes d'ajout avec choix d'insertion, glisser-déposer, matrice de droits
Voir/Écrire par rang, badges de non-lus, cartes de message.

## Business rules
- Droits par rang (Chef seul) : cocher Écrire coche Voir ; décocher Voir décoche Écrire (écriture ⊆ lecture, vérifiée aussi par le serveur).
- Création d'un sujet : lecture héritée = `[]` envoyé ; écriture héritée = clé OMISE (le back stocke NULL = hérite) ; `[]` signifierait « personne ».
- La boîte de réponse est masquée si l'écriture effective du sujet (`effWrite`) ne contient pas mon rang (le Chef passe).
- Badges : nombre de non-lus par sujet et total par catégorie ; les clés absentes valent 0 ; ouvrir un sujet le marque lu puis recharge.
- Seul l'ordre des éléments est persistant ; la position de la carte d'ajout et l'interrupteur sont des états de session.

## Gotchas
- `write_ranks` NULL ≠ `[]` sur un sujet : ne jamais « normaliser » l'un en l'autre.
- `Perks` est contrôlé (brouillon dans `Forum`) : ouvrir un autre élément ré-initialise le brouillon.

## Tests
`test/guild.test.js` (`effWrite` : NULL hérite, `[]` = personne, liste explicite ; aides d'affichage) ; back `guild-forum-perms.test.ts`.
