---
title: Onglet Monstres (phase 3b/3c) : types, capacités actives/passives, spécificités, liste & édition des instances
slug: monster-details-ui
status: done
updated: 2026-11-21
files:
  - src/admin/MonsterDetails.jsx
  - src/admin/monsterDetails.js
  - src/admin/Pick.jsx
  - src/admin/MiniMap.jsx
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
Onglet « Monstres » du dashboard admin (étape 2, phases 3b/3c). Vue d'entrée : la liste des
**types** de monstres + bouton « + Nouveau type » aligné à droite (le bandeau de titre
`headrow` a été retiré — simple ligne d'action `.actions`). Un clic sur un nom ouvre le panneau du type,
à 4 onglets :
1. **Caractéristiques** (édition des champs du type, CRUD `entityFields`),
2. **Capacité** — sorts **actifs** (lancés à la demande) et **passifs** (possédés par défaut,
   appliqués en continu, sans énergie ; cible alliés/ennemis + périmètre) ; l'ancien concept
   « aura » y est fusionné (catalogue de sorts global, menu avec recherche),
3. **Spécificités** — quantité max (jeu / joueur) + **parties du corps équipables** (grille
   silhouette 7 parties, style personnage — `monster_slots` ; vide = aucune restriction),
4. **Liste** — **uniquement les instances du type sélectionné** (coordonnées, carte, PV,
   lié à un pseudo / natif, réincarnation). Un bouton « + Ajouter » à côté du titre ouvre UNE
   SEULE section partagée **édition / création** : en mode création on choisit le type + carte +
   x/y ; en édition on déplace l'instance (**x/y saisis manuellement** et/ou **mini-carte avec
   zoom molette/boutons + pan** — un clic sans glisser remplit x/y), on édite le **butin donné
   au tueur** (objet / ressource — recherche paginée 20/page dans les catalogues — / **or**,
   l'or détenu n'étant plus un champ à part) et l'**équipement** (parties bornées par la grille
   du type). L'ancien onglet « Règles transverses » a été retiré (phase 3c).
La logique (tables, endpoints, mort/réincarnation, or du butin) est au dépôt back — carte
`monster-details`.

## How it works
- **Montage** (`src/admin/index.jsx`) : la section `monster` rend `<MonsterDetails />` puis
  `<Bestiary />` (butin de spawn & gardiens) — le CRUD générique d'entité n'y figure plus.
- **Panneau** (`MonsterDetails.jsx`) : au montage, charge `/admin/content/monsters` (liste des
  types), `/admin/catalog` (items, spells, maps, **resources**) et `/admin/bestiary/status`.
  `sel` = type ouvert ('' liste, 'new' création, id) ; `mine` = instances du type (filtre de
  l'onglet Liste). Onglets `data/caps/spec/list` ; l'onglet Liste porte `lMode` ('' / 'edit' /
  'new') : « + Ajouter » → création (remplace l'édition), « Sélectionner » → édition
  (`selectInst` recharge `/equips`, `/loot`, grille `/slots` du prototype). Mutations :
  capacités `POST/DELETE /admin/content/monsters/{id}/spells` (mode active|passive),
  `POST/DELETE /slots/{slot}`, caps `POST/DELETE /caps/{scope}`, déplacement
  `PUT /admin/bestiary/place/{pos_id}` ({x, y[, mapId]}), création
  `POST /admin/bestiary/place` (corps `placeBody`), retrait `DELETE /place/{pos_id}`, butin
  `POST/DELETE /loot` (type « Or » = `resource:'or'`, ressource = id du catalogue),
  équipement `POST/DELETE /equips` (slot borné par la grille).
- **`Pick.jsx`** : menu déroulant avec **recherche + pagination** (`perPage` défaut 20,
  pieds de page ‹ › sur la liste complète filtrée) — catalogues objets/ressources/monstres.
- **`MiniMap.jsx`** : canvas coloré par le terrain du jeu (`lib/terrain`), points des
  instances de la carte ; **zoom** molette (écouteur natif non-passif) et boutons ±/⌂,
  **pan** par glisser ; un clic (sans glisser) renvoie la case à `onPick`.
- **Aides pures** (`monsterDetails.js`) : `SLOTS/SLOT_LABEL/SLOT_POS` (miroir du CHECK back +
  positions silhouette), `slotAllowed`, `pickFilter`, `spellLabel/capLabel/equipLabel`,
  `capsToMaxCaps`, `placeBody`, `linkedLabel`, `respawnIn`.

## Entry points
- `src/admin/index.jsx` → `MonsterDetails` (section `monster`) ; accès `#admin` (fiche
  `admin-login-nav`). API consommée (back) : `/admin/content/monsters`, `/admin/catalog`
  (avec `resources`), `/admin/bestiary/status|place` (+ `PUT /place/{id}`), sous-collections
  `/admin/content/monsters/{id}/{spells,equips,slots,caps,loot}` — carte back
  `monster-details`.

## Data flow
État React local par panneau (la slice Redux `admin` ne porte que section/msg) :
`monsters/cats/status` (montage), `sel/draft/caps/actives/passives/slots` (à l'ouverture d'un
type), `instSel/iLoot/iEquips/iGrid/mx/my/instMap/lMode` (onglet Liste — `mx,my` = position
saisie manuellement OU cliquée, source unique du marqueur de la mini-carte et du bouton
« Déplacer »), formulaires `capF/nl/ne/nw`. Chaque succès de mutation rechargue le status ou
la sous-collection concernée (pas de cache côté client).

## Tests
- `test/monsterDetails.test.js` (Vitest) : contrat des 7 `SLOTS` (+ `slotAllowed`,
  `SLOT_POS`), `pickFilter`, libellés (`spellLabel/capLabel/equipLabel/linkedLabel/respawnIn`),
  `capsToMaxCaps`, `placeBody` ; gardes source : `useEffect` du panneau en corps de bloc,
  `<thead>/<tbody>` des tableaux, absence de l'onglet « règles transverses », liste filtrée
  par type (`mine`), `Pick` paginé (20/page), `MiniMap` (zoom/pan/clic).

## Gotchas
- **`SLOTS` doit rester à 7 et coïncider avec le CHECK `monster_equips.slot`** (migration 12
  back) : ajouter une partie = migrer le back + la constante + `SLOT_POS` ensemble.
- **Grille des parties équipables** : liste vide = aucune restriction (l'équipement d'instance
  retombe sur les 7 `SLOTS`) ; le bornage est appliqué côté UI, pas par l'API.
- **L'or du butin = `monster_loot.resource='or'`** : la ressource spéciale créditée en or du
  tueur par `rollLoot` (back) — ne pas la confondre avec le JSONB `characters.resources` ;
  l'affichage (`lootTag`) et l'ajout (type « Or ») du panneau passent par cette valeur.
- **`Pick` ne se souvient de rien** (recherche/page réinitialisées) : le panneau rechargue les
  catalogues à chaque sélection — pas de cache qui désynchroniserait.
- **`MiniMap` : le clic = selection, le glisser = pan** (seuil 4 px) ; le `wheel` doit rester
  un écouteur natif non-passif (React rend `preventDefault` impossible en passif).
- **La section édition/création est une seule et même zone** : « + Ajouter » en mode édition
  la bascule en création (et inversement) — ne pas ajouter de 2e zone d'ajout.
- **Le tableau de l'onglet Liste est filtré par type** (`mine`) : afficher « tous les
  monstres » serait contredit par la demande — le titre le précise (« du type … »).
