# Graph Report - front  (2026-11-25)

## Corpus Check
- 110 files · ~64,216 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 588 nodes · 1890 edges · 17 communities (16 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `75877a7d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- api
- terrain
- Guild.jsx
- ItemsTab.jsx
- MonsterDetails.jsx
- ResourcesTab.jsx
- TileCard.jsx
- with
- package.json
- terrain.js
- world2.js
- vitest
- ChatDock.jsx
- world2.test.js
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

## Communities (17 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (67): lucide-react, react, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard(), KPI (+59 more)

### Community 1 - "api"
Cohesion: 0.07
Nodes (70): react-redux, App(), Account(), RACE, raceName(), Backdrop(), CAP, Capital() (+62 more)

### Community 2 - "terrain"
Cohesion: 0.06
Nodes (60): FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY, standY() (+52 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "ItemsTab.jsx"
Cohesion: 0.12
Nodes (30): bonusesBody(), CORE_FAMILIES, familyLabel(), ITEM_STATS, itemBody(), NUM, statsLine(), blank (+22 more)

### Community 5 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 6 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

### Community 7 - "TileCard.jsx"
Cohesion: 0.14
Nodes (25): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+17 more)

### Community 8 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 9 - "package.json"
Cohesion: 0.11
Nodes (22): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+14 more)

### Community 10 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 11 - "world2.js"
Cohesion: 0.12
Nodes (20): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+12 more)

### Community 12 - "vitest"
Cohesion: 0.16
Nodes (6): vitest, GROUPS, RES_BY_ID, RESOURCES, setWorld(), PANELS

### Community 13 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 14 - "world2.test.js"
Cohesion: 0.38
Nodes (6): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2

### Community 15 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `Guild.jsx`, `ItemsTab.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07280701754385965 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `react`, `api`, `terrain`, `Guild.jsx`, `ItemsTab.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `package.json`, `ChatDock.jsx`, `world2.test.js`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.07016229712858926 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `api`, `Guild.jsx`, `ItemsTab.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `terrain` be split into smaller, more focused modules?**
  _Cohesion score 0.06321334503950835 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._