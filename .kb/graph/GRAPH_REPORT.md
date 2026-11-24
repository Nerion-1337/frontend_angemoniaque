# Graph Report - front  (2026-11-24)

## Corpus Check
- 96 files · ~52,883 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 497 nodes · 1550 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `099930e5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- api
- terrain.js
- relief.js
- Guild.jsx
- MonsterDetails.jsx
- vitest
- with
- Races.jsx
- TileCard.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 73 edges
2. `react` - 38 edges
3. `react-redux` - 32 edges
4. `Empty()` - 27 edges
5. `lucide-react` - 25 edges
6. `Forum()` - 23 edges
7. `terrain()` - 23 edges
8. `createScene()` - 23 edges
9. `vitest` - 22 edges
10. `App()` - 22 edges

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

## Communities (12 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (74): lucide-react, react, react-redux, BuildingExtras(), BuildingSpells(), ago(), Dashboard(), KPI (+66 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (59): react-dom, App(), Account(), Backdrop(), CAP, Capital(), ChatDock(), TABS (+51 more)

### Community 2 - "terrain.js"
Cohesion: 0.05
Nodes (55): KIND, WORLDS, hex(), LegendAngDem(), FEATURES2, H2, ROWS2, W2 (+47 more)

### Community 3 - "relief.js"
Cohesion: 0.08
Nodes (50): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+42 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 5 - "MonsterDetails.jsx"
Cohesion: 0.15
Nodes (21): buildingBody(), buildingDraft(), FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps() (+13 more)

### Community 6 - "vitest"
Cohesion: 0.08
Nodes (21): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+13 more)

### Community 7 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 8 - "Races.jsx"
Cohesion: 0.20
Nodes (16): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), RankReq() (+8 more)

### Community 9 - "TileCard.jsx"
Cohesion: 0.19
Nodes (17): cache, cellCost(), Entity(), HEALTH, InfoModal(), KIND, TileCard(), TileInfo() (+9 more)

### Community 10 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07337565347274085 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `react`, `api`, `terrain.js`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.083089905874716 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `api`, `Guild.jsx`, `MonsterDetails.jsx`, `vitest`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `terrain.js` be split into smaller, more focused modules?**
  _Cohesion score 0.051759834368530024 - nodes in this community are weakly interconnected._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07811447811447811 - nodes in this community are weakly interconnected._