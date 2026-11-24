---
title: Guilde (UI) : forum en drill-down, modales +, réorganisation, messages aérés et formatage
slug: guild-forum-ui
status: done
updated: 2026-11-24
files:
  - src/components/Guild.jsx
  - src/lib/fmt.js
  - src/styles.css
symbols:
  - src/lib/fmt.js:fmt
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:NewFolderModal
  - src/components/Guild.jsx:NewTopicModal
tests:
  - test/fmt.test.js
---
## Purpose
Onglet « Forum » de la guilde : navigation en trois niveaux (catégories → sujets → messages) avec retour à chaque niveau,
création par fenêtres dédiées, rendu sûr du texte formaté.

## Business rules
- Navigation par deux états (`fid`, `tid`) ; si la catégorie sélectionnée devient invisible (changement ou renommage de rang), retour automatique à la liste des catégories.
- Le texte du forum n'est rendu que par `fmt()` (`lib/fmt.js`) : échappement HTML D'ABORD, puis les marqueurs ; c'est le seul usage autorisé de `innerHTML`.
- Couleur `#rrggbb` reconnue seulement isolée (espaces ou bord de ligne autour).
- Fenêtres de création : fermées au succès, restées ouvertes en cas d'erreur (toast).
- Toute mutation se termine par un rechargement de la guilde.

## Gotchas
- Une ligne cliquable est un `div` contenant de vrais boutons (jamais de bouton dans un bouton).
- La règle `.posts` du forum est redéfinie en fin de `styles.css` et l'emporte partout : vérifier avant de réutiliser la classe.
- Toute évolution de `fmt` doit garder l'échappement en premier (sinon XSS).

## Tests
`test/fmt.test.js` (échappement, gras, italique, couleur isolée, sauts de ligne) ; back `guild-forum.test.ts`.
