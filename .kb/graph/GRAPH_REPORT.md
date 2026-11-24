# Graph Report - front  (2026-11-24)

## Corpus Check
- 83 files · ~47,544 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 454 nodes · 1352 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1fe461e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- terrain.js
- ItemsTab.jsx
- relief.js
- Guild.jsx
- Races.jsx
- with
- MonsterDetails.jsx
- world2.js
- package.json
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 63 edges
2. `react` - 34 edges
3. `react-redux` - 28 edges
4. `Forum()` - 23 edges
5. `terrain()` - 23 edges
6. `createScene()` - 23 edges
7. `App()` - 22 edges
8. `lucide-react` - 21 edges
9. `vitest` - 18 edges
10. `Empty()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `TileCard()`  [EXTRACTED]
  src/App.jsx → src/components/TileCard.jsx
- `Dashboard()` --calls--> `api()`  [EXTRACTED]
  src/admin/Dashboard.jsx → src/lib/api.js

## Import Cycles
- None detected.

## Communities (12 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.08
Nodes (64): lucide-react, react, react-dom, react-redux, App(), Account(), Backdrop(), CAP (+56 more)

### Community 1 - "terrain.js"
Cohesion: 0.05
Nodes (54): vitest, hex(), LegendAngDem(), MapLegend(), cache, cellCost(), Entity(), HEALTH (+46 more)

### Community 2 - "ItemsTab.jsx"
Cohesion: 0.10
Nodes (48): ago(), Dashboard(), KPI, CORE_FAMILIES, Divine(), Families(), familyLabel(), itemBody() (+40 more)

### Community 3 - "relief.js"
Cohesion: 0.08
Nodes (49): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+41 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.12
Nodes (37): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+29 more)

### Community 5 - "Races.jsx"
Cohesion: 0.16
Nodes (19): Pick(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), int() (+11 more)

### Community 6 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 7 - "MonsterDetails.jsx"
Cohesion: 0.22
Nodes (17): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), linkedLabel(), MonsterDetails() (+9 more)

### Community 8 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 9 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 10 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `terrain.js`, `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08235294117647059 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `terrain.js` to `api`, `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `package.json`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `terrain.js` be split into smaller, more focused modules?**
  _Cohesion score 0.054773082942097026 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `terrain.js`, `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `package.json`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09903846153846153 - nodes in this community are weakly interconnected._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0803633822501747 - nodes in this community are weakly interconnected._