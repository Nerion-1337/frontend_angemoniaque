---
title: Objets : caractéristiques offertes (toutes celles du joueur), armure magique dans les fiches
slug: item-stats-ui
status: done
updated: 2026-11-25
files:
  - src/admin/divine.js
  - src/admin/ItemsTab.jsx
  - src/components/SidePanel.jsx
  - src/lib/equipment.js
  - src/admin/StatCostsTab.jsx
  - src/admin/statCosts.js
symbols:
  - src/admin/divine.js:bonusesBody
  - src/admin/divine.js:statsLine
tests:
  - test/itemStats.test.js
  - test/equipment.test.js
  - test/statCosts.test.js
---
## Purpose
Onglet Objets : un groupe « Caractéristiques offertes » couvre toutes les caractéristiques du joueur ; les fiches monstre,
bâtiment, sort et joueur connaissent l'armure magique.

## Business rules
- Les 10 caractéristiques (`ITEM_STATS`) : force, agilité, armure, armure magique (colonnes de l'objet) ; PV max, régénération, énergie max, énergie divine max, vue, portée (`bonuses`, `bonusesBody` : entiers, zéros et vides retirés, malus gardés).
- La liste des objets résume les caractéristiques non nulles (`statsLine`) ; l'info-bulle de l'inventaire en jeu aussi.
- Armure magique éditable : fiche monstre (groupe Combat), bâtiment (bonus de l'occupant), effets de sort, fiche joueur.
- Admin Objets : types = types de l'inventaire (`ITEM_SLOTS`, plus les parties du corps des monstres) ; option « Deux mains » pour une arme (`two_handed`).
- Inventaire : plus d'emplacement arc ; une arme à deux mains n'éclaire que la main principale et l'autre main affiche « (nom de l'arme) » ; caractéristiques = valeur finale, détail au survol / focus (`StatDetail` : base, objets, effets, monture ; Force requise en note) ; la ligne passe à la ligne (pas de défilement qui rognerait le détail).
- Sac : `bagUsed / bagMax` emplacements ; les ressources s'affichent en piles (nom ×quantité / taille de pile) après les objets ; emplacement au-delà de la taille en rouge ; un parchemin de sac sélectionné propose « Utiliser » (+N, jusqu'à M ; grisé au maximum).
- Admin Objets : parchemin (`scroll`) → champs « Agrandit le sac de » / « jusqu'à » (`data = { kind: 'bag', add, max }`) ; les autres parchemins gardent leur data.
- Admin « Améliorations » (`StatCostsTab`, `statCosts.js`) : une carte par caractéristique améliorable (base, par palier, ×1/×2/×3, aperçu des coûts) ; ajout parmi les caractéristiques restantes ; retrait confirmé.

## Gotchas
- Les champs Armure / Force + / Agilité + / Armure magique isolés ont été remplacés par le groupe : ne pas les remettre (doublons).

## Tests
`test/itemStats.test.js` (liste des 10, `bonusesBody`, `statsLine`) ; `test/adminDivinePlayers.test.js` (`itemBody` avec `bonuses`).
