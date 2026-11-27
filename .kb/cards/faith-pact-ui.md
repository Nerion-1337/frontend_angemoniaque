---
title: Classement (public et en jeu), panneau Pactes & Fidèles, sections admin Foi et Pacte
slug: faith-pact-ui
status: done
updated: 2026-11-26
files:
  - src/components/Ranking.jsx
  - src/components/Panels.jsx
  - src/components/Forum.jsx
  - src/components/ChatDock.jsx
  - src/lib/forum.js
  - src/admin/FaithTab.jsx
  - src/admin/PactTab.jsx
  - src/admin/faithPact.js
  - src/admin/index.jsx
symbols:
  - src/components/Ranking.jsx:RankingTable
  - src/components/Ranking.jsx:PlayerCard
  - src/components/Panels.jsx:FaithPanel
  - src/admin/faithPact.js:faithBody
tests:
  - test/faithPact.test.js
---
## Purpose
Classement des joueurs et interfaces de la foi et des pactes réglés en admin (back : card `faith-pact`).

## Business rules
- Pactes (migration 45) : les deux côtés voient « Bonus D h · réactivable C h après la fin » et l'état (bonus actif puis recharge) ; l'Ange / Démon voit `used/max` par composition (pleines désactivées) et, après un changement, le sélecteur verrouillé « Changement possible dans … » (48 h). Admin `PactTab` : colonne « Attributions max » (vide = illimité, `tierBody.max_assign`).
- Site public : onglet « Classement » (`#classement`) après « Annonces & forum », avec ou sans compte ; tableau #, pseudo, rang, race, guilde ; 25 par page, pagination.
- En jeu : bouton « Classement » de la barre d'accès (bas à droite) ; s'ouvre sur la page du joueur, sa ligne surlignée, « Vous êtes Nᵉ ».
- Fiche joueur (`PlayerCard` : pseudo, rang · race · guilde) dans les demandes de pacte (reçues, envoyées), les pactes conclus, les dieux et les fidèles.
- Foi : liste des dieux de sa race (fidèles, « Devenir fidèle » / statut) au lieu d'une recherche ; prière par caractéristique proposée, compteur « prières : restantes / max » et prochaine possible.
- Autel (dieu) : gains horaires affichés ; par fidèle accepté, formulaire caractéristique / valeur (≤ max) / durée (≤ max h) avec le coût en énergie divine calculé en direct ; bouton grisé si l'ÉD manque.
- Pactes : l'Ange / le Démon choisit la composition dans une liste (détail gain / % / durée / délai au survol) ; l'Humain voit « Pacte <nom> », bonus actif ou recharge restante, bouton grisé sinon ; limite « n / max pactes selon votre rang ».
- Admin « Foi » : tranche de fidèles, XP / or par heure, prières et période ; tableau des caractéristiques (cocher, valeur max, durée max, coût au max, exemple). Admin « Pacte » : caractéristiques transférées, compositions (édition, ajout, suppression, exemple « N pour 20 »), pactes max par rang (vide = défaut).

## Tests
`test/faithPact.test.js` (corps des formulaires, coût proportionnel, exemple de composition, route `#classement`) ; parcours navigateur (classement public + page 2 + mobile sans débordement, bouton en jeu, autel, onglets admin).
