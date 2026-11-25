# Graph Report - front  (2026-11-25)

## Corpus Check
- 103 files · ~57,834 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 538 nodes · 1719 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ff8ee4d4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ItemsTab.jsx
- api
- terrain.js
- relief.js
- Guild.jsx
- vitest
- MonsterDetails.jsx
- Races.jsx
- TileCard.jsx
- with
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 78 edges
2. `react` - 40 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `vitest` - 26 edges
7. `MonsterDetails()` - 25 edges
8. `Pick()` - 24 edges
9. `confirmDel()` - 24 edges
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

## Communities (12 total, 1 thin omitted)

### Community 0 - "ItemsTab.jsx"
Cohesion: 0.07
Nodes (77): lucide-react, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard(), KPI, depositBody() (+69 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (65): react, react-dom, react-redux, App(), Account(), Backdrop(), CAP, Capital() (+57 more)

### Community 2 - "terrain.js"
Cohesion: 0.05
Nodes (55): KIND, WORLDS, hex(), LegendAngDem(), FEATURES2, H2, ROWS2, W2 (+47 more)

### Community 3 - "relief.js"
Cohesion: 0.08
Nodes (49): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+41 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 5 - "vitest"
Cohesion: 0.07
Nodes (27): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+19 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.14
Nodes (29): FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+21 more)

### Community 7 - "Races.jsx"
Cohesion: 0.16
Nodes (21): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody() (+13 more)

### Community 8 - "TileCard.jsx"
Cohesion: 0.14
Nodes (24): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+16 more)

### Community 9 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 10 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0664785752071945 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `ItemsTab.jsx`, `api`, `terrain.js`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08151260504201681 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `vitest`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `terrain.js` be split into smaller, more focused modules?**
  _Cohesion score 0.051759834368530024 - nodes in this community are weakly interconnected._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0803633822501747 - nodes in this community are weakly interconnected._