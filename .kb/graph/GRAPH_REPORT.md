# Graph Report - front  (2026-11-24)

## Corpus Check
- 90 files · ~50,832 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 481 nodes · 1469 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17a73206`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ItemsTab.jsx
- api
- relief.js
- Guild.jsx
- with
- terrain.js
- MonsterDetails.jsx
- package.json
- world2.js
- Races.jsx
- world2.test.js
- TileCard.jsx
- terrain
- TilesTab.jsx
- vitest
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 68 edges
2. `react` - 36 edges
3. `react-redux` - 30 edges
4. `lucide-react` - 23 edges
5. `Forum()` - 23 edges
6. `terrain()` - 23 edges
7. `createScene()` - 23 edges
8. `App()` - 22 edges
9. `Empty()` - 22 edges
10. `vitest` - 20 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `GuildModal()`  [EXTRACTED]
  src/App.jsx → src/components/Guild.jsx
- `App()` --calls--> `TileCard()`  [EXTRACTED]
  src/App.jsx → src/components/TileCard.jsx

## Import Cycles
- None detected.

## Communities (17 total, 2 thin omitted)

### Community 0 - "ItemsTab.jsx"
Cohesion: 0.07
Nodes (65): lucide-react, ago(), Dashboard(), KPI, CORE_FAMILIES, Divine(), Families(), familyLabel() (+57 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (60): react, react-dom, react-redux, App(), Account(), Backdrop(), CAP, Capital() (+52 more)

### Community 2 - "relief.js"
Cohesion: 0.08
Nodes (48): three, base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2 (+40 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 5 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.22
Nodes (17): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), linkedLabel(), MonsterDetails() (+9 more)

### Community 7 - "package.json"
Cohesion: 0.11
Nodes (20): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+12 more)

### Community 8 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 9 - "Races.jsx"
Cohesion: 0.26
Nodes (13): jsonText(), Pick(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races() (+5 more)

### Community 10 - "world2.test.js"
Cohesion: 0.28
Nodes (9): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+1 more)

### Community 11 - "TileCard.jsx"
Cohesion: 0.23
Nodes (13): cache, cellCost(), Entity(), HEALTH, InfoModal(), KIND, TileCard(), TileInfo() (+5 more)

### Community 12 - "terrain"
Cohesion: 0.26
Nodes (11): COLORS, pathEnergy(), water(), RES_BY_ID, h0(), procNoise(), setWorld(), terrain() (+3 more)

### Community 13 - "TilesTab.jsx"
Cohesion: 0.56
Nodes (6): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab()

### Community 15 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07374847374847375 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `ItemsTab.jsx`, `api`, `Guild.jsx`, `MonsterDetails.jsx`, `package.json`, `Races.jsx`, `world2.test.js`, `terrain`, `TilesTab.jsx`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `package.json`, `Races.jsx`, `TileCard.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08272859216255443 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11020408163265306 - nodes in this community are weakly interconnected._