# Graph Report - front  (2026-11-25)

## Corpus Check
- 101 files · ~55,661 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 523 nodes · 1666 edges · 16 communities (15 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5861c826`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Empty
- api
- Entities.jsx
- Guild.jsx
- MonsterDetails.jsx
- with
- TileCard.jsx
- terrain
- terrain.js
- createScene
- package.json
- world2.js
- relief.js
- entities.js
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 77 edges
2. `react` - 40 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `vitest` - 24 edges
7. `MonsterDetails()` - 24 edges
8. `confirmDel()` - 24 edges
9. `Forum()` - 23 edges
10. `terrain()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `TileCard()`  [EXTRACTED]
  src/App.jsx → src/components/TileCard.jsx
- `Entities()` --calls--> `BuildingExtras()`  [EXTRACTED]
  src/admin/Entities.jsx → src/admin/BuildingExtras.jsx

## Import Cycles
- None detected.

## Communities (16 total, 1 thin omitted)

### Community 0 - "Empty"
Cohesion: 0.07
Nodes (65): BuildingExtras(), BuildingSpells(), ago(), Dashboard(), KPI, depositBody(), depositDraft(), zoneLabel() (+57 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (66): lucide-react, react, react-dom, react-redux, App(), Account(), Backdrop(), CAP (+58 more)

### Community 2 - "Entities.jsx"
Cohesion: 0.09
Nodes (31): vitest, buildingBody(), buildingDraft(), Entities(), FIELDS, jsonOr(), jsonText(), URL_KIND (+23 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 4 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 5 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 6 - "TileCard.jsx"
Cohesion: 0.15
Nodes (21): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+13 more)

### Community 7 - "terrain"
Cohesion: 0.17
Nodes (18): hex(), LegendAngDem(), MapLegend(), pathEnergy(), water(), RES2_BY_ID, RESOURCES2, SIDES (+10 more)

### Community 8 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 9 - "createScene"
Cohesion: 0.20
Nodes (20): base(), groundColor(), hash(), heightAt(), micro(), ridge(), ss(), WATER_Y (+12 more)

### Community 10 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 11 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 12 - "relief.js"
Cohesion: 0.11
Nodes (18): three@^0.170.0, three, cellTint(), DEEP, FOREST, g2, GRASS, GRASS2 (+10 more)

### Community 13 - "entities.js"
Cohesion: 0.38
Nodes (12): BEAST, beast(), building(), golem(), label(), M(), makeEntity(), mesh() (+4 more)

### Community 14 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Empty`, `Entities.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Should `Empty` be split into smaller, more focused modules?**
  _Cohesion score 0.07269752220663861 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Entities.jsx` to `Empty`, `api`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `terrain`, `package.json`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08072707832130446 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `Empty`, `Entities.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `package.json`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `Entities.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09361393323657474 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11285846438482887 - nodes in this community are weakly interconnected._