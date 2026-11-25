# Graph Report - front  (2026-11-25)

## Corpus Check
- 106 files · ~62,200 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 566 nodes · 1829 edges · 17 communities (16 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9cf5f3fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- ItemsTab.jsx
- Entities.jsx
- relief.js
- Guild.jsx
- MonsterDetails.jsx
- TileCard.jsx
- with
- ResourcesTab.jsx
- terrain.js
- world2.js
- package.json
- world2.test.js
- ChatDock.jsx
- AGENTS.md — ia_agent / front
- terrain

## God Nodes (most connected - your core abstractions)
1. `api()` - 79 edges
2. `react` - 41 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `terrain()` - 28 edges
7. `vitest` - 27 edges
8. `MonsterDetails()` - 25 edges
9. `Pick()` - 24 edges
10. `ResourcesTab()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `ResourcesTab()` --indirect_call--> `groupDraft()`  [INFERRED]
  src/admin/ResourcesTab.jsx → src/admin/building.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `ChatDock()`  [EXTRACTED]
  src/App.jsx → src/components/ChatDock.jsx

## Import Cycles
- None detected.

## Communities (17 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.08
Nodes (66): react, react-dom, react-redux, App(), Account(), RACE, raceName(), Backdrop() (+58 more)

### Community 1 - "ItemsTab.jsx"
Cohesion: 0.08
Nodes (63): lucide-react, ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine(), Families() (+55 more)

### Community 2 - "Entities.jsx"
Cohesion: 0.08
Nodes (41): vitest, activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor() (+33 more)

### Community 3 - "relief.js"
Cohesion: 0.08
Nodes (48): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+40 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 5 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 6 - "TileCard.jsx"
Cohesion: 0.15
Nodes (23): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+15 more)

### Community 7 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 8 - "ResourcesTab.jsx"
Cohesion: 0.25
Nodes (19): area(), cellResource(), cellRoll(), KIND_NAME, KINDS, naturalScan(), newShare(), overLimit() (+11 more)

### Community 9 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 10 - "world2.js"
Cohesion: 0.12
Nodes (20): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+12 more)

### Community 11 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 12 - "world2.test.js"
Cohesion: 0.22
Nodes (12): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RES_BY_ID (+4 more)

### Community 13 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 14 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

### Community 15 - "terrain"
Cohesion: 0.40
Nodes (5): KIND, WORLDS, h0(), procNoise(), terrain()

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `Entities.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ResourcesTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.07871148459383753 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Entities.jsx` to `api`, `ItemsTab.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ResourcesTab.jsx`, `package.json`, `world2.test.js`, `ChatDock.jsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0757314974182444 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `Entities.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ResourcesTab.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `Entities.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08056265984654731 - nodes in this community are weakly interconnected._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08127721335268505 - nodes in this community are weakly interconnected._