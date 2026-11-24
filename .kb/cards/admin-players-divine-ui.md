---
title: Admin « Joueurs » (liste paginée, fiche) et objets divins dans l'onglet Objets ; préfixe CSS admin
slug: admin-players-divine-ui
status: done
updated: 2026-11-24
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
Section **Joueurs** : liste paginée (20 / page) de tous les personnages, onglets par race avec effectifs, recherche pseudo/e-mail ;
« Éditer » ouvre une fiche à onglets (Caractéristiques, Objets, Sorts, Montures, Bâtiments, Objets divins). Onglet **Objets**,
rareté **Divin** : même tableau et même formulaire que les autres objets, plus la famille divine, le panneau des familles et les
exemplaires uniques de l'objet.

## How it works
- `PlayersTab` : `GET /admin/players?page&per&race&q` ; pagination `pageWindow` ; `PlayerSheet` charge `GET /admin/players/{id}` et
  `/admin/catalog` (objets, sorts, montures, cartes pour les `Pick`). Caractéristiques : `statDiff(orig, form)` n'envoie que les champs
  modifiés (entiers ≥ 0) en `PUT` ; rang = `specialization_id` parmi les paliers de la race ; téléportation (`/teleport`, case libre la
  plus proche) ; bloquer/débloquer. Objets : ajout sac/coffre + retrait par emplacement ; sorts / montures / divins via `/grant` + routes de retrait.
- `ItemsTab` : plus de branche spéciale Divin ; `itemBody(f)` construit le corps (champs du formulaire seulement, jamais null — le back
  refuse null sur les nombres —, `divine_family` seulement en « divin »). En Divin : `<Families>` (plafond éditable, création, suppression
  des familles libres vides) au-dessus, colonne « Famille · exemplaires », et `<Divine itemId={edit}>` dans l'éditeur (exemplaires :
  création n ≤ plafond, suppression d'un exemplaire libre).
- `index.jsx` : section `['players', 'Joueurs']` (icône `Users`).
- **CSS** : les classes admin ne doivent pas reprendre un nom global du jeu. `.panel` (panneau fixe à gauche), `.cell` (cadre vert
  centré), `.actions` (menu absolu), `.item.row2` (centré), `.empty`, `.logo` existent dans `styles.css` : l'admin utilise `.apanel`
  et neutralise les autres sous `.admin` (bloc « Neutralise… »). Toute nouvelle classe admin : vérifier `grep` dans `styles.css`.

## Entry points
`src/admin/index.jsx` (sections Joueurs, Objets). Back : card `admin-players-divine`.

## Data flow
État local aux composants ; aucune donnée persistée côté navigateur hors `admin.section`.

## Tests
`test/adminDivinePlayers.test.js` (`itemBody`, `familyLabel`, `validFamilyKey`, `statDiff`, `posLabel`, `pageWindow`) ;
`test/itemSpellRarity.test.js` (Divin = `<Divine itemId={edit}` + `divine_family`) ; `test/adminEffects.test.js` (effets de
`Divine` [itemId] et `PlayersTab` [race, page, q] en corps de bloc). Rendu vérifié le 2026-11-24 dans Chromium (Playwright) sur la
stack : 9 sections, 1600×900 et 390×844, contrôle géométrique (aucun bloc sous la barre latérale, ni fixe/absolu, ni scroll horizontal).

## Gotchas
- Ne jamais réutiliser `.panel`, `.cell`, `.actions`, `.item` sans neutralisation : régression visible le 2026-11-24 (panneaux plaqués à gauche sous la barre).
- `Divine.jsx` (composants) et `divine.js` (helpers purs) ne diffèrent que par l'extension : importer avec l'extension explicite.
