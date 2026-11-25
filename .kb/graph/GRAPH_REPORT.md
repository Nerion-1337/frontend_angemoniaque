# Graph Report - front  (2026-11-25)

## Corpus Check
- 120 files · ~69,907 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 629 nodes · 2020 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd2bad39`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- Empty
- vitest
- ResourcesTab.jsx
- Guild.jsx
- Races.jsx
- MonsterDetails.jsx
- TileCard.jsx
- with
- terrain.js
- relief.js
- ResourceMap.jsx
- terrain
- world2.js
- entities.js
- createScene
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 83 edges
2. `react` - 44 edges
3. `react-redux` - 36 edges
4. `Empty()` - 36 edges
5. `terrain()` - 34 edges
6. `vitest` - 33 edges
7. `lucide-react` - 30 edges
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

## Communities (18 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.07
Nodes (76): react-dom@^18, react, react-dom, react-redux, App(), Account(), RACE, raceName() (+68 more)

### Community 1 - "Empty"
Cohesion: 0.07
Nodes (63): ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine(), Families(), familyLabel() (+55 more)

### Community 2 - "vitest"
Cohesion: 0.05
Nodes (40): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+32 more)

### Community 3 - "ResourcesTab.jsx"
Cohesion: 0.12
Nodes (36): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor(), BuildingExtras() (+28 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 5 - "Races.jsx"
Cohesion: 0.13
Nodes (25): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+17 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.15
Nodes (29): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+21 more)

### Community 7 - "TileCard.jsx"
Cohesion: 0.14
Nodes (24): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+16 more)

### Community 8 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 9 - "terrain.js"
Cohesion: 0.09
Nodes (23): CODES, FEATURES, H, ROWS, W, RARE3, BURN_DAMAGE, BY_CODE (+15 more)

### Community 10 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 11 - "ResourceMap.jsx"
Cohesion: 0.21
Nodes (13): KIND_COLOR, hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, RES3_BY_ID (+5 more)

### Community 12 - "terrain"
Cohesion: 0.19
Nodes (18): KIND, Location(), WORLDS, FLY, FLY_Y, LEVEL_H, levelAt(), levelLabel() (+10 more)

### Community 13 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 14 - "entities.js"
Cohesion: 0.24
Nodes (17): hash(), BEAST, beast(), building(), golem(), label(), M(), makeEntity() (+9 more)

### Community 15 - "createScene"
Cohesion: 0.27
Nodes (9): ss(), waterTint(), createScene(), applyTime(), buildGrid(), buildTerrain(), buildVegetation(), tintWater() (+1 more)

### Community 16 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Empty`, `vitest`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06798245614035088 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `Empty`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ResourceMap.jsx`, `terrain`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `Empty` be split into smaller, more focused modules?**
  _Cohesion score 0.07429718875502007 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `Empty`, `vitest`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ResourceMap.jsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.0546448087431694 - nodes in this community are weakly interconnected._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11918367346938775 - nodes in this community are weakly interconnected._