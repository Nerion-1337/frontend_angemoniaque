---
title: 3D map view: procedural terrain/relief mirrors, Three.js scene, tile interactions
slug: terrain-map-3d
status: done
updated: 2026-10-21
files:
  - src/lib/terrain.js
  - src/lib/energy.js
  - src/lib/relief.js
  - src/three/scene.js
  - src/three/entities.js
  - src/components/GameCanvas.jsx
  - src/components/Location.jsx
  - src/components/TileCard.jsx
symbols:
  - src/lib/terrain.js:terrain
  - src/lib/terrain.js:noiseAt
  - src/lib/energy.js:pathEnergy
  - src/lib/relief.js:heightAt
  - src/lib/relief.js:groundColor
  - src/three/scene.js:createScene
  - src/three/entities.js:makeEntity
  - src/components/GameCanvas.jsx:GameCanvas
  - src/components/TileCard.jsx:TileCard
tests:
  - test/lib.test.js
---
## Purpose
The visual world: the same procedural map the backend simulates, rendered as continuous 3D relief (Three.js) with day/night sky, water, instanced vegetation and glowing ore, plus the cell-based interaction layer (hover/selected tile card) that previews every action — movement cost, harvestable resource, combat chance — before the player commits it to the API. The lib layer is a mirror of the backend so client previews match server results exactly.

