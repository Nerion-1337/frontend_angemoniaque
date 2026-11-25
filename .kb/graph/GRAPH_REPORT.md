# Graph Report - front  (2026-11-25)

## Corpus Check
- 102 files · ~56,639 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 531 nodes · 1697 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef47fca5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- api
- Guild.jsx
- MonsterDetails.jsx
- Races.jsx
- TileCard.jsx
- with
- terrain
- terrain.js
- relief.js
- createScene
- package.json
- world2.js
- entities.js
- vitest
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 78 edges
2. `react` - 40 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `vitest` - 25 edges
7. `MonsterDetails()` - 25 edges
8. `confirmDel()` - 24 edges
9. `Pick()` - 23 edges
10. `Forum()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `TileCard()`  [EXTRACTED]
  src/App.jsx → src/components/TileCard.jsx
- `BuildingSpells()` --calls--> `api()`  [EXTRACTED]
  src/admin/BuildingExtras.jsx → src/lib/api.js

## Import Cycles
- None detected.

## Communities (17 total, 2 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (79): lucide-react, react, buildingBody(), buildingDraft(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+71 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (65): react-dom, react-redux, App(), Account(), Backdrop(), CAP, Capital(), ChatDock() (+57 more)

### Community 2 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 3 - "MonsterDetails.jsx"
Cohesion: 0.14
Nodes (29): FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+21 more)

### Community 4 - "Races.jsx"
Cohesion: 0.16
Nodes (21): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody() (+13 more)

### Community 5 - "TileCard.jsx"
Cohesion: 0.15
Nodes (23): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+15 more)

### Community 6 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 7 - "terrain"
Cohesion: 0.17
Nodes (16): hex(), LegendAngDem(), MapLegend(), FEATURES, RES2_BY_ID, RESOURCES2, SIDES, ZONES2 (+8 more)

### Community 8 - "terrain.js"
Cohesion: 0.11
Nodes (19): CODES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS, humanCell() (+11 more)

### Community 9 - "relief.js"
Cohesion: 0.10
Nodes (20): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+12 more)

### Community 10 - "createScene"
Cohesion: 0.21
Nodes (19): groundColor(), hash(), heightAt(), micro(), ridge(), ss(), noiseAt(), setWorld() (+11 more)

### Community 11 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 12 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 13 - "entities.js"
Cohesion: 0.38
Nodes (12): BEAST, beast(), building(), golem(), label(), M(), makeEntity(), mesh() (+4 more)

### Community 15 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06463337547408343 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `react`, `api`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`, `terrain`, `package.json`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.07815126050420168 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `api`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`, `createScene`, `package.json`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11285846438482887 - nodes in this community are weakly interconnected._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14082503556187767 - nodes in this community are weakly interconnected._