# Graph Report - front  (2026-11-25)

## Corpus Check
- 113 files · ~66,665 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 607 nodes · 1938 edges · 18 communities (17 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50387089`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- api
- Guild.jsx
- MonsterDetails.jsx
- terrain.js
- ResourcesTab.jsx
- TileCard.jsx
- Races.jsx
- with
- relief.js
- vitest
- package.json
- world2.js
- terrain
- entities.js
- MapLegend.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 79 edges
2. `react` - 42 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `terrain()` - 34 edges
6. `vitest` - 30 edges
7. `lucide-react` - 28 edges
8. `MonsterDetails()` - 25 edges
9. `Pick()` - 24 edges
10. `ResourcesTab()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx

## Import Cycles
- None detected.

## Communities (18 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (75): lucide-react, react, react-redux, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+67 more)

### Community 1 - "api"
Cohesion: 0.07
Nodes (75): react-dom, App(), Account(), RACE, raceName(), Backdrop(), CAP, Capital() (+67 more)

### Community 2 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 3 - "MonsterDetails.jsx"
Cohesion: 0.14
Nodes (30): FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+22 more)

### Community 4 - "terrain.js"
Cohesion: 0.08
Nodes (28): KIND, WORLDS, CODES, FEATURES, H, ROWS, W, RARE3 (+20 more)

### Community 5 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

### Community 6 - "TileCard.jsx"
Cohesion: 0.13
Nodes (26): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+18 more)

### Community 7 - "Races.jsx"
Cohesion: 0.16
Nodes (21): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody() (+13 more)

### Community 8 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 9 - "relief.js"
Cohesion: 0.11
Nodes (26): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+18 more)

### Community 10 - "vitest"
Cohesion: 0.14
Nodes (11): vitest, ITEM_SLOTS, Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat() (+3 more)

### Community 11 - "package.json"
Cohesion: 0.11
Nodes (21): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+13 more)

### Community 12 - "world2.js"
Cohesion: 0.12
Nodes (20): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+12 more)

### Community 13 - "terrain"
Cohesion: 0.20
Nodes (18): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+10 more)

### Community 14 - "entities.js"
Cohesion: 0.24
Nodes (17): hash(), BEAST, beast(), building(), golem(), label(), M(), makeEntity() (+9 more)

### Community 15 - "MapLegend.jsx"
Cohesion: 0.26
Nodes (10): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+2 more)

### Community 16 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `Races.jsx`, `vitest`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07128712871287128 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `react`, `api`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `Races.jsx`, `package.json`, `terrain`, `MapLegend.jsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06562150055991041 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `api`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `Races.jsx`, `vitest`, `package.json`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11285846438482887 - nodes in this community are weakly interconnected._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1358974358974359 - nodes in this community are weakly interconnected._