---
title: "Bestiaire admin panel (phase 2): loot tables, spawn rules, map presence dashboard"
slug: bestiaire
status: done
updated: 2026-11-04
files:
  - src/admin/Bestiary.jsx
  - src/admin/bestiary.js
symbols:
  - src/admin/bestiary.js:lootLabel
  - src/admin/bestiary.js:spawnBody
  - src/admin/Bestiary.jsx:Bestiary
tests:
  - test/bestiary.test.js
---
## Purpose
Admin UI (Étape 2 phase 2, "Bestiaire" tab of `src/admin/index.jsx`, rendered after the generic
`Entities kind="monster"` CRUD): manage per-monster loot tables (classical items, resources,
divine items with % chance and quantity), spawn rules (map, rectangle, instance cap, frequency,
probability, on/off toggle), and monitor live map presence + divine-item guardians, with a
manual tick button to trigger spawning.

## How it works
- `Bestiary.jsx` (small sub-component, Redux dispatch via `Ad.msg` for toasts): on mount loads
  `/admin/content/monsters`, `/admin/catalog` (items + maps pickers), `/admin/content/divine`
  and `/admin/bestiary/status`; selecting a monster fetches its `/loot` and `/spawns` rows in
  parallel. Mutations re-fetch the monster's lists; the "+ Tick horaire" button POSTs
  `/admin/tick` and reloads the status.
- `lootLabel(l)` (pure, in `bestiary.js`) renders a loot entry readably: `objet {item_name}`,
  `divin {divine_kind} n°{divine_ref}` (the back GET returns `di.kind` + `di.id`, `divine_items`
  has no name column), else `ressource {resource}`.
- `spawnBody(ns)` (pure) converts the spawn-rule form state (string inputs) to the numeric
  body expected by `POST /admin/content/monsters/{id}/spawns` (mapId, xMin/yMin/xMax/yMax,
  maxInstances, intervalH, probability).
- Loot form state: `type` ∈ item/divine/resource; divine entries have no quantity fields
  (single designated piece); resources are a free-text key (bois, fer, …).

## Entry points
- `src/admin/index.jsx` → `<Bestiary />` when tab `t === 'monster'` (below the generic
  entities CRUD, which creates/edits the monster itself).
- Consumes back routes: `/admin/content/monsters`, `/admin/content/monsters/{id}/loot`
  (GET/POST/DELETE), `/admin/content/monsters/{id}/spawns` (GET/POST/PUT/DELETE),
  `/admin/bestiary/status`, `/admin/catalog`, `/admin/content/divine`, `/admin/tick` — all
  through `src/lib/api.js` (relative `/api/...`, Nginx strips the prefix).

## Data flow
Reads: monster lists, item/map/divine catalogs, loot + spawn rows (admin GETs return `ml.*` /
`sr.*` plus `item_name`, `divine_kind`, `divine_ref`, `map_name`), and the status object
`{instances: [{id,name,hp_current,hp_max,map_id,x,y,spawned,prototype,guards_item}],
guardians: [{id,kind,guardian_monster_id,guardian,holder_character_id,holder}]}`. Writes:
loot / spawn rows (POST/PUT/DELETE) — each mutation triggers `bumpContent()` + audit on the
back; "sauvage (spawn)" vs "ancré" rows in the presence table come from
`data->>'spawned'::boolean`.

## Tests
- `test/bestiary.test.js` (Vitest, pure helpers): `lootLabel` for the three entry kinds —
  `objet Épée`, `divin relique n°3`, `divin arcane n°7`, `ressource bois`; and `spawnBody`
  numeric conversion of the whole form state.

## Gotchas
- **`lootLabel` depends on the back GET field names** (`item_name`, `divine_kind`,
  `divine_ref`): if the back SELECT changes (e.g. someone reintroduces `divine_name`), the
  labels silently degrade — keep the two in sync (see the back `bestiaire` card).
- `lootLabel` guards on `divine_ref || divine_kind`; for a real divine row both are set by the
  LEFT JOIN, never only one.
- `spawnBody` converts **every** form field to `Number` — the back Zod schema rejects string
  numbers, so the conversion must stay exhaustive (a new field added to the form but not
  converted 400s).
- The divine picker shows holder state from `/admin/content/divine` (`holder` / "libre"); the
  note under the loot editor explains the global `drop_rate` multiplier and the
  transfer-without-duplication rule — do not remove it when redesigning.
