---
title: Onglets admin Objets & Sorts (phase 4) : rareté + « qui peut s'en équiper / l'apprendre »
slug: item-spell-rarity-ui
status: done
updated: 2026-11-23
files:
  - src/admin/ItemsTab.jsx
  - src/admin/SpellsTab.jsx
  - src/admin/rarity.js
  - src/admin/index.jsx
symbols:
  - src/admin/ItemsTab.jsx:ItemsTab
  - src/admin/SpellsTab.jsx:SpellsTab
  - src/admin/rarity.js:RARITIES
tests:
  - test/itemSpellRarity.test.js
---
# item-spell-rarity-ui
## Purpose
Onglets admin « Objets » et « Sorts » (phase 4) : gestion du catalogue par rareté et du paramètre
« qui peut s'en équiper / l'apprendre ».
## How it works
- `index.jsx` : sections `item` → « Objets » (`ItemsTab`) et `spell` → « Sorts » (`SpellsTab`) ;
  l'ancienne section « Objets & Divins » (`Entities kind=item` + `Divine`) est remplacée — le
  panneau `Divine` vit maintenant **sous le sous-onglet Divin** de `ItemsTab`.
- `ItemsTab.jsx` : sous-onglets par rareté (Toutes + `RARITIES`). Chaque sous-onglet (hors Divin) :
  filtre par **type d'équipement** (les 7 slots `monsterDetails.SLOTS` + « Sans type »), table
  (nom / type / rareté / « Équippable par » / **détenu par N** / prix), éditeur inline (nom, slot,
  rareté, prix, bligne, dégâts, bonus, durabilité, armure magique, plafond, force requise) et
  puces `usable_by`. Création (+ Nouvel objet), suppression.
- `SpellsTab.jsx` : même pattern pour le catalogue des sorts (nom / genre / rareté / énergie /
  dégâts / durée / **appris par N** / « Apprenable par ») + création / édition / suppression.
- Refonte UI (2026-11-23, fiche `admin-dashboard`) : recherche locale (nom/genre/type) au-dessus du
  tableau, éditeur affiché AU-DESSUS du tableau, suppression confirmée (`confirmDel`), toasts `Ad.ok`.
  « Éditer » appelle `open(r)` (la ligne) : l'ancien `open(r.id)` laissait `edit` à `undefined`, l'éditeur ne s'ouvrait pas.
- `rarity.js` : miroir front des constantes back (`RARITIES`, `USABLE_KINDS`) + `usableBadge`.
- API : `GET /admin/content/items?rarity=&slot=` (colonne `rarity_n` normalisée — les valeurs
  historiques libres et accentuées « Épique »/« unique »/« legendary » sont mappées vers les 5
  valeurs canoniques), `POST/PUT items` (`usable_by` JSON, `rarity` libre côté base),
  `GET /admin/content/spells?rarity=` (`learners`), `POST/PUT spells` (`usableBy`, `rarity` enum).
## Entry points
`src/admin/ItemsTab.jsx`, `src/admin/SpellsTab.jsx`, `src/admin/rarity.js`, `src/admin/index.jsx`.
## Data flow
Sous-onglet → `?rarity=` (+ `?slot=`) → API → table (+ `holders`/`learners`) ; édition →
`PUT` (`usable_by`/`usableBy` sérialisé JSON) ; le décompte vient de `character_items` /
`character_spells`.
## Tests
`test/itemSpellRarity.test.js` (miroir des constantes, sous-onglets, filtres, guards),
tests d'intégration back `test/integration/itemSpellRarity.test.ts` (rareté, usable_by,
filtres, décomptes, édition, validation zod).
## Gotchas
- **Rareté legacy** : `items.rarity` est du texte libre historique (l'API n'impose PAS d'enum —
  seule la colonne `spells.rarity`, fraîche, est bornée). L'UI ne propose que les 5 valeurs ;
  l'affichage passe par `rarity_n`.
- **`usable_by` jsonb** : pg peut renvoyer la valeur parsée (tableau) ou stringifiée — toujours
  passer par `usableBadge` (front) / `ub()` (tests) ; ne jamais `JSON.parse` à l'aveugle.
- **Les 6 kinds de `USABLE_KINDS`** sont strictement synchronisés entre `rarity.js` (front) et
  `admin/common.ts` (back) ; une évolution = les deux fichiers.
- La colonne `holders` ne compte que `character_items` (inventaires porteurs), pas les items
  déposés en monde (`positions.item_id`).
