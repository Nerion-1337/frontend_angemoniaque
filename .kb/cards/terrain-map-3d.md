---
title: 3D map view: procedural terrain/relief mirrors, Three.js scene, tile interactions
slug: terrain-map-3d
status: done
updated: 2026-10-21
files:
  - src/lib/terrain.js
  - src/lib/humanMap.js
  - src/lib/resources.js
  - src/lib/energy.js
  - src/lib/relief.js
  - src/three/scene.js
  - src/three/entities.js
  - src/components/GameCanvas.jsx
  - src/components/Location.jsx
  - src/components/TileCard.jsx
  - src/components/MapLegend.jsx
  - src/components/Compass.jsx
symbols:
  - src/lib/terrain.js:terrain
  - src/lib/terrain.js:noiseAt
  - src/lib/terrain.js:inSafeZone
  - src/lib/resources.js:RES_BY_ID
  - src/components/MapLegend.jsx:MapLegend
  - src/components/Compass.jsx:Compass
  - src/lib/energy.js:pathEnergy
  - src/lib/relief.js:heightAt
  - src/lib/relief.js:groundColor
  - src/three/scene.js:createScene
  - src/three/entities.js:makeEntity
  - src/components/GameCanvas.jsx:GameCanvas
  - src/components/TileCard.jsx:TileCard
tests:
  - test/lib.test.js
  - test/world.test.js
---
## Purpose
The client-side world renderer: a mirror of the back's world model — **map 1 (Human) is a hand-drawn grid** (`humanMap.js`, byte-equivalent to the back's generated copy) and the other worlds are the original procedural noise — plus energy/mount rules. It drives the 3D scene (`scene.js` / `entities.js`) and the interactive panels (`Location.jsx` for the 3D view, `TileCard.jsx` for the mobile tile view, `MapLegend.jsx` + `Compass.jsx` as new HUD widgets). The mirror keeps movement costs, terrain colors, relief tinting, resource **catalog names**, safe zones and the volcano look in lockstep with `back/src/game/{terrain,movement}.ts`.

## How it works
- `terrain.js`: `terrain(x, y, mapId = WORLD)` — map 1 comes from `humanMap.js` (same codes as the back); maps 2/3 use the original `procNoise` thresholds. Each cell: `{kind, cost, resourceId, resource (catalog name), burn, v}`. `inSafeZone(x, y, mapId)` mirrors the back (hotel 100,100, Chebyshev ≤ 10, map 1 only). `setWorld(n)` sets the default map — **global mutable state**, called by `GameCanvas` on every `me` refresh.
- `resources.js` (generated mirror of the back catalog): `RESOURCES`/`RES_BY_ID`/`GROUPS` — the front's harvest previews show the catalog name; the back stores the stable id in `characters.resources`.
- `energy.js`: `pathEnergy(from, to, {mount, stopAt, aquatic, flying})` — Chebyshev step sum, 1 step at a time (flying = 1 everywhere), aquatic mounts are 1 on water / forbidden on land. The **current world** is read from the global `WORLD` (no mapId parameter on `pathEnergy`).
- `relief.js`: per-kind tint (`COLORS`, extended with arid/snow/ether/volcano), a 4×4 zone-averaged tint, and a 25% darkening for deep water; the cell's resource/feature glyph.
- `three/scene.js`: grid + fog + `THREE.InstancedMesh` terrain quads (200×200, 8 directions) tinted by `relief.js`; `three/entities.js`: sprites for characters/monsters/buildings/items.
- `GameCanvas.jsx`: fetches `/map/{id}/landmarks` + `area` per WS event + 8 s poll, renders the instanced grid, `setWorld(me.map_id)` on refresh; safe-zone and cell-click flow into `Location.jsx` → `TileCard.jsx` (action menu gated by the same safe-zone rule as the back).
- `MapLegend.jsx`: legend of the current map's resource groups + a coordinate box (only shown for map 1: "emplacement précis ne vaut que pour la carte 1").
- `Compass.jsx`: N/E/S/O labels with `cardinalOf(dir)` for the 8 directions.
- The mobile tile grid renders one cell per `TileCard`; 3D view uses the camera pan/zoom + `entities` sprites.

## Entry points
- `GameCanvas` mount + WS `moved` events + 8 s poll → `scene.js` render loop.
- `Location.jsx` "voir case" → `TileCard.jsx` menu (move / gather / attack gated by `t.kind !== 'monster' && !t.safe`, mirroring the back's 403).
- `App.jsx` `WorldPanel` → `MapLegend` + map switcher (`POST /actions/enter` → `setWorld` on next refresh).
- Mounts/boats: `/mounts` list feeds `pathEnergy` options in the action menu.

## Data flow
`GET /map/{id}/landmarks` → entity positions → sprites; `GET /map/{id}/area?x&y&r=15` (r caps at 25 on the back) → instanced terrain quads + tile grid; `terrain(x, y)` (mirror) → `energy.js` cost → "move" button energy badge; the back remains authoritative (client previews only, see `back` card `map-terrain-gather`).

## Tests
- `test/lib.test.js` (unit): energy linearity, `stopAt` cap, water/aquatic/flying rules, **catalog name ⇄ stable id on the 3 maps**, new kinds (arid 2, volcano 3 / forbidden for aquatic mounts).
- `test/world.test.js` (unit, generated invariants): same hotel/safe-radius/portal/resource-presence/Yggdrasil-8-cells checks as the back `test/world.test.ts` — the front copy is a true mirror.
- `test/guild-panel.test.js` / `test/format.test.js`: untouched sibling utilities.

## Gotchas
- **The mirror is duplicated across two repos**: any terrain/energy change lands in both `back/src/game/{terrain,movement}.ts` and `front/src/lib/{terrain,energy}.js` (+ the generated `humanMap`/`resources` pairs) — lock it with tests on both sides; the generated files say so at the top of the file.
- `setWorld(n)` is **global mutable state** in `terrain.js`: every world switch must `setWorld` again (the `GameCanvas` refresh does it); tests must set it explicitly before any `pathEnergy` call that depends on the current world.
- `pathEnergy` has no `mapId` parameter — it always runs on the current world; passing a cross-world target would produce wrong costs (never do that).
- `deep` quads are tinted but the effective rule is `Infinity` on foot; the volcano is crossable (cost 3) — its burn is a **server-side** effect (`burn_until`), the client only previews the cost.
- `tile`/`entity` payloads never carry exact HP (public 4-level state only, back `pub()`), the safe-zone flag `safe` comes from `/map/{id}/cell` — gate the attack option on it to stay consistent with the back's 403.
- Mobile tile view vs 3D: both read the same `terrain()`; keep `COLORS`/tints in sync when adding a kind (now 9 kinds, `relief.js` owns the tint map).
