---
title: Admin « Joueurs » (liste paginée, fiche) et objets divins dans l'onglet Objets ; préfixe CSS admin
slug: admin-players-divine-ui
status: done
updated: 2026-11-26
files:
  - src/admin/PlayersTab.jsx
  - src/admin/players.js
  - src/admin/ItemsTab.jsx
  - src/admin/Divine.jsx
  - src/admin/divine.js
symbols:
  - src/admin/players.js:statDiff
  - src/admin/players.js:pageWindow
  - src/admin/divine.js:itemBody
  - src/admin/divine.js:familyLabel
tests:
  - test/adminDivinePlayers.test.js
  - test/itemSpellRarity.test.js
  - test/adminEffects.test.js
---
## Purpose
Section admin « Joueurs » (liste paginée par race, fiche éditable) et rareté « Divin » de l'onglet Objets gérée comme les autres
objets, avec familles divines et exemplaires uniques.

## Business rules
- Fiche : changer le rang n'envoie que `specialization_id` (diff) ; le serveur ajoute ou retire l'écart de base entre paliers (note affichée sous le sélecteur).
- Liste : 20 par page, onglets par race avec effectifs, recherche pseudo/e-mail.
- Fiche : n'envoie que les caractéristiques MODIFIÉES, en entiers ≥ 0 (`statDiff`) ; rang choisi parmi les paliers de la race ; téléportation vers la case libre la plus proche ; bloquer/débloquer.
- Objets séparés en Équipé / Sac / Coffre-fort ; ajout au sac ou au coffre ; retrait par emplacement ; sorts, montures, divins ajoutés ou retirés.
- Divin : même tableau et même formulaire que les autres raretés + famille ; une famille n'est envoyée qu'en rareté divin ; colonne « famille · exemplaires / plafond ».
- Familles : plafond modifiable (vide = illimité), création (clé en minuscules), suppression des seules familles libres vides.
- Exemplaires d'un objet divin : création dans la limite du plafond, suppression d'un exemplaire libre seulement.
- Le corps d'un objet (`itemBody`) ne contient que les champs du formulaire, jamais de `null` (le back refuse null sur les nombres).
- Fiche joueur : case « Carte des ressources » (amélioration de l'Hôtel de ville) accordée / retirée directement.

- Fiche joueur, Améliorations : une case « Carte des ressources — <monde> » par monde (PUT `map_worlds`).
## Gotchas
- `Divine.jsx` (composants) et `divine.js` (fonctions) ne diffèrent que par l'extension : importer avec l'extension.
- Les classes CSS admin ne doivent pas reprendre un nom global du jeu (voir `admin-dashboard`).

## Tests
`test/adminDivinePlayers.test.js` (`itemBody`, familles, `statDiff`, position, pagination) ; `test/itemSpellRarity.test.js` (Divin = formulaire commun + famille) ; `test/adminEffects.test.js`.