## How it works
- `lib/terrain.js` is an **exact copy of `back/src/game/terrain.ts`** (same hash, same thresholds): `noiseAt` bilinear value noise (8-cell lattice) → `terrain(x,y)` = `{kind, cost, resource}` (`deep <0.14/perle`, `shallow <0.22/eau`, `plain <0.58/herbe`, `forest <0.74/bois`, `mountain/pierre`). Never edit one without the other — `test/lib.test.js` locks the resource mapping and `test/rules.test.ts` (back) locks the same.
- `lib/energy.js` mirrors `back/src/game/movement.ts` `stepCost`: `pathEnergy(from, to, {flying, aquatic, stopAt})` = Chebyshev straight-line sum of per-cell costs (flying = 1 everywhere; aquatic = 1 on water / Infinity on land; on foot deep = Infinity, shallow = 4). Used by `TileCard` to display "⚡N" per action; `Infinity` renders as `∞` and disables the action.
- `lib/relief.js` upgrades the 5-level logic into a continuous surface: `heightAt(x,y)` (water drops steeply below `WATER_Y`, mountains raised by `v>0.58` ridge term + micro-noise) and `groundColor(x,y,h,out)` (deep → shallow → sand → grass → forest → rock → snow, SRGB colors, light-varied by micro-noise). Both are pure functions of the same `noiseAt`.
- `three/scene.js` `createScene(el, {onClick, onHover, orbit})`: one WebGL renderer + EffectComposer (bloom), physical Sky driven by the local clock (`applyTime()` every minute; the light stays ≥ 34° elevation so the ground stays readable at night), a terrain mesh of `(R*2)²` segments rebuilt on movement (`buildTerrain()` vertex heights/colors from `heightAt`/`groundColor`), an animated water plane at `WATER_Y`, instanced vegetation (pines/oaks/grass/rocks/spires + emissive ore clusters on mountains — `buildVegetation`, cells occupied by entities stay clear), a fading cell grid, hover/selection cursors, and a camera that follows the character with right-drag orbit / wheel zoom. Entity sync is key-based (`kind:id:mount_name`) with position lerp and yaw rotation.
- `three/entities.js` `makeEntity(e, me)`: builds the model per kind — `person` (race robe, angel wings/halo, demon horns/eyes, human shield; own ring for `me`), `beast` (Léviathan/Balrog/Minotaure palettes), `building` (capital towers / glowing door portal / other kinds), `golem` (summons), `mountModel` (flying vs ground mount), each with a floating canvas sprite label.
- `GameCanvas.jsx`: mounts the scene, re-fetches `me` + the visible `/map/{id}/area?r=see` every 8 s (`useRefreshMe`) AND on every WS message (`/api/ws?map=N` — moved/combat/… events all trigger a refresh), pushes updates into the scene, and forwards hover/selected cell dispatches to the `game` slice.
- `TileCard.jsx`: for the selected cell, `useCell` fetches `/map/{id}/cell` (3 s cache), shows the entity (never other players' exact HP — `health` state + visible gear only), the combat preview (`/combat/preview`), and the action menu: go / approach / attack / mount breath / interact building / harvest (only when `res.resource` and not deep-on-foot) / place building (scrolls) / info modal. `Location.jsx` shows the world name (`WORLDS[map_id]`), the cell kind and the vision range.

## Entry points
- `App.jsx` renders `GameCanvas` in the game view (post-login, character selected).
- `useRefreshMe` (exported from `GameCanvas.jsx`) is the shared refresh used by `TileCard` and other panels after any mutating action.
- WS: `GameCanvas` opens the `/api/ws?map=N` socket (Nginx strips `/api`, upgrades to back `:3000`); every message = "something moved on the map" → full area re-fetch.
- `terrain()` is consumed by `Location.jsx`/`TileCard.jsx` (kind + resource labels); `pathEnergy` by `TileCard` (all cost previews); `relief.js` only by `three/scene.js`.

## Data flow
Redux `game` slice: `me` (from `/characters/{id}`, carries `actor.pos`, `see`, `mount`, `scrolls`, `range_eff`), `entities` (from `/map/{id}/area`), `hover`/`selected` (scene ray-pick → dispatch, includes screen coords `sx/sy` for the card position). Network: relative `/api/...` only (`lib/api.js`); read-mostly — the write side is the backend (`back` card `map-terrain-gather`). No local persistence of map data: the world is a pure function of (x, y), so nothing is stored client-side.

## Tests
- `test/lib.test.js` (Vitest, unit): terrain determinism; **resource mapping per kind** (`perle/eau/herbe/bois/pierre`, all 5 kinds present in 100×100) — the regression lock for the map/resource update; `pathEnergy` straight-line cost (flying), `stopAt` shortening, one-step-into semantics: shallow = 4 on foot, deep = Infinity on foot / 1 with aquatic or flying, aquatic = Infinity on land.
- Cross-repo: `back/test/rules.test.ts` asserts the same mapping/costs on the server side; `back/test/integration/map-gather.test.ts` covers the server journey (move/gather/resources/409s).
- The 3D scene itself is not unit-tested (needs a WebGL context) — its inputs (`heightAt`, `groundColor`, `terrain`, `pathEnergy`) are.

## Gotchas
- **Mirrors must stay in sync** with `back/src/game/terrain.ts` / `movement.ts` — a desync means the client shows "⚡3" for a path the server bills as Infinity (or worse). Any threshold change touches both repos + both test files.
- `terrain.cost` is a display value only: `deep` is 99 but effectively forbidden on foot — `pathEnergy` reproduces the server's `stepCost` rules, never just sums `t.cost`.
- `useCell` caches per `${mapId}:x,y` for 3 s — after an action, call `refresh()` (re-fetches `me` + entities) before expecting the card to show the new state; `setAct('')` resets the action on cell change.
- `createScene` allocates instanced meshes up front (6000 trees / 9000 grass / 3000 rocks…): the `see` radius only rebuilds the terrain mesh (`allocate`), not the instance pools. `frustumCulled = false` on instances is mandatory (their bounding sphere is stale once the camera moves).
- `applyTime()` runs on a 60 s `setInterval` and reads `new Date()` — in tests/stubs any fake clock must keep the interval alive; `dispose()` clears it.
- Ray-pick returns a cell only within `see` distance (`Math.max(|dx|,|dy|) <= see`); clicks beyond the vision circle are ignored — that is intended (you can't target what you can't see).
- `TileCard` harvest action is hidden when `res.kind === 'deep'` and the mount is not flying/aquatic — mirrors the server 409 (`back` card `map-terrain-gather`); keep the two conditions together.
