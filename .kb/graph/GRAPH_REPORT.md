# Graph Report - front  (2026-11-24)

## Corpus Check
- 87 files · ~49,435 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 467 nodes · 1413 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb7cdcbf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- ItemsTab.jsx
- relief.js
- Guild.jsx
- with
- terrain.js
- world2.js
- MonsterDetails.jsx
- package.json
- Races.jsx
- TileCard.jsx
- world2.test.js
- terrain
- TilesTab.jsx
- vitest
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 66 edges
2. `react` - 35 edges
3. `react-redux` - 29 edges
4. `Forum()` - 23 edges
5. `terrain()` - 23 edges
6. `createScene()` - 23 edges
7. `lucide-react` - 22 edges
8. `App()` - 22 edges
9. `Empty()` - 20 edges
10. `vitest` - 19 edges

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

### Community 0 - "api"
Cohesion: 0.08
Nodes (60): react, react-redux, App(), Account(), Backdrop(), CAP, Capital(), ChatDock() (+52 more)

### Community 1 - "ItemsTab.jsx"
Cohesion: 0.09
Nodes (55): lucide-react, ago(), Dashboard(), KPI, CORE_FAMILIES, Divine(), Families(), familyLabel() (+47 more)

### Community 2 - "relief.js"
Cohesion: 0.08
Nodes (48): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+40 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 5 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 6 - "world2.js"
Cohesion: 0.12
Nodes (20): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+12 more)

### Community 7 - "MonsterDetails.jsx"
Cohesion: 0.22
Nodes (17): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), linkedLabel(), MonsterDetails() (+9 more)

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (20): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+12 more)

### Community 9 - "Races.jsx"
Cohesion: 0.26
Nodes (13): jsonText(), Pick(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races() (+5 more)

### Community 10 - "TileCard.jsx"
Cohesion: 0.23
Nodes (13): cache, cellCost(), Entity(), HEALTH, InfoModal(), KIND, TileCard(), TileInfo() (+5 more)

### Community 11 - "world2.test.js"
Cohesion: 0.30
Nodes (8): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RESOURCES

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
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08386075949367089 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `ItemsTab.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `package.json`, `Races.jsx`, `world2.test.js`, `terrain`, `TilesTab.jsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08817498291182502 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `package.json`, `Races.jsx`, `TileCard.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08127721335268505 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._