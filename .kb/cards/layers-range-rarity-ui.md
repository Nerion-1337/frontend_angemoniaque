---
title: Fiche de case à deux couches, deux portées, rareté visible, classement (race, avatar), entraînement, confirmation de pacte
slug: layers-range-rarity-ui
status: done
updated: 2026-11-27
files:
  - src/components/TileCard.jsx
  - src/components/Rarity.jsx
  - src/components/Ranking.jsx
  - src/components/SidePanel.jsx
  - src/components/Capital.jsx
  - src/components/Panels.jsx
  - src/admin/ItemsTab.jsx
  - src/admin/divine.js
  - src/admin/entityFields.js
  - src/admin/MonsterDetails.jsx
  - src/admin/MonsterParts.jsx
symbols:
  - 
tests:
  - test/rangedRarity.test.js
---
## Purpose
Interface du lot du 2026-11-27 (migration 46).

## Business rules
- Fiche de case : si deux entités (sol + airs), onglets « Au sol : … / Dans les airs : … » ; l'aperçu de combat envoie `?air=` ; « S'y rendre » seulement si la couche de l'acteur est libre (pas de bâtiment) ; récolte : héros seulement, aucune entité au sol.
- Portées : « Portée à distance » (caractéristique, hauteur comprise) et portée d'attaque (`attack_range`) utilisée pour s'approcher / cibler ; infobulle explicative ; admin : case « Arme à distance » sur les armes (`itemBody.ranged`, absent hors arme), libellés « Portée d'attaque », « Portée à distance », « Bonus portée à distance ».
- Rareté : `<Rarity>` (pastille colorée) et classe `rar-<clé>` (liseré) sur sac, équipement, boutique et sorts ; copie des libellés de l'admin (le code admin n'est pas livré aux joueurs).
- Classement : ligne teintée de la couleur de race (pseudo, pastille, liseré), miniature d'avatar (`/api/ranking/portrait/<pseudo>`), clic = agrandi ; sans avatar : initiale.
- Pacte : choisir une composition ouvre une confirmation (`Confirm`) avant l'appel (verrou 48 h rappelé).
- Entraînement : carte en tête de l'onglet Amélioration si le rang a `train_xp` > 0.
- Admin monstre posé : plus de section « Réapparition et objet divin porté » ; XP au tueur et XP au coup réglables en fin de butin (`InstXp`). Admin rangs : XP coup joueur, XP esquive, entraînement (énergie, XP) ; types de monstre : XP au coup.

## Gotchas
- `Rarity.jsx` duplique les libellés de `admin/rarity.js` : garder les deux listes alignées.

## Tests
`test/rangedRarity.test.js` (itemBody.ranged, rarClass).
