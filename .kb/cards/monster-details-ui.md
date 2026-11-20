---
title: Panneau Détails de monstre (phase 3) : compétences, équipement 7 slots, auras, plafonds, placements
slug: monster-details-ui
status: done
updated: 2026-11-20
files:
  - src/admin/MonsterDetails.jsx
  - src/admin/monsterDetails.js
  - src/admin/Pick.jsx
  - src/admin/index.jsx
  - src/styles.css
symbols:
  - src/admin/monsterDetails.js:SLOTS
  - src/admin/monsterDetails.js:pickFilter
  - src/admin/MonsterDetails.jsx:MonsterDetails
  - src/admin/Pick.jsx:Pick
tests:
  - test/monsterDetails.test.js
---
## Purpose
Partie UI de l'étape 2 phase 3 : dans l'onglet « Monstres » du dashboard admin, la liste des
monstres (noms cliquables, filtrable) ouvre une fiche par onglets — compétences/sorts (menu
déroulant avec recherche sur la base de sorts globale), équipement (objet du catalogue + l'un des
7 slots), auras (sort appliqué en continu sans énergie, alliés/ennemis + périmètre), plafonds
(max dans le jeu / par joueur = par invocation) et placements (tous les monstres sur les cartes +
ajout spontané avec drops de mort : or / objets / ressources / divins + réincarnation après délai).
Le reste de la logique (tables, endpoints, mort/réincarnation) est au dépôt back — carte
`monster-details`.

## How it works
- **Montage** (`src/admin/index.jsx`) : la section `monster` rend
  `<Entities kind="monster" />` (CRUD générique, caractéristiques), puis `<MonsterDetails />`
  (cette fiche), puis `<Bestiary />` (butin & règles de spawn).
- **Panneau** (`MonsterDetails.jsx`) : au montage charge `/admin/content/monsters` (le
  sélecteur de monstre = la liste demandée au point 1), `/admin/catalog` (items + spells + maps
  pour les menus déroulants) et `/admin/bestiary/status` (instances + `respawn_due_at`). Cliquer
  sur un nom (`onPick=open`) charge en parallèle les sous-collections
  `/admin/content/monsters/{id}` + `/spells` + `/equips` + `/auras` (+ `caps` de la fiche,
  converties par `capsToMaxCaps`). Mutations : POST/DELETE des sous-collections, caps via
  `/admin/content/monsters/{id}/caps` (POST idempotent `ON CONFLICT DO UPDATE`), placement via
  `POST /admin/bestiary/place` (corps `placeBody`) et retrait via
  `DELETE /admin/bestiary/place/{pos_id}` — chaque succès rechargue la sélection / le status.
- **Menu déroulant avec recherche** (`Pick.jsx` + `pickFilter` de `monsterDetails.js`) : une case
  de filtre casse-insensible (le libellé complet), la liste filtrée (libellé + sous-libellé),
  le clic remonte `id`. Catalogues : `cats.spells` (sorts), `cats.items` (objets), `monsters`
  (prototypes).
- **Aides pures** (`monsterDetails.js`) : `SLOTS`/`SLOT_LABEL` (les 7 slots, miroir du CHECK
  back), `spellLabel`/`equipLabel`/`auraLabel`, `capsToMaxCaps`, `placeBody`, `respawnIn`.
- **Affichage `headrow`** (`styles.css`) : le bandeau de section est restylé — alignement sur la
  ligne de base, sous-titre `.sub`, `.grow` pour repousser les actions à droite, séparateur
  `border-bottom` — rétrocompatible avec les usages existants (Entities/Races/Bestiary n'ont pas
  changé) ; le nouveau panneau utilise `<span class="sub">`.

## Entry points
- `src/admin/index.jsx` → `MonsterDetails` (section `monster`) ; le reste de l'espace admin est
  inchangé (`#admin` via `App.jsx`, fiche `admin-login-nav`).
- API consommée (dépôt back) : `/admin/content/monsters`, `/admin/catalog`,
  `/admin/bestiary/status|place`, sous-collections `/admin/content/monsters/{id}/{spells,equips,auras,caps}`
  — voir carte back `monster-details`.

## Data flow
État React local par panneau (pas de slice Redux dédié — la slice `admin` ne porte que
section/msg) : `monsters/cats/status` (chargés au montage), `sel` (monstre ouvert), `spellsL/
equips/auras/caps` (chargés à la sélection), formulaires locaux (`sp`, `eq`, `au`, `maxCaps`,
`pl`). Lectures : catalogues + status ; écritures : uniquement les mutations admin ci-dessus
(chaque succès rechargue l'état concerné — pas de cache d'état côté client).

## Tests
- `test/monsterDetails.test.js` (Vitest) : contrat des 7 `SLOTS` (miroir du CHECK back),
  `pickFilter` (recherche insensible à la casse, accent inclus : « lumière » ≠ « lumiere »),
  libellés (slots, cible alliés/ennemis, périmètre), `capsToMaxCaps` (global/per_player →
  inGame/perPlayer), `placeBody` (champs vides → undefined, booléens), `respawnIn` (mort /
  échéance lisible / rien) ; + gardes source : le `useEffect` du panneau est en corps de bloc
  (jamais `useEffect(load, [])`) et ses `<table>` emboîtent `<thead>`/`<tbody>` (contrats des
  fiches `admin-dashboard` / `bestiaire`).
- Intégration du parcours : `back/test/integration/monsterDetails.test.ts` (Postgres réel)
  couvre les mêmes endpoints que ce panneau ; vérifiqué E2E dans la stack de test
  (spells/equips/auras/caps → 200, placement → instance clonée + status, SPA `#admin` en 200).

## Gotchas
- **`SLOTS` doit rester à 7 et coïncider avec le CHECK `monster_equips.slot`** de la migration
  `12_monstre_details.sql` (back) : ajouter un slot = migrer la back et la constante en même temps.
- **`caps` viennent de la fiche monstre (`GET /admin/content/monsters/{id}` → `extras`)** : les
  plafonds ne sont pas une table dédiée ; `saveCaps` ne POST que les champs non vides (les deux
  entrées de formulaire restent indépendantes).
- **`Pick` ne se souvient de rien** (état de recherche réinitialisé) : le panneau rechargue à
  chaque sélection — ne pas « optimiser » avec un cache qui désynchroniserait les catalogues
  (ajout/suppression de sorts/objets au passage).
- **Le tableau de placements est le seul `<table>` du panneau** : le garde source
  `test/monsterDetails.test.js` le vérifie ; un nouveau tableau sans `thead`/`tbody` déclenche
  le warning `validateDOMNesting` (fiche `bestiaire`).
- **Le monstre du placement dérive de `sel` si non choisi** (`pl.monsterId || sel`) : l'admin qui
  ouvre un monstre puis « + Placer » sans toucher le sélecteur place le monstre ouvert — c'est
  voulu (pratique), mais un test automatisé doit le mémoriser.
- Les libellés `spellLabel`/`equipLabel` dépendent des noms de colonnes du GET back
  (`spell_name`, `item_name`, `slot`) : une rupture de contrat se voit en « undefined » dans les
  tags — les garde-fous des GET back sont dans la carte `monster-details`.
