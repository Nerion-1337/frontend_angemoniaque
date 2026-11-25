# Graph Report - front  (2026-11-25)

## Corpus Check
- 108 files · ~63,239 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 574 nodes · 1854 edges · 18 communities (16 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b2c8265e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- App.jsx
- relief.js
- Guild.jsx
- vitest
- MonsterDetails.jsx
- ResourcesTab.jsx
- TileCard.jsx
- with
- terrain.js
- package.json
- world2.js
- world2.test.js
- ChatDock.jsx
- lib.test.js
- AGENTS.md — ia_agent / front
- Location.jsx

## God Nodes (most connected - your core abstractions)
1. `api()` - 79 edges
2. `react` - 42 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `vitest` - 28 edges
7. `terrain()` - 28 edges
8. `MonsterDetails()` - 25 edges
9. `Pick()` - 24 edges
10. `ResourcesTab()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `ChatDock()`  [EXTRACTED]
  src/App.jsx → src/components/ChatDock.jsx
- `App()` --calls--> `GuildModal()`  [EXTRACTED]
  src/App.jsx → src/components/Guild.jsx

## Import Cycles
- None detected.

## Communities (18 total, 2 thin omitted)

### Community 0 - "api"
Cohesion: 0.08
Nodes (77): lucide-react, react, react-redux, buildingDraft(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+69 more)

### Community 1 - "App.jsx"
Cohesion: 0.07
Nodes (65): App(), Account(), RACE, raceName(), Backdrop(), CAP, Capital(), Empty() (+57 more)

### Community 2 - "relief.js"
Cohesion: 0.08
Nodes (50): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+42 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "vitest"
Cohesion: 0.10
Nodes (25): vitest, FIELDS, jsonOr(), jsonText(), URL_KIND, RaceRules(), RULE_KEYS, rulesBody() (+17 more)

### Community 5 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 6 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (26): activationBody(), activationSummary(), buildingBody(), groupDraft(), groupSummary(), ActivationEditor(), area(), cellResource() (+18 more)

### Community 7 - "TileCard.jsx"
Cohesion: 0.15
Nodes (23): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+15 more)

### Community 8 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 9 - "terrain.js"
Cohesion: 0.11
Nodes (21): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+13 more)

### Community 10 - "package.json"
Cohesion: 0.11
Nodes (20): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+12 more)

### Community 11 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 12 - "world2.test.js"
Cohesion: 0.35
Nodes (7): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2

### Community 13 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 14 - "lib.test.js"
Cohesion: 0.36
Nodes (5): GROUPS, RES_BY_ID, RESOURCES, find(), stepInto()

### Community 15 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `App.jsx`, `Guild.jsx`, `vitest`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.07617704108622818 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `App.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `package.json`, `world2.test.js`, `ChatDock.jsx`, `lib.test.js`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06641198942109904 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `App.jsx`, `Guild.jsx`, `vitest`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07878787878787878 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._