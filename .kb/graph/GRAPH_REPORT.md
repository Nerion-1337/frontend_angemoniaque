# Graph Report - front  (2026-11-25)

## Corpus Check
- 114 files · ~67,347 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 610 nodes · 1943 edges · 19 communities (18 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `88ddef06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MonsterDetails.jsx
- api
- ResourcesTab.jsx
- Guild.jsx
- TileCard.jsx
- terrain.js
- Races.jsx
- with
- vitest
- relief.js
- world2.js
- package.json
- MapLegend.jsx
- entities.js
- terrain
- PlayersTab.jsx
- createScene
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 79 edges
2. `react` - 42 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `terrain()` - 34 edges
6. `vitest` - 31 edges
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

## Communities (19 total, 1 thin omitted)

### Community 0 - "MonsterDetails.jsx"
Cohesion: 0.06
Nodes (84): lucide-react, BuildingSpells(), ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine() (+76 more)

### Community 1 - "api"
Cohesion: 0.06
Nodes (80): react, react-dom, react-redux, App(), Account(), RACE, raceName(), Backdrop() (+72 more)

### Community 2 - "ResourcesTab.jsx"
Cohesion: 0.12
Nodes (35): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor(), BuildingExtras() (+27 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 4 - "TileCard.jsx"
Cohesion: 0.14
Nodes (25): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+17 more)

### Community 5 - "terrain.js"
Cohesion: 0.09
Nodes (25): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+17 more)

### Community 6 - "Races.jsx"
Cohesion: 0.17
Nodes (20): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+12 more)

### Community 7 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 8 - "vitest"
Cohesion: 0.12
Nodes (12): vitest, ITEM_SLOTS, Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat() (+4 more)

### Community 9 - "relief.js"
Cohesion: 0.11
Nodes (25): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+17 more)

### Community 10 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 11 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 12 - "MapLegend.jsx"
Cohesion: 0.24
Nodes (11): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RES_BY_ID (+3 more)

### Community 13 - "entities.js"
Cohesion: 0.26
Nodes (16): BEAST, beast(), building(), golem(), label(), M(), makeEntity(), mesh() (+8 more)

### Community 14 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 15 - "PlayersTab.jsx"
Cohesion: 0.35
Nodes (10): pageWindow(), PLACE_LABEL, posLabel(), RACE_LABEL, STAT_GROUPS, STAT_KEYS, statDiff(), PlayerSheet() (+2 more)

### Community 16 - "createScene"
Cohesion: 0.24
Nodes (10): hash(), ss(), waterTint(), createScene(), applyTime(), buildGrid(), buildTerrain(), buildVegetation() (+2 more)

### Community 17 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Guild.jsx`, `TileCard.jsx`, `Races.jsx`, `vitest`, `PlayersTab.jsx`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05878355419639823 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `MonsterDetails.jsx`, `api`, `ResourcesTab.jsx`, `Guild.jsx`, `TileCard.jsx`, `Races.jsx`, `package.json`, `MapLegend.jsx`, `terrain`, `PlayersTab.jsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06396039603960396 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Guild.jsx`, `TileCard.jsx`, `Races.jsx`, `vitest`, `package.json`, `PlayersTab.jsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11529411764705882 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11285846438482887 - nodes in this community are weakly interconnected._