# Graph Report - front  (2026-11-25)

## Corpus Check
- 110 files · ~64,312 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 589 nodes · 1890 edges · 19 communities (18 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e03be105`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- api
- Guild.jsx
- ItemsTab.jsx
- MonsterDetails.jsx
- ResourcesTab.jsx
- TilesTab.jsx
- with
- terrain.js
- relief.js
- package.json
- world2.js
- terrain
- ChatDock.jsx
- createScene
- entities.js
- rankReq.js
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 79 edges
2. `react` - 42 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `terrain()` - 33 edges
6. `vitest` - 29 edges
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
- `syncEntities()` --calls--> `makeEntity()`  [EXTRACTED]
  src/three/scene.js → src/three/entities.js

## Import Cycles
- None detected.

## Communities (19 total, 1 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.05
Nodes (79): App(), Account(), RACE, raceName(), Backdrop(), CAP, Capital(), Empty() (+71 more)

### Community 1 - "api"
Cohesion: 0.09
Nodes (64): lucide-react, react, react-redux, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+56 more)

### Community 2 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 3 - "ItemsTab.jsx"
Cohesion: 0.10
Nodes (31): vitest, bonusesBody(), CORE_FAMILIES, ITEM_STATS, itemBody(), NUM, statsLine(), blank (+23 more)

### Community 4 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 5 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

### Community 6 - "TilesTab.jsx"
Cohesion: 0.13
Nodes (22): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), hex(), LegendAngDem() (+14 more)

### Community 7 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 8 - "terrain.js"
Cohesion: 0.09
Nodes (23): KIND, WORLDS, CODES, FEATURES, H, ROWS, W, BURN_DAMAGE (+15 more)

### Community 9 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 10 - "package.json"
Cohesion: 0.11
Nodes (22): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+14 more)

### Community 11 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 12 - "terrain"
Cohesion: 0.28
Nodes (14): FLY, FLY_Y, LEVEL_H, levelAt(), levelLabel(), memo, ring(), ROCK (+6 more)

### Community 13 - "ChatDock.jsx"
Cohesion: 0.29
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 14 - "createScene"
Cohesion: 0.20
Nodes (12): hash(), ss(), lerpHex(), waterTint(), createScene(), applyTime(), buildGrid(), buildTerrain() (+4 more)

### Community 15 - "entities.js"
Cohesion: 0.38
Nodes (12): BEAST, beast(), building(), golem(), label(), M(), makeEntity(), mesh() (+4 more)

### Community 16 - "rankReq.js"
Cohesion: 0.33
Nodes (7): condBody(), condDraft(), condSummary(), MODES, reqBody(), reqDraft(), reqSummary()

### Community 17 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `App.jsx`, `Guild.jsx`, `ItemsTab.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TilesTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05318491032776747 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ItemsTab.jsx` to `App.jsx`, `api`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TilesTab.jsx`, `package.json`, `terrain`, `ChatDock.jsx`, `rankReq.js`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08813982521847691 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `App.jsx`, `Guild.jsx`, `ItemsTab.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TilesTab.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10241545893719807 - nodes in this community are weakly interconnected._