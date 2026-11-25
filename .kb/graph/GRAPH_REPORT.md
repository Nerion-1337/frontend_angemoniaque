# Graph Report - front  (2026-11-25)

## Corpus Check
- 117 files · ~68,513 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 620 nodes · 1982 edges · 16 communities (15 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `073520e0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- terrain.js
- Empty
- relief.js
- Guild.jsx
- MonsterDetails.jsx
- ResourcesTab.jsx
- Races.jsx
- with
- react-redux
- world2.js
- TilesTab.jsx
- StatCostsTab.jsx
- ChatDock.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 81 edges
2. `react` - 43 edges
3. `Empty()` - 36 edges
4. `react-redux` - 35 edges
5. `terrain()` - 34 edges
6. `vitest` - 32 edges
7. `lucide-react` - 29 edges
8. `confirmDel()` - 26 edges
9. `MonsterDetails()` - 25 edges
10. `Pick()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx

## Import Cycles
- None detected.

## Communities (16 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.07
Nodes (74): react, react-dom, App(), Account(), RACE, raceName(), Backdrop(), Capital() (+66 more)

### Community 1 - "terrain.js"
Cohesion: 0.05
Nodes (70): KIND_COLOR, RES_COLOR, hex(), LegendAngDem(), cache, cellCost(), Entity(), HEALTH (+62 more)

### Community 2 - "Empty"
Cohesion: 0.07
Nodes (66): lucide-react, ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine(), Families() (+58 more)

### Community 3 - "relief.js"
Cohesion: 0.07
Nodes (49): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+41 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 5 - "MonsterDetails.jsx"
Cohesion: 0.11
Nodes (32): vitest, FIELDS, jsonOr(), jsonText(), COLORS, MiniMap(), capLabel(), capsToMaxCaps() (+24 more)

### Community 6 - "ResourcesTab.jsx"
Cohesion: 0.14
Nodes (31): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor(), BuildingExtras() (+23 more)

### Community 7 - "Races.jsx"
Cohesion: 0.17
Nodes (20): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+12 more)

### Community 8 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 9 - "react-redux"
Cohesion: 0.09
Nodes (24): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+16 more)

### Community 10 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 11 - "TilesTab.jsx"
Cohesion: 0.17
Nodes (9): ITEM_SLOTS, hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), GROUP (+1 more)

### Community 12 - "StatCostsTab.jsx"
Cohesion: 0.47
Nodes (7): newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost(), StatCostsTab()

### Community 13 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 14 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `terrain.js`, `Empty`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Races.jsx`, `TilesTab.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06680393502630977 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `MonsterDetails.jsx` to `api`, `terrain.js`, `Empty`, `Guild.jsx`, `ResourcesTab.jsx`, `Races.jsx`, `react-redux`, `TilesTab.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `terrain.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05143570536828964 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `terrain.js`, `Empty`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Races.jsx`, `react-redux`, `TilesTab.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `Empty` be split into smaller, more focused modules?**
  _Cohesion score 0.0735444330949949 - nodes in this community are weakly interconnected._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06778476589797344 - nodes in this community are weakly interconnected._